package com.ssafy.server.dto.request.proof;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@Setter
public class EvidenceCreateRequestDto {

    @NotBlank
    private int challengeId;

    @NotBlank
    private int userId;

    @NotBlank
    private String title;

    @NotBlank
    private MultipartFile image;
}
