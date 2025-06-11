import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const searchParams = new URLSearchParams({
	image_type: 'photo',
	orientation: 'horizontal',
	safesearch: true,
});
const url = `https://pixabay.com/api/?key=38590711-cd4e1138b2603dfebaf6d7de9&`;

export function pixabayApi(inputValue) {
	if (inputValue.length === 0) {
		return Promise.reject("Sorry, there are no images matching your search query. Please try again!")
	}

	searchParams.append("q", inputValue.trim().toLowerCase());
	return fetch(url + searchParams.toString()).then((response) => {
		if (!response.ok) {
			throw new Error(response.status);
		}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
		return response.json();
	})
	.catch((err) => {
			iziToast.error({
				message: `${err}`,
				closeOnClick: true,
				position: "topRight",
				displayMode: 0,
				progressBar: false,
			});
		})
}

