package com.example.usermanagement.config;

import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class DataInitializer implements CommandLineRunner {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    public void run(String... args) throws Exception {
        // Criar admin padrão se não existir
        if (!userRepository.findByEmail("admin@example.com").isPresent()) {
            User admin = new User();
            admin.setName("Administrador");
            admin.setEmail("admin@example.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setPhone("(11) 99999-9999");
            admin.setAge(30);
            admin.setRoles(Set.of(User.Role.ADMIN));
            admin.setActive(true);
            
            userRepository.save(admin);
            System.out.println("✅ Admin padrão criado: admin@example.com / admin123");
        }
        
        // Criar usuário de teste se não existir
        if (!userRepository.findByEmail("user@example.com").isPresent()) {
            User user = new User();
            user.setName("Usuário Teste");
            user.setEmail("user@example.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setPhone("(11) 88888-8888");
            user.setAge(25);
            user.setRoles(Set.of(User.Role.USER));
            user.setActive(true);
            
            userRepository.save(user);
            System.out.println("✅ Usuário de teste criado: user@example.com / user123");
        }
    }
}
