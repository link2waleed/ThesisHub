import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, MapPin, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ContactPage() {
    const [sending, setSending] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        await new Promise((r) => setTimeout(r, 1500));
        setSending(false);
        setSent(true);
    };

    return (
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                        Get in Touch
                    </h1>
                    <p className="text-muted-foreground max-w-lg mx-auto">
                        Have a question or want to learn more about ThesisHub? We'd love to hear from you.
                    </p>
                </div>

                <div className="grid lg:grid-cols-5 gap-10">
                    {/* Contact info */}
                    <div className="lg:col-span-2 space-y-6">
                        {[
                            { icon: Mail, label: 'Email', value: 'hello@thesishub.com', href: 'mailto:hello@thesishub.com' },
                            { icon: MapPin, label: 'Address', value: 'Lindstedtsvägen 3, 114 28\nStockholm, Sweden' },
                            { icon: Phone, label: 'Phone', value: '+46 8 790 6000' },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <div key={item.label} className="flex gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                                        <Icon className="w-4.5 h-4.5 text-muted-foreground" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-medium text-muted-foreground mb-0.5">{item.label}</p>
                                        {item.href ? (
                                            <a href={item.href} className="text-sm text-foreground hover:text-primary transition-colors">{item.value}</a>
                                        ) : (
                                            <p className="text-sm text-foreground whitespace-pre-line">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Form */}
                    <div className="lg:col-span-3">
                        {sent ? (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-xl bg-card border border-border/50 shadow-sm p-10 text-center">
                                <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                                    <Send className="w-6 h-6" />
                                </div>
                                <h2 className="text-lg font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>Message sent!</h2>
                                <p className="text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="rounded-xl bg-card border border-border/50 shadow-sm p-6 space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Name</label>
                                        <Input placeholder="Your name" className="h-10" required />
                                    </div>
                                    <div>
                                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                                        <Input type="email" placeholder="you@example.com" className="h-10" required />
                                    </div>
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Subject</label>
                                    <Input placeholder="How can we help?" className="h-10" required />
                                </div>
                                <div>
                                    <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Message</label>
                                    <textarea
                                        placeholder="Tell us more..."
                                        className="w-full h-32 p-3 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/30"
                                        required
                                    />
                                </div>
                                <Button type="submit" disabled={sending} className="w-full h-11 gap-2 shadow-sm">
                                    {sending ? <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                                    {sending ? 'Sending...' : 'Send message'}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
