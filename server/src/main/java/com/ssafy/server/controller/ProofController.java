package com.ssafy.server.controller;


import com.ssafy.server.dto.request.TestimonyCreateRequestDto;
import com.ssafy.server.dto.request.TestimonyListRequestDto;
import com.ssafy.server.dto.response.TestimonyCreateResponseDto;
import com.ssafy.server.dto.response.TestimonyListResponseDto;
import com.ssafy.server.service.TestimonyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/proof")
@RequiredArgsConstructor
public class ProofController {

    private final TestimonyService testimonyService;

    @PostMapping("/testimony")
    public ResponseEntity<? super TestimonyCreateResponseDto> createTestimony(@RequestBody TestimonyCreateRequestDto requestBody){
        ResponseEntity<? super TestimonyCreateResponseDto> response = testimonyService.create(requestBody);
        return response;
    }

    @GetMapping("/testimony/{challengeId}")
    public ResponseEntity<? super TestimonyListResponseDto> listTestimony(@PathVariable int challengeId){
        TestimonyListRequestDto responseBody = new TestimonyListRequestDto();
        responseBody.setChallengeId(challengeId);
        ResponseEntity<? super TestimonyListResponseDto> response = testimonyService.list(responseBody);
        return response;
    }


    @GetMapping("/test")
    public String test(){
        System.out.println("TEST SUCCESS");
        return "GOOD";
    }


}
