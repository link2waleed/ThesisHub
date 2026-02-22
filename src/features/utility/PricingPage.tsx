import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Sparkles, ArrowRight, Building2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const plans = [
    {
        name: 'Starter',
        desc: 'Perfect for getting started',
        price: 'Free',
        period: '',
        cta: 'Get started',
        popular: false,
        features: ['Browse all thesis opportunities', 'Apply to up to 5 theses/month', 'Basic profile', 'Community access', 'Email support'],
    },
    {
        name: 'Professional',
        desc: 'For active thesis seekers',
        price: '€19',
        period: '/month',
        cta: 'Start free trial',
        popular: true,
        features: ['Everything in Starter', 'Unlimited applications', 'Enhanced profile with portfolio', 'Priority in search results', 'Direct messaging', 'Thesis idea publishing', 'Application analytics'],
    },
    {
        name: 'Enterprise',
        desc: 'For universities & companies',
        price: '€99',
        period: '/month',
        cta: 'Contact sales',
        popular: false,
        features: ['Everything in Professional', 'Post unlimited opportunities', 'Advanced student search', 'Custom branding', 'API access', 'Dedicated account manager', 'Priority support', 'Analytics dashboard'],
    },
];

export default function PricingPage() {
    const [annual, setAnnual] = useState(false);

    return (
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {/* Header */}
                <div className="text-center mb-12">
                    <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs gap-1.5">
                        <Sparkles className="w-3 h-3" />
                        Simple pricing
                    </Badge>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                        Plans for every stage
                    </h1>
                    <p className="text-muted-foreground max-w-lg mx-auto mb-6">
                        Whether you're a student exploring opportunities or an organization seeking talent, we have a plan for you.
                    </p>

                    {/* Toggle */}
                    <div className="flex items-center justify-center gap-3">
                        <span className={`text-sm font-medium ${!annual ? 'text-foreground' : 'text-muted-foreground'}`}>Monthly</span>
                        <button onClick={() => setAnnual(!annual)} className={`relative w-11 h-6 rounded-full transition-colors ${annual ? 'bg-primary' : 'bg-muted'}`}>
                            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${annual ? 'left-6' : 'left-1'}`} />
                        </button>
                        <span className={`text-sm font-medium ${annual ? 'text-foreground' : 'text-muted-foreground'}`}>Annual</span>
                        {annual && <Badge variant="secondary" className="text-[10px] text-emerald-600 bg-emerald-50">Save 20%</Badge>}
                    </div>
                </div>

                {/* Plans Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-16">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.3 }}
                            className={`relative rounded-2xl p-6 flex flex-col ${plan.popular
                                ? 'bg-card border-2 border-primary shadow-lg shadow-primary/5 ring-1 ring-primary/10'
                                : 'bg-card border border-border/50 shadow-sm'
                                }`}
                        >
                            {plan.popular && (
                                <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 text-[10px] shadow-sm">
                                    Most Popular
                                </Badge>
                            )}
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-foreground mb-1" style={{ fontFamily: 'var(--font-display)' }}>{plan.name}</h3>
                                <p className="text-xs text-muted-foreground">{plan.desc}</p>
                            </div>
                            <div className="mb-6">
                                <span className="text-3xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                                    {plan.price === 'Free' ? 'Free' : annual ? `€${Math.round(parseInt(plan.price.replace('€', '')) * 0.8)}` : plan.price}
                                </span>
                                {plan.period && <span className="text-sm text-muted-foreground">{plan.period}</span>}
                            </div>
                            <Link to="/signup" className="mb-6">
                                <Button className={`w-full h-10 gap-2 text-sm ${plan.popular ? 'shadow-sm' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                                    {plan.cta}
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </Button>
                            </Link>
                            <ul className="space-y-2.5 flex-1">
                                {plan.features.map((f) => (
                                    <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Trust bar */}
                <div className="text-center">
                    <p className="text-xs text-muted-foreground mb-4">Trusted by leading institutions</p>
                    <div className="flex items-center justify-center gap-8 flex-wrap opacity-40">
                        {['KTH', 'Chalmers', 'Ericsson', 'Volvo', 'Spotify'].map((name) => (
                            <div key={name} className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
                                {name === 'KTH' || name === 'Chalmers' ? <GraduationCap className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                                {name}
                            </div>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
