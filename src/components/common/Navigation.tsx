import React, { useState } from "react";
import {
  Home,
  Grid,
  Film,
  Flame,
  Settings,
  Plus,
  Menu,
  X,
  User,
  LogOut,
  Mic,
  ChevronDown,
} from "lucide-react";
import type { AppView, PersonProfile, AuthUser } from "../../types";
import { StillHereLogo } from "./StillHereLogo";

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenAddMemory: () => void;
  activeProfile: PersonProfile;
  onCreateProfile: () => void;
  currentUser?: AuthUser | null;
  onSignOut?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
  onOpenAddMemory,
  activeProfile,
  onCreateProfile,
  currentUser,
  onSignOut,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems: { view: AppView; label: string; icon: React.FC<{ className?: string }> }[] = [
    { view: "home", label: "Dashboard", icon: Home },
    { view: "memories", label: "Memories", icon: Grid },
    { view: "flashbacks", label: "Flashbacks", icon: Film },
    { view: "feel_existence", label: "Feel the Existence", icon: Flame },
    { view: "voice_archive", label: "Voice Archive", icon: Mic },
    { view: "settings", label: "Settings", icon: Settings },
  ];

  const handleNavClick = (view: AppView) => {
    onNavigate(view);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FBF9F5]/90 backdrop-blur-md border-b border-parchment-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick("home")}
              className="flex items-center text-left cursor-pointer focus:outline-none"
              aria-label="STILL HERE — Home"
            >
              <StillHereLogo variant="full" size="md" showTagline={false} />
            </button>

            {/* Active Profile Pill */}
            <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-parchment-300">
              <div className="w-7 h-7 rounded-full overflow-hidden bg-parchment-200 ring-2 ring-parchment-300">
                {activeProfile.portraitUrl ? (
                  <img src={activeProfile.portraitUrl} alt={activeProfile.name} className="w-full h-full object-cover" />
                ) : (
                  <User className="w-4 h-4 text-espresso-400 m-auto mt-1" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-wider text-espresso-400 leading-none">
                  Remembering
                </span>
                <span className="text-xs font-serif font-medium text-espresso-900 truncate max-w-[130px] leading-tight">
                  {activeProfile.name}
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view || (item.view === "home" && currentView === "dashboard");
              const isFeelExistence = item.view === "feel_existence";

              return (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => handleNavClick(item.view)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? isFeelExistence
                        ? "bg-terracotta text-white shadow-sm font-semibold"
                        : "bg-espresso-900 text-parchment-50 shadow-sm"
                      : isFeelExistence
                      ? "text-terracotta hover:bg-terracotta-light/20 font-semibold"
                      : "text-espresso-700 hover:text-espresso-950 hover:bg-parchment-200/70"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isFeelExistence && !isActive ? "text-terracotta" : ""}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons & User Menu */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={onCreateProfile}
              className="px-3.5 py-2 rounded-full border border-parchment-300 bg-white hover:bg-parchment-100 text-xs font-medium text-espresso-800 transition-all cursor-pointer"
            >
              + New Profile
            </button>

            <button
              type="button"
              onClick={onOpenAddMemory}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-terracotta hover:bg-terracotta-dark text-white text-xs font-medium shadow-xs transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Memory</span>
            </button>

            {/* Authenticated User Menu */}
            {currentUser && (
              <div className="relative pl-2 border-l border-parchment-300">
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-parchment-200 text-espresso-800 transition-colors cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-terracotta-light text-terracotta-dark flex items-center justify-center font-serif font-medium text-xs">
                    {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-espresso-400" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-parchment-50 border border-parchment-300 shadow-xl p-2 z-50 animate-fadeIn space-y-1">
                    <div className="px-3 py-2 border-b border-parchment-200">
                      <p className="text-xs font-serif font-medium text-espresso-900 truncate">
                        {currentUser.name}
                      </p>
                      <p className="text-[11px] font-mono text-espresso-400 truncate">
                        {currentUser.email}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onNavigate("settings");
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-espresso-700 hover:bg-parchment-200 transition-colors cursor-pointer text-left"
                    >
                      <Settings className="w-3.5 h-3.5 text-espresso-400" />
                      <span>Account & Privacy</span>
                    </button>

                    {onSignOut && (
                      <button
                        type="button"
                        onClick={() => {
                          setUserDropdownOpen(false);
                          onSignOut();
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-terracotta hover:bg-terracotta-light/30 transition-colors cursor-pointer text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenAddMemory}
              aria-label="Add a memory"
              className="p-2 rounded-xl bg-terracotta text-white"
            >
              <Plus className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-espresso-700 hover:bg-parchment-200"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-parchment-200 bg-[#FBF9F5] px-4 py-4 space-y-3 animate-fade-in shadow-xl">
          <div className="flex items-center gap-3 p-2 bg-white rounded-xl border border-parchment-200">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-parchment-200 shrink-0">
              {activeProfile.portraitUrl ? (
                <img src={activeProfile.portraitUrl} alt={activeProfile.name} className="w-full h-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-espresso-400 m-auto mt-1" />
              )}
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase font-mono text-espresso-400 block">Active Profile</span>
              <p className="text-xs font-serif font-medium text-espresso-900 truncate">{activeProfile.name}</p>
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view || (item.view === "home" && currentView === "dashboard");
              const isFeelExistence = item.view === "feel_existence";

              return (
                <button
                  key={item.view}
                  type="button"
                  onClick={() => handleNavClick(item.view)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? isFeelExistence
                        ? "bg-terracotta text-white"
                        : "bg-espresso-900 text-parchment-50"
                      : isFeelExistence
                      ? "text-terracotta bg-terracotta-light/10 font-semibold"
                      : "text-espresso-800 hover:bg-parchment-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-parchment-200 flex flex-col gap-2">
            <button
              onClick={() => {
                onCreateProfile();
                setMobileMenuOpen(false);
              }}
              className="w-full py-2.5 rounded-xl border border-parchment-300 text-xs font-medium text-espresso-800 bg-white"
            >
              + Create a Memory Profile
            </button>

            {currentUser && onSignOut && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSignOut();
                }}
                className="w-full py-2.5 rounded-xl text-xs font-medium text-terracotta bg-terracotta-light/30 flex items-center justify-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out ({currentUser.name})</span>
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
