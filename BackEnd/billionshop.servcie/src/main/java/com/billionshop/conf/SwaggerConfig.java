package com.billionshop.conf;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@Profile(value = {"dev","sit"})
@Configuration
public class SwaggerConfig {
	
	@Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.billionshop"))
                .paths(PathSelectors.any())
                .build()
                .apiInfo(internalApiInfo());
    }
	
	private ApiInfo internalApiInfo() {
		  return new ApiInfoBuilder().title("BillionShop")
				  .description("Service for BillionShop")
				  .version("1.0.0")
				  .build();    
	}

}