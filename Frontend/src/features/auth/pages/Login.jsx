import React, { useState } from 'react';
import { useAuth } from "../hook/useAuth";
import { useNavigate } from "react-router";
import ContinueWithGoogle from '../components/ContinueWithGoogle';

const Login = () => {
    const { handleLogin } = useAuth();
    const navigate = useNavigate();

    const [ formData, setFormData ] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [ name ]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = await handleLogin({ email: formData.email, password: formData.password });
            if (user.role == "buyer") {
                navigate("/");
            } else if (user.role == "seller") {
                navigate("/seller/dashboard");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <>
            {/* Google Fonts */}
            <link
                href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap"
                rel="stylesheet"
            />

            <div
                className="min-h-screen flex flex-col lg:flex-row selection:bg-[#C9A96E]/30"
                style={{ backgroundColor: '#fbf9f6', fontFamily: "'Inter', sans-serif" }}
            >
                {/* ── LEFT: Editorial Image Panel ── */}
                <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{ backgroundColor: '#f5f3f0' }}>
                    <img
                        src="/snitch_editorial_warm.png"
                        alt="Snitch Fashion Editorial"
                        className="absolute inset-0 w-full h-full object-cover object-top"
                        style={{ filter: 'brightness(0.97)' }}
                    />
                    {/* Subtle warm overlay */}
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(to top, rgba(27,24,20,0.62) 0%, rgba(27,24,20,0.08) 45%, transparent 100%)' }}
                    />
                    <div className="absolute inset-0 p-14 flex flex-col justify-between z-10">
                        {/* Brand */}
                        <span
                            className="text-sm font-medium tracking-[0.35em] uppercase"
                            style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E', letterSpacing: '0.35em' }}
                        >
                            Snitch.
                        </span>
                        {/* Editorial Headline */}
                        <div>
                            <p
                                className="text-5xl xl:text-6xl font-light leading-[1.08] text-white mb-5"
                                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                            >
                                Welcome<br />
                                <em>back.</em>
                            </p>
                            <p className="text-sm font-light leading-relaxed max-w-xs" style={{ color: 'rgba(255,255,255,0.65)' }}>
                                Sign in to explore the latest exclusive drops and manage your aesthetic.
                            </p>
                        </div>
                    </div>
                </div>

                {/* ── RIGHT: Form Panel ── */}
                <div
                    className="w-full lg:w-1/2 flex items-center justify-center min-h-screen px-8 sm:px-14 lg:px-20 py-16"
                    style={{ backgroundColor: '#fbf9f6' }}
                >
                    <div className="w-full max-w-sm">

                        {/* Mobile brand mark */}
                        <div className="lg:hidden mb-14">
                            <span
                                className="text-sm tracking-[0.35em] uppercase"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#C9A96E' }}
                            >
                                Snitch.
                            </span>
                        </div>

                        {/* Header */}
                        <div className="mb-14">
                            <p
                                className="text-[10px] uppercase tracking-[0.22em] mb-4 font-medium"
                                style={{ color: '#C9A96E' }}
                            >
                                Sign in to Snitch
                            </p>
                            <h1
                                className="text-[2.6rem] xl:text-5xl font-light leading-[1.1]"
                                style={{ fontFamily: "'Cormorant Garamond', serif", color: '#1b1c1a' }}
                            >
                                Enter the Vault
                            </h1>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="flex flex-col gap-10">

                            {/* Email */}
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="login-email"
                                    className="text-[10px] uppercase tracking-[0.18em] font-medium"
                                    style={{ color: '#7A6E63' }}
                                >
                                    Email Address
                                </label>
                                <input
                                    id="login-email"
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="hello@example.com"
                                    className="w-full bg-transparent outline-none py-3 text-sm transition-colors duration-300"
                                    style={{
                                        color: '#1b1c1a',
                                        borderBottom: '1px solid #d0c5b5',
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                    onFocus={e => e.target.style.borderBottomColor = '#C9A96E'}
                                    onBlur={e => e.target.style.borderBottomColor = '#d0c5b5'}
                                />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="login-password"
                                        className="text-[10px] uppercase tracking-[0.18em] font-medium"
                                        style={{ color: '#7A6E63' }}
                                    >
                                        Password
                                    </label>
                                    <a
                                        href="#"
                                        className="text-[10px] transition-colors duration-200"
                                        style={{ color: '#B5ADA3' }}
                                        onMouseEnter={e => e.target.style.color = '#C9A96E'}
                                        onMouseLeave={e => e.target.style.color = '#B5ADA3'}
                                    >
                                        Forgot password?
                                    </a>
                                </div>
                                <input
                                    id="login-password"
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder="••••••••"
                                    className="w-full bg-transparent outline-none py-3 text-sm transition-colors duration-300"
                                    style={{
                                        color: '#1b1c1a',
                                        borderBottom: '1px solid #d0c5b5',
                                        fontFamily: "'Inter', sans-serif"
                                    }}
                                    onFocus={e => e.target.style.borderBottomColor = '#C9A96E'}
                                    onBlur={e => e.target.style.borderBottomColor = '#d0c5b5'}
                                />
                            </div>

                            {/* Sign In Button */}
                            <button
                                type="submit"
                                className="w-full py-4 text-[11px] uppercase tracking-[0.25em] font-medium transition-all duration-300 mt-2"
                                style={{
                                    backgroundColor: '#1b1c1a',
                                    color: '#fbf9f6',
                                    fontFamily: "'Inter', sans-serif"
                                }}
                                onMouseEnter={e => {
                                    e.currentTarget.style.backgroundColor = '#C9A96E';
                                    e.currentTarget.style.color = '#1b1c1a';
                                }}
                                onMouseLeave={e => {
                                    e.currentTarget.style.backgroundColor = '#1b1c1a';
                                    e.currentTarget.style.color = '#fbf9f6';
                                }}
                            >
                                Sign In
                            </button>

                            {/* Divider */}
                            <div className="flex items-center gap-4">
                                <div className="flex-1 h-px" style={{ backgroundColor: '#e4e2df' }} />
                                <span className="text-[10px] uppercase tracking-[0.15em]" style={{ color: '#B5ADA3' }}>or</span>
                                <div className="flex-1 h-px" style={{ backgroundColor: '#e4e2df' }} />
                            </div>

                            {/* Google SSO */}
                            <ContinueWithGoogle />

                            {/* Footer Link */}
                            <p className="text-center text-[11px]" style={{ color: '#B5ADA3' }}>
                                Don&apos;t have an account?{' '}
                                <a
                                    href="/register"
                                    className="transition-colors duration-200"
                                    style={{ color: '#7A6E63', textDecoration: 'underline', textUnderlineOffset: '3px' }}
                                    onMouseEnter={e => e.target.style.color = '#C9A96E'}
                                    onMouseLeave={e => e.target.style.color = '#7A6E63'}
                                >
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;