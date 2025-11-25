package com.clarityexpense.controller;

import com.clarityexpense.dto.TransactionDto;
import com.clarityexpense.entity.User;
import com.clarityexpense.service.TransactionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

/**
 * Transaction Controller
 * Manages income and expense transactions
 */
@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {
    
    private final TransactionService transactionService;
    
    /**
     * Get paginated transactions for authenticated user
     * GET /api/transactions
     * Optional parameters: startDate, endDate, page, size
     */
    @GetMapping
    public ResponseEntity<Page<TransactionDto>> getTransactions(
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @AuthenticationPrincipal User user) {
        
        log.info("Fetching transactions for user: {} (page: {}, size: {})", 
                user.getEmail(), page, size);
        
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "date"));
        Page<TransactionDto> transactions;
        
        if (startDate != null && endDate != null) {
            log.info("Date filter applied: {} to {}", startDate, endDate);
            transactions = transactionService.getTransactionsByUserAndDateRange(
                    user.getId(), startDate, endDate, pageable);
        } else {
            transactions = transactionService.getTransactionsByUser(user.getId(), pageable);
        }
        
        log.info("Found {} transactions (total: {})", 
                transactions.getNumberOfElements(), transactions.getTotalElements());
        
        return ResponseEntity.ok(transactions);
    }
    
    /**
     * Create a new transaction
     * POST /api/transactions
     */
    @PostMapping
    public ResponseEntity<?> createTransaction(
            @Valid @RequestBody TransactionDto transactionDto,
            @AuthenticationPrincipal User user) {
        
        log.info("Creating transaction for user: {} (type: {}, amount: {})", 
                user.getEmail(), transactionDto.getType(), transactionDto.getAmount());
        
        try {
            TransactionDto createdTransaction = transactionService.createTransaction(
                    transactionDto, user.getId());
            
            log.info("Transaction created successfully (ID: {})", createdTransaction.getId());
            
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(createdTransaction);
                    
        } catch (IllegalArgumentException e) {
            log.warn("Transaction creation failed: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }
    
    /**
     * Update an existing transaction
     * PUT /api/transactions/{id}
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTransaction(
            @PathVariable Long id,
            @Valid @RequestBody TransactionDto transactionDto,
            @AuthenticationPrincipal User user) {
        
        log.info("Updating transaction {} for user: {}", id, user.getEmail());
        
        try {
            TransactionDto updatedTransaction = transactionService.updateTransaction(
                    id, transactionDto, user.getId());
            
            log.info("Transaction updated successfully (ID: {})", updatedTransaction.getId());
            
            return ResponseEntity.ok(updatedTransaction);
            
        } catch (IllegalArgumentException e) {
            log.warn("Transaction update failed: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        } catch (RuntimeException e) {
            log.warn("Transaction not found or unauthorized: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Error: " + e.getMessage());
        }
    }
    
    /**
     * Delete a transaction
     * DELETE /api/transactions/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTransaction(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        
        log.info("Deleting transaction {} for user: {}", id, user.getEmail());
        
        try {
            transactionService.deleteTransaction(id, user.getId());
            log.info("Transaction deleted successfully (ID: {})", id);
            
            return ResponseEntity
                    .status(HttpStatus.NO_CONTENT)
                    .build();
                    
        } catch (RuntimeException e) {
            log.warn("Transaction deletion failed: {}", e.getMessage());
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Error: " + e.getMessage());
        }
    }
}
