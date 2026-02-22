import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, Lock, CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ResetPasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState<{ password?: string; confirm?: string }>({});

    const getPasswordStrength = (pw: string): { label: string; color: string; width: string } => {
        if (pw.length === 0) return { label: '', color: '', width: '0%' };
        let score = 0;
        if (pw.length >= 8) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        if (score <= 1) return { label: 'Weak', color: 'bg-rose-500', width: '25%' };
        if (score === 2) return { label: 'Fair', color: 'bg-amber-500', width: '50%' };
        if (score === 3) return { label: 'Good', color: 'bg-emerald-400', width: '75%' };
        return { label: 'Strong', color: 'bg-emerald-500', width: '100%' };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const errs: typeof errors = {};
        if (!password) errs.password = 'Password is required';
        else if (password.length < 8) errs.password = 'Must be at least 8 characters';
        if (password !== confirmPassword) errs.confirm = 'Passwords do not match';
        setErrors(errs);
        if (Object.keys(errs).length > 0) return;

        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setIsLoading(false);
        setSubmitted(true);
    };

    const strength = getPasswordStrength(password);

    return (
        <div>
            <AnimatePresence mode="wait">
                {!submitted ? (
                    <motion.div
                        key="form"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.2, ease: 'easeOut' as const }}
                    >
                        {/* Header */}
                        <div className="mb-8">
                            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                                <Lock className="w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                Set new password
                            </h1>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Choose a strong password that you haven't used before. Must be at least 8 characters.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="new-password" className="text-sm font-medium text-foreground mb-1.5 block">
                                    New password
                                </label>
                                <div className="relative">
                                    <Input
                                        id="new-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Min. 8 characters"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
                                        className={`h-11 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                                        autoFocus
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle password">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {/* Strength meter */}
                                {password.length > 0 && (
                                    <div className="mt-2">
                                        <div className="h-1 bg-muted rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: strength.width }}
                                                transition={{ duration: 0.3 }}
                                                className={`h-full rounded-full ${strength.color}`}
                                            />
                                        </div>
                                        <p className="text-xs text-muted-foreground mt-1">{strength.label}</p>
                                    </div>
                                )}
                                {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
                            </div>

                            <div>
                                <label htmlFor="confirm-new-password" className="text-sm font-medium text-foreground mb-1.5 block">
                                    Confirm new password
                                </label>
                                <Input
                                    id="confirm-new-password"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirm: undefined })); }}
                                    className={`h-11 ${errors.confirm ? 'border-destructive' : ''}`}
                                />
                                {errors.confirm && <p className="text-xs text-destructive mt-1">{errors.confirm}</p>}
                            </div>

                            <Button type="submit" className="w-full h-11 text-sm font-medium shadow-sm mt-2" disabled={isLoading}>
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    'Reset password'
                                )}
                            </Button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' as const }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 className="w-8 h-8" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                            Password reset successful
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs mx-auto">
                            Your password has been updated. You can now sign in with your new password.
                        </p>

                        <Link to="/login">
                            <Button className="h-11 gap-2 text-sm font-medium shadow-sm">
                                Sign in to your account
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
