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
        return `<a class="gallery-item" href="${largeImageURL}">
                  <div class="photo-card">
                  
                    <img class="photo" src="${webformatURL}" alt="${tags}" loading="lazy" />
                 
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
                 
                  </div>
                </a>`;
      }
    )
    .join('');
}
