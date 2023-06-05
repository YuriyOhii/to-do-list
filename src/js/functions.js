import { refs } from "./refs";

function onAddBtnClick() {
  createTaskEl(refs.input.value);
}

function handleListClick(e) {}

function createTaskEl(text, isDone = false) {
  if (text.trim() === "") {
    alert("Task name should contains at least one character");
    return;
  }
  const taskEl = document.createElement('li');
  taskEl.textContent = text;
  if(isDone) taskEl.classList.add('checked');
  refs.list.appendChild(taskEl);

}

export { onAddBtnClick, handleListClick };
