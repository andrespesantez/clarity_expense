package com.clarityexpense.controller;

import com.clarityexpense.dto.BalanceDto;
import com.clarityexpense.dto.CategoryExpenseDto;
import com.clarityexpense.entity.User;
import com.clarityexpense.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Dashboard Controller
 * Provides summary data for dashboard view
 */
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {
    
    private final DashboardService dashboardService;
    
    /**
     * Get balance summary (total income and expenses)
     * GET /api/dashboard/balance
     */
    @GetMapping("/balance")
    public ResponseEntity<BalanceDto> getBalance(@AuthenticationPrincipal User user) {
        log.info("Fetching balance for user: {}", user.getEmail());
        
        BalanceDto balance = dashboardService.getBalance(user);
        
        log.info("Balance calculated - Income: {}, Expenses: {}, Net: {}", 
                balance.getTotalIncome(), balance.getTotalExpense(), balance.getCurrentBalance());
        
        return ResponseEntity.ok(balance);
    }
    
    /**
     * Get expenses grouped by category for current month
     * GET /api/dashboard/expenses-by-category
     */
    @GetMapping("/expenses-by-category")
    public ResponseEntity<List<CategoryExpenseDto>> getExpensesByCategory(
            @AuthenticationPrincipal User user) {
        
        log.info("Fetching expenses by category for user: {}", user.getEmail());
        
        List<CategoryExpenseDto> expensesByCategory = dashboardService.getExpensesByCategory(user);
        
        log.info("Found {} categories with expenses", expensesByCategory.size());
        
        return ResponseEntity.ok(expensesByCategory);
    }
}
