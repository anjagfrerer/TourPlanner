import { RouteInformation } from "./routeInformation.model";

export interface Tour {
    id: string,
    name: string,
    description: string,
    startLocation: string,
    destinationLocation: string,
    transportType: string,
    distance: number,
    estimatedTime: string,
    route: RouteInformation | null,
    rating: number,
    childFriendly: boolean,
    popular: boolean,
    publicTour: boolean,
    author: string
}
