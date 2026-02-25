import type { ReactNode } from 'react';

interface ContainerProps {
    children: ReactNode;
    size?: '5xl' | '7xl';
    className?: string;
}

export function Container({ children, size = '7xl', className = '' }: ContainerProps) {
    return (
        <div className={`mx-auto w-full ${size === '5xl' ? 'max-w-5xl' : 'max-w-7xl'} px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}
