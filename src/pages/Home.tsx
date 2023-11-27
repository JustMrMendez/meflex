/* eslint-disable react-refresh/only-export-components */
import {
	Movie,
	MovieCard,
	MovieDetails,
} from "@/components/ui-wrap/movie-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const api_key = import.meta.env.VITE_TMDB_TOKEN;
const url =
	"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";
const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${api_key}`,
	},
};

type Data = {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
};

export async function getMovies() {
	try {
		const response = await fetch(url, options);
		const data: Data = await response.json();
		return data;
	} catch (error) {
		console.log(error);
	}
}

export async function getMovieDetails(id: number) {
	const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
	const movieDetails = await fetch(url, options);
	const data = await movieDetails.json();
	return data;
}

const fileUrlConstructor = (path: string) =>
	`https://image.tmdb.org/t/p/w500${path}`;

const movieCardDataConstructor = async (movie: Movie) => {
	const movieDetails = await getMovieDetails(movie.id);
	const movieCardData = {
		id: movieDetails.id,
		title: movieDetails.title,
		site: movieDetails.homepage,
		poster: fileUrlConstructor(movieDetails.poster_path),
		genres: movieDetails.genres.map(
			(genre: { name: string }) => genre.name
		),
		overview: movieDetails.overview,
		rating: movieDetails.vote_average,
		releaseDate: movieDetails.release_date,
		tagline: movieDetails.tagline,
		productionCompany: {
			name: movieDetails.production_companies[0].name,
			logo: fileUrlConstructor(
				movieDetails.production_companies[0].logo_path
			),
		},
	};
	return movieCardData;
};

const Home = () => {
	const data = useLoaderData() as Data;
	const [results, setResults] = useState<MovieDetails[]>([]);

	useEffect(() => {
		const fetchMovies = async () => {
			const moviesData = await Promise.all(
				data.results.map(movieCardDataConstructor)
			);
			console.log(moviesData);
			setResults(moviesData);
		};
		fetchMovies();
	}, [data.results]); // Dependency array added

	return (
		<ScrollArea className="flex justify-center items-center w-full">
			<ul className="flex flex-wrap gap-4 w-full justify-between mx-auto">
				{results.map((movie) => (
					<li key={movie.id}>
						<MovieCard movie={movie} />
					</li>
				))}
			</ul>
		</ScrollArea>
	);
};

export default Home;
