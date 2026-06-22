package at.technikum.backend.controller;

import at.technikum.backend.dto.response.ResponseTourLogDto;
import at.technikum.backend.entity.User;
import at.technikum.backend.service.TourLogService;
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

    public GlobalTourLogController(TourLogService tourLogService) {
        this.tourLogService = tourLogService;
    }

    @GetMapping
    public ResponseEntity<List<ResponseTourLogDto>> readAllGlobal(@AuthenticationPrincipal User loggedInUser) {
        List<ResponseTourLogDto> allLogs = tourLogService.findAllByUsername(loggedInUser.getUsername());
        return new ResponseEntity<>(allLogs, HttpStatus.OK);
    }
}