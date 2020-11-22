function deleteFromStorage(e, storageValue) {
  const value = e.target.closest('.card').textContent;
  const newValue = value.slice(0, value.length - 1);
  return storageValue.split(',').filter((text) => (text !== newValue));
}

export default function closeHandler(e) {
  e.preventDefault();
  const classListColumn = [...e.target.closest('.trello__column').classList];
  classListColumn.forEach((column) => {
    if (column === 'todo-column') {
      const storageValue = localStorage.getItem('todo');
      localStorage.setItem('todo', `${[...deleteFromStorage(e, storageValue)]}`);
    } else if (column === 'done-column') {
      const storageValue = localStorage.getItem('done');
      localStorage.setItem('done', `${[...deleteFromStorage(e, storageValue)]}`);
    } else {
      const storageValue = localStorage.getItem('in-progress');
      localStorage.setItem('in-progress', `${[...deleteFromStorage(e, storageValue)]}`);
    }
  });
  e.target.closest('.card').remove();
}
