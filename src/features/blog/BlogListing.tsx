import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Calendar,
    Clock,
    Search,
    Tag,
    User,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

const categories = ['All', 'Guides', 'Research', 'Career', 'Platform', 'Interviews'];

interface BlogPost {
    id: string; slug: string; title: string; excerpt: string;
    category: string; author: string; date: string; readTime: string;
    featured?: boolean; image?: string;
}

const posts: BlogPost[] = [
    {
        id: '1', slug: 'how-to-write-thesis-proposal', featured: true,
        title: 'How to Write a Winning Thesis Proposal in 2025',
        excerpt: 'A comprehensive guide to crafting a compelling thesis proposal that stands out to supervisors and organizations. Learn the key components, common pitfalls, and expert tips from successful students.',
        category: 'Guides', author: 'Dr. Anna Lindqvist', date: 'Feb 18, 2025', readTime: '8 min read',
    },
    {
        id: '2', slug: 'ai-thesis-opportunities',
        title: 'Top 10 AI Research Thesis Opportunities in Scandinavia',
        excerpt: 'Discover the most exciting AI thesis positions at leading companies and universities across Sweden, Norway, and Denmark.',
        category: 'Research', author: 'Erik Nordström', date: 'Feb 15, 2025', readTime: '6 min read',
    },
    {
        id: '3', slug: 'thesis-to-career',
        title: 'From Thesis to Career: How Your Research Can Launch Your Dream Job',
        excerpt: 'Real stories from graduates who turned their thesis work into full-time positions at top tech companies.',
        category: 'Career', author: 'Maria Söderberg', date: 'Feb 12, 2025', readTime: '5 min read',
    },
    {
        id: '4', slug: 'new-matching-algorithm',
        title: 'Introducing Smart Matching: AI-Powered Thesis Recommendations',
        excerpt: 'Learn about our new machine learning-powered matching system that helps students find the perfect thesis opportunity based on their skills and interests.',
        category: 'Platform', author: 'ThesisHub Team', date: 'Feb 10, 2025', readTime: '4 min read',
    },
    {
        id: '5', slug: 'interview-kth-professor',
        title: 'Interview: KTH Professor on the Future of Academic-Industry Collaboration',
        excerpt: 'Prof. Lars Petersson shares insights on how universities and companies can better collaborate on thesis projects.',
        category: 'Interviews', author: 'Sofia Ekström', date: 'Feb 8, 2025', readTime: '7 min read',
    },
    {
        id: '6', slug: 'remote-thesis-tips',
        title: '5 Tips for Successfully Completing a Remote Thesis',
        excerpt: 'Practical advice for managing your thesis project when working remotely with your supervisor and organization.',
        category: 'Guides', author: 'Dr. Anna Lindqvist', date: 'Feb 5, 2025', readTime: '5 min read',
    },
];

export default function BlogListing() {
    const [search, setSearch] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

    const filtered = posts.filter((p) => {
        const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.excerpt.toLowerCase().includes(search.toLowerCase());
        const matchCategory = activeCategory === 'All' || p.category === activeCategory;
        return matchSearch && matchCategory;
    });

    const featured = filtered.find((p) => p.featured);
    const rest = filtered.filter((p) => !p.featured);

    return (
        <div className="max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Blog</h1>
                    <p className="text-muted-foreground mt-2 text-sm sm:text-base">Insights, guides, and stories from the ThesisHub community</p>
                </div>

                {/* Search + filters */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search articles..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-9 h-9 text-sm"
                        />
                    </div>
                    <div className="flex gap-1 overflow-x-auto no-scrollbar">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${activeCategory === cat ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:text-foreground'
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured post */}
                {featured && (
                    <Link to={`/blog/${featured.slug}`} className="block mb-8">
                        <motion.article
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden hover:border-primary/30 transition-all group"
                        >
                            <div className="h-48 sm:h-56 bg-gradient-to-br from-primary/15 via-violet-500/10 to-amber-500/10 flex items-center justify-center">
                                <div className="text-4xl opacity-30">📝</div>
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <Badge className="text-[10px]">Featured</Badge>
                                    <Badge variant="outline" className="text-[10px]">{featured.category}</Badge>
                                </div>
                                <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                                    {featured.title}
                                </h2>
                                <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">{featured.excerpt}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" />{featured.author}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{featured.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                                </div>
                            </div>
                        </motion.article>
                    </Link>
                )}

                {/* Grid */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rest.map((post, i) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 16 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05, duration: 0.3 }}
                        >
                            <Link to={`/blog/${post.slug}`} className="block h-full rounded-xl bg-card border border-border/50 shadow-sm overflow-hidden hover:border-primary/30 transition-all group">
                                <div className="h-32 bg-gradient-to-br from-muted/50 to-muted flex items-center justify-center">
                                    <Tag className="w-6 h-6 text-muted-foreground/30" />
                                </div>
                                <div className="p-4">
                                    <Badge variant="outline" className="text-[10px] mb-2">{post.category}</Badge>
                                    <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">{post.title}</h3>
                                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
                                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                                        <span>{post.author}</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                </div>
                            </Link>
                        </motion.article>
                    ))}
                </div>

                {filtered.length === 0 && (
                    <div className="py-16 text-center">
                        <Search className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No articles match your search</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
