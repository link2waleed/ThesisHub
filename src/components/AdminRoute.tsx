import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores';

/**
 * Protects admin-only routes.
 * - Not authenticated → redirect to /login?redirect=/admin
 * - Authenticated but not admin → redirect to /dashboard
 */
export function AdminRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated, user } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
    }

    if (user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}
