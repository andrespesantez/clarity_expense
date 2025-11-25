package com.clarityexpense.service;

import com.clarityexpense.dto.TransactionDto;
import com.clarityexpense.entity.Category;
import com.clarityexpense.entity.Transaction;
import com.clarityexpense.entity.User;
import com.clarityexpense.repository.CategoryRepository;
import com.clarityexpense.repository.TransactionRepository;
import com.clarityexpense.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
@Slf4j
public class TransactionService {
    
    private final TransactionRepository transactionRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    
    /**
     * Create a new transaction for a user
     * @param transactionDto the transaction data
     * @param userId the authenticated user ID
     * @return the created transaction DTO
     */
    @Transactional
    public TransactionDto createTransaction(TransactionDto transactionDto, Long userId) {
        log.info("Creating transaction for user ID: {}", userId);
        
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        // Fetch category and verify it belongs to the user (RFN-02)
        Category category = categoryRepository.findById(transactionDto.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        
        if (!category.getUser().getId().equals(userId)) {
            log.warn("User {} attempted to use category {} owned by another user", 
                    userId, category.getId());
            throw new IllegalArgumentException("You can only use your own categories");
        }
        
        Transaction transaction = new Transaction();
        transaction.setAmount(transactionDto.getAmount());
        transaction.setDescription(transactionDto.getDescription());
        transaction.setDate(transactionDto.getDate());
        transaction.setType(transactionDto.getType());
        transaction.setUser(user);
        transaction.setCategory(category);
        
        Transaction savedTransaction = transactionRepository.save(transaction);
        log.info("Transaction created successfully with ID: {}", savedTransaction.getId());
        
        return mapToDto(savedTransaction);
    }
    
    /**
     * Get all transactions for a user (paginated)
     * @param userId the authenticated user ID
     * @param pageable pagination information
     * @return page of transaction DTOs
     */
    @Transactional(readOnly = true)
    public Page<TransactionDto> getTransactionsByUser(Long userId, Pageable pageable) {
        log.info("Fetching transactions for user ID: {} (page: {})", userId, pageable.getPageNumber());
        
        Page<Transaction> transactions = transactionRepository.findByUserId(userId, pageable);
        
        return transactions.map(this::mapToDto);
    }
    
    /**
     * Get transactions for a user within a date range (paginated)
     * @param userId the authenticated user ID
     * @param startDate start date
     * @param endDate end date
     * @param pageable pagination information
     * @return page of transaction DTOs
     */
    @Transactional(readOnly = true)
    public Page<TransactionDto> getTransactionsByUserAndDateRange(
            Long userId, LocalDate startDate, LocalDate endDate, Pageable pageable) {
        log.info("Fetching transactions for user ID: {} between {} and {}", 
                userId, startDate, endDate);
        
        Page<Transaction> transactions = transactionRepository.findByUserIdAndDateBetween(
                userId, startDate, endDate, pageable);
        
        return transactions.map(this::mapToDto);
    }
    
    /**
     * Update an existing transaction
     * @param transactionId the transaction ID to update
     * @param transactionDto the updated transaction data
     * @param userId the authenticated user ID
     * @return the updated transaction DTO
     */
    @Transactional
    public TransactionDto updateTransaction(Long transactionId, TransactionDto transactionDto, Long userId) {
        log.info("Updating transaction ID: {} for user ID: {}", transactionId, userId);
        
        // Fetch transaction and verify ownership (RFN-02)
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        
        if (!transaction.getUser().getId().equals(userId)) {
            log.warn("User {} attempted to update transaction {} owned by another user", 
                    userId, transactionId);
            throw new RuntimeException("You can only update your own transactions");
        }
        
        // Fetch category and verify it belongs to the user (RFN-02)
        Category category = categoryRepository.findById(transactionDto.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        
        if (!category.getUser().getId().equals(userId)) {
            log.warn("User {} attempted to use category {} owned by another user", 
                    userId, category.getId());
            throw new IllegalArgumentException("You can only use your own categories");
        }
        
        // Update transaction fields
        transaction.setAmount(transactionDto.getAmount());
        transaction.setDescription(transactionDto.getDescription());
        transaction.setDate(transactionDto.getDate());
        transaction.setType(transactionDto.getType());
        transaction.setCategory(category);
        
        Transaction updatedTransaction = transactionRepository.save(transaction);
        log.info("Transaction updated successfully (ID: {})", updatedTransaction.getId());
        
        return mapToDto(updatedTransaction);
    }
    
    /**
     * Delete a transaction
     * @param transactionId the transaction ID to delete
     * @param userId the authenticated user ID
     */
    @Transactional
    public void deleteTransaction(Long transactionId, Long userId) {
        log.info("Deleting transaction ID: {} for user ID: {}", transactionId, userId);
        
        // Fetch transaction and verify ownership (RFN-02)
        Transaction transaction = transactionRepository.findById(transactionId)
                .orElseThrow(() -> new RuntimeException("Transaction not found"));
        
        if (!transaction.getUser().getId().equals(userId)) {
            log.warn("User {} attempted to delete transaction {} owned by another user", 
                    userId, transactionId);
            throw new RuntimeException("You can only delete your own transactions");
        }
        
        transactionRepository.delete(transaction);
        log.info("Transaction deleted successfully (ID: {})", transactionId);
    }
    
    /**
     * Map Transaction entity to DTO
     */
    private TransactionDto mapToDto(Transaction transaction) {
        TransactionDto dto = new TransactionDto();
        dto.setId(transaction.getId());
        dto.setAmount(transaction.getAmount());
        dto.setDescription(transaction.getDescription());
        dto.setDate(transaction.getDate());
        dto.setType(transaction.getType());
        dto.setCategoryId(transaction.getCategory().getId());
        dto.setCategoryName(transaction.getCategory().getName());
        return dto;
    }
}
