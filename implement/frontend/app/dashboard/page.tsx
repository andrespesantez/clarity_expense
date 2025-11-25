'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { withAuth } from '@/components/withAuth';
import { useAuthStore } from '@/store/authStore';
import Balance from '@/components/Balance';
import CategoryChart from '@/components/CategoryChart';
import CategoryForm from '@/components/CategoryForm';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import TransactionForm from '@/components/TransactionForm';
import TransactionList from '@/components/TransactionList';
import '@/lib/i18n'; // Importar configuración de i18n

/**
 * Dashboard Page
 * Main application page showing financial summary and transactions
 * Protected route - requires authentication
 */
function DashboardPage() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user, logout } = useAuthStore();
  const [refreshKey, setRefreshKey] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const handleTransactionSuccess = () => {
    // Trigger refresh of all components
    setRefreshKey(prev => prev + 1);
  };

  const handleCategorySuccess = () => {
    // Trigger refresh of transaction form (to reload categories dropdown)
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-subheading">{t('appName')}</h1>
              <p className="text-sm text-muted mt-1">
                {t('dashboard.welcome')}, {user?.name || 'User'}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* Language Switcher */}
              <LanguageSwitcher />
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="btn-outline text-sm"
              >
                {t('auth.logout')}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container-centered py-8">
        {/* Balance Section */}
        <div className="mb-8" key={`balance-${refreshKey}`}>
          <Balance />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Category Chart */}
          <div key={`chart-${refreshKey}`}>
            <CategoryChart />
          </div>

          {/* Category Management Card */}
          <div className="card">
            <h3 className="text-subheading mb-4">
              {t('categories.title')}
            </h3>
            <p className="text-sm text-muted mb-4">
              Manage your expense categories
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full btn-primary"
            >
              {t('categories.addButton')}
            </button>
          </div>
        </div>

        {/* Transaction Form */}
        <div className="mb-8">
          <TransactionForm onSuccess={handleTransactionSuccess} />
        </div>

        {/* Transactions List */}
        <div key={`transactions-${refreshKey}`}>
          <TransactionList refresh={refreshKey} />
        </div>
      </main>

      {/* Category Form Modal */}
      {isModalOpen && (
        <div className="modal-backdrop" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="text-subheading">{t('categories.add')}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="modal-body">
              <CategoryForm onSuccess={handleCategorySuccess} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Export with authentication protection
export default withAuth(DashboardPage);
