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

let lightbox;

const handleSubmit = async (e) => {
    e.preventDefault();
    gallery.innerHTML = "";
    loader.classList.add('visible');

    if (lightbox) {
        lightbox.refresh();
    }
    
    setTimeout(function () {
        pixabayApi(input.value).then(posts => {
            if (posts.hits.length === 0) 
                throw new Error("Sorry, there are no images matching your search query. Please try again!");
            
            gallery.innerHTML = renderFunction(posts.hits);

            lightbox = new SimpleLightbox('.gallery a', {
                captions: true,
                captionsData: 'alt',
                captionSelector: 'img',
                captionPosition: 'outside',
                captionDelay: 250,
                overlayOpacity: 0.8,
                styles: '../css/styles.css',
            }
            )
        }).catch((err) => iziToast.error({
            message: `${err.message ? err.message : err}`,
            closeOnClick: true,
            position: "topRight",
            displayMode: 0,
            progressBar: false,
            backgroundColor: '#EF4040',
            messageColor: 'white',
            iconColor: 'white',
            maxWidth: '432px',
        })).finally(loader.classList.remove('visible'))
    }, 1000);
    
            
    
};

submitForm.addEventListener('submit', handleSubmit);
