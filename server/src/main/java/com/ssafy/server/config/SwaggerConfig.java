package com.ssafy.server.config;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        Server localServer = new Server().url("http://localhost:8080").description("Local HTTP Server");
        Server httpsServer = new Server().url("https://i10e105.p.ssafy.io").description("Test HTTPS Server");
        return new OpenAPI()
                .servers(Arrays.asList(httpsServer, localServer))
                .components(new Components())
                .info(apiInfo());
    }
    private Info apiInfo() {
        return new Info()
                .title("담쪽이 Swegger")
                .description("Springdoc을 사용한 Swagger UI")
                .version("1.0.0");
    }
}
