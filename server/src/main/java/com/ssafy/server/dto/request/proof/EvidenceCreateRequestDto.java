package com.ssafy.server.dto.request.proof;


import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Setter
public class EvidenceCreateRequestDto {

    @NotNull
    @Schema(description = "챌린지 아이디", example = "1")
    private int challengeId;

    @NotBlank
    @Schema(description = "제목", example = "Test Tile")
    private String title;

    @NotNull
    @Schema(description = "챌린지 아이디", example = "image")
    private MultipartFile image;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    @Schema(description = "메타 데이터 날짜", example = "2023-01-30T15:20:30")
    private LocalDateTime imageDate;
}
