import '../css/common.css';
import {refs} from './refs';
import {onAddBtnClick, handleListClick, randerElementsWhenRestart} from './functions';

randerElementsWhenRestart();
refs.addBtn.addEventListener('click', onAddBtnClick);
refs.list.addEventListener('click', handleListClick);


