import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

const sections = [
    { title: '1. Information We Collect', content: 'We collect information you provide directly, such as your name, email, university affiliation, field of study, and profile details. We also automatically collect usage data, device information, and cookies when you access our Platform.' },
    { title: '2. How We Use Your Information', content: 'We use your information to operate and improve the Platform, personalize your experience, match you with relevant thesis opportunities, communicate important updates, process applications, and ensure platform security.' },
    { title: '3. Information Sharing', content: 'We share your profile information with organizations when you apply for thesis opportunities. We do not sell your personal data to third parties. We may share anonymized, aggregated data for analytics purposes.' },
    { title: '4. Data Security', content: 'We implement industry-standard security measures including encryption, secure servers, and regular security audits to protect your personal information. However, no method of electronic transmission is 100% secure.' },
    { title: '5. Your Rights (GDPR)', content: 'Under GDPR, you have the right to access, rectify, erase, restrict processing, and port your personal data. You also have the right to object to processing and to withdraw consent at any time.' },
    { title: '6. Cookies', content: 'We use essential cookies for platform functionality, analytics cookies to understand usage patterns, and preference cookies to remember your settings. You can manage cookie preferences in your browser settings.' },
    { title: '7. Data Retention', content: 'We retain your personal data for as long as your account is active or as needed to provide services. You may request deletion of your account and data at any time through your account settings or by contacting us.' },
    { title: '8. International Transfers', content: 'Your data may be processed in countries within the EU/EEA. Any transfers outside this area will be subject to appropriate safeguards in compliance with GDPR.' },
    {
        title: "9. Children\u0027s Privacy", content: 'ThesisHub is not intended for users under 16 years of age. We do not knowingly collect personal information from children. If we become aware of such collection, we will promptly delete the data.'
    },
    { title: '10. Contact Us', content: 'For privacy-related inquiries, contact our Data Protection Officer at privacy@thesishub.com or write to us at ThesisHub AB, Lindstedtsvägen 3, 114 28 Stockholm, Sweden.' },
];

export default function PrivacyPage() {
    return (
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-10 py-16 sm:py-20 lg:py-24">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <div className="text-center mb-12">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-6 h-6" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                        Privacy Policy
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
