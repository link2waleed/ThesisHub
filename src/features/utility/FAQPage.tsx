import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const categories = [
    {
        name: 'General',
        items: [
            { q: 'What is ThesisHub?', a: 'ThesisHub is a platform connecting students, universities, and companies for thesis collaborations. We make it easy to find and apply for thesis opportunities across Scandinavia.' },
            { q: 'Is ThesisHub free to use?', a: 'ThesisHub is free for students. Universities and companies may choose from our flexible subscription plans to post opportunities and access premium features.' },
            { q: 'Which countries does ThesisHub support?', a: 'We currently focus on Scandinavian countries — Sweden, Denmark, Norway, and Finland — with plans to expand across Europe.' },
        ],
    },
    {
        name: 'For Students',
        items: [
            { q: 'How do I apply for a thesis?', a: 'Browse our thesis feed, click on an opportunity that interests you, and submit your application with your profile and motivation letter.' },
            { q: 'Can I publish my own thesis ideas?', a: 'Yes! Students can publish thesis ideas on the Ideas Feed. Organizations can discover and sponsor ideas that align with their interests.' },
            { q: 'How do I stand out to organizations?', a: 'Complete your profile, add your research interests, and publish thesis ideas. A complete profile increases your visibility.' },
        ],
    },
    {
        name: 'For Organizations',
        items: [
            { q: 'How do I post a thesis opportunity?', a: 'Sign up as a University or Company, then use the dashboard to create and publish thesis opportunities with detailed descriptions.' },
            { q: 'Can I search for specific students?', a: 'Yes, premium plans allow you to search for students by university, field of study, skills, and research interests.' },
            { q: 'What are the subscription options?', a: 'We offer Starter (free), Professional, and Enterprise plans. Visit our pricing page for detailed feature comparisons.' },
        ],
    },
];

function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-border/40 last:border-0">
            <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-4 text-left group">
                <span className="text-sm font-medium text-foreground pr-4 group-hover:text-primary transition-colors">{q}</span>
                <ChevronDown className={`w-4 h-4 text-muted-foreground shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                        <p className="text-sm text-muted-foreground pb-4 leading-relaxed">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export default function FAQPage() {
    const [search, setSearch] = useState('');
    const filtered = categories.map((cat) => ({
        ...cat,
        items: cat.items.filter((i) => i.q.toLowerCase().includes(search.toLowerCase()) || i.a.toLowerCase().includes(search.toLowerCase())),
    })).filter((cat) => cat.items.length > 0);

    return (
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="text-center mb-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                        <HelpCircle className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                        Frequently Asked Questions
                    </h1>
                    <p className="text-muted-foreground max-w-md mx-auto">
                        Everything you need to know about ThesisHub
                    </p>
                </div>

                <div className="relative mb-8">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search questions..." className="pl-9 h-11" />
                </div>

                <div className="space-y-8">
                    {filtered.map((cat) => (
                        <div key={cat.name}>
                            <h2 className="text-xs font-semibold text-primary uppercase tracking-wider mb-3">{cat.name}</h2>
                            <div className="rounded-xl bg-card border border-border/50 shadow-sm px-5">
                                {cat.items.map((item) => <FAQItem key={item.q} {...item} />)}
                            </div>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-sm text-muted-foreground">No questions match your search.</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
