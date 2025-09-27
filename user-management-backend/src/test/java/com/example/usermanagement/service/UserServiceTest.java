package com.example.usermanagement.service;

import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.Assert.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

/**
 * Testes unitários para UserService
 */
@RunWith(MockitoJUnitRunner.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private User testUser;

    @Before
    public void setUp() {
        testUser = new User("João Silva", "joao@email.com");
        testUser.setId(1L);
        testUser.setPhone("11999999999");
        testUser.setAge(30);
    }

    @Test
    public void testCreateUser_Success() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // Act
        User result = userService.createUser(testUser);

        // Assert
        assertNotNull(result);
        assertEquals(testUser.getName(), result.getName());
        assertEquals(testUser.getEmail(), result.getEmail());
        verify(userRepository).existsByEmail(testUser.getEmail());
        verify(userRepository).save(testUser);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testCreateUser_EmailAlreadyExists() {
        // Arrange
        when(userRepository.existsByEmail(anyString())).thenReturn(true);

        // Act
        userService.createUser(testUser);

        // Assert - exception should be thrown
    }

    @Test
    public void testGetAllUsers() {
        // Arrange
        List<User> users = Arrays.asList(testUser);
        when(userRepository.findAll()).thenReturn(users);

        // Act
        List<User> result = userService.getAllUsers();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(testUser.getName(), result.get(0).getName());
        verify(userRepository).findAll();
    }

    @Test
    public void testGetUserById_Found() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));

        // Act
        Optional<User> result = userService.getUserById(1L);

        // Assert
        assertTrue(result.isPresent());
        assertEquals(testUser.getName(), result.get().getName());
        verify(userRepository).findById(1L);
    }

    @Test
    public void testGetUserById_NotFound() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        Optional<User> result = userService.getUserById(1L);

        // Assert
        assertFalse(result.isPresent());
        verify(userRepository).findById(1L);
    }

    @Test
    public void testGetUserByEmail_Found() {
        // Arrange
        when(userRepository.findByEmail("joao@email.com")).thenReturn(Optional.of(testUser));

        // Act
        Optional<User> result = userService.getUserByEmail("joao@email.com");

        // Assert
        assertTrue(result.isPresent());
        assertEquals(testUser.getName(), result.get().getName());
        verify(userRepository).findByEmail("joao@email.com");
    }

    @Test
    public void testUpdateUser_Success() {
        // Arrange
        User updatedUser = new User("João Santos", "joao@email.com");
        updatedUser.setPhone("11888888888");
        updatedUser.setAge(31);

        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.existsByEmail("joao@email.com")).thenReturn(false);
        when(userRepository.save(any(User.class))).thenReturn(updatedUser);

        // Act
        User result = userService.updateUser(1L, updatedUser);

        // Assert
        assertNotNull(result);
        assertEquals("João Santos", result.getName());
        assertEquals("11888888888", result.getPhone());
        assertEquals(Integer.valueOf(31), result.getAge());
        verify(userRepository).findById(1L);
        verify(userRepository).save(any(User.class));
    }

    @Test(expected = IllegalArgumentException.class)
    public void testUpdateUser_UserNotFound() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        // Act
        userService.updateUser(1L, testUser);

        // Assert - exception should be thrown
    }

    @Test
    public void testDeactivateUser_Success() {
        // Arrange
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // Act
        User result = userService.deactivateUser(1L);

        // Assert
        assertNotNull(result);
        assertFalse(result.getActive());
        verify(userRepository).findById(1L);
        verify(userRepository).save(testUser);
    }

    @Test
    public void testActivateUser_Success() {
        // Arrange
        testUser.setActive(false);
        when(userRepository.findById(1L)).thenReturn(Optional.of(testUser));
        when(userRepository.save(any(User.class))).thenReturn(testUser);

        // Act
        User result = userService.activateUser(1L);

        // Assert
        assertNotNull(result);
        assertTrue(result.getActive());
        verify(userRepository).findById(1L);
        verify(userRepository).save(testUser);
    }

    @Test
    public void testDeleteUser_Success() {
        // Arrange
        when(userRepository.existsById(1L)).thenReturn(true);

        // Act
        userService.deleteUser(1L);

        // Assert
        verify(userRepository).existsById(1L);
        verify(userRepository).deleteById(1L);
    }

    @Test(expected = IllegalArgumentException.class)
    public void testDeleteUser_UserNotFound() {
        // Arrange
        when(userRepository.existsById(1L)).thenReturn(false);

        // Act
        userService.deleteUser(1L);

        // Assert - exception should be thrown
    }

    @Test
    public void testGetActiveUsers() {
        // Arrange
        List<User> activeUsers = Arrays.asList(testUser);
        when(userRepository.findByActiveTrue()).thenReturn(activeUsers);

        // Act
        List<User> result = userService.getActiveUsers();

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(userRepository).findByActiveTrue();
    }

    @Test
    public void testSearchUsersByName() {
        // Arrange
        List<User> users = Arrays.asList(testUser);
        when(userRepository.findByNameContainingIgnoreCase("João")).thenReturn(users);

        // Act
        List<User> result = userService.searchUsersByName("João");

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(userRepository).findByNameContainingIgnoreCase("João");
    }

    @Test
    public void testGetUsersByAgeRange() {
        // Arrange
        List<User> users = Arrays.asList(testUser);
        when(userRepository.findByAgeBetween(25, 35)).thenReturn(users);

        // Act
        List<User> result = userService.getUsersByAgeRange(25, 35);

        // Assert
        assertNotNull(result);
        assertEquals(1, result.size());
        verify(userRepository).findByAgeBetween(25, 35);
    }

    @Test
    public void testCountActiveUsers() {
        // Arrange
        when(userRepository.countByActiveTrue()).thenReturn(5L);

        // Act
        long result = userService.countActiveUsers();

        // Assert
        assertEquals(5L, result);
        verify(userRepository).countByActiveTrue();
    }

    @Test
    public void testCountInactiveUsers() {
        // Arrange
        when(userRepository.countByActiveFalse()).thenReturn(2L);

        // Act
        long result = userService.countInactiveUsers();

        // Assert
        assertEquals(2L, result);
        verify(userRepository).countByActiveFalse();
    }
}
