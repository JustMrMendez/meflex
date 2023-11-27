import { MovieCard } from "@/components/ui-wrap/movie-card";

// export async function loader() {
// 	const movies = await fetch(

const movieSample = {
	title: "Naruto",
	year: "2002–2007",
	rated: "TV-PG",
	released: "10 Sep 2005",
	runtime: "24 min",
	genre: "Animation, Action, Adventure",
	director: "N/A",
	writer: "Masashi Kishimoto",
	actors: "Junko Takeuchi, Maile Flanagan, Kate Higgins",
	plot: "Many years ago, in the hidden village of Konoha, lived a great demon fox. When it swung one of its nine tails, a tsunami occurred. The fourth hokage sealed this demon fox inside a boy in exchange for his own life. Naruto was that boy, and he grew up with no family, and the villagers hated him thinking that he himself was the demon fox. Naruto's dream is to become Hokage, and have the villagers acknowledge him.",
	language: "Japanese",
	country: "Japan",
	awards: "N/A",
	poster: "https://m.media-amazon.com/images/M/MV5BZmQ5NGFiNWEtMmMyMC00MDdiLTg4YjktOGY5Yzc2MDUxMTE1XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
	ratings: [
		{
			source: "Internet Movie Database",
			value: "8.4/10",
		},
	],
	metascore: "N/A",
	imdbRating: "8.4",
	imdbVotes: "119,590",
	imdbID: "tt0409591",
	type: "series",
	totalSeasons: "1",
	response: "True",
};

const Home = () => {
	return (
		<div className="h-screen flex justify-center items-center">
			<MovieCard movie={movieSample} />
		</div>
	);
};

export default Home;
