package com.example.usermanagement.config;

import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

/**
 * Inicializador de dados para criar usuários padrão
 */
@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Criar usuário admin se não existir
        if (!userRepository.findByEmail("admin@example.com").isPresent()) {
            User admin = new User();
            admin.setName("Administrador");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhone("11999999999");
            admin.setAge(30);
            admin.setActive(true);
            admin.setRoles(Set.of(User.Role.ADMIN, User.Role.USER));
            
            userRepository.save(admin);
            System.out.println("✅ Usuário admin criado: admin@example.com / admin123");
        }
        
        // Criar usuário padrão se não existir
        if (!userRepository.findByEmail("user@example.com").isPresent()) {
            User user = new User();
            user.setName("Usuário Padrão");
            user.setEmail("user@example.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setPhone("11888888888");
            user.setAge(25);
            user.setActive(true);
            user.setRoles(Set.of(User.Role.USER));
            
            userRepository.save(user);
            System.out.println("✅ Usuário padrão criado: user@example.com / user123");
        }
        
        System.out.println("🔐 Sistema de autenticação inicializado!");
        System.out.println("📝 Usuários disponíveis:");
        System.out.println("   - Admin: admin@example.com / admin123");
        System.out.println("   - User:  user@example.com / user123");
    }
}
