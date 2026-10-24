// Shared season rendering for the desktop widget (widget.html) and the site (site/index.html).
// Reads window.SEASON_DATA (seasons.js) and exposes helpers on window.Seasons.
// Keep the data accuracy rules: estimates always carry "~" and the .est / <em> styling.
(function () {
  const DAY = 86400000;
  const fmtDate = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", year: "numeric" });
  const fmtDateTime = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });
  const fmtClock = new Intl.DateTimeFormat(undefined, { weekday: "short", month: "short", day: "numeric", hour: "numeric", minute: "2-digit" });

  // Official end wins. Otherwise endEstimate, otherwise start + typicalDays; both are estimates.
  function endOf(g) {
    if (g.end) return { t: Date.parse(g.end), est: false };
    if (g.endEstimate) return { t: Date.parse(g.endEstimate), est: true };
    if (g.typicalDays) return { t: Date.parse(g.start) + g.typicalDays * DAY, est: true };
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
  function card(g, now, opts) {
    opts = opts || {};
    const h = opts.headingTag || "div";
    const start = Date.parse(g.start);
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
      : fmtDate.format(end.t);
    const dayN = now >= start ? `Day ${Math.floor((now - start) / DAY) + 1}` : "";

    const events = (g.events || []).filter(e => Date.parse(e.end) > now).map(e => {
      const s = Date.parse(e.start), en = Date.parse(e.end);
      const when = now < s ? `starts in ${span(s - now)} · ${fmtDateTime.format(s)}`
        : `live · ends in ${span(en - now)}`;
      return `<div class="event"><b>${esc(e.label)}</b> — ${when}</div>`;
    }).join("");

    return `
    <article class="card" id="${esc(g.id)}" style="--accent:${esc(g.accent)}">
      <div class="top">
        <span class="tag">${esc(g.tag)}</span>
        <span class="badge ${status[0]}">${status[1]}</span>
      </div>
      <div class="title">
        <${h} class="heading">
          <span class="name">${esc(g.name)}</span>
          <span class="num">${esc(g.game)} · Season ${esc(g.season)}</span>
        </${h}>
        <div class="count"><b${end && end.est && now < end.t ? ' class="est" title="Estimate, not announced"' : ""}>${big}</b><span>${sub}</span></div>
      </div>
      <div class="bar ${end && end.est ? "est" : ""}"><i style="width:${pct.toFixed(1)}%"></i></div>
      <div class="dates">
        <span>${fmtDate.format(start)}</span>
        <span>${dayN}</span>
        <span>${endLabel}</span>
      </div>
      ${events}
      ${g.note || g.link ? `<div class="note">${esc(g.note || "")} ${g.link ? `<a href="${esc(g.link)}" target="_blank" rel="noopener">news ↗</a>` : ""}</div>` : ""}
    </article>`;
  }

  function renderCards(el, data, now, opts) {
    el.innerHTML = (data.games || []).map(g => card(g, now, opts)).join("");
  }

  window.Seasons = { DAY, fmtDate, fmtDateTime, fmtClock, endOf, span, esc, hostOf, dataAge, card, renderCards };
})();
