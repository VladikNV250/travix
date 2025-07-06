import axios from 'axios';

const holidayCache = {};

export default async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const country = searchParams.get('country');
	const date = searchParams.get('date');
	if (!country || !date) {
		return new Response(
			JSON.stringify({ e: 'country and date parameters are required.' }),
			{
				status: 400,
			},
		);
	}

	const key = `${country}-${date}`;
	if (holidayCache[key]) {
		return new Response(JSON.stringify(holidayCache[key]));
	} else {
		try {
			const [year, month, day] = date.split('-');

			const response = await axios.get(
				'https://calendarific.com/api/v2/holidays',
				{
					params: {
						api_key: process.env.TRAVIX_HOLIDAY_API_KEY,
						country,
						year,
						month,
						day,
					},
				},
			);

			holidayCache[key] = response.data;

			return new Response(JSON.stringify(response.data), {
				headers: { 'Content-Type': 'application/json' },
			});
		} catch (e) {
			return new Response(JSON.stringify({ error: 'Something went wrong', e }));
		}
	}
}
