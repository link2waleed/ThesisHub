import { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, MapPin, Globe, GraduationCap, Save, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const interests = ['Machine Learning', 'Computer Vision', 'Data Science', 'Robotics', 'Autonomous Systems'];

export default function ProfilePage() {
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await new Promise((r) => setTimeout(r, 1000));
        setSaving(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Profile</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Manage your public profile information</p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="gap-2 h-9 text-sm shadow-sm">
                    {saving ? <div className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    {saving ? 'Saving...' : 'Save changes'}
                </Button>
            </div>

            {/* Avatar */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-foreground mb-4">Photo</h2>
                <div className="flex items-center gap-5">
                    <div className="relative group">
                        <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>
                            D
                        </div>
                        <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                            <Camera className="w-5 h-5 text-white" />
                        </div>
                    </div>
                    <div>
                        <Button variant="outline" size="sm" className="text-xs mb-1.5">Upload photo</Button>
                        <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
                    </div>
                </div>
            </motion.div>

            {/* Personal Info */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.05 }} className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-foreground mb-4">Personal Information</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Full name</label>
                        <Input defaultValue="Demo User" className="h-10" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Email</label>
                        <Input defaultValue="demo@thesishub.com" className="h-10" disabled />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1.5"><GraduationCap className="w-3.5 h-3.5" />University</label>
                        <Input defaultValue="KTH Royal Institute of Technology" className="h-10" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" />Field of Study</label>
                        <Input defaultValue="Computer Science" className="h-10" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />Location</label>
                        <Input defaultValue="Stockholm, Sweden" className="h-10" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block flex items-center gap-1.5"><Globe className="w-3.5 h-3.5" />Website</label>
                        <Input defaultValue="https://demouser.dev" className="h-10" />
                    </div>
                </div>
            </motion.div>

            {/* Bio */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.1 }} className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-foreground mb-4">Bio</h2>
                <textarea
                    defaultValue="Computer Science MSc student at KTH focused on Machine Learning and Computer Vision. Looking for exciting thesis opportunities in autonomous systems."
                    className="w-full h-24 p-3 rounded-lg border border-input bg-background text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring/30"
                />
                <p className="text-xs text-muted-foreground mt-1.5">Brief description for your profile. Max 300 characters.</p>
            </motion.div>

            {/* Interests */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.15 }} className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                <h2 className="text-sm font-semibold text-foreground mb-4">Research Interests</h2>
                <div className="flex flex-wrap gap-2">
                    {interests.map((tag) => (
                        <Badge key={tag} variant="secondary" className="px-3 py-1 text-xs cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors">
                            {tag}
                        </Badge>
                    ))}
                    <button className="px-3 py-1 rounded-full border border-dashed border-border text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                        + Add interest
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
