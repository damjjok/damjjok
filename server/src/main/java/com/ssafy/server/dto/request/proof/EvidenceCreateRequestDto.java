package com.ssafy.server.dto.request.proof;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Setter
public class EvidenceCreateRequestDto {

    @NotBlank
    @Schema(description = "챌린지 아이디", example = "1")
    private int challengeId;

    @NotBlank
    @Schema(description = "유저 아이디", example = "1")
    private int userId;

    @NotBlank
    @Schema(description = "제목", example = "Test Tile")
    private String title;

    @NotBlank
    @Schema(description = "챌린지 아이디", example = "image")
    private MultipartFile image;
}
