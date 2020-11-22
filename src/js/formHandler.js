import cardHandler from './cardHandler';

function distributorFromStorage(typeColumn, value) {
  let storage = localStorage.getItem(typeColumn);
  if (storage) {
    storage += `,${value}`;
    localStorage.setItem(typeColumn, `${storage}`);
  } else {
    localStorage.setItem(typeColumn, `${value}`);
  }
}

function addFromStorage(column, value) {
  if (column.classList.contains('todo-column')) {
    distributorFromStorage('todo', value);
  } else if (column.classList.contains('in-rogress-column')) {
    distributorFromStorage('in-progress', value);
  } else {
    distributorFromStorage('done', value);
  }
}

export default function formHandler(e) {
  e.preventDefault();

  const isValid = e.currentTarget.checkValidity();
  if (!isValid) {
    const first = [...e.currentTarget.elements].find((o) => !o.validity.valid);
    first.focus();
    const error = document.createElement('div');
    error.className = 'form-error';
    error.textContent = 'Ведите значение';
    first.closest('.form-row').appendChild(error);
    error.style.top = `${first.offsetTop + first.offsetHeight / 2 - error.offsetHeight / 2}px`;
    error.style.left = `${first.offsetLeft + first.offsetWidth + 5}px`;
    first.addEventListener('blur', () => {
      error.remove();
    });
  } else {
    const { value } = [...e.currentTarget.elements][0];
    const card = document.createElement('div');
    card.className = 'card';
    card.textContent = value;
    card.addEventListener('mouseenter', cardHandler);
    card.addEventListener('mouseleave', cardHandler);

    addFromStorage(e.currentTarget.closest('.trello__column'), value);

    e.currentTarget.closest('.trello__column').querySelector('.cards').appendChild(card);
    e.currentTarget.remove(e.currentTarget.closest('.cards'));
  }
}
