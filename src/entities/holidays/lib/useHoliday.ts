import { useState } from "react"
import { Holiday } from "../model/types";
import { fetchHoliday } from "../api/holidaysApi";

export const useHoliday = () => {
    const [holiday, setHoliday] = useState<Holiday | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<unknown | null>(null);

    const getHoliday = async (countryCode: string, date: Date) => {
        try {
            setLoading(true);

            const response = await fetchHoliday(countryCode, date);

            setHoliday(response);
        } catch (e) {
            setError(e);
            console.log("Holiday-API-error", e);
        } finally {
            setLoading(false);
        }
    }

    return { holiday, loading, error, getHoliday };
}