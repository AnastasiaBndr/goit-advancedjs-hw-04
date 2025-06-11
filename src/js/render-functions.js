export function renderFunction(posts) {
    const markup = posts.map(({ comments, downloads, likes,tags,
        largeImageURL, previewURL, views }) => {

        return `<li class="gallery-item">
                    <a class="gallery-link" href="${largeImageURL}">
                    <img
                        class="gallery-image"
                        src="${previewURL}"
                        alt="${tags}"
                        />
                    </a>
                    <div class="image-descriptions-container">
                        <div class="small-descriptions-container">
                            <p>Likes</p>
                            <p>${likes}</p>
                        </div>
                        <div class="small-descriptions-container">
                            <p>Views</p>
                            <p>${views}</p>
                        </div>
                        <div class="small-descriptions-container">
                            <p>Comments</p>
                            <p>${comments}</p>
                        </div>
                        <div class="small-descriptions-container">
                            <p>Downloads</p>
                            <p>${downloads}</p>
                        </div>
                    </div>
                    </li>
    `
    })

    return markup.join("");

}

