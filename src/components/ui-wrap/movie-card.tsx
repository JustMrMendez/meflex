// import { Button } from "@/components/ui/button";
import { StarRating } from "@/components/ui-wrap/star-rating";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";

export type Movie = {
	adult: boolean;
	backdrop_path: string;
	genre_ids: number[];
	id: number;
	original_language: string;
	original_title: string;
	overview: string;
	popularity: number;
	poster_path: string;
	release_date: string;
	title: string;
	video: boolean;
	vote_average: number;
	vote_count: number;
};

export type MovieDetails = {
	id: number;
	title: string;
	site: string;
	poster: string;
	genres: string[];
	overview: string;
	rating: number;
	releaseDate: string;
	tagline: string;
	productionCompany: {
		name: string;
		logo: string;
	};
};

export type Rating = {
	source: string;
	value: string;
};

type MovieCardProps = {
	movie: MovieDetails;
};

const fileUrlConstructor = (path: string) =>
	`https://image.tmdb.org/t/p/w500${path}`;

export function MovieCard({ movie }: MovieCardProps) {
	return (
		<Card className="w-[350px] group overflow-hidden relative hover:shadow shadow-primary transition-all duration-300">
			{/* <CardHeader className="p-2">
				<CardDescription>{movie.plot}</CardDescription>
			</CardHeader> */}
			<CardContent className="text-sm p-0 relative overflow-hidden">
				{/* <Badge variant="default" className="absolute top-2 left-2">
					<img
						src={fileUrlConstructor(movie.productionCompany.logo)}
						alt=""
					/>
				</Badge> */}
				<Badge variant="default" className="absolute top-2 right-2">
					{movie.rating.toFixed(1)}
				</Badge>
				<img
					src={fileUrlConstructor(movie.poster)}
					alt={`${movie.title} poster`}
					className="w-full object-cover"
				/>
				<div
					className="grid w-full gap-2 p-2 absolute -bottom-full backdrop-blur-md bg-slate-900/30 text-slate-100
                 group-hover:bottom-0 transition-all duration-300">
					<ul className="flex space-x-2">
						{movie.genres.map((genre) => (
							<li>
								<Badge variant="default" key={genre}>
									{genre}
								</Badge>
							</li>
						))}
					</ul>
					<span className="flex justify-between items-center relative">
						<span>
							<strong>Released:</strong> {movie.releaseDate}
						</span>
					</span>
					<span className="text-lg flex justify-between">
						<span>{movie.title}</span>

						<StarRating rating={Number(movie.rating)} />
					</span>
				</div>
			</CardContent>
		</Card>
	);
}