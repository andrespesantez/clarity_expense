'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '@/lib/api';
import '@/lib/i18n';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface CategoryExpense {
  categoryName: string;
  totalAmount: number;
  [key: string]: string | number; // Index signature for Recharts compatibility
}

/**
 * Category Chart Component
 * Displays expenses by category using a pie chart
 */
export default function CategoryChart() {
  const { t } = useTranslation();
  const [data, setData] = useState<CategoryExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Colors for chart segments
  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#6366F1'];

  useEffect(() => {
    fetchExpensesByCategory();
  }, []);

  const fetchExpensesByCategory = async () => {
    try {
      const response = await api.get('/api/dashboard/expenses-by-category');
      setData(response.data || []);
    } catch (err) {
      console.error('Error fetching expenses by category:', err);
      setError(t('common.error'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <h2 className="text-subheading mb-6">{t('dashboard.expensesByCategory')}</h2>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card">
        <h2 className="text-subheading mb-6">{t('dashboard.expensesByCategory')}</h2>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="card">
        <h2 className="text-subheading mb-6">{t('dashboard.expensesByCategory')}</h2>
        <div className="text-center py-12 text-muted">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
          </svg>
          <p className="text-lg">{t('dashboard.noCategories')}</p>
          <p className="text-sm mt-1">Create some expense transactions to see the chart</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-subheading mb-6">{t('dashboard.expensesByCategory')}</h2>
      
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="totalAmount"
            nameKey="categoryName"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={(props: any) => 
              `${props.categoryName} (${((props.percent || 0) * 100).toFixed(0)}%)`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `$${(value ?? 0).toFixed(2)}`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      {/* Summary table */}
      <div className="mt-6 border-t pt-4">
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Category Breakdown</h3>
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={item.categoryName} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="text-sm text-gray-700">{item.categoryName}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                ${(item.totalAmount ?? 0).toFixed(2)}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t flex justify-between">
          <span className="text-sm font-semibold text-gray-700">{t('common.total')}</span>
          <span className="text-sm font-bold text-gray-900">
            ${data.reduce((sum, item) => sum + (item.totalAmount ?? 0), 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
