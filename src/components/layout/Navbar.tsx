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
    { label: 'Dashboard', href: '/dashboard' },
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
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${scrolled
                    ? 'glass border-b border-border/50 shadow-sm'
                    : 'bg-transparent'
                    }`}
            >
                <div className="container-wide">
                    <nav className="flex items-center justify-between h-16 lg:h-[72px]">
                        {/* Logo */}
                        <Link
                            to="/"
                            className="flex items-center gap-2.5 group"
                            aria-label="ThesisHub Home"
                        >
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground transition-transform duration-200 group-hover:scale-105">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <span className="font-display text-xl font-bold tracking-tight text-foreground">
                                ThesisHub
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    to={link.href}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 ${location.pathname === link.href
                                        ? 'text-primary bg-primary/5'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Desktop Actions */}
                        <div className="hidden lg:flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSearchOpen(true)}
                                className="gap-2 text-muted-foreground"
                            >
                                <Search className="w-4 h-4" />
                                <span className="text-xs">Search</span>
                                <kbd className="pointer-events-none hidden sm:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                                    ⌘K
                                </kbd>
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                className="text-muted-foreground"
                                aria-label="Toggle theme"
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </Button>

                            <div className="w-px h-6 bg-border mx-1" />

                            <Link to="/login">
                                <Button variant="ghost" size="sm">
                                    Log in
                                </Button>
                            </Link>
                            <Link to="/signup">
                                <Button size="sm" className="shadow-sm">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Actions */}
                        <div className="flex lg:hidden items-center gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setSearchOpen(true)}
                                aria-label="Search"
                            >
                                <Search className="w-4 h-4" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={toggleTheme}
                                aria-label="Toggle theme"
                            >
                                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setMobileOpen(!mobileOpen)}
                                aria-label="Toggle menu"
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
                            transition={{ duration: 0.2 }}
                            className="lg:hidden border-t border-border/50 glass overflow-hidden"
                        >
                            <div className="container-wide py-4 space-y-1">
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
                                <div className="pt-3 border-t border-border/50 mt-3 flex gap-2">
                                    <Link to="/login" className="flex-1">
                                        <Button variant="outline" className="w-full">
                                            Log in
                                        </Button>
                                    </Link>
                                    <Link to="/signup" className="flex-1">
                                        <Button className="w-full">Get Started</Button>
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
