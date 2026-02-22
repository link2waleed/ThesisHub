import { Outlet, Link } from 'react-router-dom';
import { GraduationCap, Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonial = {
    quote: 'ThesisHub connected me with my dream thesis at Ericsson. The platform made it incredibly easy to find relevant opportunities in my field.',
    name: 'Anna Svensson',
    role: 'MSc Graduate',
    org: 'KTH → Ericsson',
};

export function AuthLayout() {
    return (
        <div className="min-h-screen flex">
            {/* ── Left Branded Panel ── */}
            <div className="hidden lg:flex lg:w-[480px] xl:w-[520px] relative flex-col justify-between bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-10 xl:p-12 overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />

                {/* Logo + tagline */}
                <div className="relative z-10">
                    <Link to="/" className="flex items-center gap-2.5 group mb-8">
                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 transition-transform duration-200 group-hover:scale-105">
                            <GraduationCap className="w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-display)' }}>
                            ThesisHub
                        </span>
                    </Link>

                    <h2 className="text-2xl xl:text-3xl font-bold leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                        Where Academic Ideas<br />
                        Meet Industry Impact
                    </h2>
                    <p className="text-white/60 text-sm leading-relaxed max-w-sm">
                        Join thousands of students, universities, and companies collaborating on meaningful thesis projects across Scandinavia.
                    </p>
                </div>

                {/* Stats */}
                <div className="relative z-10 flex gap-8 my-8">
                    {[
                        { value: '420+', label: 'Opportunities' },
                        { value: '60+', label: 'Organizations' },
                        { value: '2.5K+', label: 'Students' },
                    ].map((stat) => (
                        <div key={stat.label}>
                            <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{stat.value}</p>
                            <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Testimonial */}
                <div className="relative z-10">
                    <div className="rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/[0.08] p-6">
                        <Quote className="w-5 h-5 text-indigo-400/60 mb-3" />
                        <p className="text-sm text-white/70 leading-relaxed mb-4 italic">
                            "{testimonial.quote}"
                        </p>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center text-xs font-semibold">
                                {testimonial.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-white/90">{testimonial.name}</p>
                                <p className="text-xs text-white/40">{testimonial.role} · {testimonial.org}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Right Form Panel ── */}
            <div className="flex-1 flex flex-col">
                {/* Mobile logo bar */}
                <div className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-border/50">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
                            <GraduationCap className="w-4 h-4" />
                        </div>
                        <span className="font-bold text-lg" style={{ fontFamily: 'var(--font-display)' }}>
                            ThesisHub
                        </span>
                    </Link>
                </div>

                {/* Form area */}
                <div className="flex-1 flex items-center justify-center px-5 py-8 sm:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: 'easeOut' as const }}
                        className="w-full max-w-[420px]"
                    >
                        <Outlet />
                    </motion.div>
                </div>

                {/* Footer */}
                <div className="px-5 py-4 text-center border-t border-border/30">
                    <p className="text-xs text-muted-foreground">
                        © {new Date().getFullYear()} ThesisHub. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}
