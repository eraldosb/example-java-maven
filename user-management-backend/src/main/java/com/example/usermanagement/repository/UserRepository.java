package com.example.usermanagement.repository;

import com.example.usermanagement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Repositório para operações de banco de dados da entidade User
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    /**
     * Busca usuário por email
     * @param email email do usuário
     * @return Optional contendo o usuário se encontrado
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Verifica se existe um usuário com o email informado
     * @param email email a ser verificado
     * @return true se o email já existe, false caso contrário
     */
    boolean existsByEmail(String email);
    
    /**
     * Busca usuários ativos
     * @return lista de usuários ativos
     */
    List<User> findByActiveTrue();
    
    /**
     * Busca usuários inativos
     * @return lista de usuários inativos
     */
    List<User> findByActiveFalse();
    
    /**
     * Busca usuários por nome (case insensitive)
     * @param name nome ou parte do nome
     * @return lista de usuários que contêm o nome
     */
    @Query("SELECT u FROM User u WHERE LOWER(u.name) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<User> findByNameContainingIgnoreCase(@Param("name") String name);
    
    /**
     * Busca usuários por faixa etária
     * @param minAge idade mínima
     * @param maxAge idade máxima
     * @return lista de usuários na faixa etária
     */
    @Query("SELECT u FROM User u WHERE u.age BETWEEN :minAge AND :maxAge")
    List<User> findByAgeBetween(@Param("minAge") Integer minAge, @Param("maxAge") Integer maxAge);
    
    /**
     * Conta usuários ativos
     * @return número de usuários ativos
     */
    long countByActiveTrue();
    
    /**
     * Conta usuários inativos
     * @return número de usuários inativos
     */
    long countByActiveFalse();
}
