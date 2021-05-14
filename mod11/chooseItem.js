let itemsList = document.querySelector('.items-list');
import {clearSearchResList} from './script01.js'
// opened menu handling
let openButton = document.querySelector('.menu-link');
openButton.addEventListener('click', openButtonHendler);
function openButtonHendler() {
  itemsList.classList.add('items-list-opened');
}

let seachList = ['персонажа','корабля','планеты'];
let items = ['people/', 'starships/', 'planets/'];
let api = "https://swapi.dev/api/";
export let numOfItem = 0;
export let url = api + items[numOfItem];
// choosing item
document.querySelector('.items-list').addEventListener('click', chooseItem);
function chooseItem(event) {
  itemsList.classList.remove('items-list-opened');
  let chosenItemStr = event.target.textContent;
  numOfItem = seachList.indexOf(chosenItemStr, 0); 
  url = api + items[numOfItem];
  //console.log(url);
  chosenItemStr += ':';
  //console.log(chosenItemStr);
  let searchLabel = document.querySelector('.search-label').textContent;
  searchLabel = searchLabel.split(' ');
  searchLabel[1] = chosenItemStr;
  searchLabel = searchLabel.join(' ');
  document.querySelector('.search-label').textContent = searchLabel;
  chooseParametersList();
  clearSearchResList();
  clearHTMLparameters();
}

function chooseParametersList() {
  let parametersList = [['Имя','Рост','Вес','Год рождения','В скольких фильмах появлялся'],
                        ['Название','Класс','Стоимость','Экипаж','Грузовая вместимость'],
                        ['Название','Гравитация','Население','Ландшафт','Климат']];
  for (let i = 1; i < 6; ++i) {
    let id = '#k0' + i;
    document.querySelector(id).textContent = parametersList[numOfItem][i - 1] + ':';
  }
}

function clearHTMLparameters() {
  document.querySelectorAll('.parameter-value').forEach(item => item.textContent = '');
}