import Notiflix from 'notiflix';

import { getData } from './api';

import { fillListImage } from './markup/markup';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a');

searchImages = document.querySelector('form');
markupPlease = document.querySelector('.gallery');
updateData = document.querySelector('.load-more');

let pages = 1;
const per_page = 40;
let searchItems = null;

async function paramsQuery(event) {
  event.preventDefault();

  searchItems = event.target.elements['searchQuery'].value;
  try {
    const data = await getData(searchItems, per_page, pages);

    const markup = fillListImage(data.hits);

    markupPlease.innerHTML = markup;

    lightbox.refresh();
    if (!data.totalHits) {
      Notiflix.Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }
    Notiflix.Notify.info(`"Hooray! We found ${data.totalHits} images."`);
    updateData.classList.remove('is-hidden');
  } catch (error) {
    console.log(error);
  }
}

async function addItemImg() {
  try {
    pages += 1;
    const data = await getData(searchItems, per_page, pages);

    if (pages * per_page >= data.totalHits) {
      updateData.classList.add('is-hidden');
      Notiflix.Notify.info(
        `'We're sorry, but you've reached the end of search results.'`
      );
    }

    markupPlease.innerHTML += fillListImage(data.hits);
    lightbox.refresh();
  } catch (error) {
    console.log(error);
  }
}

searchImages.addEventListener('submit', paramsQuery);
updateData.addEventListener('click', addItemImg);
