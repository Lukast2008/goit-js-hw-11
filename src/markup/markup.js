export function markupForm() {
  return `<form class="search-form" id="search-form">
    <input type="text" name="searchQuery" autocomplete="off" placeholder="Search images..." />
    <button type="submit">Search</button>
  </form>`;
} //%%%% //%%%%%%%%%%%%

export function fillListImage(data) {
  return data
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                  <div class="info">
                    <p class="info-item">
                      <b>Likes</b>${likes}
                    </p>
                    <p class="info-item">
                      <b>Views</b>${views}
                    </p>
                    <p class="info-item">
                      <b>Comments</b>${comments}
                    </p>
                    <p class="info-item">
                      <b>Downloads</b>${downloads}
                    </p>
    </div>
  </div>`;
      }
    )
    .join('');
}
