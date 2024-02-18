package com.ssafy.server.dto.request.notification;


import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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

    @NotNull
    @Schema(description = "공통코드 Id", example = "101")
    private int commonCodeId;

    @NotNull
    @Schema(description = "수신인", example = "1")
    private int receivingMemberId;

    @Schema(description = "들어갈 링크", example = "https://...")
    private String link;

    @Schema(description = "담쪽이 Name", example = "영후")
    private String damjjokName;

    @Schema(description = "그룹 Name", example = "영후")
    private String groupName;

    @Schema(description = "날짜수" , example = "30")
    private String day;

}
