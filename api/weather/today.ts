import axios from "axios";

export default async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    if (!query) {
        return new Response(JSON.stringify({ e: "query parameter is required." }), {
            status: 400
        });
    }

    try {
        const response = await axios.get("http://api.weatherapi.com/v1/current.json", {
            params: {
                key: process.env.TRAVIX_WEATHER_API_KEY,
                q: query,
            }
        });

        return new Response(JSON.stringify(response.data), {
            headers: { "Content-Type": "application/json" }
        });
    } catch (e) {
        return new Response(JSON.stringify({ error: "Something went wrong", e }));
    }
}