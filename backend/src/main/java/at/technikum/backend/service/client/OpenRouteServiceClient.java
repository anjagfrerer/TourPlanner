package at.technikum.backend.service.client;

import at.technikum.backend.service.client.dto.OpenRouteDirectionsResponse;
import at.technikum.backend.service.client.dto.OpenRouteGeocodeResponse;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

@HttpExchange(url = "https://api.openrouteservice.org")
public interface OpenRouteServiceClient {

    //Input text -> Coordinates
    @GetExchange("/geocode/search")
    OpenRouteGeocodeResponse geocodeSearch(
            @RequestParam(name = "api_key") String apiKey,
            @RequestParam(name = "text") String text,
            @RequestParam(name = "size") Integer size
    );

    @GetExchange("/v2/directions/{profile}")
    OpenRouteDirectionsResponse routeSearch(
            @PathVariable("profile") String profile,
            @RequestParam(name = "api_key") String apiKey,
            @RequestParam(name = "start") String start,
            @RequestParam(name = "end") String end
    );
}
