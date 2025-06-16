"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import GradientContainer from "@/components/UI/gradientContainer";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/auth/authContext";

const GoogleIcon = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.374 0 0 5.373 0 12 0 17.302 3.438 21.8 8.207 23.387c.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeOffIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { signIn, signInWithGoogle, signInWithGithub } = useAuth();
  const router = useRouter();

  const ellipses = [
    {
      id: "top-right",
      position: { x: 95, y: 5 },
      size: { width: 328.8, height: 115.17 },
      colors: { from: "#D9D9D9", to: "transparent" },
      blur: 80,
      opacity: 60,
      rotation: -59.3
    },
    {
      id: "bottom-left",
      position: { x: 5, y: 95 },
      size: { width: 180, height: 180 },
      colors: { from: "#D9D9D9", to: "transparent" },
      blur: 80,
      opacity: 60
    }
  ];

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");
    
    try {
      const result = await signInWithGoogle();
      if (result.error) {
        setError(result.error);
      } else {
        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during Google sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    setLoading(true);
    setError("");
    
    try {
      const result = await signInWithGithub();
      if (result.error) {
        setError(result.error);
      } else {
        // Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during GitHub sign in");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        // Success! Redirect to dashboard
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.message || "An error occurred during sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#191919] flex items-center justify-center p-4">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <span className="text-white text-xl font-semibold">LOGO</span>
      </div>

      {/* Login Container */}
      <div className="w-full max-w-lg">
        <GradientContainer 
          ellipses={ellipses}
          className="p-8"
          containerHeight="h-auto"
          rounded="rounded-2xl"
        >
          <div className="space-y-6">
            {/* Header */}
            <div className="text-left">
              <h1 className="text-2xl font-md text-white mb-6">Welcome to Paradigm</h1>
            </div>

            {/* Success Message */}
            {!error && loading && (
              <div className="bg-blue-500/20 border border-blue-500/50 rounded-lg p-3">
                <p className="text-blue-400 text-sm">Signing you in...</p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            {/* Social Login Buttons */}
            <div>
              <p className="text-center text-white/70 text-sm font-semibold mb-4">Continue with</p>
              <div className="flex gap-3">
                <button
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-3 bg-[#D9D9D9]/5 hover:bg-[#D9D9D9]/10 text-white px-4 py-[0.4rem] rounded-lg border border-[#5F5F5F] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <GoogleIcon />
                  <span className="text-sm">Google</span>
                </button>
                <button
                  onClick={handleGithubLogin}
                  disabled={loading}
                  className="flex-1 flex items-center justify-center gap-3 bg-[#D9D9D9]/5 hover:bg-[#D9D9D9]/10 text-white px-4 rounded-lg border border-[#5F5F5F] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <GithubIcon />
                  <span className="text-sm">Github</span>
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="flex flex-row w-full space-x-2 px-4 items-center">
                <div className="w-full border-t border-[#5F5F5F]"></div>
                <span className="text-white">OR</span>
                <div className="w-full border-t border-[#5F5F5F]"></div>
            </div>

            {/* Email Form */}
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-xs text-white/70 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <Image
                      src="/auth/email.svg"
                      alt="Email"
                      width={16}
                      height={16}
                      className="opacity-60"
                    />
                  </div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full bg-[#D9D9D9]/5 border border-white/20 rounded-lg pl-12 pr-4 py-2 text-white placeholder-[#504E52] focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent shadow-inner"
                    style={{
                      boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)'
                    }}
                    required
                    disabled={loading}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-xs text-white/70 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4">
                    <Image
                      src="/auth/password.svg"
                      alt="Password"
                      width={16}
                      height={16}
                      className="opacity-60"
                    />
                  </div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#D9D9D9]/5 border border-white/20 rounded-lg pl-12 pr-12 py-2 text-white placeholder-[#504E52] focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent shadow-inner"
                    style={{
                      boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.3)'
                    }}
                    required
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center pr-4 text-white/50 hover:text-white/70"
                    disabled={loading}
                  >
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-white/70 hover:text-white underline">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="text-center">
              <span className="text-white/70 text-sm">
                Don't have an account?{" "}
                <Link href="/signup" className="text-white font-medium hover:text-white/80">
                  Sign up
                </Link>
              </span>
            </div>
          </div>
        </GradientContainer>
      </div>
    </div>
  );
}