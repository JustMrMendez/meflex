export function StarRating({ rating }: { rating: number }) {
	const scaledRating = rating / 2; // Scale down to 5-star system
	const fullStars = Math.floor(scaledRating);
	const halfStar = scaledRating % 1 >= 0.5 ? 1 : 0;
	const emptyStars = 5 - fullStars - halfStar;

	return (
		"★".repeat(fullStars) + (halfStar ? "½" : "") + "☆".repeat(emptyStars)
	);
}
