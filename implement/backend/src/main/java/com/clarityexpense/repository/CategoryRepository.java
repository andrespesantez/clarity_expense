package com.clarityexpense.repository;

import com.clarityexpense.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    
    /**
     * Find all categories belonging to a specific user
     * @param userId the ID of the user
     * @return list of categories
     */
    List<Category> findByUserId(Long userId);
    
    /**
     * Check if a category with the given name exists for a user
     * @param name the category name
     * @param userId the user ID
     * @return true if exists, false otherwise
     */
    boolean existsByNameAndUserId(String name, Long userId);
}
