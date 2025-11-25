package com.clarityexpense.service;

import com.clarityexpense.dto.CategoryDto;
import com.clarityexpense.entity.Category;
import com.clarityexpense.entity.User;
import com.clarityexpense.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryService {
    
    private final CategoryRepository categoryRepository;
    
    /**
     * Create a new category for a user
     * @param categoryDto the category data
     * @param user the authenticated user
     * @return the created category DTO
     */
    @Transactional
    public CategoryDto createCategory(CategoryDto categoryDto, User user) {
        log.info("Creating category '{}' for user: {}", categoryDto.getName(), user.getEmail());
        
        // Check if category name already exists for this user
        if (categoryRepository.existsByNameAndUserId(categoryDto.getName(), user.getId())) {
            throw new IllegalArgumentException("Category with name '" + categoryDto.getName() + "' already exists");
        }
        
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setUser(user);
        
        Category savedCategory = categoryRepository.save(category);
        log.info("Category created successfully with ID: {}", savedCategory.getId());
        
        return mapToDto(savedCategory);
    }
    
    /**
     * Get all categories for a user
     * @param user the authenticated user
     * @return list of category DTOs
     */
    @Transactional(readOnly = true)
    public List<CategoryDto> getCategoriesByUser(User user) {
        log.info("Fetching categories for user: {}", user.getEmail());
        
        List<Category> categories = categoryRepository.findByUserId(user.getId());
        
        return categories.stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }
    
    /**
     * Map Category entity to DTO
     */
    private CategoryDto mapToDto(Category category) {
        CategoryDto dto = new CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        return dto;
    }
}
