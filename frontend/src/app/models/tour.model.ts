import { routeInformation } from "./routeInformation.model";

export interface Tour {
    id: string,
    name: string,
    description: string,
    startLocation: string,
    destinationLocation: string,
    transportType: string,
    distance: number,
    estimatedTime: string,
    routeInformation: routeInformation,
    rating: number,
    author: string
}