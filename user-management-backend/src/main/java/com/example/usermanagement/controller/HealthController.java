package com.example.usermanagement.controller;

import com.example.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/health")
public class HealthController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getHealthStatus() {
        Map<String, Object> healthStatus = new HashMap<>();
        
        try {
            // Verificar status da aplicação
            healthStatus.put("status", "UP");
            healthStatus.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            
            // Verificar banco de dados
            Map<String, Object> database = new HashMap<>();
            try {
                userService.countActiveUsers();
                database.put("status", "UP");
                database.put("message", "Database connection successful");
            } catch (Exception e) {
                database.put("status", "DOWN");
                database.put("message", "Database connection failed: " + e.getMessage());
            }
            healthStatus.put("database", database);
            
            // Informações do sistema
            Map<String, Object> system = new HashMap<>();
            system.put("javaVersion", System.getProperty("java.version"));
            system.put("osName", System.getProperty("os.name"));
            system.put("osVersion", System.getProperty("os.version"));
            system.put("availableProcessors", Runtime.getRuntime().availableProcessors());
            system.put("totalMemory", Runtime.getRuntime().totalMemory());
            system.put("freeMemory", Runtime.getRuntime().freeMemory());
            system.put("maxMemory", Runtime.getRuntime().maxMemory());
            healthStatus.put("system", system);
            
            // Estatísticas da aplicação
            Map<String, Object> application = new HashMap<>();
            try {
                long activeUsers = userService.countActiveUsers();
                long inactiveUsers = userService.countInactiveUsers();
                long totalUsers = activeUsers + inactiveUsers;
                
                application.put("totalUsers", totalUsers);
                application.put("activeUsers", activeUsers);
                application.put("inactiveUsers", inactiveUsers);
                application.put("status", "UP");
            } catch (Exception e) {
                application.put("status", "DOWN");
                application.put("error", e.getMessage());
            }
            healthStatus.put("application", application);
            
            return ResponseEntity.ok(healthStatus);
            
        } catch (Exception e) {
            healthStatus.put("status", "DOWN");
            healthStatus.put("timestamp", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
            healthStatus.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(healthStatus);
        }
    }

    @GetMapping("/simple")
    public ResponseEntity<Map<String, String>> getSimpleHealthStatus() {
        Map<String, String> simpleStatus = new HashMap<>();
        
        try {
            userService.countActiveUsers();
            simpleStatus.put("status", "UP");
            simpleStatus.put("message", "Application is running");
            return ResponseEntity.ok(simpleStatus);
        } catch (Exception e) {
            simpleStatus.put("status", "DOWN");
            simpleStatus.put("message", "Application is not responding: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.SERVICE_UNAVAILABLE).body(simpleStatus);
        }
    }
}
