import Notiflix from 'notiflix';

import { getData } from './api';

import { fillListImage } from './markup/markup';

import SimpleLightbox from 'simplelightbox';

import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox = new SimpleLightbox('.gallery a');

const searchImages = document.querySelector('form');
const markupPlease = document.querySelector('.gallery');
const updateData = document.querySelector('.load-more');

let pages = 1;
const per_page = 40;
let searchItems = null;

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 1,
};

const observer = new IntersectionObserver((entries, observe) => {
  entries.forEach(async entry => {
    if (entry.isIntersecting) {
      pages += 1;
      if (!searchItems) {
        return;
      }
      try {
        const data = await getData(searchItems, per_page, pages);

        if (pages * per_page >= data.totalHits) {
          observer.unobserve(updateData);
        }
        markupPlease.innerHTML += fillListImage(data.hits);

        lightbox.refresh();
      } catch (error) {
        console.log(error);
      }
    }
  });
}, options);

observer.observe(updateData);

async function paramsQuery(event) {
  event.preventDefault();

  searchItems = event.target.elements['searchQuery'].value;
  try {
    if (!searchItems) {
      return;
    }
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

    updateData.classList.remove('is-hidden');

    Notiflix.Notify.info(`"Hooray! We found ${data.totalHits} images."`);
  } catch (error) {
    console.log(error);
  }
}

searchImages.addEventListener('submit', paramsQuery);
