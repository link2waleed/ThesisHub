import type { ReactNode } from 'react';
import { Container } from './Container';

interface SectionProps {
    children: ReactNode;
    className?: string;
    containerSize?: '5xl' | '7xl';
    /** If true, wraps children in a Container. Default true. */
    contained?: boolean;
}

export function Section({ children, className = '', containerSize = '7xl', contained = true }: SectionProps) {
    return (
        <section className={`py-16 md:py-20 lg:py-24 ${className}`}>
            {contained ? (
                <Container size={containerSize}>{children}</Container>
            ) : (
                children
            )}
        </section>
    );
}
