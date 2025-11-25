package com.clarityexpense.repository;

import com.clarityexpense.entity.Transaction;
import com.clarityexpense.entity.TransactionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    
    /**
     * Find all transactions for a specific user (paginated)
     * @param userId the ID of the user
     * @param pageable pagination information
     * @return page of transactions
     */
    Page<Transaction> findByUserId(Long userId, Pageable pageable);
    
    /**
     * Find all transactions for a specific user
     * @param userId the ID of the user
     * @return list of transactions
     */
    List<Transaction> findByUserId(Long userId);
    
    /**
     * Find transactions for a user within a date range (paginated)
     * @param userId the ID of the user
     * @param startDate start of date range
     * @param endDate end of date range
     * @param pageable pagination information
     * @return page of transactions
     */
    Page<Transaction> findByUserIdAndDateBetween(Long userId, LocalDate startDate, LocalDate endDate, Pageable pageable);
    
    /**
     * Calculate total amount by transaction type for a user
     * @param userId the user ID
     * @param type the transaction type (INCOME or EXPENSE)
     * @return total amount
     */
    @Query("SELECT COALESCE(SUM(t.amount), 0) FROM Transaction t WHERE t.user.id = :userId AND t.type = :type")
    BigDecimal sumAmountByUserIdAndType(@Param("userId") Long userId, @Param("type") TransactionType type);
    
    /**
     * Get expenses grouped by category for a user within a date range
     * @param userId the user ID
     * @param startDate start of date range
     * @param endDate end of date range
     * @return list of objects containing category name and total amount
     */
    @Query("SELECT t.category.name as categoryName, SUM(t.amount) as totalAmount " +
           "FROM Transaction t " +
           "WHERE t.user.id = :userId " +
           "AND t.type = 'EXPENSE' " +
           "AND t.date BETWEEN :startDate AND :endDate " +
           "GROUP BY t.category.id, t.category.name " +
           "ORDER BY totalAmount DESC")
    List<Object[]> findExpensesByCategoryForUser(
        @Param("userId") Long userId,
        @Param("startDate") LocalDate startDate,
        @Param("endDate") LocalDate endDate
    );
}
