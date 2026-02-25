import { Link } from 'react-router-dom';
import { GraduationCap, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Container } from './Container';

const footerSections = [
    {
        title: 'Platform',
        links: [
            { label: 'Browse Thesis', href: '/thesis' },
            { label: 'Graduate Internships', href: '/internships' },
            { label: 'For Universities', href: '/about' },
            { label: 'For Companies', href: '/about' },
            { label: 'Pricing', href: '/pricing' },
        ],
    },
    {
        title: 'Resources',
        links: [
            { label: 'Blog', href: '/blog' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Help Center', href: '/faq' },
            { label: 'Contact', href: '/contact' },
        ],
    },
    {
        title: 'Legal',
        links: [
            { label: 'Privacy Policy', href: '/privacy' },
            { label: 'Terms of Service', href: '/terms' },
            { label: 'Cookie Policy', href: '/privacy' },
        ],
    },
];

export function Footer() {
    return (
        <footer className="bg-card border-t border-border/50">
            <Container className="pt-16 pb-10 md:pt-20 md:pb-12">

                {/* Main Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 lg:gap-16 mb-14 md:mb-16">

                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-4 lg:col-span-2 pr-0 lg:pr-10">
                        <Link to="/" className="inline-flex items-center gap-2.5 mb-5">
                            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-primary text-primary-foreground shadow-sm">
                                <GraduationCap className="w-5 h-5" />
                            </div>
                            <span className="font-display text-xl font-bold tracking-tight">
                                ThesisHub
                            </span>
                        </Link>

                        <p className="text-sm text-muted-foreground max-w-[300px] leading-[1.75] mb-8">
                            The premier platform connecting students with thesis opportunities
                            at leading universities and companies across Scandinavia and Europe.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-2.5">
                            {[
                                { icon: Twitter, label: 'Twitter', href: '#' },
                                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                                { icon: Github, label: 'GitHub', href: '#' },
                                { icon: Mail, label: 'Email', href: 'mailto:hello@thesishub.com' },
                            ].map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-border/60 text-muted-foreground hover:text-foreground hover:border-border hover:bg-accent transition-all duration-150"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Sections */}
                    {footerSections.map((section) => (
                        <div key={section.title} className="flex flex-col gap-0">
                            <h6 className="text-xs font-semibold uppercase tracking-widest text-foreground/70 mb-5">
                                {section.title}
                            </h6>
                            <ul className="flex flex-col gap-3.5">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.href}
                                            className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <Separator className="opacity-60" />

                {/* Bottom Bar */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-7 pb-2">
                    <p className="text-xs text-muted-foreground/70 tracking-wide">
                        © {new Date().getFullYear()} ThesisHub. All rights reserved.
                    </p>
                    <p className="text-xs text-muted-foreground/50 hidden sm:block">
                        Made with care for students everywhere 🎓
                    </p>
                </div>

            </Container>
        </footer>
    );
}