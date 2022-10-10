import {url} from './chooseItem.js';
import {numOfItem} from './chooseItem.js';
let searchButton = document.querySelector('#search_request_btn');
let searchResult = document.querySelector('.search_result');
let searchCount;
let elIdNum;
let mapOfParameters = [];
searchButton.addEventListener('click', searching);

function searching() {
  mapOfParameters.length = 0;
  elIdNum = 0;
  searchCount = 0;
  clearSearchResList();
  request(url)
}

function request(url) {
  fetch(url)
    .then(response => response.json())
    .then(function(obj){
      chooseObject(obj.results)
      // console.log(obj)
      // console.log(obj.next)
      return obj.next ? request(obj.next) : (!searchCount ? alert('nothing was found') : console.log(searchCount + ' objects is found'))
    })
    .catch(err => console.log(err))
}

function chooseObject(arr) {
  let searchingInput = document.querySelector('#person_search_input').value;
  let substr = new RegExp(searchingInput,'i');
  let rez = arr.filter(item => substr.test(item.name));
  //console.log(rez);
  //console.log('rez.len' + rez.length);
  searchCount += rez.length;
  //console.log('elem num' + searchCount)
  rez.forEach(element => {
    let searchResultItem = document.createElement('li');
    searchResultItem.innerHTML = element.name;
    searchResultItem.id = elIdNum++ + 'obj';
    searchResult.append(searchResultItem);
    searchResultItem.classList.add('search_res_item');
    //console.log(element);
    let parametersOfElement = [];
    if (numOfItem === 0) {
      parametersOfElement.push(element.name);
      parametersOfElement.push(element.height);
      parametersOfElement.push(element.mass);
      parametersOfElement.push(element.birth_year);
      parametersOfElement.push(element.films.length);
    } else if (numOfItem === 1) {
      parametersOfElement.push(element.name);
      parametersOfElement.push(element.starship_class);
      parametersOfElement.push(element.cost_in_credits);
      parametersOfElement.push(element.crew);
      parametersOfElement.push(element.cargo_capacity);
    } else if (numOfItem === 2) {
      parametersOfElement.push(element.name);
      parametersOfElement.push(element.gravity);
      parametersOfElement.push(element.population);
      parametersOfElement.push(element.terrain);
      parametersOfElement.push(element.climate);
    }
    //console.log(parametersOfElement);
    mapOfParameters.push(parametersOfElement);
    searchResultItem.addEventListener('click', displayParameters);
  }); 
}

export function clearSearchResList() {
  let searchResultItems = document.querySelectorAll('.search_res_item');
  searchResultItems.forEach(item => searchResult.removeChild(item));
}

function displayParameters(event) {
  let numOfObj = parseInt(event.target.id);
  //console.log (numOfObj);
  for (let i = 0; i < 5; ++i) {
    let paramsId = 'v0' + (i + 1);
    document.querySelector('#' + paramsId).textContent = mapOfParameters[numOfObj][i];
  } 
}
