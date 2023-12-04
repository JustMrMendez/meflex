/* eslint-disable react-refresh/only-export-components */
import {
	Movie,
	MovieCard,
	MovieDetails,
} from "@/components/ui-wrap/movie-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AuthContext } from "@/lib/context/auth-context";
import Cookie from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

const api_key = import.meta.env.VITE_TMDB_TOKEN;
const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${api_key}`,
	},
};
const url =
	"https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

type Data = {
	page: number;
	results: Movie[];
	total_pages: number;
	total_results: number;
};

export async function getMovies() {
	if (Cookie.get("userAuth") === "false" ) return { results: [] };
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

const fileUrlConstructor = (path: string, w: string = "w500") =>
	`https://image.tmdb.org/t/p/${w}${path}`;

export const movieCardDataConstructor = async (
	movie: Movie,
	posterW = "w500",
	backdropW = "w500"
) => {
	const movieDetails = await getMovieDetails(movie.id);
	const movieCardData = {
		id: movieDetails.id,
		title: movieDetails.title,
		site: movieDetails.homepage,
		poster: fileUrlConstructor(movieDetails.poster_path, posterW),
		genres: movieDetails.genres.map(
			(genre: { name: string }) => genre.name
		),
		overview: movieDetails.overview,
		rating: movieDetails.vote_average,
		releaseDate: movieDetails.release_date,
		tagline: movieDetails.tagline,
		productionCompanies: movieDetails.production_companies.map(
			(company: { name: string; logo_path: string }) => {
				return {
					name: company.name,
					logo: fileUrlConstructor(company.logo_path),
				};
			}
		),

		backDrop: fileUrlConstructor(movieDetails.backdrop_path, backdropW),
	};
	return movieCardData;
};

const Home = () => {
	const { currentUser } = useContext(AuthContext);
	const [results, setResults] = useState<MovieDetails[]>([]);
	const data = useLoaderData() as Data

	useEffect(() => {
		if (!currentUser) return;

		const fetchMovies = async () => {
			const moviesData = await Promise.all(
				data.results.map((movie) => movieCardDataConstructor(movie))
			);
			console.log(moviesData);
			setResults(moviesData);
		};

		fetchMovies();
	}, [currentUser, data.results]);

	return (
		<>
			{currentUser ? (
				<ScrollArea className="h-full px-4 w-full">
					<ul className="flex flex-wrap gap-4 w-full justify-evenly mx-auto mt-4">
						{results.map((movie) => (
							<li key={movie.id}>
								<MovieCard movie={movie} />
							</li>
						))}
					</ul>
				</ScrollArea>
			) : (
				<div className="h-full px-4 w-full text-center">
					<h1>
						You need to Login to see the movies.
						<Link to="/auth/login" className="text-blue-500">
							{" "}
							Click here{" "}
						</Link>
					</h1>
				</div>
			)}
		</>
	);
};

export default Home;
