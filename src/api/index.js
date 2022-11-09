import axios from 'axios';

const BASE_URl = 'https://pixabay.com/api/';

const KEY_APi = '14585598-21e1bf9412731d0128a8b3ac3';

export function getData(searchItems, per_page, pages) {
  return axios
    .get(
      `${BASE_URl}?key=${KEY_APi}&q=${searchItems}&mage_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${pages}`
    )
    .then(response => {
      return response.data;
    });
}
