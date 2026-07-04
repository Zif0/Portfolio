// Desktop/Mobile toggle for project screenshots sharing one media slot.
export function initMediaSwitch() {
  document.querySelectorAll(".media-switch").forEach((switchEl) => {
    const mediaBlock = switchEl.closest(".proj__media");
    if (!mediaBlock) return;

    const buttons = [...switchEl.querySelectorAll(".media-switch__btn")];
    const panels = [...mediaBlock.querySelectorAll(".media-panel")];

    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const view = btn.dataset.view;
        buttons.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", String(active));
        });
        panels.forEach((p) => {
          const active = p.dataset.panel === view;
          p.classList.toggle("is-active", active);
          p.hidden = !active;
        });
      });
    });
  });
}
