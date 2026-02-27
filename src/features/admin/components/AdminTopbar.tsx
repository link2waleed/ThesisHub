import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Bell, ChevronDown, LogOut, Settings, Menu } from 'lucide-react';
import { useAuthStore } from '@/stores';

interface AdminTopbarProps {
    onMenuClick: () => void;
}

export function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
    const [profileOpen, setProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { user, logout } = useAuthStore();

    const initials = user?.name
        ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
        : 'AD';

    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setProfileOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <header className="sticky top-0 z-30 h-16 flex items-center justify-between gap-4 px-4 lg:px-6 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
            {/* Left */}
            <div className="flex items-center gap-3 flex-1">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="relative hidden sm:block max-w-md flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search thesis, internships, users..."
                        className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 focus:border-slate-400 dark:focus:border-slate-600 transition-all"
                    />
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
                {/* Notifications */}
                <button className="relative p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors">
                    <Bell className="w-[18px] h-[18px]" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                </button>

                {/* Profile dropdown */}
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-2 pl-2 pr-1 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                        <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 text-xs font-bold">
                            {initials}
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 leading-tight">{user?.name || 'Admin'}</p>
                            <p className="text-[10px] text-slate-400 leading-tight capitalize">{user?.role || 'Admin'}</p>
                        </div>
                        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {profileOpen && (
                        <div className="absolute right-0 mt-2 w-48 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-lg py-1 z-50">
                            <button
                                onClick={() => { setProfileOpen(false); navigate('/admin/settings'); }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <Settings className="w-4 h-4" /> Settings
                            </button>
                            <div className="border-t border-slate-100 dark:border-slate-800 my-1" />
                            <button
                                onClick={() => { setProfileOpen(false); logout(); navigate('/login'); }}
                                className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                            >
                                <LogOut className="w-4 h-4" /> Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
