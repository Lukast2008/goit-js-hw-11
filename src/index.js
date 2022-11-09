import { getData } from './api';

import { fillListImage } from './markup/markup';

searchImages = document.querySelector('form');
markupPlease = document.querySelector('.gallery');
updateData = document.querySelector('.load-more');

let pages = 1;
const per_page = 100;
let searchItems = null;

function paramsQuery(event) {
  event.preventDefault();

  searchItems = event.target.elements['searchQuery'].value;

  getData(searchItems, per_page, pages).then(data => {
    const markup = fillListImage(data.hits);

    markupPlease.innerHTML = markup;
  });
  updateData.classList.remove('is-hidden');
}

function addItemImg() {
  pages = pages + 1;

  if (getData.pages === getData.totalHits) {
    updateData.classList.add('is-hidden');
  }

  getData(searchItems, per_page, pages).then(data => {
    markupPlease.innerHTML += fillListImage(data.hits);
  });
}

searchImages.addEventListener('submit', paramsQuery);
updateData.addEventListener('click', addItemImg);
