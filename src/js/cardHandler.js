const close = document.createElement('a');
close.href = '#';
close.textContent = '-';
close.className = 'card__close';

export default function cardHandler(e) {
  if (e.type === 'mouseenter') {
    e.target.appendChild(close);
  } else if (e.type === 'mouseleave') {
    close.remove();
  }
}

export { close };
