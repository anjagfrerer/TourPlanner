export interface Tour {
    id: number,
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
    /* Model aus Testgründen geändert 
    - muss dann wieder rückgängig gemacht werden
    
    estimatedTime: number,
    routeInformation: string,*/
}