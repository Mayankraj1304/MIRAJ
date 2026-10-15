import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState(() => (
        window.localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
    ));

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function ThemeToggle() {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const isDark = theme === 'dark';

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="theme-toggle inline-flex items-center gap-2 border px-3 py-2 text-[10px] uppercase tracking-[0.16em] transition-colors"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
            title={`Switch to ${isDark ? 'light' : 'dark'} theme`}
        >
            {isDark ? (
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="4" />
                    <path strokeLinecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
                </svg>
            ) : (
                <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z" />
                </svg>
            )}
            <span>{isDark ? 'Light' : 'Dark'}</span>
        </button>
    );
}

export function ThemeMenuItem() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    return (
        <button
            type="button"
            className="w-full px-4 py-2 text-left text-[10px] uppercase tracking-[0.18em] transition-colors hover:bg-[#f5f3f0] hover:text-[#C9A96E]"
            style={{ color: '#7A6E63' }}
            role="menuitem"
            onClick={toggleTheme}
        >
            Switch to {theme === 'dark' ? 'light' : 'dark'} mode
        </button>
    );
}
