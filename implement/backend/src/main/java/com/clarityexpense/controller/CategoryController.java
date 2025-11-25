package com.clarityexpense.controller;

import com.clarityexpense.dto.CategoryDto;
import com.clarityexpense.entity.User;
import com.clarityexpense.service.CategoryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Category Controller
 * Manages expense/income categories
 */
@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class CategoryController {
    
    private final CategoryService categoryService;
    
    /**
     * Get all categories for authenticated user
     * GET /api/categories
     */
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getCategories(
            @AuthenticationPrincipal User user) {
        
        log.info("Fetching categories for user: {}", user.getEmail());
        List<CategoryDto> categories = categoryService.getCategoriesByUser(user);
        log.info("Found {} categories for user: {}", categories.size(), user.getEmail());
        
        return ResponseEntity.ok(categories);
    }
    
    /**
     * Create a new category
     * POST /api/categories
     */
    @PostMapping
    public ResponseEntity<?> createCategory(
            @Valid @RequestBody CategoryDto categoryDto,
            @AuthenticationPrincipal User user) {
        
        log.info("Creating category '{}' for user: {}", categoryDto.getName(), user.getEmail());
        
        try {
            CategoryDto createdCategory = categoryService.createCategory(categoryDto, user);
            log.info("Category created successfully: {} (ID: {})", 
                    createdCategory.getName(), createdCategory.getId());
            
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(createdCategory);
                    
        } catch (IllegalArgumentException e) {
            log.warn("Category creation failed: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body("Error: " + e.getMessage());
        }
    }
}
