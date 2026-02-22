import { Link } from 'react-router-dom';
import { Outlet, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    User,
    Settings,
    Bell,
    LogOut,
    GraduationCap,
    Building2,
    Briefcase,
    ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sidebarLinks = [
    { to: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { to: '/dashboard/profile', label: 'Profile', icon: User },
    { to: '/dashboard/notifications', label: 'Notifications', icon: Bell },
    { to: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const roleLinks = [
    { to: '/dashboard/student', label: 'Student View', icon: GraduationCap },
    { to: '/dashboard/university', label: 'University View', icon: Building2 },
    { to: '/dashboard/company', label: 'Company View', icon: Briefcase },
];

export default function DashboardLayout() {
    const { pathname } = useLocation();

    return (
        <div className="min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-72px)]">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 lg:py-10">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-10">
                    {/* ── Sidebar ── */}
                    <aside className="w-full lg:w-60 shrink-0">
                        <div className="lg:sticky lg:top-24">
                            {/* User card */}
                            <div className="flex items-center gap-3 mb-6 p-5 rounded-xl bg-card border border-border/50 shadow-sm">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                                    <GraduationCap className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate">Demo User</p>
                                    <p className="text-xs text-muted-foreground">Student</p>
                                </div>
                            </div>

                            {/* Nav links */}
                            <nav aria-label="Dashboard navigation" className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
                                {sidebarLinks.map((link) => {
                                    const isActive = pathname === link.to;
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            aria-current={isActive ? 'page' : undefined}
                                            className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4 shrink-0" />
                                            {link.label}
                                        </Link>
                                    );
                                })}

                                {/* Role-specific views */}
                                <div className="hidden lg:block my-2 border-t border-border/40" />
                                <p className="hidden lg:block text-[10px] uppercase tracking-wider text-muted-foreground/60 px-3 mb-0.5">Role Views</p>
                                {roleLinks.map((link) => {
                                    const isActive = pathname === link.to;
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.to}
                                            to={link.to}
                                            aria-current={isActive ? 'page' : undefined}
                                            className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${isActive
                                                ? 'bg-primary/10 text-primary'
                                                : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                                                }`}
                                        >
                                            <Icon className="w-3.5 h-3.5 shrink-0" />
                                            {link.label}
                                        </Link>
                                    );
                                })}
                            </nav>

                            <div className="hidden lg:block mt-4 pt-4 border-t border-border/50">
                                <Link to="/">
                                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2 text-muted-foreground hover:text-foreground">
                                        <LogOut className="w-4 h-4" />
                                        Sign out
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </aside>

                    {/* ── Main content ── */}
                    <motion.main
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' as const }}
                        className="flex-1 min-w-0"
                    >
                        {/* Breadcrumb */}
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
                            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
                            <ChevronRight className="w-3 h-3" />
                            <span className="text-foreground font-medium capitalize">
                                {pathname === '/dashboard' ? 'Overview' : pathname.split('/').pop()?.replace(/-/g, ' ')}
                            </span>
                        </div>

                        <Outlet />
                    </motion.main>
                </div>
            </div>
        </div>
    );
}
