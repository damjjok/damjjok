package com.ssafy.server.controller;


import com.ssafy.server.dto.request.candy.BestCheeringMemberRequestDto;
import com.ssafy.server.dto.request.candy.CandyCountRequestDto;
import com.ssafy.server.dto.request.candy.CandyCreateRequestDto;
import com.ssafy.server.dto.response.candy.BestCheeringMemberResponseDto;
import com.ssafy.server.dto.response.candy.CandyCountResponseDto;
import com.ssafy.server.dto.response.candy.CandyCreateResponseDto;
import com.ssafy.server.service.CandyService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/candy")
@RequiredArgsConstructor
@Tag(name = "Candy Controller", description = "캔디 관련 API")
public class CandyController {

    private final CandyService candyService;

    @PostMapping
    @Operation(summary = "캔디 생성", description = "새로운 캔디를 생성합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "캔디 생성 성공",
                    content = @Content(schema = @Schema(implementation = CandyCreateResponseDto.class)))})
    public ResponseEntity<? super CandyCreateResponseDto> createCandy(@RequestBody CandyCreateRequestDto requestBody){
        ResponseEntity<? super CandyCreateResponseDto> response = candyService.create(requestBody);
        return response;
    }


    @GetMapping("/{challengeId}")
    @Operation(summary = "캔디 개수 조회", description = "특정 챌린지의 캔디 개수를 조회합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "캔디 조회 성공",
                    content = @Content(schema = @Schema(implementation = CandyCountResponseDto.class)))})
    public ResponseEntity<? super CandyCountResponseDto> countCandy(@PathVariable int challengeId){
        CandyCountRequestDto requestBody = new CandyCountRequestDto();
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super CandyCountResponseDto> response = candyService.count(requestBody);
        return response;
    }


    @GetMapping("/best-member/{challengeId}")
    @Operation(summary = "응원왕 조회", description = "응원왕 이름과 캔디수,메시지 수를 조회합니다.",
            responses = { @ApiResponse(responseCode = "200", description = "응원왕 조회 성공",
                    content = @Content(schema = @Schema(implementation = BestCheeringMemberResponseDto.class)))})
    public ResponseEntity<? super BestCheeringMemberResponseDto> bestCheeringMember(@PathVariable int challengeId) {
        BestCheeringMemberRequestDto requestBody = new BestCheeringMemberRequestDto() ;
        requestBody.setChallengeId(challengeId);
        ResponseEntity<? super BestCheeringMemberResponseDto> response = candyService.bestMember(requestBody);
        return response;
    }
}
