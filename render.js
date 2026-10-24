// Shared season rendering for the desktop widget (widget.html), the site pages, and the build (build.mjs).
// Reads window.SEASON_DATA (seasons.js) and exposes helpers on window.Seasons.
// Keep the data accuracy rules: estimates always carry "~" and the .est / <em> styling.
(function () {
  const DAY = 86400000;
  // The build sets window.SEASONS_TZ so pre-rendered HTML uses one fixed zone; browsers use local time.
  const TZ = window.SEASONS_TZ || undefined;
  const fmtDate = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: TZ });
  const fmtDateUTC = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  const fmtDateTime = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: TZ });
  const fmtClock = new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit", timeZone: TZ });

  // Dates without a time ("2024-05-14") are calendar dates. Pin them to noon UTC so they
  // land on the same calendar day in every time zone.
  const isDateOnly = s => /^\d{4}-\d{2}-\d{2}$/.test(s);
  const parseT = s => s == null ? NaN : Date.parse(isDateOnly(s) ? s + "T12:00:00Z" : s);

  // Format a date string: calendar dates as-is, exact times in the display zone.
  function fmtDay(s) {
    return isDateOnly(s) ? fmtDateUTC.format(parseT(s)) : fmtDate.format(parseT(s));
  }

  // Length of a finished season in whole days, or null.
  function lengthDays(s) {
    if (!s.start || !s.end) return null;
    return Math.round((parseT(s.end) - parseT(s.start)) / DAY);
  }

  function median(xs) {
    if (!xs.length) return null;
    const a = [...xs].sort((x, y) => x - y), m = a.length >> 1;
    return a.length % 2 ? a[m] : Math.round((a[m - 1] + a[m]) / 2);
  }

  // Typical season length: median of the last 6 finished seasons, or the game's typicalDays.
  function typicalDays(g) {
    const done = (g.seasons || []).map(lengthDays).filter(d => d != null).slice(-6);
    return done.length >= 3 ? median(done) : g.typicalDays || null;
  }

  // The game merged with its current season: the latest season that has started
  // (or the first one, if none has). Adds prev/next neighbours and the typical length.
  function view(g, now) {
    if (!g.seasons) return g;
    const list = g.seasons;
    let i = -1;
    list.forEach((s, j) => { if (parseT(s.start) <= now) i = j; });
    if (i < 0) i = 0;
    return { ...g, ...list[i], prev: list[i - 1] || null, next: list[i + 1] || null, typicalDays: typicalDays(g) };
  }

  // Official end wins. Otherwise endEstimate, otherwise start + typical length; both are estimates.
  function endOf(g) {
    if (g.end) return { t: parseT(g.end), est: false };
    if (g.endEstimate) return { t: parseT(g.endEstimate), est: true };
    if (g.typicalDays) return { t: parseT(g.start) + g.typicalDays * DAY, est: true };
    return null;
  }

  // "12d 4h" for long spans, "4h 12m" under a day.
  function span(ms) {
    ms = Math.max(0, ms);
    const d = Math.floor(ms / DAY), h = Math.floor(ms % DAY / 3600000), m = Math.floor(ms % 3600000 / 60000);
    return d >= 1 ? `${d}d ${h}h` : `${h}h ${m}m`;
  }

  function esc(s) {
    return String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  }

  function hostOf(url) {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
  }

  // Days since the data was last verified, or null if unknown.
  function dataAge(data, now) {
    return data.verified ? Math.floor((now - Date.parse(data.verified)) / DAY) : null;
  }

  // opts.headingTag: element used for the card title ("div" in the widget, "h2" on the site).
  // opts.href(g): if given, the card title links there.
  function card(g, now, opts) {
    opts = opts || {};
    g = view(g, now);
    const h = opts.headingTag || "div";
    const start = parseT(g.start);
    const end = endOf(g);
    let status, big, sub;

    if (now < start) {
      status = ["upcoming", "Upcoming"];
      big = span(start - now); sub = "until start";
    } else if (!end) {
      status = ["live", "Live"];
      big = Math.floor((now - start) / DAY) + "d"; sub = "in, no end date";
    } else if (now < end.t) {
      status = ["live", "Live"];
      const days = Math.ceil((end.t - now) / DAY);
      big = (end.est ? "~" : "") + (days > 1 ? days : span(end.t - now));
      sub = days > 1 ? "days left" : "left";
    } else if (end.est) {
      status = ["overdue", "Ending?"];
      big = Math.floor((now - start) / DAY) + "d"; sub = "in, past estimate";
    } else {
      status = ["ended", "Ended"];
      big = span(now - end.t); sub = "since end";
    }

    const pct = end && now >= start ? Math.min(100, (now - start) / (end.t - start) * 100) : 0;
    const endLabel = !end ? "TBA"
      : end.est ? `<em title="Estimate, not announced">~${fmtDate.format(end.t)}</em>`
      : fmtDay(g.end);
    const dayN = now >= start ? `Day ${Math.floor((now - start) / DAY) + 1}` : "";

    const events = (g.events || []).filter(e => parseT(e.end) > now).map(e => {
      const s = parseT(e.start), en = parseT(e.end);
      const when = now < s ? `starts in ${span(s - now)} · ${fmtDateTime.format(s)}`
        : `live · ends in ${span(en - now)}`;
      return `<div class="event"><b>${esc(e.label)}</b> — ${when}</div>`;
    }).join("");
    // Only announced seasons are in the data, so a next season's start is official.
    const next = g.next && parseT(g.next.start) > now
      ? `<div class="event"><b>Season ${esc(g.next.season)}</b> — starts ${fmtDay(g.next.start)}</div>` : "";

    const title = g.name || (g.prefix ? `${g.prefix} ${g.season}` : `Season ${g.season}`);
    const name = opts.href ? `<a href="${esc(opts.href(g))}">${esc(title)}</a>` : esc(title);

    return `
    <article class="card" id="${esc(g.id)}" data-game="${esc(g.id)}" style="--accent:${esc(g.accent)}">
      <div class="top">
        <span class="tag">${esc(g.tag)}</span>
        <span class="badge ${status[0]}">${status[1]}</span>
      </div>
      <div class="title">
        <${h} class="heading">
          <span class="name">${name}</span>
          <span class="num">${esc(g.game)} · Season ${esc(g.season)}</span>
        </${h}>
        <div class="count"><b${end && end.est && now < end.t ? ' class="est" title="Estimate, not announced"' : ""}>${big}</b><span>${sub}</span></div>
      </div>
      <div class="bar ${end && end.est ? "est" : ""}"><i style="width:${pct.toFixed(1)}%"></i></div>
      <div class="dates">
        <span>${fmtDay(g.start)}</span>
        <span>${dayN}</span>
        <span>${endLabel}</span>
      </div>
      ${events}${next}
      ${g.note || g.link ? `<div class="note">${esc(g.note || "")} ${g.link ? `<a href="${esc(g.link)}" target="_blank" rel="noopener">news ↗</a>` : ""}</div>` : ""}
    </article>`;
  }

  function renderCards(el, data, now, opts) {
    el.innerHTML = (data.games || []).map(g => card(g, now, opts)).join("");
  }

  window.Seasons = {
    DAY, fmtDate, fmtDateTime, fmtClock, isDateOnly, parseT, fmtDay, lengthDays, median, typicalDays,
    view, endOf, span, esc, hostOf, dataAge, card, renderCards,
  };
})();
