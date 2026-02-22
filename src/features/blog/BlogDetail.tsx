import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Calendar,
    Clock,
    User,
    Share2,
    Bookmark,
    Twitter,
    Linkedin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const blogPosts: Record<string, {
    title: string; excerpt: string; category: string;
    author: string; authorBio: string; date: string; readTime: string;
    content: string[];
}> = {
    'how-to-write-thesis-proposal': {
        title: 'How to Write a Winning Thesis Proposal in 2025',
        excerpt: 'A comprehensive guide to crafting a compelling thesis proposal that stands out.',
        category: 'Guides', author: 'Dr. Anna Lindqvist',
        authorBio: 'Senior research advisor at KTH with 15+ years of experience supervising thesis students.',
        date: 'Feb 18, 2025', readTime: '8 min read',
        content: [
            'Writing a thesis proposal is one of the most critical steps in your academic journey. A well-crafted proposal not only defines the scope of your research but also serves as your introduction to potential supervisors and organizations.',
            '## 1. Start with a Strong Research Question',
            'The foundation of any great thesis is a clear, focused research question. Your question should be specific enough to be answerable within the thesis timeframe, yet broad enough to contribute meaningful insights to your field.',
            'Consider these elements when formulating your question: relevance to current research, feasibility given available resources, and potential impact on the field or industry.',
            '## 2. Conduct a Thorough Literature Review',
            'Before diving into your proposal, spend time reviewing existing research. This demonstrates your understanding of the field and helps you identify gaps that your thesis can address.',
            'Use academic databases like Google Scholar, IEEE Xplore, and Scopus to find relevant papers. Organize your findings thematically rather than chronologically for a more compelling narrative.',
            '## 3. Define Your Methodology',
            'Clearly outline how you plan to conduct your research. Whether you are using quantitative methods, qualitative approaches, or a mixed methodology, be specific about your data collection and analysis techniques.',
            '## 4. Create a Realistic Timeline',
            'Break your thesis into manageable phases with clear milestones. A typical thesis timeline includes: literature review (weeks 1-4), methodology development (weeks 5-8), data collection (weeks 9-16), analysis (weeks 17-20), and writing (weeks 21-24).',
            '## 5. Address Potential Challenges',
            'Show supervisors that you have thought critically about your project by acknowledging potential challenges and proposing mitigation strategies. This demonstrates maturity and preparedness.',
            '## Key Takeaways',
            'A winning proposal combines a clear research question, thorough background research, a solid methodology, and a realistic timeline. Remember that your proposal is a living document — it will evolve as your research progresses.',
        ],
    },
};

const defaultPost = {
    title: 'Blog Post', excerpt: 'This is a sample blog post.', category: 'General',
    author: 'ThesisHub Team', authorBio: 'The ThesisHub editorial team.',
    date: 'Feb 2025', readTime: '5 min read',
    content: ['This blog post is coming soon. Stay tuned for more insights from the ThesisHub community.'],
};

const relatedPosts = [
    { slug: 'ai-thesis-opportunities', title: 'Top 10 AI Research Thesis Opportunities in Scandinavia', readTime: '6 min read' },
    { slug: 'thesis-to-career', title: 'From Thesis to Career: How Research Launches Your Dream Job', readTime: '5 min read' },
    { slug: 'remote-thesis-tips', title: '5 Tips for Successfully Completing a Remote Thesis', readTime: '5 min read' },
];

export default function BlogDetail() {
    const { slug } = useParams();
    const post = blogPosts[slug || ''] || defaultPost;

    return (
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 py-12 sm:py-16 lg:py-20">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />Back to blog
                </Link>

                {/* Header */}
                <div className="mb-8">
                    <Badge variant="outline" className="text-[10px] mb-3">{post.category}</Badge>
                    <h1 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4" style={{ fontFamily: 'var(--font-display)' }}>
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" />{post.author}</span>
                        <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
                    </div>
                </div>

                {/* Hero image */}
                <div className="h-48 sm:h-64 rounded-2xl bg-gradient-to-br from-primary/15 via-violet-500/10 to-amber-500/10 flex items-center justify-center mb-8">
                    <div className="text-5xl opacity-30">📝</div>
                </div>

                {/* Content */}
                <div className="prose prose-sm max-w-none">
                    {post.content.map((block, i) => {
                        if (block.startsWith('## ')) {
                            return <h2 key={i} className="text-lg font-bold text-foreground mt-8 mb-3" style={{ fontFamily: 'var(--font-display)' }}>{block.replace('## ', '')}</h2>;
                        }
                        return <p key={i} className="text-sm text-muted-foreground leading-relaxed mb-4">{block}</p>;
                    })}
                </div>

                {/* Share */}
                <div className="flex items-center gap-3 mt-8 pt-6 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">Share this article</span>
                    <Button variant="outline" size="icon" className="h-8 w-8"><Twitter className="w-3.5 h-3.5" /></Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"><Linkedin className="w-3.5 h-3.5" /></Button>
                    <Button variant="outline" size="icon" className="h-8 w-8"><Share2 className="w-3.5 h-3.5" /></Button>
                    <div className="flex-1" />
                    <Button variant="ghost" size="sm" className="gap-1.5 text-xs"><Bookmark className="w-3.5 h-3.5" />Save</Button>
                </div>

                <Separator className="my-8" />

                {/* Author card */}
                <div className="rounded-xl bg-card border border-border/50 shadow-sm p-5 flex items-start gap-4 mb-8">
                    <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-base font-bold shrink-0">{post.author.charAt(0)}</div>
                    <div>
                        <p className="text-sm font-semibold text-foreground">{post.author}</p>
                        <p className="text-xs text-muted-foreground mt-1">{post.authorBio}</p>
                    </div>
                </div>

                {/* Related posts */}
                <div>
                    <h3 className="text-sm font-semibold text-foreground mb-4" style={{ fontFamily: 'var(--font-display)' }}>Related Articles</h3>
                    <div className="grid sm:grid-cols-3 gap-3">
                        {relatedPosts.map((rp) => (
                            <Link key={rp.slug} to={`/blog/${rp.slug}`} className="rounded-xl bg-card border border-border/50 shadow-sm p-4 hover:border-primary/30 transition-colors group">
                                <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">{rp.title}</h4>
                                <p className="text-[11px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" />{rp.readTime}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
