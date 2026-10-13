import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError } from "../state/auth.slice";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Check,
  Zap,
  Globe2,
  Lock,
} from "lucide-react";

// Full HD Web Wallpapers (1080p & 1440p)
const WALLPAPERS = [
  {
    id: "stitch-horizon",
    name: "Cyber Horizon HD",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC7XZav4dS3qAvTgBMG7yOse_36OR7cB0i0Ey9pAo3_9ztvwNIfvJJjXNXezmm8xySLXbjn2PSZCFLmTCRyY4Frf3q5TUg44NITKLVB1TBAR8f6myGfJKok7fbIEHXFTgusml8EK_5xIwIud-nNUGAm2vnvTvy84gdjxJx0eprwgFwEEloC9l6uncioZ-MeqGB2Zoak80inzVXlOIFxk2xaBN7NNUOj1kfNoaSz2Q7lXr6uNXMhMONrBq44wlVJTd58wlks5IR-MBM",
    accent: "from-cyan-400 to-indigo-500",
  },
  {
    id: "fluid-iridescent",
    name: "Nebula Glass HD",
    url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=2560&q=85",
    accent: "from-violet-500 to-cyan-400",
  },
  {
    id: "cyber-skyline",
    name: "Tokyo Cyber HD",
    url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=2560&q=85",
    accent: "from-blue-500 to-indigo-400",
  },
  {
    id: "dark-aurora",
    name: "Deep Aurora HD",
    url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2560&q=85",
    accent: "from-emerald-400 to-teal-500",
  },
  {
    id: "neon-geometry",
    name: "Obsidian Glow HD",
    url: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=2560&q=85",
    accent: "from-fuchsia-500 to-rose-400",
  },
];

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("register"); // "register" | "login"
  const [selectedWallpaper, setSelectedWallpaper] = useState(WALLPAPERS[0]);
  const [showWallpaperPicker, setShowWallpaperPicker] = useState(false);
  const [successBanner, setSuccessBanner] = useState("");

  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.auth);

  const handleTabSwitch = (newTab) => {
    setActiveTab(newTab);
    setSuccessBanner("");
    dispatch(setError(null));
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-x-hidden text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-white">
      {/* FULL HD WEB BACKGROUND IMAGE */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 transform scale-105"
        style={{
          backgroundImage: `url('${selectedWallpaper.url}')`,
        }}
        aria-hidden="true"
      />

      {/* MULTI-STOP DARK GRADIENT & BACKDROP BLUR OVERLAY */}
      <div
        className="fixed inset-0 z-0 bg-gradient-to-tr from-slate-950/95 via-slate-900/85 to-indigo-950/80 backdrop-blur-[5px]"
        aria-hidden="true"
      />

      {/* AMBIENT GRADIENT LIGHT ORBS */}
      <div
        className="fixed -top-32 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-600/15 to-transparent blur-3xl pointer-events-none animate-pulse"
        aria-hidden="true"
      />
      <div
        className="fixed top-1/3 -right-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tl from-cyan-500/20 via-blue-600/15 to-transparent blur-3xl pointer-events-none animate-pulse"
        aria-hidden="true"
      />
      <div
        className="fixed -bottom-40 left-1/3 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-600/15 via-fuchsia-600/10 to-transparent blur-3xl pointer-events-none animate-pulse"
        aria-hidden="true"
      />

      {/* TOP NAVIGATION BAR */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
        {/* Brand Logo & Telemetry */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 p-[1.5px] shadow-[0_0_20px_rgba(76,215,246,0.35)] group-hover:scale-105 transition-all duration-300">
              <div className="w-full h-full rounded-[14px] bg-slate-950 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <span className="text-2xl font-black tracking-wider bg-gradient-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-transparent">
                MIRAJ
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-cyan-300/70 font-semibold -mt-1 font-mono">
                Marketplace
              </span>
            </div>
          </div>
        </div>

        {/* Wallpaper HD Selector & Security Badge */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowWallpaperPicker(!showWallpaperPicker)}
              aria-label="Change Full HD Wallpaper"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 text-xs font-medium text-slate-300 hover:text-white hover:border-cyan-400/50 transition-all cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden sm:inline">Wallpaper:</span>
              <span className="text-white font-semibold">{selectedWallpaper.name}</span>
            </button>

            {/* Dropdown for Wallpaper Selection */}
            {showWallpaperPicker && (
              <div className="absolute right-0 mt-2 w-60 rounded-2xl bg-slate-900/95 backdrop-blur-2xl border border-white/15 p-2 shadow-2xl z-50 animate-in fade-in slide-in-from-top-2">
                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider px-2 py-1 mb-1 font-mono">
                  Full HD Backdrops
                </div>
                {WALLPAPERS.map((wp) => (
                  <button
                    key={wp.id}
                    type="button"
                    onClick={() => {
                      setSelectedWallpaper(wp);
                      setShowWallpaperPicker(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-left transition-all cursor-pointer ${
                      selectedWallpaper.id === wp.id
                        ? "bg-cyan-500/20 text-white font-semibold border border-cyan-400/40"
                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${wp.accent}`} />
                      {wp.name}
                    </span>
                    {selectedWallpaper.id === wp.id && <Check className="w-3.5 h-3.5 text-cyan-300" />}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN CONTENT CANVAS */}
      <main className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 py-6 md:py-10 flex-1 flex items-center justify-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT COLUMN: HERO HIGHLIGHTS & TRUST SIGNALS (Desktop) */}
          <section className="hidden lg:flex lg:col-span-5 flex-col justify-center space-y-8 pr-4">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.06] backdrop-blur-md border border-white/10 w-fit shadow-inner">
              <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
              <span className="text-xs font-medium bg-gradient-to-r from-cyan-300 via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                Next-Gen Marketplace Portal
              </span>
            </div>

            {/* Headline with Rich Gradient Text */}
            <div className="space-y-3">
              <h1 className="text-4xl xl:text-5xl font-black tracking-tight leading-[1.15]">
                Enter the future of{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                  frictionless
                </span>{" "}
                commerce.
              </h1>
              <p className="text-slate-300/85 text-base leading-relaxed">
                Seamless universal authentication for retail buyers and verified merchants. Trade, list, and scale with bank-grade security.
              </p>
            </div>

            {/* Value Propositions */}
            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-cyan-500/30 hover:bg-white/[0.06] transition-all">
                <div className="p-2.5 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 shadow-md shadow-cyan-500/30 text-white shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Instant Account Activation</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Start purchasing or publishing marketplace inventory in seconds with automated role onboarding.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/30 hover:bg-white/[0.06] transition-all">
                <div className="p-2.5 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 shadow-md shadow-purple-600/30 text-white shrink-0">
                  <Globe2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Dual Buyer & Seller Ecosystem</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Customized tools and dashboards designed for individual buyers and enterprise store managers.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/[0.08] hover:border-emerald-500/30 hover:bg-white/[0.06] transition-all">
                <div className="p-2.5 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 shadow-md shadow-emerald-600/30 text-white shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">End-to-End Encrypted Auth</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Hardened session tokens, zero credential leaks, and continuous security audits.
                  </p>
                </div>
              </div>
            </div>

            {/* Social Proof */}
            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <div className="flex -space-x-2 overflow-hidden">
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-cyan-500/50"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                  alt="Trader 1"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-indigo-500/50"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                  alt="Trader 2"
                />
                <img
                  className="inline-block h-8 w-8 rounded-full ring-2 ring-purple-500/50"
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                  alt="Trader 3"
                />
              </div>
              <div>
                <div className="flex items-center text-amber-400 gap-1 text-xs font-semibold">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span className="text-white ml-1 font-bold">4.9 / 5.0</span>
                </div>
                <span>Trusted by 10,000+ active buyers & sellers</span>
              </div>
            </div>
          </section>

          {/* RIGHT COLUMN: GLASSMORPHIC AUTHENTICATION CARD */}
          <section className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-lg">
              {/* Refractive Gradient Outer Specular Frame */}
              <div className="absolute -inset-0.5 rounded-[30px] bg-gradient-to-tr from-cyan-400/40 via-indigo-500/30 to-purple-500/40 opacity-70 blur-[1px] pointer-events-none" />

              {/* Glass Card Container (Pure Tailwind CSS) */}
              <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[28px] p-6 sm:p-8 overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.85)] ring-1 ring-cyan-500/20">
                {/* Refractive Light Highlight Bar */}
                <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

                {/* SEGMENTED TAB TOGGLE (SIGN IN VS CREATE ACCOUNT) */}
                <div className="p-1 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center mb-6 backdrop-blur-md">
                  <button
                    type="button"
                    id="tab-toggle-login"
                    onClick={() => handleTabSwitch("login")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === "login"
                        ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/30 border border-cyan-400/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <span>Sign In</span>
                  </button>

                  <button
                    type="button"
                    id="tab-toggle-register"
                    onClick={() => handleTabSwitch("register")}
                    className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer ${
                      activeTab === "register"
                        ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400/30"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Sparkles className="w-4 h-4 text-purple-300" />
                    <span>Create Account</span>
                  </button>
                </div>

                {/* ERROR ALERT NOTIFICATION */}
                {error && (
                  <div
                    role="alert"
                    className="mb-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-200 text-xs sm:text-sm flex items-start gap-3 backdrop-blur-md animate-in fade-in"
                  >
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-rose-300">Authentication Error</p>
                      <p className="text-rose-200/90 text-xs mt-0.5">{error}</p>
                    </div>
                  </div>
                )}

                {/* SUCCESS ALERT NOTIFICATION */}
                {successBanner && (
                  <div
                    role="status"
                    className="mb-5 p-3.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs sm:text-sm flex items-start gap-3 backdrop-blur-md animate-in fade-in"
                  >
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-semibold text-emerald-300">Success</p>
                      <p className="text-emerald-200/90 text-xs mt-0.5">{successBanner}</p>
                    </div>
                  </div>
                )}

                {/* DYNAMIC REACT COMPONENT BASED ON ACTIVE TAB */}
                {activeTab === "login" ? (
                  <LoginForm
                    onSwitchToRegister={() => handleTabSwitch("register")}
                    onSuccess={(msg) => setSuccessBanner(msg)}
                  />
                ) : (
                  <RegisterForm
                    onSwitchToLogin={() => handleTabSwitch("login")}
                    onSuccess={(msg) => setSuccessBanner(msg)}
                  />
                )}
              </div>
            </div>
          </section>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-20 w-full max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4 border-t border-white/5">
        <div>
          © {new Date().getFullYear()} MIRAJ Technologies Inc. All rights reserved.
        </div>
        <div className="flex items-center gap-6">
          <a href="#privacy" className="hover:text-cyan-300 transition-colors">
            Privacy Policy
          </a>
          <a href="#terms" className="hover:text-cyan-300 transition-colors">
            Terms of Protocol
          </a>
          <a href="#security" className="hover:text-cyan-300 transition-colors">
            Security Overview
          </a>
        </div>
      </footer>
    </div>
  );
}
