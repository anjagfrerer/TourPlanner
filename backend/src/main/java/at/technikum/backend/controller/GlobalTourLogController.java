package at.technikum.backend.controller;

import at.technikum.backend.dto.response.ResponseTourLogDto;
import at.technikum.backend.entity.User;
import at.technikum.backend.service.TourLogService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tourlogs")
@CrossOrigin(origins = "http://localhost:4200")
public class GlobalTourLogController {

    private final TourLogService tourLogService;
    private static final Logger logger = LoggerFactory.getLogger(GlobalTourLogController.class);

    public GlobalTourLogController(TourLogService tourLogService) {
        this.tourLogService = tourLogService;
    }

    @GetMapping
    public ResponseEntity<List<ResponseTourLogDto>> readAllGlobal(@AuthenticationPrincipal User loggedInUser, @RequestParam(value = "search", required = false) String search) {
        logger.info("User '{}' requests to fetch tour logs with search term '{}'.", loggedInUser.getUsername(), search);
        List<ResponseTourLogDto> allLogs = tourLogService.findAllByUsername(loggedInUser.getUsername(), search);
        return new ResponseEntity<>(allLogs, HttpStatus.OK);
    }
}