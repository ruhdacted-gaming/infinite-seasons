// Runs on every site page: keeps the pre-rendered countdown cards live and shows dates in the reader's zone.
(function () {
  const S = window.Seasons, data = window.SEASON_DATA;

  function render() {
    const now = Date.now();
    document.querySelectorAll("[data-cards]").forEach(el => {
      const ids = el.dataset.cards.split(","), tpl = el.dataset.href;
      const href = tpl ? g => tpl.replace("{id}", g.id).replace("{n}", g.season) : null;
      el.innerHTML = data.games.filter(g => ids.includes(g.id)).map(g => S.card(g, now, { headingTag: "h2", href })).join("");
    });
    const checked = document.getElementById("checked");
    if (checked && S.dataAge(data, now) > 30) {
      checked.hidden = false;
      checked.textContent = `Data last checked ${S.fmtDay(data.verified)}. Some dates may be out of date.`;
    }
  }

  // Exact times were rendered in Pacific time at build; re-format them in the reader's zone.
  document.querySelectorAll("time[data-local]").forEach(t => { t.textContent = S.fmtDate.format(S.parseT(t.dateTime)); });

  render();
  setInterval(render, 30000);
})();
