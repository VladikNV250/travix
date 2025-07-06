import axios from 'axios';

export default async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const address = searchParams.get('address');

	const response = await axios.get(
		'https://maps.googleapis.com/maps/api/geocode/json',
		{
			params: {
				address,
				key: process.env.TRAVIX_API_KEY,
			},
		},
	);

	return new Response(JSON.stringify(response.data), {
		headers: { 'Content-Type': 'application/json' },
	});
}
