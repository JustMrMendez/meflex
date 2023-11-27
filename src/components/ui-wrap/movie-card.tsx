// import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui-wrap/star-rating";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";

export type Movie = {
	title: string;
	year: string;
	rated: string;
	released: string;
	runtime: string;
	genre: string;
	director: string;
	writer: string;
	actors: string;
	plot: string;
	language: string;
	country: string;
	awards: string;
	poster: string;
	ratings: Rating[];
	metascore: string;
	imdbRating: string;
	imdbVotes: string;
	imdbID: string;
	type: string;
	totalSeasons: string;
	response: string;
};

export type Rating = {
	source: string;
	value: string;
};

type userData = {
	watched?: boolean;
	favorite?: boolean;
	rating?: number;
	whishlist?: boolean;
};

type MovieCardProps = {
	movie: Movie;
	userData?: userData;
};

export function MovieCard({ movie }: MovieCardProps) {
	return (
		<Card className="w-[350px] group overflow-hidden relative hover:shadow shadow-primary transition-all duration-300">
			{/* <CardHeader className="p-2">
				<CardDescription>{movie.plot}</CardDescription>
			</CardHeader> */}
			<CardContent className="text-sm p-0 relative overflow-hidden">
				<Badge variant="default" className="absolute top-2 left-2">
					{movie.rated}
				</Badge>
				<Badge variant="default" className="absolute top-2 right-2">
					{movie.imdbRating}
				</Badge>
				<img
					src={movie.poster}
					alt={`${movie.title} poster`}
					className="w-full object-cover"
				/>
				<div
					className="grid w-full gap-2 p-2 absolute -bottom-full backdrop-blur-md bg-slate-900/30 text-slate-100
                 group-hover:bottom-0 transition-all duration-300">
					<span>{movie.genre}</span>
					<span className="flex justify-between items-center relative">
						<span>
							<strong>Released:</strong> {movie.released}
						</span>
						{/* <span className="flex justify-center">
							<label htmlFor="watched">
								Watched:
							</label>
								<Checkbox
									id="watched"
									checked={
										!userData
											? false
											: userData.watched
									}
								/>
						</span> */}
					</span>
					<span className="text-lg flex justify-between">
						<span>{movie.title}</span>

						<StarRating rating={Number(movie.imdbRating)} />
					</span>
				</div>
			</CardContent>
		</Card>
	);
}
