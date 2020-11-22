import closeHandler from './closeHandler';
import { close } from './cardHandler';
import addCard from './addCard';
import CheckStorage from './checkStorage';

import dnd from './dnd';

CheckStorage();

close.addEventListener('click', closeHandler);

const addCardBtns = Array.from(document.querySelectorAll('.column__foter a'));

addCardBtns.forEach((btn) => {
  btn.addEventListener('click', addCard);
});

dnd();
