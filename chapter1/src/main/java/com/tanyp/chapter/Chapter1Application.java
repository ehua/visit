package com.tanyp.chapter;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class Chapter1Application {
    public static void main(String[] args) {
        SpringApplication.run(Chapter1Application.class, args);
    }
}
