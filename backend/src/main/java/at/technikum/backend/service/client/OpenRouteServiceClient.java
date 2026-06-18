package at.technikum.backend.service.client;

import at.technikum.backend.dto.response.GeocodeResponse;
import at.technikum.backend.dto.response.RouteResponse;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.service.annotation.GetExchange;
import org.springframework.web.service.annotation.HttpExchange;

@HttpExchange(url = "https://api.openrouteservice.org")
public interface OpenRouteServiceClient {

    //Input text -> Coordinates
    @GetExchange("/geocode/search")
    GeocodeResponse geocodeSearch(@RequestParam(name = "api_key") String apiKey, @RequestParam String text);

    @GetExchange("/v2/directions/{profile}")
    RouteResponse routeSearch(@RequestParam(name = "api_key") String apiKey, @RequestParam String start, @RequestParam String end);
}
