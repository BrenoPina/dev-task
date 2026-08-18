const btnOpenModal = document.querySelector('#btn-open-modal');
const btnCancel = document.querySelector('#btn-cancel');
const btnClose = document.querySelector('#btn-close');
const modal = document.querySelector('#modal');

export function closeModal() {
  modal.close();
}

export function openModal() {
  modal.showModal();
}

btnOpenModal.addEventListener('click', openModal);
btnCancel.addEventListener('click', closeModal);
btnClose.addEventListener('click', closeModal);
modal.addEventListener('click', event => {
  if (event.target === modal) {
    closeModal();
  }
});
