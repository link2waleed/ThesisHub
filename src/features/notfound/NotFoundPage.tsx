import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFoundPage() {
    return (
        <div className="min-h-[70vh] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center max-w-md mx-auto px-4"
            >
                <div className="text-8xl font-extrabold text-primary/10 mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                    404
                </div>
                <h1 className="text-2xl font-bold mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                    Page Not Found
                </h1>
                <p className="text-muted-foreground mb-8">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <Link to="/">
                        <Button className="gap-2">
                            <Home className="w-4 h-4" /> Go Home
                        </Button>
                    </Link>
                    <Link to="/thesis">
                        <Button variant="outline" className="gap-2">
                            <Search className="w-4 h-4" /> Browse Thesis
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
