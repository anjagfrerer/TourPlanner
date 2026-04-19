package at.technikum.backend.dto;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalTime;

public class TourLogDto {

    private Long tourLogId;

    @NotNull(message = "Tour ID is mandatory")
    private Long tourId;

    @NotBlank(message = "Author cannot be empty")
    private String author;

    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Time is required")
    private LocalTime time;

    @Min(value = 0, message = "Rating must be at least 0")
    @Max(value = 5, message = "Rating cannot exceed 5")
    private Integer rating;

    @Min(value = 0, message = "Difficulty must be at least 0")
    @Max(value = 10, message = "Difficulty cannot exceed 10")
    private Integer difficulty;

    @PositiveOrZero(message = "Total distance must be a positive value")
    private Double totalDistanceKm;

    @PositiveOrZero(message = "Total time must be a positive value")
    private Integer totalTimeMin;

    private String comment;

    public TourLogDto() {
    }

    public TourLogDto(Long tourLogId, Long tourId, String author, LocalDate date, LocalTime time, Integer rating, Integer difficulty, Double totalDistanceKm, Integer totalTimeMin, String comment) {
        this.tourLogId = tourLogId;
        this.tourId = tourId;
        this.author = author;
        this.date = date;
        this.time = time;
        this.rating = rating;
        this.difficulty = difficulty;
        this.totalDistanceKm = totalDistanceKm;
        this.totalTimeMin = totalTimeMin;
        this.comment = comment;
    }

    public Long getTourLogId() {
        return tourLogId;
    }

    public void setTourLogId(Long tourLogId) {
        this.tourLogId = tourLogId;
    }

    public Long getTourId() {
        return tourId;
    }

    public void setTourId(Long tourId) {
        this.tourId = tourId;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public Integer getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(Integer difficulty) {
        this.difficulty = difficulty;
    }

    public Double getTotalDistanceKm() {
        return totalDistanceKm;
    }

    public void setTotalDistanceKm(Double totalDistanceKm) {
        this.totalDistanceKm = totalDistanceKm;
    }

    public Integer getTotalTimeMin() {
        return totalTimeMin;
    }

    public void setTotalTimeMin(Integer totalTimeMin) {
        this.totalTimeMin = totalTimeMin;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}
