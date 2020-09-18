package com.psi.psi_incontro.xmltool.xmltool;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@SpringBootApplication
@EnableWebMvc
@Configuration
@EnableAutoConfiguration
public class XmltoolApplication {

    public static void main(String[] args) {
        SpringApplication.run(XmltoolApplication.class, args);
    }

}
