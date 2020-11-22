import formHandler from './formHandler';

export default function addCard(e) {
  e.preventDefault();
  const form = document.createElement('form');
  form.className = 'form';
  form.setAttribute('novalidate', 'novalidate');
  form.innerHTML = `<div class="form-row">
                        <input type="text" placeholder="Enter a titl for this card..." class="card-input" required>
                      </div>
                      <div class="form-row">
                        <button class="btn">add card</button>
                        <a href="#" class='delete-btn'>х</a>
                      </div>`;

  form.addEventListener('submit', formHandler);
  form.querySelector('.delete-btn').addEventListener('click', (event) => {
    event.preventDefault();
    event.currentTarget.closest('.form').remove();
  });
  const parent = e.target.closest('.trello__column').querySelector('.cards');
  parent.insertAdjacentElement('afterend', form);
}
