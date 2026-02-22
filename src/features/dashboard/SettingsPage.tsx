import { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Moon, Sun, BellRing, Shield, Globe, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useThemeStore } from '@/stores';

function Toggle({ checked, onChange }: { checked: boolean; onChange: (v: boolean) => void }) {
    return (
        <button onClick={() => onChange(!checked)} className={`relative w-10 h-[22px] rounded-full transition-colors ${checked ? 'bg-primary' : 'bg-muted'}`}>
            <div className={`absolute top-[3px] w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${checked ? 'left-[22px]' : 'left-[3px]'}`} />
        </button>
    );
}

export default function SettingsPage() {
    const { isDark, toggleTheme } = useThemeStore();
    const [emailNotif, setEmailNotif] = useState(true);
    const [pushNotif, setPushNotif] = useState(false);
    const [weeklyDigest, setWeeklyDigest] = useState(true);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        setSaving(true);
        await new Promise((r) => setTimeout(r, 1000));
        setSaving(false);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>Settings</h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Manage your account preferences</p>
                </div>
                <Button onClick={handleSave} disabled={saving} className="gap-2 h-9 text-sm shadow-sm">
                    {saving ? <div className="w-3.5 h-3.5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    {saving ? 'Saving...' : 'Save changes'}
                </Button>
            </div>

            {/* Appearance */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                    {isDark ? <Moon className="w-4 h-4 text-muted-foreground" /> : <Sun className="w-4 h-4 text-muted-foreground" />}
                    <h2 className="text-sm font-semibold text-foreground">Appearance</h2>
                </div>
                <div className="flex items-center justify-between py-2">
                    <div>
                        <p className="text-sm font-medium text-foreground">Dark mode</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Switch between light and dark theme</p>
                    </div>
                    <Toggle checked={isDark} onChange={toggleTheme} />
                </div>
            </motion.div>

            {/* Notifications */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.05 }} className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                    <BellRing className="w-4 h-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold text-foreground">Notifications</h2>
                </div>
                <div className="space-y-4">
                    {[
                        { label: 'Email notifications', desc: 'Receive updates about new thesis opportunities', checked: emailNotif, onChange: setEmailNotif },
                        { label: 'Push notifications', desc: 'Get push notifications in the browser', checked: pushNotif, onChange: setPushNotif },
                        { label: 'Weekly digest', desc: 'Summary of new opportunities in your field', checked: weeklyDigest, onChange: setWeeklyDigest },
                    ].map((item) => (
                        <div key={item.label} className="flex items-center justify-between py-1.5">
                            <div>
                                <p className="text-sm font-medium text-foreground">{item.label}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
                            </div>
                            <Toggle checked={item.checked} onChange={item.onChange} />
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Security */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.1 }} className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-4 h-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold text-foreground">Security</h2>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Current password</label>
                        <Input type="password" placeholder="••••••••" className="h-10 max-w-sm" />
                    </div>
                    <div>
                        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">New password</label>
                        <Input type="password" placeholder="••••••••" className="h-10 max-w-sm" />
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">Update password</Button>
                </div>
            </motion.div>

            {/* Language */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.15 }} className="rounded-xl bg-card border border-border/50 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                    <Globe className="w-4 h-4 text-muted-foreground" />
                    <h2 className="text-sm font-semibold text-foreground">Language & Region</h2>
                </div>
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-foreground">Language</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Select your preferred language</p>
                    </div>
                    <select className="h-9 px-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring/30">
                        <option>English</option>
                        <option>Swedish</option>
                        <option>German</option>
                    </select>
                </div>
            </motion.div>

            {/* Danger Zone */}
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, delay: 0.2 }} className="rounded-xl border border-destructive/20 shadow-sm p-6">
                <div className="flex items-center gap-3 mb-3">
                    <Trash2 className="w-4 h-4 text-destructive" />
                    <h2 className="text-sm font-semibold text-destructive">Danger Zone</h2>
                </div>
                <p className="text-xs text-muted-foreground mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                <Button variant="outline" size="sm" className="text-xs text-destructive border-destructive/30 hover:bg-destructive/5">
                    Delete account
                </Button>
            </motion.div>
        </div>
    );
}
