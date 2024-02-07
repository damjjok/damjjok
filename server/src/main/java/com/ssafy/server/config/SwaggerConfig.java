package com.ssafy.server.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;

import java.util.Arrays;

@Configuration
public class SwaggerConfig {
    // Security 스키마 설정
    SecurityScheme bearerAuth = new SecurityScheme()
            .type(SecurityScheme.Type.HTTP)
            .scheme("bearer")
            .bearerFormat("JWT")
            .in(SecurityScheme.In.HEADER)
            .name(HttpHeaders.AUTHORIZATION);

    // Security 요청 설정
    SecurityRequirement addSecurityItem = new SecurityRequirement().addList("JWT");

    @Bean
    public OpenAPI openAPI() {
        Server localServer = new Server().url("http://localhost:8080").description("Local HTTP Server");
        Server httpsServer = new Server().url("https://i10e105.p.ssafy.io").description("Test HTTPS Server");
        return new OpenAPI()
                .servers(Arrays.asList(httpsServer, localServer))
                .components(new Components().addSecuritySchemes("JWT",bearerAuth))
                .addSecurityItem(addSecurityItem)
                .info(apiInfo());
    }
    private Info apiInfo() {
        return new Info()
                .title("담쪽이 Swegger")
                .description("Springdoc을 사용한 Swagger UI")
                .version("1.0.0");
    }
}
