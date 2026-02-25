import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    GraduationCap,
    Menu,
    X,
    Search,
    Moon,
    Sun,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useThemeStore } from '@/stores';
import { useKeyboardShortcut } from '@/hooks';
import { GlobalSearchCommand } from '@/components/ui/GlobalSearchCommand';

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Thesis', href: '/thesis' },
    { label: 'Internships', href: '/internships' },
    { label: 'About', href: '/about' },
];

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { isDark, toggleTheme } = useThemeStore();
    const location = useLocation();

    useKeyboardShortcut('k', () => setSearchOpen(true), { meta: true });
    useKeyboardShortcut('k', () => setSearchOpen(true), { ctrl: true });

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    return (
        <>
            {/* ── Floating Navbar Wrapper ── */}
            <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
                <div
                    className={`
                        flex justify-center
                        px-4 sm:px-6
                        transition-all duration-500 ease-out
                        ${isScrolled ? 'pt-3' : 'pt-4'}
                    `}
                >
                    <nav
                        className={`
                            pointer-events-auto
                            w-full max-w-7xl
                            rounded-2xl
                            transition-all duration-500 ease-out
                            px-4 sm:px-5 lg:px-6
                            flex items-center justify-between
                            h-14 lg:h-[60px]
                            ${isScrolled
                                ? [
                                    'bg-background/85 dark:bg-background/80',
                                    'backdrop-blur-xl backdrop-saturate-150',
                                    'border border-border/50 dark:border-border/30',
                                    'shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]',
                                ].join(' ')
                                : [
                                    'bg-background/60 dark:bg-background/50',
                                    'backdrop-blur-md backdrop-saturate-125',
                                    'border border-transparent',
                                    'shadow-none',
                                ].join(' ')
                            }
                        `}
                    >

                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 group shrink-0"
                            aria-label="ThesisHub Home"
                        >
                            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
                                <GraduationCap className="w-[18px] h-[18px]" />
                            </div>
                            <span className="font-display text-lg font-bold tracking-tight text-foreground">
                                ThesisHub
                            </span>
                        </Link>

                        {/* Desktop Nav — centered pill group */}
                        <div className="hidden lg:flex items-center gap-0.5 bg-accent/40 dark:bg-accent/30 border border-border/30 dark:border-border/20 rounded-xl px-1 py-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`px-3.5 py-1.5 text-[13px] font-medium rounded-lg transition-all duration-150 ${location.pathname === link.href
                                        ? 'text-foreground bg-background shadow-sm dark:shadow-md dark:shadow-black/10'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-1">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSearchOpen(true)}
                                className="gap-2 text-muted-foreground hover:text-foreground px-2.5 h-8"
                            >
                                <Search className="w-3.5 h-3.5" />
                                <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                                    ⌘K
                                </kbd>
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="text-muted-foreground hover:text-foreground h-8 w-8"
                                aria-label="Toggle theme"
                            >
                                {isDark ? <Sun className="w-3.5 h-3.5" /> : <Moon className="w-3.5 h-3.5" />}
                            </Button>

                            {/* Divider */}
                            <div className="w-px h-4 bg-border/60 mx-1" />

                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-3 h-8 text-[13px]">
                                    Log in
                                </Button>
                            </Link>
                            <Link to="/dashboard">
                                <Button size="sm" className="shadow-sm px-4 h-8 text-[13px] rounded-lg">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex lg:hidden items-center gap-0.5">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSearchOpen(true)}
                                aria-label="Search"
                                className="text-muted-foreground h-8 w-8"
                            >
                                <Search className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                                className="text-muted-foreground h-8 w-8"
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Toggle menu"
                                className="text-muted-foreground h-8 w-8"
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </div>
                    </nav>

                    {/* Mobile Drawer — inside the floating container  */}
                    <AnimatePresence>
                        {mobileOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                animate={{ opacity: 1, height: 'auto', marginTop: 8 }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.25, ease: 'easeInOut' }}
                                className="
                                    pointer-events-auto
                                    lg:hidden
                                    w-full max-w-7xl
                                    rounded-2xl overflow-hidden
                                    bg-background/90 dark:bg-background/85
                                    backdrop-blur-xl backdrop-saturate-150
                                    border border-border/50 dark:border-border/30
                                    shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.25)]
                                    absolute top-full left-4 right-4 sm:left-6 sm:right-6
                                "
                                style={{ maxWidth: 'calc(100% - 2rem)' }}
                            >
                                <div className="px-4 sm:px-5 py-4 space-y-1">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.href}
                                            to={link.href}
                                            className={`block px-4 py-2.5 text-sm font-medium rounded-xl transition-colors ${location.pathname === link.href
                                                ? 'text-primary bg-primary/5'
                                                : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
                                                }`}
                                        >
                                            {link.label}
                                        </Link>
                                    ))}
                                    <div className="pt-3 border-t border-border/40 mt-3 flex gap-2.5">
                                        <Link to="/login" className="flex-1">
                                            <Button variant="outline" className="w-full rounded-xl h-10">
                                                Log in
                                            </Button>
                                        </Link>
                                        <Link to="/dashboard" className="flex-1">
                                            <Button className="w-full shadow-sm rounded-xl h-10">Get Started</Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </header>

            {/* Spacer to prevent content from being hidden behind the floating navbar */}
            <div className="h-20 lg:h-24" />

            <GlobalSearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
        </>
    );
}