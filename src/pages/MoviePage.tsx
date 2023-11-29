/* eslint-disable react-refresh/only-export-components */

import { MovieDetails } from "@/components/ui-wrap/movie-card";
import { StarRating } from "@/components/ui-wrap/star-rating";
import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { movieCardDataConstructor } from "@/pages/Home";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom";

const api_key = import.meta.env.VITE_TMDB_TOKEN;
const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${api_key}`,
	},
};

type LoaderParams = {
	id: string;
};

export async function getMovie({ params }: LoaderFunctionArgs<LoaderParams>) {
	const url = `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`;
	const movieDetails = await fetch(url, options);
	const movieDetailsJson = await movieDetails.json();
	console.log(movieDetailsJson);
	const data = movieCardDataConstructor(
		await movieDetailsJson,
		"w500",
		"w1280"
	);

	return data;
}

const MoviePage = () => {
	const movie = useLoaderData() as MovieDetails;
	return (
		<div className="relative">
			<header className="flex w-screen sticky top-0">
				<img
					src={movie.poster}
					alt={movie.overview}
					className="w-1/4 object-cover hidden lg:block"
				/>
				<img
					src={movie.backDrop}
					alt={movie.overview}
					className="w-full object-cover"
				/>
				{/* <div className="absolute">
					<div className="bg-white">
						{movie.productionCompanies.map((company) => (
							<Avatar className="w-16 h-16 " key={company.name}>
								<AvatarImage
									src={company.logo}
									alt={company.name}
									className="object-center object-contain"
								/>
								<AvatarFallback>
									{company.name
										.split(" ")
										.map((word) => word[0])
										.join("")}
								</AvatarFallback>
							</Avatar>
						))}
					</div>
				</div> */}
			</header>
			<section className="text-center sticky top-10 pb-4 border-b-4">
				<div className="[font-size:36px] sm:[font-size:calc(40px+6*(100vw-320px)/680)] font-black py-4 sticky top-0 ">
					<h1>{movie.title}</h1>
					<p className="flex justify-around">
						<StarRating rating={Number(movie.rating)} />
						<span>{movie.rating.toFixed(1)}</span>
					</p>
				</div>
				{/* <div className="relative">
					<img
						src={movie.poster}
						alt={movie.title}
						className="w-full object-cover block lg:hidden shadow shadow-primary"
					/>
				</div> */}
				<ul className="flex justify-evenly py-2 space-x-4">
					{movie.genres.map((genre) => (
						<li key={genre}>
							<Badge className="text-base">{genre}</Badge>
						</li>
					))}
				</ul>
			</section>
			<section className="text-lg font-semibold text-justify p-4">
                <h2 className="text-2xl font-bold">Overview</h2>
                <p className="leading-7">{movie.overview}</p>
            </section>
		</div>
	);
};

export default MoviePage;
