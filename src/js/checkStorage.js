import cardHandler from './cardHandler';

function getValueFromStorage(typeItem, typeColumn) {
  const array = localStorage[typeItem].split(',');
  array.forEach((storageCard) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = storageCard;
    card.addEventListener('mouseenter', cardHandler);
    card.addEventListener('mouseleave', cardHandler);
    document.querySelector(`.${typeColumn} .cards`).appendChild(card);
  });
}

export default function checkStorage() {
  if (localStorage.length !== 1) {
    if (localStorage.todo) {
      getValueFromStorage('todo', 'todo-column');
    }
    if (localStorage['in-progress']) {
      getValueFromStorage('in-progress', 'in-rogress-column');
    }
    if (localStorage.done) {
      getValueFromStorage('done', 'done-column');
    }
  }
}
