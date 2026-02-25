import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    Lightbulb,
    Globe,
    Shield,
    Target,
    ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Container } from '@/components/layout/Container';

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function AboutPage() {
    const values = [
        { icon: Target, title: 'Mission-Driven', description: 'We bridge the gap between academic research and industry needs, empowering the next generation of innovators.' },
        { icon: Shield, title: 'Trust & Quality', description: 'Every listing is verified. We maintain the highest standards for opportunities on our platform.' },
        { icon: Globe, title: 'Scandinavian First', description: 'Built in Stockholm, serving universities and companies across Scandinavia and expanding to Europe.' },
        { icon: Lightbulb, title: 'Innovation Forward', description: 'We believe every thesis idea has the potential to create real-world impact. We make that connection possible.' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <div className="border-b border-border/50 bg-card/50">
                <Container className="py-16 lg:py-24 text-center">
                    <motion.div initial="hidden" animate="visible" variants={fadeUp}>
                        <Badge variant="secondary" className="mb-4 text-xs">About ThesisHub</Badge>
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                            Where Academic Ideas<br />Meet Industry Impact
                        </h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                            ThesisHub is the premier platform connecting students with thesis opportunities
                            at leading universities and companies across Scandinavia and Europe.
                        </p>
                    </motion.div>
                </Container>
            </div>

            {/* Values */}
            <section className="py-16 md:py-20 lg:py-24 border-b border-border/50">
                <Container>
                    <div className="text-center mb-12">
                        <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                            What We Stand For
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                        {values.map((v) => (
                            <motion.div key={v.title} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="card-elevated p-6 flex gap-4">
                                <div className="w-12 h-12 rounded-xl bg-primary/5 text-primary flex items-center justify-center shrink-0">
                                    <v.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h4 className="font-semibold mb-1">{v.title}</h4>
                                    <p className="text-sm text-muted-foreground leading-relaxed">{v.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-20 lg:py-24">
                <Container size="5xl">
                    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center">
                        <h2 className="text-2xl font-bold mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                            Join Our Community
                        </h2>
                        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                            Whether you're a student, university, or company — there's a place for you on ThesisHub.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/signup">
                                <Button size="lg" className="gap-2">
                                    Get Started <ArrowRight className="w-4 h-4" />
                                </Button>
                            </Link>
                            <Link to="/thesis">
                                <Button variant="outline" size="lg">
                                    Browse Thesis
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </Container>
            </section>
        </div>
    );
}
