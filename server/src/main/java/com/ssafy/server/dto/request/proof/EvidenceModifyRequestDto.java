package com.ssafy.server.dto.request.proof;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
public class EvidenceModifyRequestDto {
    @NotBlank
    private int evidenceId;

    @NotBlank
    private int userId;

    @NotBlank
    private String title;

    @NotBlank
    private MultipartFile image;
}
