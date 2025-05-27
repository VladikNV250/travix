import { DateFormat } from "./types";

export const formatDate = (date: Date, format: DateFormat = "dd.mm.yyyy") => {
    const dateStr = date.toLocaleDateString("uk-UA", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
    });

    const [day, month, year] = dateStr.split('.');
    switch (format) {
        case "dd.mm.yyyy": return `${day}.${month}.${year}`;
        case "yyyy-mm-dd": return `${year}-${month}-${day}`; 
        case "yyyy-dd-mm": return `${year}-${day}-${month}`;
        default: return dateStr;
    }
}