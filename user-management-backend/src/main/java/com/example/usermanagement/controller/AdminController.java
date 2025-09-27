package com.example.usermanagement.controller;

import com.example.usermanagement.model.User;
import com.example.usermanagement.service.JwtService;
import com.example.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {
    
    @Autowired
    private UserService userService;
    
    @Autowired
    private JwtService jwtService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/create-user")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createUser(@Valid @RequestBody CreateUserRequest request,
                                      @RequestHeader("Authorization") String token) {
        try {
            if (!isValidAdminToken(token)) {
                return ResponseEntity.status(403)
                        .body(Map.of("error", "Acesso negado. Apenas administradores podem criar usuários."));
            }
            
            if (userService.getUserByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Email já está em uso"));
            }
            
            User user = new User();
            user.setName(request.getName());
            user.setEmail(request.getEmail());
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            user.setPhone(request.getPhone());
            user.setAge(request.getAge());
            user.setRoles(Set.of(User.Role.USER));
            
            User savedUser = userService.createUser(user);
            
            // Gerar token para o novo usuário
            String userToken = jwtService.generateToken(savedUser.getEmail());
            
            Map<String, Object> response = new HashMap<>();
            response.put("user", Map.of(
                "id", savedUser.getId(),
                "name", savedUser.getName(),
                "email", savedUser.getEmail(),
                "phone", savedUser.getPhone(),
                "age", savedUser.getAge(),
                "roles", savedUser.getRoles(),
                "active", savedUser.getActive(),
                "createdAt", savedUser.getCreatedAt()
            ));
            response.put("token", userToken);
            response.put("message", "Usuário criado com sucesso");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Erro ao criar usuário: " + e.getMessage()));
        }
    }
    
    @PostMapping("/create-admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> createAdmin(@Valid @RequestBody CreateUserRequest request,
                                       @RequestHeader("Authorization") String token) {
        try {
            if (!isValidAdminToken(token)) {
                return ResponseEntity.status(403)
                        .body(Map.of("error", "Acesso negado. Apenas administradores podem criar outros administradores."));
            }
            
            if (userService.getUserByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.badRequest()
                        .body(Map.of("error", "Email já está em uso"));
            }
            
            User admin = new User();
            admin.setName(request.getName());
            admin.setEmail(request.getEmail());
            admin.setPassword(passwordEncoder.encode(request.getPassword()));
            admin.setPhone(request.getPhone());
            admin.setAge(request.getAge());
            admin.setRoles(Set.of(User.Role.ADMIN));
            
            User savedAdmin = userService.createUser(admin);
            
            // Gerar token para o novo admin
            String adminToken = jwtService.generateToken(savedAdmin.getEmail());
            
            Map<String, Object> response = new HashMap<>();
            response.put("admin", Map.of(
                "id", savedAdmin.getId(),
                "name", savedAdmin.getName(),
                "email", savedAdmin.getEmail(),
                "phone", savedAdmin.getPhone(),
                "age", savedAdmin.getAge(),
                "roles", savedAdmin.getRoles(),
                "active", savedAdmin.getActive(),
                "createdAt", savedAdmin.getCreatedAt()
            ));
            response.put("token", adminToken);
            response.put("message", "Administrador criado com sucesso");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Erro ao criar administrador: " + e.getMessage()));
        }
    }
    
    @GetMapping("/users")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> getAllUsers(@RequestHeader("Authorization") String token) {
        try {
            if (!isValidAdminToken(token)) {
                return ResponseEntity.status(403)
                        .body(Map.of("error", "Acesso negado. Apenas administradores podem visualizar usuários."));
            }
            
            return ResponseEntity.ok(userService.getAllUsers());
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Erro ao buscar usuários: " + e.getMessage()));
        }
    }
    
    @PostMapping("/generate-token")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> generateTokenForUser(@RequestBody GenerateTokenRequest request,
                                                @RequestHeader("Authorization") String token) {
        try {
            if (!isValidAdminToken(token)) {
                return ResponseEntity.status(403)
                        .body(Map.of("error", "Acesso negado. Apenas administradores podem gerar tokens."));
            }
            
            User user = userService.getUserByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            
            String userToken = jwtService.generateToken(user.getEmail());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", userToken);
            response.put("user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "roles", user.getRoles()
            ));
            response.put("expiresIn", "24 horas");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", "Erro ao gerar token: " + e.getMessage()));
        }
    }
    
    private boolean isValidAdminToken(String token) {
        try {
            if (token.startsWith("Bearer ")) {
                token = token.substring(7);
            }
            
            if (!jwtService.validateToken(token)) {
                return false;
            }
            
            String email = jwtService.extractUsername(token);
            User user = userService.getUserByEmail(email)
                    .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            
            return user.getRoles().contains(User.Role.ADMIN);
        } catch (Exception e) {
            return false;
        }
    }
    
    // Classes internas para requests
    public static class CreateUserRequest {
        private String name;
        private String email;
        private String password;
        private String phone;
        private Integer age;
        
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
        public String getPhone() { return phone; }
        public void setPhone(String phone) { this.phone = phone; }
        public Integer getAge() { return age; }
        public void setAge(Integer age) { this.age = age; }
    }
    
    public static class GenerateTokenRequest {
        private String email;
        
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
}
