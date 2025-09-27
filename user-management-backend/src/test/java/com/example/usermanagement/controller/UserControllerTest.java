package com.example.usermanagement.controller;

import com.example.usermanagement.model.User;
import com.example.usermanagement.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Testes unitários para UserController
 */
@RunWith(MockitoJUnitRunner.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private MockMvc mockMvc;
    private ObjectMapper objectMapper;
    private User testUser;

    @Before
    public void setUp() {
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
        objectMapper = new ObjectMapper();
        
        testUser = new User("João Silva", "joao@email.com", "password123");
        testUser.setId(1L);
        testUser.setPhone("11999999999");
        testUser.setAge(30);
    }

    @Test
    public void testCreateUser_Success() throws Exception {
        // Arrange
        when(userService.createUser(any(User.class))).thenReturn(testUser);

        // Act & Assert
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testUser)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("João Silva"))
                .andExpect(jsonPath("$.email").value("joao@email.com"));
    }

    @Test
    public void testCreateUser_EmailAlreadyExists() throws Exception {
        // Arrange
        when(userService.createUser(any(User.class)))
                .thenThrow(new IllegalArgumentException("Email já está em uso: joao@email.com"));

        // Act & Assert
        mockMvc.perform(post("/api/users")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(testUser)))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.message").value("Email já está em uso: joao@email.com"));
    }

    @Test
    public void testGetAllUsers() throws Exception {
        // Arrange
        List<User> users = Arrays.asList(testUser);
        when(userService.getAllUsers()).thenReturn(users);

        // Act & Assert
        mockMvc.perform(get("/api/users"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("João Silva"));
    }

    @Test
    public void testGetUserById_Found() throws Exception {
        // Arrange
        when(userService.getUserById(1L)).thenReturn(Optional.of(testUser));

        // Act & Assert
        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.name").value("João Silva"));
    }

    @Test
    public void testGetUserById_NotFound() throws Exception {
        // Arrange
        when(userService.getUserById(1L)).thenReturn(Optional.empty());

        // Act & Assert
        mockMvc.perform(get("/api/users/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testGetUserByEmail_Found() throws Exception {
        // Arrange
        when(userService.getUserByEmail("joao@email.com")).thenReturn(Optional.of(testUser));

        // Act & Assert
        mockMvc.perform(get("/api/users/email/joao@email.com"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.email").value("joao@email.com"));
    }

    @Test
    public void testUpdateUser_Success() throws Exception {
        // Arrange
        User updatedUser = new User("João Santos", "joao@email.com", "password123");
        updatedUser.setPhone("11888888888");
        updatedUser.setAge(31);
        
        when(userService.updateUser(anyLong(), any(User.class))).thenReturn(updatedUser);

        // Act & Assert
        mockMvc.perform(put("/api/users/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("João Santos"))
                .andExpect(jsonPath("$.phone").value("11888888888"));
    }

    @Test
    public void testDeactivateUser_Success() throws Exception {
        // Arrange
        testUser.setActive(false);
        when(userService.deactivateUser(1L)).thenReturn(testUser);

        // Act & Assert
        mockMvc.perform(patch("/api/users/1/deactivate"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.active").value(false));
    }

    @Test
    public void testActivateUser_Success() throws Exception {
        // Arrange
        when(userService.activateUser(1L)).thenReturn(testUser);

        // Act & Assert
        mockMvc.perform(patch("/api/users/1/activate"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.active").value(true));
    }

    @Test
    public void testDeleteUser_Success() throws Exception {
        // Arrange
        doNothing().when(userService).deleteUser(1L);

        // Act & Assert
        mockMvc.perform(delete("/api/users/1"))
                .andExpect(status().isNoContent());
    }

    @Test
    public void testGetActiveUsers() throws Exception {
        // Arrange
        List<User> activeUsers = Arrays.asList(testUser);
        when(userService.getActiveUsers()).thenReturn(activeUsers);

        // Act & Assert
        mockMvc.perform(get("/api/users/active"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].active").value(true));
    }

    @Test
    public void testSearchUsersByName() throws Exception {
        // Arrange
        List<User> users = Arrays.asList(testUser);
        when(userService.searchUsersByName("João")).thenReturn(users);

        // Act & Assert
        mockMvc.perform(get("/api/users/search")
                .param("name", "João"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].name").value("João Silva"));
    }

    @Test
    public void testGetUsersByAgeRange() throws Exception {
        // Arrange
        List<User> users = Arrays.asList(testUser);
        when(userService.getUsersByAgeRange(25, 35)).thenReturn(users);

        // Act & Assert
        mockMvc.perform(get("/api/users/age-range")
                .param("minAge", "25")
                .param("maxAge", "35"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$").isArray())
                .andExpect(jsonPath("$[0].age").value(30));
    }

    @Test
    public void testGetUserStats() throws Exception {
        // Arrange
        when(userService.countActiveUsers()).thenReturn(5L);
        when(userService.countInactiveUsers()).thenReturn(2L);

        // Act & Assert
        mockMvc.perform(get("/api/users/stats"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalUsers").value(7))
                .andExpect(jsonPath("$.activeUsers").value(5))
                .andExpect(jsonPath("$.inactiveUsers").value(2));
    }
}
