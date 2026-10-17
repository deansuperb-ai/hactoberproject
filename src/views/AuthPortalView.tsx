import React, { useState } from "react";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  KeyRound,
} from "lucide-react";
import { StillHereLogo } from "../components/common/StillHereLogo";
import {
  signInWithEmail,
  signUpWithEmail,
  requestPasswordReset,
  createDemoGuestSession,
} from "../services/authService";
import type { AuthUser } from "../types";
import { DEMO_ASSETS } from "../assets/demoAssets";

interface AuthPortalViewProps {
  onAuthenticated: (user: AuthUser) => void;
  onExploreDemo: () => void;
}

export const AuthPortalView: React.FC<AuthPortalViewProps> = ({
  onAuthenticated,
  onExploreDemo,
}) => {
  const [tab, setTab] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Password reset modal state
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetFeedback, setResetFeedback] = useState<string | null>(null);
  const [isResetLoading, setIsResetLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessNotice(null);
    setIsLoading(true);

    try {
      if (tab === "signin") {
        const user = await signInWithEmail(email, password);
        onAuthenticated(user);
      } else {
        const user = await signUpWithEmail(name, email, password);
        onAuthenticated(user);
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An authentication error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetFeedback(null);
    setIsResetLoading(true);

    try {
      const msg = await requestPasswordReset(resetEmail || email);
      setResetFeedback(msg);
    } catch (err: any) {
      setResetFeedback(err.message || "Unable to send password reset link.");
    } finally {
      setIsResetLoading(false);
    }
  };

  const handleGuestDemo = () => {
    const guest = createDemoGuestSession();
    onAuthenticated(guest);
    onExploreDemo();
  };

  return (
    <div className="min-h-screen bg-parchment-100 flex flex-col justify-center relative overflow-hidden">
      {/* Decorative Warm Ambient Halos */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-terracotta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-rose-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16">
        <div className="bg-parchment-50 rounded-3xl shadow-xl border border-parchment-300 overflow-hidden flex flex-col lg:flex-row min-h-[640px]">
          
          {/* Left Side: Editorial Album Presentation & Brand Imagery */}
          <div className="lg:w-1/2 bg-gradient-to-br from-espresso-900 via-espresso-850 to-espresso-950 text-parchment-100 p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle background photo overlay */}
            <div
              className="absolute inset-0 opacity-15 bg-cover bg-center mix-blend-luminosity filter blur-[1px]"
              style={{ backgroundImage: `url(${DEMO_ASSETS.kitchenBread})` }}
            />
            <div className="absolute inset-0 bg-espresso-950/70" />

            {/* Header Content */}
            <div className="relative z-10">
              <StillHereLogo variant="full" size="lg" theme="dark" showTagline={true} />

              <div className="mt-12 sm:mt-16 space-y-6 max-w-md">
                <blockquote className="font-serif text-2xl sm:text-3xl text-parchment-100 leading-snug font-normal">
                  “Some people stay with us in every little thing.”
                </blockquote>
                <p className="font-sans text-sm sm:text-base text-parchment-300 leading-relaxed font-light">
                  Keep their photographs, voices, stories, and meaningful moments together in one private place.
                </p>
              </div>
            </div>

            {/* Tasteful Album Composition Card */}
            <div className="relative z-10 mt-10 p-5 rounded-2xl bg-espresso-900/80 border border-parchment-700/40 backdrop-blur-sm space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={DEMO_ASSETS.eleanorPortrait}
                  alt="Eleanor demo portrait"
                  className="w-12 h-12 rounded-full object-cover border-2 border-terracotta/70 shadow-md"
                />
                <div>
                  <h4 className="text-sm font-serif font-medium text-parchment-100">
                    Eleanor — Demo Profile
                  </h4>
                  <p className="text-xs text-parchment-400 font-sans">
                    Sunday mornings, warm tea & rain outside
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-parchment-800 flex items-center justify-between text-xs text-parchment-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-terracotta" />
                  Private & strictly personal
                </span>
                <span className="italic font-serif text-terracotta-light">Authentic audio preserved</span>
              </div>
            </div>
          </div>

          {/* Right Side: Clean Authentication Card */}
          <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center bg-parchment-50">
            <div className="max-w-md w-full mx-auto space-y-8">
              
              {/* Tab Selector: Sign In vs Create Account */}
              <div className="flex border-b border-parchment-300 pb-2 gap-8">
                <button
                  type="button"
                  onClick={() => {
                    setTab("signin");
                    setErrorMessage(null);
                  }}
                  className={`font-serif text-xl sm:text-2xl pb-2 transition-all cursor-pointer relative ${
                    tab === "signin"
                      ? "text-espresso-900 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-terracotta"
                      : "text-espresso-400 hover:text-espresso-700"
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setTab("signup");
                    setErrorMessage(null);
                  }}
                  className={`font-serif text-xl sm:text-2xl pb-2 transition-all cursor-pointer relative ${
                    tab === "signup"
                      ? "text-espresso-900 font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-terracotta"
                      : "text-espresso-400 hover:text-espresso-700"
                  }`}
                >
                  Create Account
                </button>
              </div>

              {/* Error & Success Feedback */}
              {errorMessage && (
                <div
                  role="alert"
                  className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn"
                >
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successNotice && (
                <div
                  role="status"
                  className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn"
                >
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{successNotice}</span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {tab === "signup" && (
                  <div>
                    <label className="block text-xs font-semibold text-espresso-700 uppercase tracking-wider mb-1.5">
                      Your Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-400" />
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Mayank Choubey"
                        className="w-full pl-10 pr-4 py-3 bg-parchment-100 border border-parchment-300 rounded-xl text-espresso-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-espresso-700 uppercase tracking-wider mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full pl-10 pr-4 py-3 bg-parchment-100 border border-parchment-300 rounded-xl text-espresso-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="block text-xs font-semibold text-espresso-700 uppercase tracking-wider">
                      Password
                    </label>
                    {tab === "signin" && (
                      <button
                        type="button"
                        onClick={() => setIsResetOpen(true)}
                        className="text-xs text-terracotta hover:text-terracotta-dark transition-colors cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-10 py-3 bg-parchment-100 border border-parchment-300 rounded-xl text-espresso-900 text-sm focus:outline-none focus:ring-2 focus:ring-terracotta/40 focus:border-terracotta transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-espresso-400 hover:text-espresso-700 transition-colors cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3.5 px-6 rounded-xl bg-terracotta hover:bg-terracotta-dark text-parchment-50 font-medium text-sm transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-4 h-4 border-2 border-parchment-100 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>{tab === "signin" ? "Enter Memory Space" : "Create My Archive"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Guest / Demo Shortcut */}
              <div className="pt-6 border-t border-parchment-200 text-center space-y-3">
                <p className="text-xs text-espresso-500 font-sans">
                  Want to experience STILL HERE before signing up?
                </p>
                <button
                  type="button"
                  onClick={handleGuestDemo}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-terracotta bg-terracotta-light/40 hover:bg-terracotta-light/70 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Explore Eleanor's Demo Profile</span>
                </button>
              </div>

              {/* Privacy Reassurance */}
              <div className="text-center">
                <p className="text-[11px] text-espresso-400 leading-normal">
                  Your memories, photographs, and voice recordings remain completely private to you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {isResetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-espresso-950/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
        >
          <div className="bg-parchment-50 rounded-2xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-parchment-300 space-y-4">
            <div className="flex items-center gap-2 text-terracotta">
              <KeyRound className="w-5 h-5" />
              <h3 className="font-serif text-lg font-medium text-espresso-900">Reset Your Password</h3>
            </div>

            <p className="text-xs text-espresso-600 leading-relaxed font-sans">
              Enter your registered email address and we will dispatch a secure link to reset your memory archive password.
            </p>

            {resetFeedback && (
              <div className="p-3 rounded-lg bg-parchment-200 text-espresso-800 text-xs">
                {resetFeedback}
              </div>
            )}

            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-espresso-700 uppercase tracking-wider mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={resetEmail || email}
                  onChange={(e) => setResetEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 bg-parchment-100 border border-parchment-300 rounded-xl text-sm text-espresso-900 focus:outline-none focus:ring-2 focus:ring-terracotta/40"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsResetOpen(false)}
                  className="px-4 py-2 text-xs font-medium text-espresso-600 hover:text-espresso-900 transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isResetLoading}
                  className="px-4 py-2 rounded-xl bg-terracotta text-parchment-50 text-xs font-medium hover:bg-terracotta-dark transition-colors cursor-pointer disabled:opacity-50"
                >
                  {isResetLoading ? "Sending..." : "Send Reset Link"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
