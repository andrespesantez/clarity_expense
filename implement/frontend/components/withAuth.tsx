'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

/**
 * Higher-Order Component for protected routes
 * Redirects to login page if user is not authenticated
 * 
 * Usage:
 * export default withAuth(DashboardPage);
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P> {
  return function ProtectedRoute(props: P) {
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    useEffect(() => {
      setIsClient(true);
    }, []);

    useEffect(() => {
      // Redirect to login if not authenticated
      if (isClient && !isAuthenticated) {
        router.push('/login');
      }
    }, [isClient, isAuthenticated, router]);

    // Show loading state during hydration
    if (!isClient) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    // Don't render component if not authenticated
    if (!isAuthenticated) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      );
    }

    return <Component {...props} />;
  };
}
