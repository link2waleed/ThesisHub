import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Container } from './Container';

const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
};

interface PageHeaderProps {
    badge?: string;
    title: string;
    description?: string;
    /** If true, wraps in a Container with border-b. Default true. */
    bordered?: boolean;
}

export function PageHeader({ badge, title, description, bordered = true }: PageHeaderProps) {
    const content = (
        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="space-y-3">
            {badge && (
                <Badge variant="secondary" className="text-xs">{badge}</Badge>
            )}
            <h1
                className="text-2xl sm:text-3xl font-bold text-foreground"
                style={{ fontFamily: 'var(--font-display)' }}
            >
                {title}
            </h1>
            {description && (
                <p className="text-sm text-muted-foreground max-w-xl leading-relaxed">
                    {description}
                </p>
            )}
        </motion.div>
    );

    if (bordered) {
        return (
            <div className="border-b border-border/50">
                <Container className="py-10 lg:py-12">
                    {content}
                </Container>
            </div>
        );
    }

    return content;
}
