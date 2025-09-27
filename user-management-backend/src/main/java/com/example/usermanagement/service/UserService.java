package com.example.usermanagement.service;

import com.example.usermanagement.model.User;
import com.example.usermanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Serviço para gerenciar operações de usuários
 */
@Service
@Transactional
public class UserService {
    
    private final UserRepository userRepository;
    
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    /**
     * Cria um novo usuário
     * @param user dados do usuário
     * @return usuário criado
     * @throws IllegalArgumentException se o email já existe
     */
    public User createUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email já está em uso: " + user.getEmail());
        }
        return userRepository.save(user);
    }
    
    /**
     * Busca todos os usuários
     * @return lista de todos os usuários
     */
    @Transactional(readOnly = true)
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    /**
     * Busca usuário por ID
     * @param id ID do usuário
     * @return Optional contendo o usuário se encontrado
     */
    @Transactional(readOnly = true)
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    /**
     * Busca usuário por email
     * @param email email do usuário
     * @return Optional contendo o usuário se encontrado
     */
    @Transactional(readOnly = true)
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    /**
     * Atualiza um usuário existente
     * @param id ID do usuário
     * @param userData novos dados do usuário
     * @return usuário atualizado
     * @throws IllegalArgumentException se o usuário não for encontrado ou email já existe
     */
    public User updateUser(Long id, User userData) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + id));
        
        // Verifica se o email está sendo alterado e se já existe
        if (!existingUser.getEmail().equals(userData.getEmail()) && 
            userRepository.existsByEmail(userData.getEmail())) {
            throw new IllegalArgumentException("Email já está em uso: " + userData.getEmail());
        }
        
        // Atualiza os campos
        existingUser.setName(userData.getName());
        existingUser.setEmail(userData.getEmail());
        existingUser.setPhone(userData.getPhone());
        existingUser.setAge(userData.getAge());
        existingUser.setActive(userData.getActive());
        
        return userRepository.save(existingUser);
    }
    
    /**
     * Desativa um usuário (soft delete)
     * @param id ID do usuário
     * @return usuário desativado
     * @throws IllegalArgumentException se o usuário não for encontrado
     */
    public User deactivateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + id));
        
        user.setActive(false);
        return userRepository.save(user);
    }
    
    /**
     * Ativa um usuário
     * @param id ID do usuário
     * @return usuário ativado
     * @throws IllegalArgumentException se o usuário não for encontrado
     */
    public User activateUser(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuário não encontrado com ID: " + id));
        
        user.setActive(true);
        return userRepository.save(user);
    }
    
    /**
     * Remove um usuário permanentemente
     * @param id ID do usuário
     * @throws IllegalArgumentException se o usuário não for encontrado
     */
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("Usuário não encontrado com ID: " + id);
        }
        userRepository.deleteById(id);
    }
    
    /**
     * Busca usuários ativos
     * @return lista de usuários ativos
     */
    @Transactional(readOnly = true)
    public List<User> getActiveUsers() {
        return userRepository.findByActiveTrue();
    }
    
    /**
     * Busca usuários por nome
     * @param name nome ou parte do nome
     * @return lista de usuários que contêm o nome
     */
    @Transactional(readOnly = true)
    public List<User> searchUsersByName(String name) {
        return userRepository.findByNameContainingIgnoreCase(name);
    }
    
    /**
     * Busca usuários por faixa etária
     * @param minAge idade mínima
     * @param maxAge idade máxima
     * @return lista de usuários na faixa etária
     */
    @Transactional(readOnly = true)
    public List<User> getUsersByAgeRange(Integer minAge, Integer maxAge) {
        return userRepository.findByAgeBetween(minAge, maxAge);
    }
    
    /**
     * Conta usuários ativos
     * @return número de usuários ativos
     */
    @Transactional(readOnly = true)
    public long countActiveUsers() {
        return userRepository.countByActiveTrue();
    }
    
    /**
     * Conta usuários inativos
     * @return número de usuários inativos
     */
    @Transactional(readOnly = true)
    public long countInactiveUsers() {
        return userRepository.countByActiveFalse();
    }
}
