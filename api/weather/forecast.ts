import axios from 'axios';

export default async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const query = searchParams.get('query');
	const days = searchParams.get('days');

	if (!query || !days) {
		return new Response(
			JSON.stringify({ e: 'query and days parameters are required.' }),
			{
				status: 400,
			},
		);
	}

	try {
		const response = await axios.get(
			'http://api.weatherapi.com/v1/forecast.json',
			{
				params: {
					key: process.env.TRAVIX_WEATHER_API_KEY,
					q: query,
					days,
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
