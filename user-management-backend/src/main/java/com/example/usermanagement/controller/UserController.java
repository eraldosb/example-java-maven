package com.example.usermanagement.controller;

import com.example.usermanagement.model.User;
import com.example.usermanagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

/**
 * Controller REST para gerenciamento de usuários
 */
@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {
    
    private final UserService userService;
    
    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }
    
    /**
     * Cria um novo usuário
     * POST /api/users
     */
    @PostMapping
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    /**
     * Busca todos os usuários
     * GET /api/users
     */
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    /**
     * Busca usuário por ID
     * GET /api/users/{id}
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Busca usuário por email
     * GET /api/users/email/{email}
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * Atualiza um usuário
     * PUT /api/users/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @Valid @RequestBody User userData) {
        try {
            User updatedUser = userService.updateUser(id, userData);
            return ResponseEntity.ok(updatedUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    /**
     * Desativa um usuário
     * PATCH /api/users/{id}/deactivate
     */
    @PatchMapping("/{id}/deactivate")
    public ResponseEntity<?> deactivateUser(@PathVariable Long id) {
        try {
            User user = userService.deactivateUser(id);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    /**
     * Ativa um usuário
     * PATCH /api/users/{id}/activate
     */
    @PatchMapping("/{id}/activate")
    public ResponseEntity<?> activateUser(@PathVariable Long id) {
        try {
            User user = userService.activateUser(id);
            return ResponseEntity.ok(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    /**
     * Remove um usuário permanentemente
     * DELETE /api/users/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ErrorResponse(e.getMessage()));
        }
    }
    
    /**
     * Busca usuários ativos
     * GET /api/users/active
     */
    @GetMapping("/active")
    public ResponseEntity<List<User>> getActiveUsers() {
        List<User> users = userService.getActiveUsers();
        return ResponseEntity.ok(users);
    }
    
    /**
     * Busca usuários por nome
     * GET /api/users/search?name={name}
     */
    @GetMapping("/search")
    public ResponseEntity<List<User>> searchUsersByName(@RequestParam String name) {
        List<User> users = userService.searchUsersByName(name);
        return ResponseEntity.ok(users);
    }
    
    /**
     * Busca usuários por faixa etária
     * GET /api/users/age-range?minAge={minAge}&maxAge={maxAge}
     */
    @GetMapping("/age-range")
    public ResponseEntity<List<User>> getUsersByAgeRange(
            @RequestParam Integer minAge, 
            @RequestParam Integer maxAge) {
        List<User> users = userService.getUsersByAgeRange(minAge, maxAge);
        return ResponseEntity.ok(users);
    }
    
    /**
     * Retorna estatísticas dos usuários
     * GET /api/users/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<UserStats> getUserStats() {
        long activeUsers = userService.countActiveUsers();
        long inactiveUsers = userService.countInactiveUsers();
        long totalUsers = activeUsers + inactiveUsers;
        
        UserStats stats = new UserStats(totalUsers, activeUsers, inactiveUsers);
        return ResponseEntity.ok(stats);
    }
    
    /**
     * Classe para resposta de erro
     */
    public static class ErrorResponse {
        private String message;
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
        
        public void setMessage(String message) {
            this.message = message;
        }
    }
    
    /**
     * Classe para estatísticas de usuários
     */
    public static class UserStats {
        private long totalUsers;
        private long activeUsers;
        private long inactiveUsers;
        
        public UserStats(long totalUsers, long activeUsers, long inactiveUsers) {
            this.totalUsers = totalUsers;
            this.activeUsers = activeUsers;
            this.inactiveUsers = inactiveUsers;
        }
        
        public long getTotalUsers() {
            return totalUsers;
        }
        
        public void setTotalUsers(long totalUsers) {
            this.totalUsers = totalUsers;
        }
        
        public long getActiveUsers() {
            return activeUsers;
        }
        
        public void setActiveUsers(long activeUsers) {
            this.activeUsers = activeUsers;
        }
        
        public long getInactiveUsers() {
            return inactiveUsers;
        }
        
        public void setInactiveUsers(long inactiveUsers) {
            this.inactiveUsers = inactiveUsers;
        }
    }
}
