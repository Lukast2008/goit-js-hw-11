import axios from 'axios';

const BASE_URl = 'https://pixabay.com/api/';

const KEY_APi = '14585598-21e1bf9412731d0128a8b3ac3';

export async function getData(searchItems, per_page, pages) {
  const response = await axios.get(
    `${BASE_URl}?key=${KEY_APi}&q=${searchItems}&mage_type=photo&orientation=horizontal&safesearch=true&per_page=${per_page}&page=${pages}`
  );
  return response.data;
}
