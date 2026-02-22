import { useState, useEffect, useCallback } from 'react';

// ── Debounce Hook ──
export function useDebounce<T>(value: T, delay: number = 300): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(timer);
    }, [value, delay]);

    return debouncedValue;
}

// ── Media Query Hook ──
export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        setMatches(media.matches);

        const listener = (e: MediaQueryListEvent) => setMatches(e.matches);
        media.addEventListener('change', listener);
        return () => media.removeEventListener('change', listener);
    }, [query]);

    return matches;
}

export const useIsMobile = () => useMediaQuery('(max-width: 768px)');
export const useIsTablet = () => useMediaQuery('(max-width: 1024px)');

// ── Scroll Lock Hook ──
export function useScrollLock(locked: boolean) {
    useEffect(() => {
        if (locked) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [locked]);
}

// ── Keyboard Shortcut Hook ──
export function useKeyboardShortcut(
    key: string,
    callback: () => void,
    modifiers: { ctrl?: boolean; meta?: boolean; shift?: boolean } = {}
) {
    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            const { ctrl, meta, shift } = modifiers;
            if (
                event.key.toLowerCase() === key.toLowerCase() &&
                (!ctrl || event.ctrlKey) &&
                (!meta || event.metaKey) &&
                (!shift || event.shiftKey)
            ) {
                event.preventDefault();
                callback();
            }
        },
        [key, callback, modifiers]
    );

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);
}
