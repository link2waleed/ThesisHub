import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, Bookmark, FileText, Eye, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Notification {
    id: string;
    type: 'save' | 'apply' | 'view' | 'message' | 'system';
    title: string;
    description: string;
    time: string;
    read: boolean;
}

const initialNotifications: Notification[] = [
    { id: '1', type: 'apply', title: 'Application received', description: 'Ericsson Research has received your thesis application', time: '2 hours ago', read: false },
    { id: '2', type: 'view', title: 'New views on your idea', description: '"Federated Learning in Healthcare" received 12 new views', time: '5 hours ago', read: false },
    { id: '3', type: 'save', title: 'New matching thesis', description: 'A new thesis in Machine Learning was posted by Volvo Group', time: '1 day ago', read: false },
    { id: '4', type: 'message', title: 'New message', description: 'Prof. Lindström replied to your thesis inquiry', time: '1 day ago', read: true },
    { id: '5', type: 'system', title: 'Profile completion', description: 'Complete your profile to increase visibility to organizations', time: '2 days ago', read: true },
    { id: '6', type: 'apply', title: 'Application status update', description: 'Your application at KTH has moved to review stage', time: '3 days ago', read: true },
    { id: '7', type: 'view', title: 'Trending idea', description: 'Your idea "Blockchain for Academic Credentials" is trending', time: '4 days ago', read: true },
];

const typeIcons: Record<string, React.ElementType> = {
    save: Bookmark,
    apply: FileText,
    view: Eye,
    message: MessageSquare,
    system: Bell,
};
const typeColors: Record<string, string> = {
    save: 'bg-indigo-50 text-indigo-600',
    apply: 'bg-emerald-50 text-emerald-600',
    view: 'bg-amber-50 text-amber-600',
    message: 'bg-violet-50 text-violet-600',
    system: 'bg-slate-100 text-slate-600',
};

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState(initialNotifications);
    const [filter, setFilter] = useState<'all' | 'unread'>('all');

    const unread = notifications.filter((n) => !n.read).length;
    const filtered = filter === 'unread' ? notifications.filter((n) => !n.read) : notifications;

    const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-bold text-foreground" style={{ fontFamily: 'var(--font-display)' }}>
                        Notifications
                        {unread > 0 && <Badge className="ml-2 text-[10px] px-1.5 py-0">{unread}</Badge>}
                    </h1>
                    <p className="text-sm text-muted-foreground mt-0.5">Stay updated on your thesis journey</p>
                </div>
                {unread > 0 && (
                    <Button variant="outline" size="sm" onClick={markAllRead} className="gap-1.5 text-xs h-8">
                        <CheckCheck className="w-3.5 h-3.5" />
                        Mark all read
                    </Button>
                )}
            </div>

            {/* Filters */}
            <div className="flex gap-1 p-1 rounded-lg bg-muted w-fit">
                {(['all', 'unread'] as const).map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-3.5 py-1.5 rounded-md text-xs font-medium transition-colors capitalize ${filter === f ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                            }`}
                    >
                        {f}{f === 'unread' && unread > 0 ? ` (${unread})` : ''}
                    </button>
                ))}
            </div>

            {/* Notifications list */}
            <div className="rounded-xl bg-card border border-border/50 shadow-sm overflow-hidden divide-y divide-border/40">
                {filtered.length === 0 ? (
                    <div className="py-16 text-center">
                        <Bell className="w-10 h-10 text-muted-foreground/30 mx-auto mb-3" />
                        <p className="text-sm text-muted-foreground">No {filter === 'unread' ? 'unread ' : ''}notifications</p>
                    </div>
                ) : (
                    filtered.map((notif, idx) => {
                        const Icon = typeIcons[notif.type] || Bell;
                        const color = typeColors[notif.type] || 'bg-muted text-muted-foreground';
                        return (
                            <motion.div
                                key={notif.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: idx * 0.03 }}
                                onClick={() => markRead(notif.id)}
                                className={`flex items-start gap-3.5 px-5 py-4 cursor-pointer transition-colors hover:bg-accent/30 ${!notif.read ? 'bg-primary/[0.02]' : ''
                                    }`}
                            >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                                    <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <p className={`text-sm leading-snug ${!notif.read ? 'font-semibold text-foreground' : 'font-medium text-foreground'}`}>
                                            {notif.title}
                                        </p>
                                        {!notif.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0" />}
                                    </div>
                                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{notif.description}</p>
                                    <p className="text-[11px] text-muted-foreground/70 mt-1">{notif.time}</p>
                                </div>
                            </motion.div>
                        );
                    })
                )}
            </div>
        </div>
    );
}
