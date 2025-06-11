import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import axios from "axios";

let limit = 15;

const searchParams = new URLSearchParams({
	image_type: 'photo',
	orientation: 'horizontal',
	safesearch: true,
	per_page: limit,
});

axios.defaults.baseURL = `https://pixabay.com/api/?key=38590711-cd4e1138b2603dfebaf6d7de9&`;

export async function pixabayApi(inputValue, page = 1) {
	if (inputValue.length === 0) {
		return Promise.reject("Sorry, there are no images matching your search query. Please try again!")
	}

	searchParams.set("q", inputValue.trim().toLowerCase());
	searchParams.set("page", page);

	const posts = await axios.get(searchParams.toString())
		.then((response) => {
			if (response.status !== 200) {
				throw new Error(response.status);
			}
			return response.data;
		})
		.catch((err) => {
			iziToast.error({
				message: `${err}`,
				closeOnClick: true,
				position: "topRight",
				displayMode: 0,
				progressBar: false,
			});
		});

	return posts;

}


