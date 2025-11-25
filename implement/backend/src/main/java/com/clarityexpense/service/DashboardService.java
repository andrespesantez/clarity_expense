package com.clarityexpense.service;

import com.clarityexpense.dto.BalanceDto;
import com.clarityexpense.dto.CategoryExpenseDto;
import com.clarityexpense.entity.TransactionType;
import com.clarityexpense.entity.User;
import com.clarityexpense.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DashboardService {
    
    private final TransactionRepository transactionRepository;
    
    /**
     * Calculate balance summary for a user
     * @param user the authenticated user
     * @return balance DTO with income, expense, and current balance
     */
    @Transactional(readOnly = true)
    public BalanceDto getBalance(User user) {
        log.info("Calculating balance for user: {}", user.getEmail());
        
        BigDecimal totalIncome = transactionRepository.sumAmountByUserIdAndType(
                user.getId(), TransactionType.INCOME);
        
        BigDecimal totalExpense = transactionRepository.sumAmountByUserIdAndType(
                user.getId(), TransactionType.EXPENSE);
        
        BigDecimal currentBalance = totalIncome.subtract(totalExpense);
        
        log.info("Balance calculated - Income: {}, Expense: {}, Balance: {}", 
                totalIncome, totalExpense, currentBalance);
        
        return new BalanceDto(totalIncome, totalExpense, currentBalance);
    }
    
    /**
     * Get expenses grouped by category for the current month
     * @param user the authenticated user
     * @return list of category expense DTOs
     */
    @Transactional(readOnly = true)
    public List<CategoryExpenseDto> getExpensesByCategory(User user) {
        log.info("Fetching expenses by category for user: {}", user.getEmail());
        
        // Get first and last day of current month
        LocalDate now = LocalDate.now();
        LocalDate startOfMonth = now.withDayOfMonth(1);
        LocalDate endOfMonth = now.withDayOfMonth(now.lengthOfMonth());
        
        List<Object[]> results = transactionRepository.findExpensesByCategoryForUser(
                user.getId(), startOfMonth, endOfMonth);
        
        return results.stream()
                .map(result -> new CategoryExpenseDto(
                        (String) result[0],
                        (BigDecimal) result[1]
                ))
                .collect(Collectors.toList());
    }
}
