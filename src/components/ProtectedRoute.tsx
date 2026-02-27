import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores';

/**
 * Protects routes that require authentication.
 * Redirects unauthenticated users to /login with a return URL.
 */
export function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();
    const location = useLocation();

    if (!isAuthenticated) {
        return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} replace />;
    }

    return <>{children}</>;
}
