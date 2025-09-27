package com.example.usermanagement.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class StatusPageController {

    @GetMapping("/status")
    public String statusPage() {
        return "status";
    }
}

