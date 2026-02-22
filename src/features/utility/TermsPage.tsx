import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

const sections = [
    { title: '1. Acceptance of Terms', content: 'By accessing and using ThesisHub ("the Platform"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not use the Platform.' },
    { title: '2. Description of Service', content: 'ThesisHub is a platform that connects students, universities, and companies for thesis collaboration opportunities. We provide tools for browsing, posting, and managing thesis projects across Scandinavia.' },
    { title: '3. User Accounts', content: 'To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate and complete information during registration.' },
    { title: '4. User Conduct', content: 'You agree not to use the Platform for any unlawful purpose, to impersonate any person or entity, to upload harmful or offensive content, to attempt to gain unauthorized access, or to interfere with the operation of the Platform.' },
    { title: '5. Intellectual Property', content: 'All content on ThesisHub, including text, graphics, logos, and software, is the property of ThesisHub or its content suppliers. Users retain ownership of content they submit but grant ThesisHub a non-exclusive license to use, display, and distribute such content on the Platform.' },
    { title: '6. Privacy', content: 'Your use of ThesisHub is also governed by our Privacy Policy. By using the Platform, you consent to the collection and use of your information as described in the Privacy Policy.' },
    { title: '7. Thesis Listings', content: 'Organizations posting thesis opportunities are responsible for the accuracy of their listings. ThesisHub does not guarantee the availability, accuracy, or quality of any thesis opportunities listed on the Platform.' },
    { title: '8. Limitation of Liability', content: 'ThesisHub shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Platform. Our total liability shall not exceed the amount you have paid for the service in the preceding twelve months.' },
    { title: '9. Modifications', content: 'ThesisHub reserves the right to modify these Terms at any time. We will notify users of significant changes via email or through the Platform. Continued use of the Platform after changes constitutes acceptance of the new terms.' },
    { title: '10. Governing Law', content: 'These Terms shall be governed by and construed in accordance with the laws of Sweden, without regard to its conflict of law principles.' },
];

export default function TermsPage() {
    return (
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="text-center mb-12">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                        Terms & Conditions
                    </h1>
                    <p className="text-sm text-muted-foreground">Last updated: February 2026</p>
                </div>

                <div className="rounded-xl bg-card border border-border/50 shadow-sm p-6 sm:p-8 space-y-8">
                    {sections.map((s) => (
                        <div key={s.title}>
                            <h2 className="text-sm font-semibold text-foreground mb-2" style={{ fontFamily: 'var(--font-display)' }}>{s.title}</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">{s.content}</p>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
