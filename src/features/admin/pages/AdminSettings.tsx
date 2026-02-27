import { useState } from 'react';
import { Save, Upload } from 'lucide-react';

export default function AdminSettings() {
    const [settings, setSettings] = useState({
        platformName: 'ThesisHub',
        tagline: 'Connecting Students with Research & Industry',
        supportEmail: 'support@thesishub.com',
        autoApprove: false,
        maxApplicationsPerUser: 10,
        maintenanceMode: false,
    });

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50" style={{ fontFamily: 'var(--font-display)' }}>Settings</h1>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Configure platform settings</p>
            </div>

            {/* General */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">General</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Platform Name</label>
                        <input
                            type="text"
                            value={settings.platformName}
                            onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Tagline</label>
                        <input
                            type="text"
                            value={settings.tagline}
                            onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Support Email</label>
                        <input
                            type="email"
                            value={settings.supportEmail}
                            onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Platform Logo</label>
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg bg-slate-900 dark:bg-white flex items-center justify-center text-white dark:text-slate-900 font-bold text-lg">T</div>
                            <button className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                <Upload className="w-4 h-4" /> Upload New
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Preferences */}
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-4">Preferences</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Auto-approve submissions</p>
                            <p className="text-xs text-slate-400 mt-0.5">Automatically approve thesis and internship submissions</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, autoApprove: !settings.autoApprove })}
                            className={`relative w-11 h-6 rounded-full transition-colors ${settings.autoApprove ? 'bg-slate-900 dark:bg-white' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${settings.autoApprove ? 'translate-x-5' : ''}`} />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Maintenance mode</p>
                            <p className="text-xs text-slate-400 mt-0.5">Show maintenance page to non-admin users</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, maintenanceMode: !settings.maintenanceMode })}
                            className={`relative w-11 h-6 rounded-full transition-colors ${settings.maintenanceMode ? 'bg-red-600' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                            <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${settings.maintenanceMode ? 'translate-x-5' : ''}`} />
                        </button>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Max applications per user</label>
                        <input
                            type="number"
                            value={settings.maxApplicationsPerUser}
                            onChange={(e) => setSettings({ ...settings, maxApplicationsPerUser: parseInt(e.target.value) || 0 })}
                            className="w-32 px-3 py-2 text-sm rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 transition-all"
                        />
                    </div>
                </div>
            </div>

            {/* Save */}
            <div className="flex items-center gap-3">
                <button
                    onClick={handleSave}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                >
                    <Save className="w-4 h-4" /> Save Changes
                </button>
                {saved && (
                    <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">Saved successfully!</span>
                )}
            </div>
        </div>
    );
}
