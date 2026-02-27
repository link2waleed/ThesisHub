import { NavLink, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    BookOpen,
    Briefcase,
    Users,
    ShieldCheck,
    Flag,
    BarChart3,
    Settings,
    ChevronLeft,
    GraduationCap,
} from 'lucide-react';

const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
    { label: 'Thesis', icon: BookOpen, href: '/admin/thesis' },
    { label: 'Internships', icon: Briefcase, href: '/admin/internships' },
    { label: 'Users', icon: Users, href: '/admin/users' },
    { label: 'Approvals', icon: ShieldCheck, href: '/admin/approvals' },
    { label: 'Analytics', icon: BarChart3, href: '/admin/analytics' },
    { label: 'Reports', icon: Flag, href: '/admin/reports' },
    { label: 'Settings', icon: Settings, href: '/admin/settings' },
];

interface AdminSidebarProps {
    collapsed: boolean;
    onCollapse: () => void;
    mobile?: boolean;
}

export function AdminSidebar({ collapsed, onCollapse, mobile }: AdminSidebarProps) {
    const { pathname } = useLocation();

    return (
        <aside
            className={`flex flex-col h-full bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transition-all duration-200 ${collapsed && !mobile ? 'w-[68px]' : 'w-64'
                }`}
        >
            {/* Logo */}
            <div className="flex items-center gap-3 h-16 px-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center shrink-0">
                    <GraduationCap className="w-4.5 h-4.5 text-white dark:text-slate-900" />
                </div>
                {(!collapsed || mobile) && (
                    <span className="font-bold text-slate-900 dark:text-white text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                        ThesisHub Admin
                    </span>
                )}
                {!mobile && (
                    <button
                        onClick={onCollapse}
                        className="ml-auto p-1.5 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
                    >
                        <ChevronLeft className={`w-4 h-4 transition-transform duration-200 ${collapsed ? 'rotate-180' : ''}`} />
                    </button>
                )}
            </div>

            {/* Nav */}
            <nav className="flex-1 py-3 px-2 space-y-0.5 overflow-y-auto">
                {navItems.map((item) => {
                    const isActive = item.href === '/admin'
                        ? pathname === '/admin'
                        : pathname.startsWith(item.href);

                    return (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 ${isActive
                                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-slate-200'
                                }`}
                        >
                            <item.icon className="w-[18px] h-[18px] shrink-0" />
                            {(!collapsed || mobile) && <span>{item.label}</span>}
                        </NavLink>
                    );
                })}
            </nav>

            {/* Bottom */}
            {(!collapsed || mobile) && (
                <div className="p-3 border-t border-slate-100 dark:border-slate-800">
                    <div className="rounded-lg bg-slate-50 dark:bg-slate-800/50 p-3">
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">Admin Panel</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">v1.0.0 · ThesisHub</p>
                    </div>
                </div>
            )}
        </aside>
    );
}
