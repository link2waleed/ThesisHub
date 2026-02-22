import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Mail, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) { setError('Email is required'); return; }
        if (!/\S+@\S+\.\S+/.test(email)) { setError('Enter a valid email'); return; }
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setIsLoading(false);
        setSubmitted(true);
    };

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
                                <Mail className="w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                Forgot your password?
                            </h1>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                No worries. Enter the email associated with your account and we'll send you a link to reset your password.
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="forgot-email" className="text-sm font-medium text-foreground mb-1.5 block">
                                    Email address
                                </label>
                                <Input
                                    id="forgot-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setError(''); }}
                                    className={`h-11 ${error ? 'border-destructive' : ''}`}
                                    autoFocus
                                />
                                {error && (
                                    <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-destructive mt-1.5">
                                        {error}
                                    </motion.p>
                                )}
                            </div>

                            <Button type="submit" className="w-full h-11 text-sm font-medium shadow-sm" disabled={isLoading}>
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                ) : (
                                    'Send reset link'
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 text-center">
                            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back to login
                            </Link>
                        </div>
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
                            Check your email
                        </h2>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xs mx-auto">
                            We've sent a password reset link to <span className="font-medium text-foreground">{email}</span>. The link will expire in 60 minutes.
                        </p>

                        <Button variant="outline" className="h-11 gap-2 text-sm mb-4" onClick={() => { setSubmitted(false); setEmail(''); }}>
                            <Mail className="w-4 h-4" />
                            Try a different email
                        </Button>

                        <div className="text-center">
                            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                                <ArrowLeft className="w-3.5 h-3.5" />
                                Back to login
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
