import { pixabayApi } from "./js/pixabay-api";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { renderFunction } from "./js/render-functions";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const submitForm = document.querySelector('form');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('input[type="text"]');
const loader = document.querySelector('.loader');
const loadMoreButton = document.querySelector('.load-more-button');

const instancesOptions = {
    closeOnClick: true,
    position: "topRight",
    displayMode: 0,
    progressBar: false,
    backgroundColor: '#EF4040',
    messageColor: 'white',
    iconColor: 'white',
    maxWidth: '432px',
};

const { closeOnClick, position, displayMode, progressBar,
    backgroundColor, messageColor, iconColor, maxWidth,} = instancesOptions;

let lightbox;
let page;

const handleLoadMore = () => {
    page += 1;
    loader.classList.add('visible');
    fetchWithTimeout(page);

}

const handleSubmit = (e) => {
    e.preventDefault();
    page = 1;
    gallery.innerHTML = "";
    loader.classList.add('visible');
    fetchWithTimeout(page);

};

submitForm.addEventListener('submit', handleSubmit);
loadMoreButton.addEventListener('click', handleLoadMore);

function fetchWithTimeout(page) {
    if (lightbox) {
        lightbox.refresh();
    }
    loadMoreButton.classList.remove('visible');
    setTimeout(function () {
        pixabayApi(input.value, page).then(posts => {
            if (posts.hits.length === 0)
                throw new Error("Sorry, there are no images matching your search query. Please try again!");
            let top = 0;
            if (page > 1) {
                const rect = gallery.firstChild.getBoundingClientRect();
                top = rect.height * 2;
            }

            gallery.insertAdjacentHTML("beforeend", renderFunction(posts.hits));
            window.scrollBy({ top, behavior: "smooth" });
            lightbox = new SimpleLightbox('.gallery a', {
                captions: true,
                captionSelector: 'img',
                captionPosition: 'outside',
                captionDelay: 250,
                overlayOpacity: 0.8,
                styles: '../css/styles.css',
                captionsData: 'alt'
            }
            )
            if ((posts.total - posts.hits.length * page) > posts.hits.length) {
                loadMoreButton.classList.add('visible');
            } else {
                loadMoreButton.classList.remove('visible');
                iziToast.info({
                    message: "We're sorry, but you've reached the end of search results.", iconColor,
                    maxWidth, closeOnClick, position, displayMode, progressBar,
                })
            }
        }).catch((err) => iziToast.error({
            message: `${err.message ? err.message : err}`, closeOnClick: true, position,
            displayMode, progressBar, backgroundColor, messageColor, iconColor, maxWidth,
        })).finally(loader.classList.remove('visible'))
    }, 1000);
}
