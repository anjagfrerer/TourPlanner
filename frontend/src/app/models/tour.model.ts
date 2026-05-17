enum TransportType {
    BIKING,
    HIKING,
    RUNNING,
    VACATION
}

export interface Tour {
    id: string,
    name: string,
    description: string,
    startLocation: string,
    destinationLocation: string,
    transportType: string,
    distance: number,
    estimatedTime: string,
    routeInformation: null,
    rating: number,
    author: string
}