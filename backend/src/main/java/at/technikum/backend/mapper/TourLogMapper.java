package at.technikum.backend.service;

import at.technikum.backend.dto.request.RequestTourLogDto;
import at.technikum.backend.dto.response.ResponseTourLogDto;
import at.technikum.backend.entity.TourLog;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface TourLogMapper {

    // RequestTourLogDto -> Entity
    @Mapping(target = "tourLogId", ignore = true)
    @Mapping(target = "tour", ignore = true)
    TourLog toEntity(RequestTourLogDto dto);

    // Entity -> ResponseTourLogDto
    @Mapping(source = "tour.id", target = "tourId")
    ResponseTourLogDto toResponseDto(TourLog entity);

}