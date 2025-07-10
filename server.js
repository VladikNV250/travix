import axios from 'axios';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();
const app = express();
const PORT = 3001;

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

app.get('/api/geocode', async (req, res) => {
	const { address } = req.query;

	if (!address) {
		return res.status(400).json({ error: 'Address is required' });
	}

	try {
		const response = await axios.get(
			'https://maps.googleapis.com/maps/api/geocode/json',
			{
				params: {
					address,
					key: process.env.TRAVIX_GEO_API_KEY,
				},
			},
		);

		res.json(response.data);
	} catch (e) {
		res.status(500).json({ error: 'Something went wrong' });
	}
});

app.get('/api/autocomplete-place', async (req, res) => {
	const { input } = req.query;

	if (!input) {
		return res.status(400).json({ error: 'Input is required' });
	}

	try {
		const response = await axios.post(
			'https://places.googleapis.com/v1/places:autocomplete',
			{
				input,
			},
			{
				headers: {
					'Content-Type': 'application/json',
					'X-Goog-Api-Key': process.env.TRAVIX_GEO_API_KEY,
				},
			},
		);

		res.json(response.data);
	} catch (e) {
		res.status(500).json({ error: 'Something went wrong' });
	}
});

app.get('/api/weather/today', async (req, res) => {
	const { query } = req.query;

	if (!query) {
		return res.status(400).json({ error: 'query is required' });
	}

	try {
		const response = await axios.get(
			'http://api.weatherapi.com/v1/current.json',
			{
				params: {
					key: process.env.TRAVIX_WEATHER_API_KEY,
					q: query,
				},
			},
		);

		res.json(response.data);
	} catch (e) {
		res.status(500).json({ error: 'Something went wrong' });
	}
});

app.get('/api/weather/forecast', async (req, res) => {
	const { query, days } = req.query;

	if (!query || !days) {
		return res.status(400).json({ error: 'days and query are required' });
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

		res.json(response.data);
	} catch (e) {
		res.status(500).json({ error: 'Something went wrong' });
	}
});

app.get('/api/weather/future', async (req, res) => {
	const { query, date } = req.query;

	if (!query || !date) {
		return res.status(400).json({ error: 'date and query are required' });
	}

	try {
		const response = await axios.get(
			'http://api.weatherapi.com/v1/future.json',
			{
				params: {
					key: process.env.TRAVIX_WEATHER_API_KEY,
					query,
					dt: date,
				},
			},
		);

		res.json(response.data);
	} catch (e) {
		res.status(500).json({ error: 'Something went wrong' });
	}
});

const holidaysCache = {};

app.get('/api/holidays', async (req, res) => {
	const { country, date } = req.query;
	if (!country || !date) {
		return res.status(400).json({ error: 'country and date are required' });
	}

	const key = `${country}-${date}`;
	if (holidaysCache[key]) {
		console.log('cached: ', key);
		res.json(holidaysCache[key]);
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

			holidaysCache[key] = response.data;

			res.json(response.data);
		} catch (e) {
			res.status(500).json({ error: 'Something went wrong' });
		}
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
