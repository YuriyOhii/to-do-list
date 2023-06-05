import { refs } from "./refs";
import { saveToLocalStorage, loadFromLocalStorage } from "./storage";

let currentId = 0;
const STORAGE_KEY = "tasks_to_do";

function onAddBtnClick() {
  const text = refs.input.value;
  createTaskEl({ text });
  addTaskToLocalStorage({ text });
}

function handleListClick({ target }) {
  if (target.nodeName === "LI") target.classList.toggle("checked");
  else target.parentNode.remove();
}

function addTaskToLocalStorage({ text, isDone = false, id = currentId }) {
  let currentSavedData = loadFromLocalStorage(STORAGE_KEY);
  if (currentSavedData === undefined)
    currentSavedData = [{ text, isDone, id }];
  else currentSavedData.push({ text, isDone, id });
  saveToLocalStorage(STORAGE_KEY, currentSavedData);
  console.log(currentSavedData);
  currentId += 1;
}

function createTaskEl({ text, isDone = false, id = currentId }) {
  const resetInput = () => (refs.input.value = "");
  if (text.trim() === "") {
    resetInput();
    alert("Task name should contains at least one character");
    return;
  }
  const taskEl = document.createElement("li");
  taskEl.textContent = text;
  if (isDone) taskEl.classList.add("checked");
  taskEl.dataset.id = currentId;
  addCloseButton(taskEl);
  refs.list.appendChild(taskEl);
  resetInput();
}

function addCloseButton(target) {
  const span = document.createElement("span");
  const txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  target.appendChild(span);
}

export { onAddBtnClick, handleListClick };
