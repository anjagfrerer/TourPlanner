export interface Tour {
    id: number,
    name: string,
    description: string,
    from: string,
    to: string,
    transportType: string,
    distance: number,
    estimatedTime: number,
    routeInformation: string
}