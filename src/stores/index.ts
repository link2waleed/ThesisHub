import { create } from 'zustand';
import type { FilterState } from '@/types';

interface FilterStore {
    filters: FilterState;
    setSearch: (search: string) => void;
    toggleFilter: (key: keyof Omit<FilterState, 'search'>, value: string) => void;
    clearFilters: () => void;
    clearFilter: (key: keyof Omit<FilterState, 'search'>) => void;
    activeFilterCount: () => number;
}

const createDefaultFilters = (): FilterState => ({
    search: '',
    field: [],
    location: [],
    duration: [],
    compensation: [],
    organizationType: [],
    workType: [],
});

export const useFilterStore = create<FilterStore>((set, get) => ({
    filters: createDefaultFilters(),

    setSearch: (search) =>
        set((state) => ({ filters: { ...state.filters, search } })),

    toggleFilter: (key, value) =>
        set((state) => {
            const current = [...(state.filters[key] as string[])];
            const next = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
            return { filters: { ...state.filters, [key]: next } };
        }),

    clearFilters: () => set({ filters: createDefaultFilters() }),

    clearFilter: (key) =>
        set((state) => ({ filters: { ...state.filters, [key]: [] } })),

    activeFilterCount: () => {
        const { search, ...rest } = get().filters;
        return Object.values(rest).reduce((count, arr) => count + arr.length, 0) +
            (search ? 1 : 0);
    },
}));

// ── Bookmarks Store ──
interface BookmarkStore {
    savedThesis: string[];
    savedIdeas: string[];
    savedInternships: string[];
    toggleThesis: (id: string) => void;
    toggleIdea: (id: string) => void;
    toggleInternship: (id: string) => void;
    isThesisSaved: (id: string) => boolean;
    isIdeaSaved: (id: string) => boolean;
    isInternshipSaved: (id: string) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
    savedThesis: [],
    savedIdeas: [],
    savedInternships: [],

    toggleThesis: (id) =>
        set((state) => ({
            savedThesis: state.savedThesis.includes(id)
                ? state.savedThesis.filter((t) => t !== id)
                : [...state.savedThesis, id],
        })),

    toggleIdea: (id) =>
        set((state) => ({
            savedIdeas: state.savedIdeas.includes(id)
                ? state.savedIdeas.filter((t) => t !== id)
                : [...state.savedIdeas, id],
        })),

    toggleInternship: (id) =>
        set((state) => ({
            savedInternships: state.savedInternships.includes(id)
                ? state.savedInternships.filter((t) => t !== id)
                : [...state.savedInternships, id],
        })),

    isThesisSaved: (id) => get().savedThesis.includes(id),
    isIdeaSaved: (id) => get().savedIdeas.includes(id),
    isInternshipSaved: (id) => get().savedInternships.includes(id),
}));

// ── Theme Store ──
interface ThemeStore {
    isDark: boolean;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
    isDark: false,
    toggleTheme: () =>
        set((state) => {
            const next = !state.isDark;
            document.documentElement.classList.toggle('dark', next);
            return { isDark: next };
        }),
}));

// ── Auth Store ──
type UserRole = 'admin' | 'student' | 'company' | 'university';

interface AuthUser {
    id: string;
    name: string;
    email: string;
    role: UserRole;
}

interface AuthStore {
    user: AuthUser | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string, role: string) => Promise<void>;
    logout: () => void;
    restoreSession: () => void;
}

// Mock credentials map
const MOCK_ACCOUNTS: Record<string, { password: string; name: string; role: UserRole }> = {
    'admin@thesishub.com': { password: 'admin123', name: 'Waleed Ahmad', role: 'admin' },
    'hr@ericsson.com': { password: 'pass123', name: 'Ericsson AB', role: 'company' },
    'dean@kth.se': { password: 'pass123', name: 'KTH Royal Institute', role: 'university' },
    'emma@student.se': { password: 'pass123', name: 'Emma Lindström', role: 'student' },
};

function detectRole(email: string): UserRole {
    const e = email.toLowerCase();
    if (e.includes('admin')) return 'admin';
    if (e.includes('company') || e.includes('corp') || e.includes('hr@')) return 'company';
    if (e.includes('uni') || e.includes('university') || e.includes('dean') || e.includes('.edu')) return 'university';
    return 'student';
}

function persistAuth(user: AuthUser, token: string) {
    localStorage.setItem('thesishub_auth', JSON.stringify({ user, token }));
}

function clearPersistedAuth() {
    localStorage.removeItem('thesishub_auth');
}

function getPersistedAuth(): { user: AuthUser; token: string } | null {
    try {
        const raw = localStorage.getItem('thesishub_auth');
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (parsed?.user && parsed?.token) return parsed;
        return null;
    } catch {
        return null;
    }
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (email, password) => {
        set({ isLoading: true });
        // Simulate network delay
        await new Promise((r) => setTimeout(r, 800));

        const account = MOCK_ACCOUNTS[email.toLowerCase()];

        if (account && account.password === password) {
            const user: AuthUser = { id: crypto.randomUUID(), name: account.name, email, role: account.role };
            const token = `mock_jwt_${Date.now()}`;
            persistAuth(user, token);
            set({ user, token, isAuthenticated: true, isLoading: false });
            return;
        }

        // Fallback: any email/password combo works, role detected from email
        const role = detectRole(email);
        const name = email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
        const user: AuthUser = { id: crypto.randomUUID(), name, email, role };
        const token = `mock_jwt_${Date.now()}`;
        persistAuth(user, token);
        set({ user, token, isAuthenticated: true, isLoading: false });
    },

    signup: async (name, email, _password, role) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 800));
        const user: AuthUser = { id: crypto.randomUUID(), name, email, role: role as UserRole };
        const token = `mock_jwt_${Date.now()}`;
        persistAuth(user, token);
        set({ user, token, isAuthenticated: true, isLoading: false });
    },

    logout: () => {
        clearPersistedAuth();
        set({ user: null, token: null, isAuthenticated: false });
    },

    restoreSession: () => {
        const persisted = getPersistedAuth();
        if (persisted) {
            set({ user: persisted.user, token: persisted.token, isAuthenticated: true });
        }
    },
}));

