package at.technikum.backend.model;

import jakarta.validation.constraints.*;

import java.time.LocalDate;
import java.time.LocalTime;

public class TourLog {

    private Long tourLogId;
    private Long tourId;
    private String author;
    private LocalDate date;
    private LocalTime time;
    private Integer rating;
    private Integer difficulty;
    private Double totalDistanceKm;
    private Integer totalTimeMin;
    private String comment;

    public TourLog() {
    }

    public TourLog(Long tourLogId, Long tourId, String author, LocalDate date, LocalTime time, Integer rating, Integer difficulty, Double totalDistanceKm, Integer totalTimeMin, String comment) {
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
