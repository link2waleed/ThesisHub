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
    { label: 'Browse Thesis', href: '/thesis' },
    { label: 'Thesis Ideas', href: '/ideas' },
    { label: 'About', href: '/about' },
];

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const { isDark, toggleTheme } = useThemeStore();
    const location = useLocation();

    useKeyboardShortcut('k', () => setSearchOpen(true), { meta: true });
    useKeyboardShortcut('k', () => setSearchOpen(true), { ctrl: true });

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setMobileOpen(false);
    }, [location.pathname]);

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                    ? 'glass border-b border-border/50 shadow-sm'
                    : 'bg-background/80 backdrop-blur-sm'
                    }`}
            >
                <div className="container-wide px-6 md:px-10 lg:px-16">
                    <nav className="flex items-center justify-between h-16 lg:h-[76px]">

                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-3 group"
                            aria-label="ThesisHub Home"
                        >
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground shadow-sm transition-transform duration-200 group-hover:scale-105">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <span className="font-display text-xl font-bold tracking-tight text-foreground">
                                ThesisHub
                            </span>
                        </Link>

                        {/* Desktop Nav — centered pill group */}
                        <div className="hidden lg:flex items-center gap-0.5 bg-accent/50 border border-border/40 rounded-xl px-1.5 py-1.5">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${location.pathname === link.href
                                        ? 'text-primary bg-background shadow-sm'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-background/60'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-1.5">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSearchOpen(true)}
                                className="gap-2 text-muted-foreground hover:text-foreground px-3"
                            >
                                <Search className="w-4 h-4" />
                                <span className="text-xs text-muted-foreground">Search</span>
                                <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                                    ⌘K
                                </kbd>
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="text-muted-foreground hover:text-foreground"
                                aria-label="Toggle theme"
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </Button>

                            {/* Divider */}
                            <div className="w-px h-5 bg-border/70 mx-1" />

                            <Link to="/login">
                                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground px-4">
                                    Log in
                                </Button>
                            </Link>
                            <Link to="/dashboard">
                                <Button size="sm" className="shadow-sm px-4">
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
                                className="text-muted-foreground"
                            >
                                <Search className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                                className="text-muted-foreground"
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Toggle menu"
                                className="text-muted-foreground"
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </Button>
                        </div>
                    </nav>
                </div>

                {/* Mobile Drawer */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                            className="lg:hidden border-t border-border/50 glass overflow-hidden"
                        >
                            <div className="px-6 md:px-10 py-5 space-y-1">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        to={link.href}
                                        className={`block px-4 py-3 text-sm font-medium rounded-lg transition-colors ${location.pathname === link.href
                                            ? 'text-primary bg-primary/5'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <div className="pt-4 border-t border-border/50 mt-4 flex gap-2.5">
                                    <Link to="/login" className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            Log in
                                        </Button>
                                    </Link>
                                    <Link to="/dashboard" className="flex-1">
                                        <Button className="w-full shadow-sm">Get Started</Button>
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>

            <GlobalSearchCommand open={searchOpen} onOpenChange={setSearchOpen} />
        </>
    );
}