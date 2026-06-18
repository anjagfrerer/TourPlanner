package at.technikum.backend.service;

import at.technikum.backend.dto.Coordinates;
import at.technikum.backend.dto.response.GeocodeResponse;
import at.technikum.backend.service.client.OpenRouteServiceClient;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RouteService {
    private final String apiKey = System.getenv("OPENROUTE_API_KEY");
    private final OpenRouteServiceClient openRouteServiceClient;

    public RouteService(OpenRouteServiceClient openRouteServiceClient) {
        this.openRouteServiceClient = openRouteServiceClient;
    }


}
