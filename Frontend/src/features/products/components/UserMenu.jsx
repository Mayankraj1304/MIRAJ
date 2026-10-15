import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../auth/hook/useAuth';
import { ThemeMenuItem } from '../../../app/ThemeContext';

const UserMenu = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [logoutError, setLogoutError] = useState('');
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const { handleLogout } = useAuth();
    const navigate = useNavigate();

    const handleUserLogout = async () => {
        setIsLoggingOut(true);
        setLogoutError('');
        try {
            await handleLogout();
            navigate('/login', { replace: true });
        } catch (error) {
            console.error('Logout failed', error);
            setLogoutError('Unable to log out. Please try again.');
        } finally {
            setIsLoggingOut(false);
        }
    };

    return (
        <div className="relative text-[10px] uppercase tracking-[0.2em] font-medium">
            <button
                type="button"
                className="flex items-center gap-2 transition-colors hover:text-[#C9A96E]"
                style={{ color: '#1b1c1a' }}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                onClick={() => setIsOpen(open => !open)}
            >
                <span>{user.fullname}</span>
                <svg
                    className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 12 12"
                    fill="none"
                    aria-hidden="true"
                >
                    <path d="m2.5 4.5 3.5 3 3.5-3" stroke="currentColor" strokeWidth="1.2" />
                </svg>
            </button>
            {isOpen && (
                <div
                    className="user-menu-panel absolute right-0 top-full z-20 mt-3 min-w-44 border bg-[#fbf9f6] py-2 shadow-lg"
                    style={{ borderColor: '#e4e2df' }}
                    role="menu"
                >
                    {logoutError && (
                        <p className="px-4 py-2 text-[10px] normal-case tracking-normal text-red-700" role="alert">
                            {logoutError}
                        </p>
                    )}
                    <ThemeMenuItem />
                    <button
                        type="button"
                        className="w-full px-4 py-2 text-left text-[10px] uppercase tracking-[0.18em] transition-colors hover:bg-[#f5f3f0] hover:text-[#C9A96E]"
                        style={{ color: '#7A6E63' }}
                        role="menuitem"
                        disabled={isLoggingOut}
                        onClick={handleUserLogout}
                    >
                        {isLoggingOut ? 'Logging out...' : 'Log out'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default UserMenu;
