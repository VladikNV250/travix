import axios from 'axios';

export default async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const query = searchParams.get('query');
	const date = searchParams.get('date');

	if (!query || !date) {
		return new Response(
			JSON.stringify({ e: 'query and date parameters are required.' }),
			{
				status: 400,
			},
		);
	}

	try {
		const response = await axios.get(
			'http://api.weatherapi.com/v1/future.json',
			{
				params: {
					key: process.env.TRAVIX_WEATHER_API_KEY,
					q: query,
					dt: date,
				},
			},
		);

		return new Response(JSON.stringify(response.data), {
			headers: { 'Content-Type': 'application/json' },
		});
	} catch (e) {
		return new Response(JSON.stringify({ error: 'Something went wrong', e }));
	}
}
