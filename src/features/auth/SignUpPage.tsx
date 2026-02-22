import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ArrowRight, ArrowLeft, GraduationCap, Building2, Briefcase, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { UserRole } from '@/types';

interface RoleOption {
    role: UserRole;
    title: string;
    description: string;
    icon: React.ElementType;
}

const roles: RoleOption[] = [
    {
        role: 'student',
        title: 'Student',
        description: 'Browse thesis opportunities and share your research ideas',
        icon: GraduationCap,
    },
    {
        role: 'university',
        title: 'University',
        description: 'Post thesis projects and connect with talented students',
        icon: Building2,
    },
    {
        role: 'company',
        title: 'Company',
        description: 'Offer industry thesis projects and recruit top talent',
        icon: Briefcase,
    },
];

const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 40 : -40, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({ x: direction > 0 ? -40 : 40, opacity: 0 }),
};

export default function SignUpPage() {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [institution, setInstitution] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const goToStep2 = () => {
        if (!selectedRole) return;
        setDirection(1);
        setStep(2);
    };

    const goBack = () => {
        setDirection(-1);
        setStep(1);
    };

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

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!name.trim()) errs.name = 'Name is required';
        if (!email) errs.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'Enter a valid email';
        if (!password) errs.password = 'Password is required';
        else if (password.length < 8) errs.password = 'Must be at least 8 characters';
        if (password !== confirmPassword) errs.confirmPassword = 'Passwords do not match';
        if (!agreeTerms) errs.terms = 'You must agree to the terms';
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setIsLoading(true);
        await new Promise((r) => setTimeout(r, 1500));
        setIsLoading(false);
    };

    const strength = getPasswordStrength(password);
    const institutionLabel = selectedRole === 'student' ? 'University' : selectedRole === 'university' ? 'University name' : 'Company name';

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                    Create your account
                </h1>
                <p className="text-sm text-muted-foreground">
                    {step === 1 ? 'Choose how you want to use ThesisHub' : 'Fill in your details to get started'}
                </p>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2 mb-6">
                {[1, 2].map((s) => (
                    <div key={s} className="flex items-center gap-2">
                        <div className={`flex items-center justify-center w-7 h-7 rounded-full text-xs font-semibold transition-colors duration-200 ${s < step ? 'bg-primary text-primary-foreground' :
                                s === step ? 'bg-primary text-primary-foreground' :
                                    'bg-muted text-muted-foreground'
                            }`}>
                            {s < step ? <Check className="w-3.5 h-3.5" /> : s}
                        </div>
                        {s < 2 && <div className={`w-12 h-0.5 rounded-full transition-colors duration-200 ${s < step ? 'bg-primary' : 'bg-muted'}`} />}
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait" custom={direction}>
                {step === 1 ? (
                    <motion.div
                        key="step1"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2, ease: 'easeOut' as const }}
                    >
                        {/* Role cards */}
                        <div className="space-y-3 mb-6">
                            {roles.map((option) => {
                                const isSelected = selectedRole === option.role;
                                const Icon = option.icon;
                                return (
                                    <button
                                        key={option.role}
                                        onClick={() => setSelectedRole(option.role)}
                                        className={`w-full flex items-start gap-4 p-4 rounded-xl border-2 text-left transition-all duration-150 ${isSelected
                                                ? 'border-primary bg-primary/[0.04] shadow-sm'
                                                : 'border-border/60 hover:border-primary/30 hover:bg-accent/30'
                                            }`}
                                    >
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${isSelected ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                                            }`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className={`text-sm font-semibold mb-0.5 ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                                                {option.title}
                                            </p>
                                            <p className="text-xs text-muted-foreground leading-relaxed">
                                                {option.description}
                                            </p>
                                        </div>
                                        <div className={`w-5 h-5 rounded-full border-2 shrink-0 mt-0.5 flex items-center justify-center transition-colors ${isSelected ? 'border-primary bg-primary' : 'border-border'
                                            }`}>
                                            {isSelected && <Check className="w-3 h-3 text-primary-foreground" />}
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        <Button onClick={goToStep2} disabled={!selectedRole} className="w-full h-11 gap-2 text-sm font-medium shadow-sm">
                            Continue <ArrowRight className="w-4 h-4" />
                        </Button>

                        <p className="text-sm text-center text-muted-foreground mt-6">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2"
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.2, ease: 'easeOut' as const }}
                    >
                        {/* Social sign up */}
                        <div className="space-y-2.5 mb-6">
                            <Button variant="outline" className="w-full h-11 gap-3 text-sm font-medium" type="button">
                                <svg className="w-4 h-4" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Continue with Google
                            </Button>
                            <Button variant="outline" className="w-full h-11 gap-3 text-sm font-medium" type="button">
                                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" /></svg>
                                Continue with GitHub
                            </Button>
                        </div>

                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-border/60" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="bg-background px-3 text-muted-foreground">or continue with email</span>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-3.5">
                            <div>
                                <label htmlFor="name" className="text-sm font-medium text-foreground mb-1.5 block">Full name</label>
                                <Input
                                    id="name"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: '' })); }}
                                    className={`h-11 ${errors.name ? 'border-destructive' : ''}`}
                                />
                                {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
                            </div>

                            <div>
                                <label htmlFor="signup-email" className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
                                <Input
                                    id="signup-email"
                                    type="email"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: '' })); }}
                                    className={`h-11 ${errors.email ? 'border-destructive' : ''}`}
                                />
                                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
                            </div>

                            <div>
                                <label htmlFor="signup-institution" className="text-sm font-medium text-foreground mb-1.5 block">{institutionLabel}</label>
                                <Input
                                    id="signup-institution"
                                    placeholder={selectedRole === 'student' ? 'e.g. KTH Royal Institute' : selectedRole === 'university' ? 'e.g. Lund University' : 'e.g. Ericsson'}
                                    value={institution}
                                    onChange={(e) => setInstitution(e.target.value)}
                                    className="h-11"
                                />
                            </div>

                            <div>
                                <label htmlFor="signup-password" className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
                                <div className="relative">
                                    <Input
                                        id="signup-password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Min. 8 characters"
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: '' })); }}
                                        className={`h-11 pr-10 ${errors.password ? 'border-destructive' : ''}`}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" aria-label="Toggle password">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {/* Password strength */}
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
                                <label htmlFor="signup-confirm" className="text-sm font-medium text-foreground mb-1.5 block">Confirm password</label>
                                <Input
                                    id="signup-confirm"
                                    type="password"
                                    placeholder="••••••••"
                                    value={confirmPassword}
                                    onChange={(e) => { setConfirmPassword(e.target.value); setErrors((p) => ({ ...p, confirmPassword: '' })); }}
                                    className={`h-11 ${errors.confirmPassword ? 'border-destructive' : ''}`}
                                />
                                {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => { setAgreeTerms(e.target.checked); setErrors((p) => ({ ...p, terms: '' })); }}
                                    className="mt-0.5 w-4 h-4 rounded border-border accent-primary"
                                />
                                <span className="text-xs text-muted-foreground leading-relaxed">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                                </span>
                            </label>
                            {errors.terms && <p className="text-xs text-destructive">{errors.terms}</p>}

                            <div className="flex gap-2 pt-1">
                                <Button type="button" variant="outline" onClick={goBack} className="h-11 px-4">
                                    <ArrowLeft className="w-4 h-4" />
                                </Button>
                                <Button type="submit" className="flex-1 h-11 gap-2 text-sm font-medium shadow-sm" disabled={isLoading}>
                                    {isLoading ? (
                                        <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Create account
                                            <ArrowRight className="w-4 h-4" />
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>

                        <p className="text-sm text-center text-muted-foreground mt-5">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary font-medium hover:text-primary/80 transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
