package com.ssafy.server.dto.request.notification;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.checkerframework.checker.units.qual.N;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationCreateRequestDto {
    @NotBlank
    @Schema(description = "공통코드 Id", example = "101")
    private int commonCodeId;

    @NotBlank
    @Schema(description = "수신인", example = "1")
    private int receivingMemberId;

    @NotBlank
    @Schema(description = "들어갈 링크", example = "https://...")
    private String link;

    @NotBlank
    @Schema(description = "그룹 Id", example = "1")
    private int groupId;

    @NotBlank
    @Schema(description = "담쪽이 Name", example = "영후")
    private String damjjokName;

    @NotBlank
    @Schema(description = "박사님 Name", example = "서현")
    private String doctorName;

    @NotBlank
    @Schema(description = "발신자 Name", example = "다희")
    private String senderName;

    @NotBlank
    @Schema(description = "날짜수" , example = "30")
    private int day;
}
