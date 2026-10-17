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
} from "lucide-react";
import type { AppView, PersonProfile } from "../../types";

interface NavigationProps {
  currentView: AppView;
  onNavigate: (view: AppView) => void;
  onOpenAddMemory: () => void;
  activeProfile: PersonProfile;
  onCreateProfile: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentView,
  onNavigate,
  onOpenAddMemory,
  activeProfile,
  onCreateProfile,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { view: AppView; label: string; icon: React.FC<{ className?: string }> }[] = [
    { view: "home", label: "Home", icon: Home },
    { view: "memories", label: "Memories", icon: Grid },
    { view: "flashbacks", label: "Flashbacks", icon: Film },
    { view: "feel_existence", label: "Feel the Existence", icon: Flame },
    { view: "settings", label: "Privacy & Settings", icon: Settings },
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
              className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
              aria-label="STILL HERE — Home"
            >
              <div className="w-10 h-10 rounded-2xl bg-espresso-950 flex items-center justify-center text-parchment-100 shadow-sm group-hover:scale-105 transition-transform">
                <span className="font-serif font-semibold text-lg tracking-wider text-parchment-100">
                  SH
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-espresso-950 group-hover:text-terracotta transition-colors">
                  STILL HERE
                </span>
                <span className="text-[10px] font-mono tracking-widest text-espresso-500 uppercase">
                  Personal Memory Sanctuary
                </span>
              </div>
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
              <span className="text-xs font-serif font-medium text-espresso-800 truncate max-w-[140px]">
                {activeProfile.name}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
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

          {/* Right Action Buttons */}
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
              <span>Add a memory</span>
            </button>
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
              const isActive = currentView === item.view;
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
          </div>
        </div>
      )}
    </header>
  );
};
