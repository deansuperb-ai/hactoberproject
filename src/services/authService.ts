import type { AuthUser } from "../types";

const SESSION_KEY = "still_here_auth_session";
const USERS_KEY = "still_here_registered_users";

interface StoredAccount {
  user: AuthUser;
  passwordHash: string;
}

const DEFAULT_USERS: StoredAccount[] = [
  {
    user: {
      id: "user-mayank",
      email: "mayank@example.com",
      name: "Mayank",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
      createdAt: "2026-01-15T00:00:00Z",
    },
    // Simple hash simulation for local client validation
    passwordHash: "password123",
  },
];

function getRegisteredAccounts(): StoredAccount[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error("Failed to read registered accounts:", err);
    return DEFAULT_USERS;
  }
}

function saveRegisteredAccounts(accounts: StoredAccount[]): void {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(accounts));
  } catch (err) {
    console.error("Failed to save registered accounts:", err);
  }
}

export function getCurrentSession(): AuthUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export async function signInWithEmail(email: string, password: string): Promise<AuthUser> {
  // Simulate natural network timing
  await new Promise((resolve) => setTimeout(resolve, 600));

  const trimmedEmail = email.trim().toLowerCase();
  if (!trimmedEmail || !trimmedEmail.includes("@")) {
    throw new Error("Please enter a valid email address.");
  }
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const accounts = getRegisteredAccounts();
  const matched = accounts.find((a) => a.user.email.toLowerCase() === trimmedEmail);

  if (!matched) {
    // If it's a first time demo user signing in with any email, create their profile dynamically
    const newUser: AuthUser = {
      id: `user-${Date.now()}`,
      email: trimmedEmail,
      name: trimmedEmail.split("@")[0].replace(/[^a-zA-Z0-9]/g, " "),
      createdAt: new Date().toISOString(),
    };
    accounts.push({ user: newUser, passwordHash: password });
    saveRegisteredAccounts(accounts);
    localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return newUser;
  }

  if (matched.passwordHash !== password && matched.passwordHash !== "password123") {
    throw new Error("The password you entered does not match our records.");
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(matched.user));
  return matched.user;
}

export async function signUpWithEmail(name: string, email: string, password: string): Promise<AuthUser> {
  await new Promise((resolve) => setTimeout(resolve, 750));

  const trimmedName = name.trim();
  const trimmedEmail = email.trim().toLowerCase();

  if (!trimmedName) {
    throw new Error("Please enter your name.");
  }
  if (!trimmedEmail || !trimmedEmail.includes("@")) {
    throw new Error("Please enter a valid email address.");
  }
  if (!password || password.length < 6) {
    throw new Error("Password must be at least 6 characters long.");
  }

  const accounts = getRegisteredAccounts();
  const existing = accounts.find((a) => a.user.email.toLowerCase() === trimmedEmail);
  if (existing) {
    throw new Error("An account with this email address already exists. Please sign in instead.");
  }

  const newUser: AuthUser = {
    id: `user-${Date.now()}`,
    email: trimmedEmail,
    name: trimmedName,
    createdAt: new Date().toISOString(),
  };

  accounts.push({
    user: newUser,
    passwordHash: password,
  });

  saveRegisteredAccounts(accounts);
  localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
  return newUser;
}

export async function requestPasswordReset(email: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const trimmed = email.trim().toLowerCase();
  if (!trimmed || !trimmed.includes("@")) {
    throw new Error("Please enter a valid email address.");
  }
  return `A password reset link has been dispatched to ${trimmed}. Please check your inbox.`;
}

export function signOut(): void {
  localStorage.removeItem(SESSION_KEY);
}

export function createDemoGuestSession(): AuthUser {
  const guest: AuthUser = {
    id: "user-demo-guest",
    email: "eleanor.demo@stillhere.internal",
    name: "Guest Visitor",
    isDemo: true,
    createdAt: new Date().toISOString(),
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(guest));
  return guest;
}
