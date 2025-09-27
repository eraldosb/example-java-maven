package com.example.usermanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Classe principal da aplicação de gerenciamento de usuários
 */
@SpringBootApplication
public class UserManagementApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserManagementApplication.class, args);
        System.out.println("🚀 Aplicação de Gerenciamento de Usuários iniciada com sucesso!");
        System.out.println("📱 Acesse: http://localhost:8080/api/users");
        System.out.println("🗄️  Console H2: http://localhost:8080/h2-console");
    }
}
