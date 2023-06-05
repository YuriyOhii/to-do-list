function saveToLocalStorage(keyName, value) {
    try {
        const dataToSave = JSON.stringify(value);
        localStorage.setItem(keyName,dataToSave)
    } catch(e) {
        console.log(e.message)
    }
};

function loadFromLocalStorage(keyName) {
    try {
        const loadedData = localStorage.getItem(keyName);
        return loadedData === null ? undefined : JSON.parse(loadedData);
    } catch (e) {
        console.log(e.message);
    }
};

export {saveToLocalStorage, loadFromLocalStorage}