import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, cubicBezier } from 'framer-motion';
import type { Variants } from 'framer-motion';
import {
    Search,
    ArrowRight,
    GraduationCap,
    Building2,
    Users,
    Briefcase,
    ChevronRight,
    Lightbulb,
    CheckCircle2,
    Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThesisCard } from '@/components/cards/ThesisCard';
import { IdeaCard } from '@/components/cards/IdeaCard';
import {
    theses,
    thesisIdeas,
    testimonials,
    platformStats,
    trustedByLogos,
} from '@/data/mockData';

// ── Animation Variants ──
const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const stagger: Variants = {
    visible: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-80px' });
    return (
        <motion.section
            ref={ref}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={stagger}
            className={className}
        >
            {children}
        </motion.section>
    );
}

// ══════════════════════════════════════════════════
// 1. HERO SECTION
// ══════════════════════════════════════════════════
function HeroSection() {
    return (
        <section className="relative overflow-hidden">
            {/* Subtle background pattern */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] to-transparent" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/[0.04] rounded-full blur-3xl" />
            </div>

            <div className="container-wide pt-16 pb-20 lg:pt-24 lg:pb-28">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div variants={fadeUp} initial="hidden" animate="visible">
                        <Badge variant="outline" className="mb-6 px-4 py-1.5 text-sm font-medium">
                            <Lightbulb className="w-3.5 h-3.5 mr-1.5" />
                            Where Academic Ideas Meet Industry Impact
                        </Badge>
                    </motion.div>

                    <motion.h1
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground mb-6 text-balance leading-[1.1]"
                        style={{ fontFamily: 'var(--font-display)' }}
                    >
                        Find Your Perfect{' '}
                        <span className="text-primary">Thesis Opportunity</span>
                    </motion.h1>

                    <motion.p
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Connect with leading universities and companies across Scandinavia.
                        Discover thesis projects that launch careers, or share your research
                        ideas with organizations ready to invest.
                    </motion.p>

                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
                    >
                        <Link to="/thesis">
                            <Button size="lg" className="gap-2 text-base px-8 shadow-md shadow-primary/10">
                                Browse Thesis
                                <ArrowRight className="w-4 h-4" />
                            </Button>
                        </Link>
                        <Link to="/ideas">
                            <Button variant="outline" size="lg" className="gap-2 text-base px-8">
                                <Lightbulb className="w-4 h-4" />
                                Post Your Idea
                            </Button>
                        </Link>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        className="max-w-xl mx-auto"
                    >
                        <div className="flex items-center gap-2 p-2 rounded-xl border border-border/50 bg-card shadow-sm">
                            <div className="flex items-center gap-2 flex-1 pl-3">
                                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                                <input
                                    type="text"
                                    placeholder="Search thesis by field, topic, or company..."
                                    className="w-full text-sm bg-transparent border-0 outline-none placeholder:text-muted-foreground/60"
                                    onFocus={(e) => {
                                        e.target.blur();
                                        // Trigger command palette
                                        const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true });
                                        document.dispatchEvent(event);
                                    }}
                                />
                            </div>
                            <Button size="sm" className="shrink-0 shadow-sm">
                                Search
                            </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            Popular: Machine Learning, Sustainability, 5G, Fintech, Biotech
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ══════════════════════════════════════════════════
// 2. STATS SECTION
// ══════════════════════════════════════════════════
function StatsSection() {
    const stats = [
        { icon: GraduationCap, label: 'Thesis Opportunities', value: platformStats.thesis, suffix: '+' },
        { icon: Building2, label: 'Universities', value: platformStats.universities, suffix: '+' },
        { icon: Users, label: 'Active Students', value: platformStats.students, suffix: '+', format: true },
        { icon: Briefcase, label: 'Partner Companies', value: platformStats.companies, suffix: '+' },
    ];

    return (
        <AnimatedSection className="border-y border-border/50 bg-card/50">
            <div className="container-wide py-12 lg:py-16">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat) => (
                        <motion.div
                            key={stat.label}
                            variants={fadeUp}
                            className="text-center"
                        >
                            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/5 text-primary mb-3">
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <p className="text-3xl sm:text-4xl font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                                {stat.format ? `${(stat.value / 1000).toFixed(1)}k` : stat.value}{stat.suffix}
                            </p>
                            <p className="text-sm text-muted-foreground">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}

// ══════════════════════════════════════════════════
// 3. FEATURED THESIS
// ══════════════════════════════════════════════════
function FeaturedThesisSection() {
    const featured = theses.filter((t) => t.featured);

    return (
        <AnimatedSection className="relative py-8 sm:py-10 lg:py-14 overflow-hidden">
            {/* Subtle background texture — mirrors FeaturedIdeasSection */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.06),transparent)] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

                {/* Section Header */}
                <motion.div
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16"
                >
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Badge
                                variant="secondary"
                                className="text-xs font-medium tracking-wide uppercase px-3 py-1"
                            >
                                Featured
                            </Badge>
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl lg:text-[1.75rem] font-bold leading-tight tracking-tight"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Top Thesis Opportunities
                        </h2>
                        <p className="text-muted-foreground mt-3 text-base sm:text-lg leading-relaxed">
                            Hand-picked thesis projects from leading organizations, updated weekly.
                        </p>
                    </div>

                    <Link to="/thesis" className="hidden sm:flex shrink-0">
                        <Button
                            variant="outline"
                            className="gap-2 text-sm font-medium rounded-full px-5 h-10 border-border/60 hover:border-border transition-colors"
                        >
                            View All Theses
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {featured.map((thesis, index) => (
                        <motion.div
                            key={thesis.id}
                            variants={fadeUp}
                            custom={index}
                            className="h-full"
                        >
                            <ThesisCard thesis={thesis} featured />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile CTA */}
                <motion.div variants={fadeUp} className="sm:hidden flex justify-center mt-10">
                    <Link to="/thesis">
                        <Button
                            variant="outline"
                            className="gap-2 rounded-full px-6 h-11 border-border/60 font-medium"
                        >
                            View All Theses
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>

            </div>
        </AnimatedSection>
    );
}

// ══════════════════════════════════════════════════
// 4. FEATURED IDEAS
// ══════════════════════════════════════════════════
function FeaturedIdeasSection() {
    const featured = thesisIdeas.filter((i) => i.featured);

    return (
        <AnimatedSection className="relative py-8 sm:py-10 lg:py-14 bg-card/50 border-y border-border/30 overflow-hidden">
            {/* Subtle background texture */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,hsl(var(--primary)/0.06),transparent)] pointer-events-none" />

            <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">

                {/* Section Header */}
                <motion.div
                    variants={fadeUp}
                    className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 lg:mb-16"
                >
                    <div className="max-w-xl">
                        <div className="flex items-center gap-2 mb-4">
                            <Badge
                                variant="secondary"
                                className="text-xs font-medium tracking-wide uppercase px-3 py-1"
                            >
                                Innovation
                            </Badge>
                        </div>
                        <h2
                            className="text-2xl sm:text-3xl lg:text-[1.75rem] font-bold leading-tight tracking-tight"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Student Thesis Ideas
                        </h2>
                        <p className="text-muted-foreground mt-3 text-base sm:text-lg leading-relaxed">
                            Innovative research proposals from talented students seeking funding and partnerships.
                        </p>
                    </div>

                    <Link to="/ideas" className="hidden sm:flex shrink-0">
                        <Button
                            variant="outline"
                            className="gap-2 text-sm font-medium rounded-full px-5 h-10 border-border/60 hover:border-border transition-colors"
                        >
                            Explore All Ideas
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                    {featured.map((idea, index) => (
                        <motion.div
                            key={idea.id}
                            variants={fadeUp}
                            custom={index}
                            className="h-full"
                        >
                            <IdeaCard idea={idea} featured />
                        </motion.div>
                    ))}
                </div>

                {/* Mobile CTA */}
                <motion.div variants={fadeUp} className="sm:hidden flex justify-center mt-10">
                    <Link to="/ideas">
                        <Button
                            variant="outline"
                            className="gap-2 rounded-full px-6 h-11 border-border/60 font-medium"
                        >
                            Explore All Ideas
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </Link>
                </motion.div>

            </div>
        </AnimatedSection>
    );
}

// ══════════════════════════════════════════════════
// 5. HOW IT WORKS
// ══════════════════════════════════════════════════
function HowItWorksSection() {
    const steps = [
        {
            number: '01',
            title: 'Discover',
            description: 'Browse thesis opportunities from top universities and companies, or explore innovative student ideas.',
            icon: Search,
        },
        {
            number: '02',
            title: 'Connect',
            description: 'Apply directly to thesis projects or connect with students whose ideas align with your research goals.',
            icon: Users,
        },
        {
            number: '03',
            title: 'Achieve',
            description: 'Complete your thesis with industry backing, gain real-world experience, and launch your career.',
            icon: CheckCircle2,
        },
    ];

    return (
        <AnimatedSection className="section-padding py-8 sm:py-10 lg:py-14 border-b border-border/30">
            <div className="container-wide">
                <motion.div variants={fadeUp} className="text-center mb-12 lg:mb-16">
                    <Badge variant="secondary" className="mb-3 text-xs">How It Works</Badge>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                        Three Steps to Your Future
                    </h2>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Whether you're a student, university, or company — getting started is simple.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
                    {steps.map((step) => (
                        <motion.div key={step.number} variants={fadeUp} className="text-center group">
                            <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/5 text-primary mb-5 group-hover:bg-primary/10 transition-colors duration-200">
                                <step.icon className="w-7 h-7" />
                                <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                                    {step.number}
                                </span>
                            </div>
                            <h4 className="text-lg font-semibold mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                {step.title}
                            </h4>
                            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mx-auto">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}

// ══════════════════════════════════════════════════
// 6. TRUSTED BY
// ══════════════════════════════════════════════════
const fadeUp0 = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: cubicBezier(0.22, 1, 0.36, 1) }
    },
};

function TrustedBySection() {
    const loopedLogos = [...trustedByLogos, ...trustedByLogos];

    return (
        <section className="trusted-root" style={{ borderTop: '1px solid hsl(var(--border) / 0.3)', borderBottom: '1px solid hsl(var(--border) / 0.3)' }}>
            <div className="inner">
                {/* label */}
                <motion.p
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    variants={fadeUp0}
                    className="label"
                >
                    Trusted by leading institutions
                </motion.p>

                {/* marquee track */}
                <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    variants={fadeUp0}
                    className="marquee-wrapper"
                >
                    <div className="fade fade-left" aria-hidden="true" />

                    <div className="marquee-track">
                        {/* Accessible fallback for screen readers */}
                        <ul className="sr-only">
                            {trustedByLogos.map((logo) => (
                                <li key={logo}>{logo}</li>
                            ))}
                        </ul>

                        {/* Visual marquee hidden from assistive tech */}
                        <ul className="marquee-list" aria-hidden="true">
                            {loopedLogos.map((logo, i) => (
                                <li key={i} className="logo-item">
                                    <span className="separator" />
                                    <span className="logo-text">{logo}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="fade fade-right" aria-hidden="true" />
                </motion.div>
            </div>

            <style>{`
                .trusted-root {
                    padding: 0;
                    position: relative;
                }

                .inner {
                    padding: 2rem 0 2.25rem;
                }

                .label {
                    text-align: center;
                    font-size: 0.6875rem;
                    letter-spacing: 0.18em;
                    text-transform: uppercase;
                    color: hsl(var(--muted-foreground) / 0.45);
                    font-weight: 500;
                    margin-bottom: 2.75rem;
                    font-family: var(--font-display, inherit);
                }

                .marquee-wrapper {
                    position: relative;
                    overflow: hidden;
                }

                .marquee-track {
                    width: 100%;
                }

                .marquee-list {
                    display: flex;
                    align-items: center;
                    width: max-content;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    animation: marquee-scroll 28s linear infinite;
                }

                .marquee-list:hover {
                    animation-play-state: paused;
                }

                @keyframes marquee-scroll {
                    0%   { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }

                .logo-item {
                    display: flex;
                    align-items: center;
                    padding: 0;
                    white-space: nowrap;
                }

                .separator {
                    display: inline-block;
                    width: 1px;
                    height: 1rem;
                    background: hsl(var(--border) / 0.3);
                    margin: 0 2.5rem;
                    flex-shrink: 0;
                }

                .logo-text {
                    font-family: var(--font-display);
                    font-size: 0.9375rem;
                    font-weight: 600;
                    letter-spacing: 0.02em;
                    color: hsl(var(--muted-foreground) / 0.35);
                    cursor: default;
                    position: relative;
                    overflow: hidden;
                    transition: color 0.3s ease, text-shadow 0.3s ease;
                }

                .logo-text::after {
                    content: "";
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(
                        105deg,
                        transparent 20%,
                        hsl(var(--foreground) / 0.12) 50%,
                        transparent 80%
                    );
                    background-size: 200% 100%;
                    background-position: -100% 0;
                    transition: background-position 0.5s ease, opacity 0.3s ease;
                    opacity: 0;
                    pointer-events: none;
                }

                .logo-item:hover .logo-text {
                    color: hsl(var(--muted-foreground) / 0.75);
                    text-shadow: 0 0 20px hsl(var(--foreground) / 0.06);
                }

                .logo-item:hover .logo-text::after {
                    opacity: 1;
                    background-position: 200% 0;
                }

                .fade {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    width: 9rem;
                    pointer-events: none;
                    z-index: 2;
                }

                .fade-left {
                    left: 0;
                    background: linear-gradient(90deg, hsl(var(--background)) 0%, transparent 100%);
                }

                .fade-right {
                    right: 0;
                    background: linear-gradient(270deg, hsl(var(--background)) 0%, transparent 100%);
                }

                .sr-only {
                    position: absolute;
                    width: 1px;
                    height: 1px;
                    padding: 0;
                    margin: -1px;
                    overflow: hidden;
                    clip: rect(0, 0, 0, 0);
                    white-space: nowrap;
                    border: 0;
                    list-style: none;
                }

                @media (prefers-reduced-motion: reduce) {
                    .marquee-list {
                        animation: none;
                        flex-wrap: wrap;
                        justify-content: center;
                        width: 100%;
                    }
                    .fade { display: none; }
                }
            `}</style>
        </section>
    );
}

// ══════════════════════════════════════════════════
// 7. TESTIMONIALS
// ══════════════════════════════════════════════════
function TestimonialsSection() {
    return (
        <AnimatedSection className="section-padding py-8 sm:py-10 lg:py-14 border-t border-border/40">
            <div className="container-wide">
                <motion.div variants={fadeUp} className="text-center mb-12">
                    <Badge variant="secondary" className="mb-3 text-xs">Testimonials</Badge>
                    <h2 className="text-2xl sm:text-3xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                        What Our Community Says
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {testimonials.map((t) => (
                        <motion.div
                            key={t.id}
                            variants={fadeUp}
                            className="card-elevated p-6"
                        >
                            <Quote className="w-8 h-8 text-primary/20 mb-4" />
                            <p className="text-sm text-foreground leading-relaxed mb-6">
                                "{t.quote}"
                            </p>
                            <div className="flex items-center gap-3 pt-4 border-t border-border/40">
                                <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-semibold">
                                    {t.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{t.name}</p>
                                    <p className="text-xs text-muted-foreground">{t.role} · {t.organization}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </AnimatedSection>
    );
}

// ══════════════════════════════════════════════════
// 8. FINAL CTA
// ══════════════════════════════════════════════════
function FinalCTASection() {
    return (
        <AnimatedSection className="section-padding border-t border-border/40 py-12 sm:py-14 lg:py-18">
            <div className="container-narrow">
                <motion.div
                    variants={fadeUp}
                    className="relative rounded-2xl bg-primary px-8 py-16 sm:px-12 sm:py-20 text-center overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute inset-0 -z-0">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
                        <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
                    </div>

                    <div className="relative z-10">
                        <h2
                            className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary-foreground mb-4"
                            style={{ fontFamily: 'var(--font-display)' }}
                        >
                            Ready to Start Your Research Journey?
                        </h2>
                        <p className="text-primary-foreground/80 max-w-lg mx-auto mb-8 text-sm sm:text-base leading-relaxed">
                            Join thousands of students and organizations building the future through
                            academic collaboration. Your next breakthrough starts here.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                            <Link to="/signup">
                                <Button
                                    size="lg"
                                    className="cta-btn-fill gap-2 text-base px-8 font-semibold transition-all duration-200 hover:-translate-y-px"
                                >
                                    Create Free Account
                                    <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link to="/thesis">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="cta-btn-outline gap-2 text-base px-8 font-medium transition-all duration-200"
                                >
                                    Browse Thesis
                                </Button>
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
                /* Light mode: bg-primary is dark → buttons are light */
                .cta-btn-fill {
                    background: oklch(0.984 0.003 247.858) !important;
                    color: oklch(0.208 0.042 265.755) !important;
                    border: none !important;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.18);
                }
                .cta-btn-fill:hover {
                    background: oklch(0.94 0.006 248) !important;
                    box-shadow: 0 6px 24px rgba(0,0,0,0.22);
                }

                .cta-btn-outline {
                    background: transparent !important;
                    color: oklch(0.984 0.003 247.858) !important;
                    border: 1px solid oklch(0.984 0.003 247.858 / 0.3) !important;
                }
                .cta-btn-outline:hover {
                    background: oklch(0.984 0.003 247.858 / 0.1) !important;
                    border-color: oklch(0.984 0.003 247.858 / 0.5) !important;
                }

                /* Dark mode: bg-primary is light → buttons are dark */
                .dark .cta-btn-fill {
                    background: oklch(0.208 0.042 265.755) !important;
                    color: oklch(0.984 0.003 247.858) !important;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.3);
                }
                .dark .cta-btn-fill:hover {
                    background: oklch(0.26 0.042 265) !important;
                    box-shadow: 0 6px 24px rgba(0,0,0,0.35);
                }

                .dark .cta-btn-outline {
                    color: oklch(0.208 0.042 265.755) !important;
                    border-color: oklch(0.208 0.042 265.755 / 0.3) !important;
                }
                .dark .cta-btn-outline:hover {
                    background: oklch(0.208 0.042 265.755 / 0.08) !important;
                    border-color: oklch(0.208 0.042 265.755 / 0.5) !important;
                }
            `}</style>
        </AnimatedSection>
    );
}

// ══════════════════════════════════════════════════
// LANDING PAGE
// ══════════════════════════════════════════════════
export default function LandingPage() {
    return (
        <>
            <HeroSection />
            <StatsSection />
            <FeaturedThesisSection />
            <FeaturedIdeasSection />
            <HowItWorksSection />
            <TrustedBySection />
            <TestimonialsSection />
            <FinalCTASection />
        </>
    );
}
