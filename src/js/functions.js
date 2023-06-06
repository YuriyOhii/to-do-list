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
  const currentSavedData = loadFromLocalStorage(STORAGE_KEY);

  if (target.nodeName === "LI") {
    target.classList.toggle("checked");
    const checkedTask = currentSavedData.find(
      taskObj => Number(target.dataset.id) === Number(taskObj.id)
    );
       checkedTask.isDone = !checkedTask.isDone;
  } else {
    target.parentNode.remove();
    const removeItemIndex = currentSavedData.findIndex(
      (taskObj) => Number(target.parentNode.dataset.id) === Number(taskObj.id)
    );
    currentSavedData.splice(removeItemIndex, 1);
  }

  saveToLocalStorage(STORAGE_KEY, currentSavedData);
}

function addTaskToLocalStorage({ text, isDone = false, id = currentId }) {
    if (text.trim() === "") return;
  let currentSavedData = loadFromLocalStorage(STORAGE_KEY);
  if (currentSavedData === undefined) currentSavedData = [{ text, isDone, id }];
  else currentSavedData.push({ text, isDone, id });
  saveToLocalStorage(STORAGE_KEY, currentSavedData);
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

function randerElementsWhenRestart() {
    const currentSavedData = loadFromLocalStorage(STORAGE_KEY);
        if (currentSavedData === undefined) return;
            currentSavedData.forEach(createTaskEl);
            currentId = currentSavedData[currentSavedData.length -1].id +1
}

export { onAddBtnClick, handleListClick, randerElementsWhenRestart };
