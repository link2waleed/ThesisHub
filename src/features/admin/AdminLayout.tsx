import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './components/AdminSidebar';
import { AdminTopbar } from './components/AdminTopbar';

export default function AdminLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-900 overflow-hidden">
            {/* Desktop Sidebar */}
            <div className="hidden lg:flex">
                <AdminSidebar
                    collapsed={sidebarCollapsed}
                    onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
                />
            </div>

            {/* Mobile Sidebar Overlay */}
            {mobileSidebarOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 bg-black/40 lg:hidden"
                        onClick={() => setMobileSidebarOpen(false)}
                    />
                    <div className="fixed inset-y-0 left-0 z-50 lg:hidden">
                        <AdminSidebar
                            collapsed={false}
                            onCollapse={() => setMobileSidebarOpen(false)}
                            mobile
                        />
                    </div>
                </>
            )}

            {/* Main content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <AdminTopbar onMenuClick={() => setMobileSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto p-4 lg:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
