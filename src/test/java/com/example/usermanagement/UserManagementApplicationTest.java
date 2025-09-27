package com.example.usermanagement;

import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureWebMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Testes de integração para a aplicação
 */
@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureWebMvc
@Transactional
public class UserManagementApplicationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    public void testApplicationContextLoads() {
        // Teste simples para verificar se o contexto da aplicação carrega corretamente
        assert true;
    }

    @Test
    public void testCreateAndRetrieveUser() throws Exception {
        // Arrange
        User user = new User("Maria Silva", "maria@email.com");
        user.setPhone("11988888888");
        user.setAge(25);

        // Act & Assert - Criar usuário
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Maria Silva"))
                .andExpect(jsonPath("$.email").value("maria@email.com"))
                .andExpect(jsonPath("$.phone").value("11988888888"))
                .andExpect(jsonPath("$.age").value(25))
                .andExpect(jsonPath("$.active").value(true));

        // Act & Assert - Buscar usuário por email
        mockMvc.perform(get("/api/users/email/maria@email.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Maria Silva"))
                .andExpect(jsonPath("$.email").value("maria@email.com"));
    }

    @Test
    public void testUserWorkflow() throws Exception {
        // Arrange
        User user = new User("Pedro Santos", "pedro@email.com");
        user.setAge(30);

        // Act & Assert - 1. Criar usuário
        String response = mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("Pedro Santos"))
                .andReturn()
                .getResponse()
                .getContentAsString();

        // Extrair ID do usuário criado
        User createdUser = objectMapper.readValue(response, User.class);
        Long userId = createdUser.getId();

        // Act & Assert - 2. Buscar usuário por ID
        mockMvc.perform(get("/api/users/" + userId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Pedro Santos"));

        // Act & Assert - 3. Atualizar usuário
        user.setName("Pedro Oliveira");
        user.setPhone("11777777777");
        
        mockMvc.perform(put("/api/users/" + userId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Pedro Oliveira"))
                .andExpect(jsonPath("$.phone").value("11777777777"));

        // Act & Assert - 4. Desativar usuário
        mockMvc.perform(patch("/api/users/" + userId + "/deactivate"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.active").value(false));

        // Act & Assert - 5. Verificar que usuário não aparece na lista de ativos
        mockMvc.perform(get("/api/users/active"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isEmpty());

        // Act & Assert - 6. Reativar usuário
        mockMvc.perform(patch("/api/users/" + userId + "/activate"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.active").value(true));

        // Act & Assert - 7. Deletar usuário
        mockMvc.perform(delete("/api/users/" + userId))
                .andExpect(status().isNoContent());

        // Act & Assert - 8. Verificar que usuário foi deletado
        mockMvc.perform(get("/api/users/" + userId))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testValidationErrors() throws Exception {
        // Teste com dados inválidos
        User invalidUser = new User("", ""); // Nome e email vazios

        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(invalidUser)))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testDuplicateEmail() throws Exception {
        // Arrange - Criar primeiro usuário
        User user1 = new User("João Silva", "joao@email.com");
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user1)))
                .andExpect(status().isCreated());

        // Act & Assert - Tentar criar segundo usuário com mesmo email
        User user2 = new User("João Santos", "joao@email.com");
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(user2)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Email já está em uso: joao@email.com"));
    }
}
