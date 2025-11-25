'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '@/lib/api';
import '@/lib/i18n';

interface Category {
  id: number;
  name: string;
}

interface TransactionFormProps {
  onSuccess?: () => void;
}

/**
 * Transaction Form Component
 * Allows users to create new income/expense transactions
 */
export default function TransactionForm({ onSuccess }: TransactionFormProps) {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    type: 'EXPENSE',
    categoryId: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/api/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await api.post('/api/transactions', {
        ...formData,
        amount: parseFloat(formData.amount),
        categoryId: parseInt(formData.categoryId),
      });

      setSuccess(t('transactions.createSuccess'));
      
      // Reset form
      setFormData({
        amount: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        type: 'EXPENSE',
        categoryId: '',
      });

      // Call success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (err: any) {
      console.error('Error creating transaction:', err);
      setError(err.response?.data || t('transactions.createError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2 className="text-subheading mb-6">{t('dashboard.addTransaction')}</h2>

      {/* Success Message */}
      {success && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Type */}
          <div>
            <label htmlFor="type" className="label">
              {t('transactions.type')}
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              required
              className="select-field"
            >
              <option value="EXPENSE">{t('transactions.expense')}</option>
              <option value="INCOME">{t('transactions.income')}</option>
            </select>
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="label">
              {t('transactions.amount')}
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder={t('transactions.amountPlaceholder')}
              step="0.01"
              min="0.01"
              required
              className="input-field"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {/* Category */}
          <div>
            <label htmlFor="categoryId" className="label">
              {t('transactions.category')}
            </label>
            <select
              id="categoryId"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="select-field"
            >
              <option value="">{t('transactions.selectCategory')}</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div>
            <label htmlFor="date" className="label">
              {t('transactions.date')}
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="input-field"
            />
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <label htmlFor="description" className="label">
            {t('transactions.description')}
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder={t('transactions.descriptionPlaceholder')}
            rows={3}
            className="textarea-field"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3"
        >
          {loading ? t('common.loading') : t('transactions.create')}
        </button>
      </form>
    </div>
  );
}
