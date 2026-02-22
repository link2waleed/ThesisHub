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

const defaultFilters: FilterState = {
    search: '',
    field: [],
    location: [],
    duration: [],
    compensation: [],
    organizationType: [],
    workType: [],
};

export const useFilterStore = create<FilterStore>((set, get) => ({
    filters: { ...defaultFilters },

    setSearch: (search) =>
        set((state) => ({ filters: { ...state.filters, search } })),

    toggleFilter: (key, value) =>
        set((state) => {
            const current = state.filters[key] as string[];
            const next = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];
            return { filters: { ...state.filters, [key]: next } };
        }),

    clearFilters: () => set({ filters: { ...defaultFilters } }),

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
    toggleThesis: (id: string) => void;
    toggleIdea: (id: string) => void;
    isThesisSaved: (id: string) => boolean;
    isIdeaSaved: (id: string) => boolean;
}

export const useBookmarkStore = create<BookmarkStore>((set, get) => ({
    savedThesis: [],
    savedIdeas: [],

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

    isThesisSaved: (id) => get().savedThesis.includes(id),
    isIdeaSaved: (id) => get().savedIdeas.includes(id),
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
interface AuthStore {
    user: { id: string; name: string; email: string; role: string } | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string, role: string) => Promise<void>;
    logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,

    login: async (_email, _password) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 1000));
        set({
            user: { id: '1', name: 'Demo User', email: _email, role: 'student' },
            isAuthenticated: true,
            isLoading: false,
        });
    },

    signup: async (name, email, _password, role) => {
        set({ isLoading: true });
        await new Promise((r) => setTimeout(r, 1000));
        set({
            user: { id: '1', name, email, role },
            isAuthenticated: true,
            isLoading: false,
        });
    },

    logout: () => set({ user: null, isAuthenticated: false }),
}));
