import { tasks } from '../../data.js';

const board = document.querySelector('.board');

const lists = {
  todo: document.querySelector('.column__list--todo'),
  inprogress: document.querySelector('.column__list--inprogress'),
  completed: document.querySelector('.column__list--completed')
};

function createCardElement(task) {
  const li = document.createElement('li');
  li.className = 'column__card';
  li.dataset.id = task.id;
  li.draggable = true;

  const cardContent = document.createElement('div');
  cardContent.className = 'card__content';

  const cardTitle = document.createElement('h3');
  cardTitle.className = 'card__title';
  cardTitle.textContent = task.title;

  const cardDescription = document.createElement('p');
  cardDescription.className = 'card__description';
  cardDescription.textContent = task.description;

  cardContent.appendChild(cardTitle);
  cardContent.appendChild(cardDescription);

  const cardInfo = document.createElement('div');
  cardInfo.className = 'card__info';

  const cardDate = document.createElement('span');
  cardDate.className = 'card__date';
  cardDate.textContent = task.date;

  const iconFlag = document.createElement('i');
  iconFlag.className = 'fa-regular fa-flag';

  const cardButton = document.createElement('button');
  if (task.status === 'completed') {
    cardButton.disabled = true;
    cardButton.textContent = 'Concluído ';
    cardButton.className = 'btn-concluido';
    const iconCheck = document.createElement('i');
    iconCheck.className = 'fa-solid fa-check';
    cardButton.appendChild(iconCheck);
  } else {
    cardButton.textContent = task.status === 'inprogress' ? 'Concluir ' : 'Avançar ';
    cardButton.className = 'btn-concluir';
    const iconArrow = document.createElement('i');
    iconArrow.className = 'fa-solid fa-arrow-right';
    cardButton.appendChild(iconArrow);
  }

  cardDate.prepend(iconFlag);
  cardInfo.appendChild(cardDate);
  cardInfo.appendChild(cardButton);

  li.appendChild(cardContent);
  li.appendChild(cardInfo);

  return li;
}

function renderBoard(tasks) {
  Object.values(lists).forEach(list => (list.innerHTML = ''));

  const fragments = {
    todo: document.createDocumentFragment(),
    inprogress: document.createDocumentFragment(),
    completed: document.createDocumentFragment()
  };

  tasks.forEach(task => {
    const targetFragment = fragments[task.status];
    if (targetFragment) {
      const cardElement = createCardElement(task);
      targetFragment.appendChild(cardElement);
    }
  });

  Object.keys(lists).forEach(status => {
    if (lists[status] && fragments[status]) {
      lists[status].appendChild(fragments[status]);
    }
  });
}

board.addEventListener('dragstart', event => {
  const draggedCard = event.target.closest('.column__card');

  if (draggedCard) {
    draggedCard.classList.add('is-dragging');

    const cardId = draggedCard.dataset.id;
    event.dataTransfer.setData('text/plain', cardId);
  }
});

board.addEventListener('dragend', event => {
  const draggedCard = event.target.closest('.column__card');
  if (draggedCard) {
    draggedCard.classList.remove('is-dragging');
  }
});

board.addEventListener('dragenter', event => {
  const targetList = event.target.closest('.column__list');
  if (targetList) {
    targetList.classList.add('column__list--dropzone');
  }
});

board.addEventListener('dragleave', event => {
  const targetList = event.target.closest('.column__list');
  if (targetList && event.target === targetList) {
    targetList.classList.remove('column__list--dropzone');
  }
});

board.addEventListener('dragover', event => {
  const isOverList = event.target.closest('.column__list');
  if (isOverList) {
    event.preventDefault();
  }
});

board.addEventListener('drop', event => {
  event.preventDefault();

  const targetList = event.target.closest('.column__list');

  if (targetList) {
    targetList.classList.remove('column__list--dropzone');

    const cardId = event.dataTransfer.getData('text/plain');

    let newStatus = '';
    if (targetList.classList.contains('column__list--todo')) {
      newStatus = 'todo';
    } else if (targetList.classList.contains('column__list--inprogress')) {
      newStatus = 'inprogress';
    } else if (targetList.classList.contains('column__list--completed')) {
      newStatus = 'completed';
    }

    const clickedTask = tasks.find(task => task.id === cardId);

    if (clickedTask) {
      clickedTask.status = newStatus;
      renderBoard(tasks);
    }
  }
});

renderBoard(tasks);
