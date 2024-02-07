package com.ssafy.server.dto.proof;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EvidenceDto {
    private int evidenceId;
    private String evidenceTitle;
    private String imagePath;
    private LocalDateTime imageDate;
    private int createdBy;
    private String userName;
}
