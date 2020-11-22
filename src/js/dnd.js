function editStorage() {
  localStorage.setItem('todo', [...Array.from(document.querySelectorAll('.todo-column .card'))].map((element) => {
    const value = element.textContent;
    if (value[value.length - 1] === '-') {
      return value.slice(0, value.length - 1);
    }
    return value;
  }));
  localStorage.setItem('in-progress', [...Array.from(document.querySelectorAll('.in-rogress-column .card'))].map((element) => {
    const value = element.textContent;
    if (value[value.length - 1] === '-') {
      return value.slice(0, value.length - 1);
    }
    return value;
  }));
  localStorage.setItem('done', [...Array.from(document.querySelectorAll('.done-column .card'))].map((element) => {
    const value = element.textContent;
    if (value[value.length - 1] === '-') {
      return value.slice(0, value.length - 1);
    }
    return value;
  }));
}

const ghostCard = document.createElement('div');
ghostCard.className = 'ghost-card';

export default function dnd() {
  let draggedEl = null;
  let ghostEl = null;
  const items = Array.from(document.querySelectorAll('.cards'));
  items.forEach((itemsEl) => {
    itemsEl.addEventListener('mousedown', (evt) => {
      evt.preventDefault();
      if (!evt.target.classList.contains('card')) {
        return;
      }
      document.body.style.cursor = 'grabbing';
      draggedEl = evt.target;
      ghostEl = evt.target.cloneNode(true);
      ghostEl.classList.add('dragged');
      document.body.appendChild(ghostEl);
      ghostEl.style.left = `${evt.pageX - ghostEl.offsetWidth / 2}px`;
      ghostEl.style.top = `${evt.pageY - ghostEl.offsetHeight / 2}px`;
      draggedEl.style.display = 'none';
    });

    itemsEl.addEventListener('mousemove', (evt) => {
      evt.preventDefault(); // не даём выделять элементы
      if (!draggedEl) {
        return;
      }
      ghostEl.style.left = `${evt.pageX - ghostEl.offsetWidth / 2}px`;
      ghostEl.style.top = `${evt.pageY - ghostEl.offsetHeight / 2}px`;

      const closest = document.elementFromPoint(evt.clientX, evt.clientY);

      if (closest.classList.contains('card') && draggedEl) {
        ghostCard.style.height = `${ghostEl.offsetHeight}px`;
        evt.currentTarget.insertBefore(ghostCard, closest);
      }
    });

    itemsEl.closest('.trello').addEventListener('mouseleave', () => {
      // при уходе курсора за границы контейнера - отменяем перенос
      if (!draggedEl) {
        return;
      }
      draggedEl.style.display = 'flex';
      ghostCard.remove();
      document.body.removeChild(ghostEl);
      ghostEl = null;
      draggedEl = null;
    });

    itemsEl.addEventListener('mouseup', (evt) => {
      if (!draggedEl) {
        return;
      }
      const closest = document.elementFromPoint(evt.clientX, evt.clientY);
      if (closest.classList.contains('ghost-card')) {
        evt.currentTarget.insertBefore(draggedEl, closest);
        document.body.style.cursor = 'auto';
        draggedEl.style.display = 'flex';
        document.body.removeChild(ghostEl);
        ghostCard.remove();
        ghostEl = null;
        draggedEl = null;
        editStorage();
      } else {
        document.body.style.cursor = 'auto';
        document.body.removeChild(ghostEl);
        ghostCard.remove();
        draggedEl.style.display = 'flex';
        ghostEl = null;
        draggedEl = null;
      }
    });
  });
}
