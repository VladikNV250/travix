import axios from 'axios';

export default async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const input = searchParams.get('input');

	const response = await axios.get(
		'https://maps.googleapis.com/maps/api/place/autocomplete/json',
		{
			params: {
				input,
				key: process.env.TRAVIX_API_KEY,
			},
		},
	);

	return new Response(JSON.stringify(response.data), {
		headers: { 'Content-Type': 'application/json' },
	});
}
