'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '@/lib/api';
import '@/lib/i18n';

interface BalanceData {
  totalIncome: number;
  totalExpense: number;
  currentBalance: number;
}

/**
 * Balance Component
 * Displays total income, expenses, and net balance
 */
export default function Balance() {
  const { t } = useTranslation();
  const [balanceData, setBalanceData] = useState<BalanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchBalance();
  }, []);

  const fetchBalance = async () => {
    try {
      const response = await api.get('/api/dashboard/balance');
      setBalanceData(response.data);
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-3 gap-4">
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
            <div className="h-20 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-subheading mb-6">{t('dashboard.balance')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Income */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-700 font-medium">{t('dashboard.income')}</p>
              <p className="text-2xl font-bold text-green-900 mt-1">
                ${balanceData?.totalIncome?.toFixed(2) ?? '0.00'}
              </p>
            </div>
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
        </div>

        {/* Expenses */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-700 font-medium">{t('dashboard.expenses')}</p>
              <p className="text-2xl font-bold text-red-900 mt-1">
                ${balanceData?.totalExpense?.toFixed(2) ?? '0.00'}
              </p>
            </div>
            <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" />
            </svg>
          </div>
        </div>

        {/* Net Balance */}
        <div className={`rounded-lg p-4 ${
          (balanceData?.currentBalance ?? 0) >= 0 ? 'bg-blue-50' : 'bg-orange-50'
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm font-medium ${
                (balanceData?.currentBalance ?? 0) >= 0 ? 'text-blue-700' : 'text-orange-700'
              }`}>
                {t('dashboard.netBalance')}
              </p>
              <p className={`text-2xl font-bold mt-1 ${
                (balanceData?.currentBalance ?? 0) >= 0 ? 'text-blue-900' : 'text-orange-900'
              }`}>
                ${balanceData?.currentBalance?.toFixed(2) ?? '0.00'}
              </p>
            </div>
            <svg className={`w-10 h-10 ${
              (balanceData?.currentBalance ?? 0) >= 0 ? 'text-blue-500' : 'text-orange-500'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
