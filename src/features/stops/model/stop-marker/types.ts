import { Holiday } from "entities/holidays"
import { Stop } from "entities/stop"
import { Weather } from "entities/weather"

export interface StopMarkerViewModel {
    weather: Weather | null
    holiday: Holiday | null
    isLoading: boolean
    updateStopInfo: (stop: Stop) => Promise<void>
}  