import { useState } from "react";
import { useAuth } from "../hook/useAuth";
import {
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  ShoppingBag,
  Store,
  ArrowRight,
  Loader2,
  Sparkles,
} from "lucide-react";

export function RegisterForm({ onSwitchToLogin, onSuccess }) {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isBuyer, setIsBuyer] = useState("YES"); // Default to Buyer ("YES" / "NO" for backend API compatibility)
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  const { handleRegisterUser, loading } = useAuth();

  // Dynamic password strength meter
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, text: "", color: "" };
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[A-Z]/.test(pass) || /[0-9]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    switch (score) {
      case 1:
        return { score: 25, text: "Weak", color: "bg-rose-500" };
      case 2:
        return { score: 50, text: "Fair", color: "bg-amber-500" };
      case 3:
        return { score: 75, text: "Good", color: "bg-indigo-400" };
      case 4:
        return { score: 100, text: "Strong", color: "bg-emerald-400" };
      default:
        return { score: 15, text: "Very Weak", color: "bg-rose-600" };
    }
  };

  const passStrength = getPasswordStrength(password);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!agreeTerms) {
      alert("Please agree to the Terms of Service to proceed.");
      return;
    }

    try {
      const result = await handleRegisterUser(email, phoneNumber, password, isBuyer);
      if (onSuccess) {
        onSuccess(
          result?.message
            ? `${result.message}. Account role: ${result?.user?.role || (isBuyer === "YES" ? "BUYER" : "SELLER")}.`
            : `Welcome to MIRAJ! Your ${isBuyer === "YES" ? "BUYER" : "SELLER"} account has been created.`
        );
      }
    } catch {
      // Error handled by redux state in parent AuthPage
    }
  }

  return (
    <div className="w-full animate-in fade-in duration-300">
      <div className="mb-5">
        <h2 className="text-2xl font-extrabold text-slate-100 tracking-tight flex items-center gap-2">
          <span>Create Account</span>
          <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse shadow-[0_0_10px_#c084fc]" />
        </h2>
        <p className="text-xs sm:text-sm text-slate-300/80 mt-1">
          Join the next-generation marketplace as a verified buyer or commercial seller.
        </p>
      </div>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* EMAIL ADDRESS */}
        <div>
          <label
            htmlFor="register-email"
            className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
          >
            Email Address
          </label>
          <div className="relative rounded-xl transition-all duration-200">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              id="register-email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="alex.merchant@miraj.com"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/25 hover:border-white/20 transition-all"
            />
          </div>
        </div>

        {/* PHONE NUMBER */}
        <div>
          <label
            htmlFor="register-phone"
            className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
          >
            Phone Number
          </label>
          <div className="relative rounded-xl transition-all duration-200">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              id="register-phone"
              type="tel"
              required
              autoComplete="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 234-5678"
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/70 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/25 hover:border-white/20 transition-all"
            />
          </div>
        </div>

        {/* PASSWORD */}
        <div>
          <label
            htmlFor="register-password"
            className="block text-xs font-semibold text-slate-300 mb-1.5 uppercase tracking-wider"
          >
            Password
          </label>
          <div className="relative rounded-xl transition-all duration-200">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              id="register-password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              className="w-full pl-10 pr-11 py-2.5 bg-slate-950/70 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/25 hover:border-white/20 transition-all"
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-purple-300 transition-colors cursor-pointer"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="mt-2 space-y-1">
              <div className="flex justify-between items-center text-[11px] text-slate-400">
                <span>Password Strength:</span>
                <span className="font-semibold text-slate-300">{passStrength.text}</span>
              </div>
              <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full ${passStrength.color} transition-all duration-300`}
                  style={{ width: `${passStrength.score}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* ACCOUNT ROLE SWITCHER (BUYER VS SELLER) */}
        <div className="pt-1">
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Account Role
            </label>
            <span className="text-[11px] font-mono text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
              Dual Persona
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Buyer Card */}
            <button
              type="button"
              id="role-buyer-card"
              onClick={() => setIsBuyer("YES")}
              className={`p-3 rounded-2xl text-left border transition-all duration-200 relative cursor-pointer ${
                isBuyer === "YES"
                  ? "bg-gradient-to-br from-cyan-600/20 to-blue-600/15 border-cyan-400/80 shadow-lg shadow-cyan-500/20 ring-1 ring-cyan-400/40"
                  : "bg-white/[0.04] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className={`p-2 rounded-xl ${
                    isBuyer === "YES"
                      ? "bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/30"
                      : "bg-white/10 text-slate-400"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                </div>
                {isBuyer === "YES" && (
                  <span className="w-4 h-4 rounded-full bg-cyan-400 flex items-center justify-center text-slate-950 font-bold text-[10px]">
                    ✓
                  </span>
                )}
              </div>
              <div className="font-bold text-sm text-white">Buyer</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                Browse, discover & acquire items
              </div>
            </button>

            {/* Seller Card */}
            <button
              type="button"
              id="role-seller-card"
              onClick={() => setIsBuyer("NO")}
              className={`p-3 rounded-2xl text-left border transition-all duration-200 relative cursor-pointer ${
                isBuyer === "NO"
                  ? "bg-gradient-to-br from-purple-600/20 to-fuchsia-600/15 border-purple-400/80 shadow-lg shadow-purple-500/20 ring-1 ring-purple-400/40"
                  : "bg-white/[0.04] border-white/10 hover:bg-white/[0.07] hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div
                  className={`p-2 rounded-xl ${
                    isBuyer === "NO"
                      ? "bg-gradient-to-tr from-purple-500 to-fuchsia-600 text-white shadow-md shadow-purple-500/30"
                      : "bg-white/10 text-slate-400"
                  }`}
                >
                  <Store className="w-4 h-4" />
                </div>
                {isBuyer === "NO" && (
                  <span className="w-4 h-4 rounded-full bg-purple-400 flex items-center justify-center text-slate-950 font-bold text-[10px]">
                    ✓
                  </span>
                )}
              </div>
              <div className="font-bold text-sm text-white">Seller</div>
              <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                List products & manage marketplace store
              </div>
            </button>
          </div>
        </div>

        {/* TERMS & CONDITIONS */}
        <div className="pt-1">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="w-4 h-4 rounded border-slate-700 bg-white/5 text-purple-600 focus:ring-purple-500 focus:ring-offset-0 focus:ring-1 cursor-pointer"
            />
            <span className="text-xs text-slate-300">
              I accept the MIRAJ{" "}
              <a href="#terms" className="text-cyan-400 underline">
                Terms of Protocol
              </a>{" "}
              and Privacy Policy
            </span>
          </label>
        </div>

        {/* VIBRANT GRADIENT SUBMIT BUTTON (Pure Tailwind CSS) */}
        <div className="pt-2">
          <button
            type="submit"
            id="register-submit-btn"
            disabled={loading}
            className="w-full py-3.5 px-6 rounded-2xl font-bold text-sm text-white tracking-wide bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:via-indigo-500 hover:to-cyan-400 shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Creating Your MIRAJ Account...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Register Account</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </form>

      {/* TOGGLE TO SIGN IN */}
      <div className="mt-6 text-center text-xs text-slate-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-cyan-400 hover:text-cyan-300 font-bold underline transition-colors cursor-pointer"
        >
          Sign In here
        </button>
      </div>
    </div>
  );
}
