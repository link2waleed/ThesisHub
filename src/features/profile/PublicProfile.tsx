import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    MapPin,
    Globe,
    GraduationCap,
    ArrowLeft,
    Calendar,
    Mail,
    Lightbulb,
    FileText,
    ExternalLink,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const profileData: Record<string, {
    name: string; role: string; university: string; field: string;
    location: string; website: string; joined: string; bio: string;
    interests: string[]; thesesApplied: number; ideasPublished: number;
}> = {
    'demo': {
        name: 'Alex Lindström', role: 'Student',
        university: 'KTH Royal Institute of Technology', field: 'Computer Science',
        location: 'Stockholm, Sweden', website: 'alexlindstrom.dev', joined: 'Sep 2024',
        bio: 'MSc Computer Science student at KTH focused on Machine Learning and Computer Vision. Passionate about applying AI to real-world problems in healthcare and autonomous systems. Currently looking for an exciting thesis opportunity.',
        interests: ['Machine Learning', 'Computer Vision', 'Deep Learning', 'Autonomous Systems', 'Healthcare AI'],
        thesesApplied: 4, ideasPublished: 3,
    },
};

const publishedIdeas = [
    { id: '1', title: 'Federated Learning for Healthcare Data Privacy', likes: 45, comments: 12 },
    { id: '2', title: 'Real-time Object Detection for Autonomous Drones', likes: 32, comments: 8 },
    { id: '3', title: 'Blockchain-based Academic Credential Verification', likes: 28, comments: 6 },
];

export default function PublicProfile() {
    const { id } = useParams();
    const profile = profileData[id || ''] || profileData['demo'];

    return (
        <div className="max-w-4xl mx-auto px-5 sm:px-8 lg:px-10 py-10 sm:py-14 lg:py-16">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <Link to="/ideas" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
                    <ArrowLeft className="w-4 h-4" />
                    Back
                </Link>

                {/* Profile header */}
                <div className="rounded-2xl bg-card border border-border/50 shadow-sm overflow-hidden mb-6">
                    <div className="h-28 bg-gradient-to-r from-primary/15 via-violet-500/10 to-amber-500/10" />
                    <div className="px-6 pb-6 -mt-10">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                            <div className="w-20 h-20 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold border-4 border-background shadow-lg" style={{ fontFamily: 'var(--font-display)' }}>
                                {profile.name.charAt(0)}
                            </div>
                            <div className="flex-1 pt-2">
                                <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>{profile.name}</h1>
                                <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    <GraduationCap className="w-3.5 h-3.5" />
                                    {profile.field} · {profile.university}
                                </p>
                            </div>
                            <div className="flex gap-2 shrink-0">
                                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                                    <Mail className="w-3.5 h-3.5" />Message
                                </Button>
                                <Button size="sm" className="text-xs shadow-sm">Connect</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Bio */}
                        <div className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                            <h2 className="text-sm font-semibold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>About</h2>
                            <p className="text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
                        </div>

                        {/* Interests */}
                        <div className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                            <h2 className="text-sm font-semibold text-foreground mb-3" style={{ fontFamily: 'var(--font-display)' }}>Research Interests</h2>
                            <div className="flex flex-wrap gap-2">
                                {profile.interests.map((i) => (
                                    <Badge key={i} variant="secondary" className="px-3 py-1 text-xs">{i}</Badge>
                                ))}
                            </div>
                        </div>

                        {/* Published ideas */}
                        <div className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-sm font-semibold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Published Ideas</h2>
                                <Badge variant="secondary" className="text-[10px]">{profile.ideasPublished}</Badge>
                            </div>
                            <div className="divide-y divide-border/40">
                                {publishedIdeas.map((idea) => (
                                    <Link key={idea.id} to={`/ideas/${idea.id}`} className="flex items-center justify-between py-3 hover:bg-accent/30 -mx-2 px-2 rounded-lg transition-colors">
                                        <div>
                                            <p className="text-sm font-medium text-foreground">{idea.title}</p>
                                            <p className="text-xs text-muted-foreground mt-0.5">{idea.likes} likes · {idea.comments} comments</p>
                                        </div>
                                        <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        {[
                            { icon: MapPin, label: 'Location', value: profile.location },
                            { icon: GraduationCap, label: 'University', value: profile.university },
                            { icon: Calendar, label: 'Joined', value: profile.joined },
                            { icon: FileText, label: 'Theses applied', value: String(profile.thesesApplied) },
                            { icon: Lightbulb, label: 'Ideas published', value: String(profile.ideasPublished) },
                            { icon: Globe, label: 'Website', value: profile.website },
                        ].map((item) => {
                            const ItemIcon = item.icon;
                            return (
                                <div key={item.label} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-card border border-border/50 shadow-sm">
                                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                                        <ItemIcon className="w-4 h-4 text-muted-foreground" />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[11px] text-muted-foreground">{item.label}</p>
                                        <p className="text-sm font-medium text-foreground truncate">{item.value}</p>
                                    </div>
                                </div>
                            );
                        })}
                        {profile.website && (
                            <a href={`https://${profile.website}`} target="_blank" rel="noreferrer">
                                <Button variant="outline" size="sm" className="w-full gap-1.5 text-xs mt-2">
                                    <ExternalLink className="w-3.5 h-3.5" />Visit website
                                </Button>
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
