package com.ssafy.server.dto.request.proof;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class EvidenceModifyRequestDto {
    @NotBlank
    @Schema(description = "증거 아이디", example = "1")
    private int evidenceId;

    @NotBlank
    @Schema(description = "사용자 아이디", example = "1")
    private int userId;

    @NotBlank
    @Schema(description = "제목", example = "test title")
    private String title;

    @NotBlank
    @Schema(description = "증거 사진", example = "image")
    private MultipartFile image;
}