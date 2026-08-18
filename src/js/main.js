import { saveTasks, loadTasks } from './storage.js';
import { renderBoard } from './ui.js';
import { openModal, closeModal } from './modal.js';

let tasks = loadTasks();

const board = document.querySelector('.board');
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
      saveTasks(tasks);
      renderBoard(tasks);
    }
  }
});

board.addEventListener('click', event => {
  const advancedButton = event.target.closest('.btn-concluir');
  const deleteButton = event.target.closest('.btn-deletar');

  if (!advancedButton && !deleteButton) return;

  if (deleteButton) {
    const currentCard = deleteButton.closest('.column__card');
    const currentCardId = currentCard.dataset.id;
    tasks = tasks.filter(task => task.id !== currentCardId);
    saveTasks(tasks);
    renderBoard(tasks);
    return;
  }

  if (advancedButton) {
    const currentCard = advancedButton.closest('.column__card');
    const currentCardId = currentCard.dataset.id;
    const currentTask = tasks.find(task => task.id === currentCardId);

    if (currentTask) {
      if (currentTask.status === 'todo') {
        currentTask.status = 'inprogress';
      } else if (currentTask.status === 'inprogress') {
        currentTask.status = 'completed';
      }
    }
  }
  saveTasks(tasks);
  renderBoard(tasks);
});

const form = document.querySelector('#form');
const titleTask = document.querySelector('#task-name');
const descriptionTask = document.querySelector('#task-description');
const btnAddTask = document.querySelector('#btn-add-task');

const formReset = () => {
  form.reset();
  btnAddTask.disabled = true;
  closeModal();
};

form.addEventListener('submit', event => {
  event.preventDefault();
  const titleValue = titleTask.value.trim();
  const descriptionValue = descriptionTask.value.trim();

  if (titleValue) {
    const newTask = {
      id: new Date().getTime().toString(),
      title: titleValue,
      description: descriptionValue,
      date: new Date().toLocaleDateString('pt-BR'),
      status: 'todo'
    };

    tasks.push(newTask);
    saveTasks(tasks);
    renderBoard(tasks);
    formReset();
  }
});

titleTask.addEventListener('input', () => {
  btnAddTask.disabled = titleTask.value.trim() ? false : true;
});

renderBoard(tasks);
