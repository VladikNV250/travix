import { Stop } from "entities/stop";

export interface Trip {
    readonly id: string;
    name: string,
    stops: Stop[],
}