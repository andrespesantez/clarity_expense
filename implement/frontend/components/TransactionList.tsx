'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '@/lib/api';
import '@/lib/i18n';

interface Transaction {
  id: number;
  amount: number;
  description: string;
  date: string;
  type: 'INCOME' | 'EXPENSE';
  categoryName: string;
}

interface TransactionListProps {
  refresh?: number;
}

/**
 * Transaction List Component
 * Displays a paginated list of user transactions
 */
export default function TransactionList({ refresh }: TransactionListProps) {
  const { t } = useTranslation();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTransactions();
  }, [refresh]);

  const fetchTransactions = async () => {
    try {
      const response = await api.get('/api/transactions?page=0&size=10');
      setTransactions(response.data.content || []);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <h2 className="text-subheading mb-6">{t('dashboard.recentTransactions')}</h2>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="text-subheading mb-6">{t('dashboard.recentTransactions')}</h2>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-subheading mb-6">{t('dashboard.recentTransactions')}</h2>

      {transactions.length === 0 ? (
        <div className="text-center py-12 text-muted">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-lg">{t('dashboard.noTransactions')}</p>
          <p className="text-sm mt-1">Create your first transaction to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table">
            <thead className="table-header">
              <tr>
                <th className="table-header-cell text-left">{t('transactions.date')}</th>
                <th className="table-header-cell text-left">{t('transactions.description')}</th>
                <th className="table-header-cell text-left">{t('transactions.category')}</th>
                <th className="table-header-cell text-left">{t('transactions.type')}</th>
                <th className="table-header-cell text-right">{t('transactions.amount')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="table-row">
                  <td className="table-cell">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="table-cell">
                    {transaction.description || '-'}
                  </td>
                  <td className="table-cell">
                    <span className="badge-info">
                      {transaction.categoryName}
                    </span>
                  </td>
                  <td className="table-cell">
                    <span className={transaction.type === 'INCOME' ? 'badge-success' : 'badge-danger'}>
                      {transaction.type === 'INCOME' ? t('transactions.income') : t('transactions.expense')}
                    </span>
                  </td>
                  <td className={`table-cell text-right font-semibold ${
                    transaction.type === 'INCOME' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'INCOME' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
