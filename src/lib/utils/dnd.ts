// Drag & Drop utilities shared across board/grid components
// - getInsertionIndex: determine the insertion index inside a vertical list based on mouse Y position
//   It prefers explicit draggable items, and falls back to container children if needed.

export function getInsertionIndex(container: HTMLElement, clientY: number) {
  const preferred = container.querySelectorAll(
    '[data-draggable-item="true"], [data-js-item], [draggable="true"]',
  );
  const list: HTMLElement[] = (
    preferred.length ? Array.from(preferred) : Array.from(container.children)
  ) as HTMLElement[];

  // Excluir cualquier elemento marcado como oculto durante el drag
  const visibleList = list.filter(
    (el) => el.getAttribute("data-drag-hidden") !== "true",
  );

  if (!visibleList.length) return 0;

  let closest = { offset: Number.NEGATIVE_INFINITY, index: visibleList.length };
  visibleList.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    const offset = clientY - (rect.top + rect.height / 2);
    if (offset < 0 && offset > closest.offset) {
      closest = { offset, index };
    }
  });

  return closest.offset === Number.NEGATIVE_INFINITY
    ? visibleList.length
    : closest.index;
}
