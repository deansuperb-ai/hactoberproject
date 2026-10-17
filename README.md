# STILL HERE — Frontend

> *"Keep the moments that keep you close."*

**STILL HERE** is an emotionally sensitive, editorial web application for preserving personal memories and interacting with a private archive of authentic voice recordings, letters, and photographs. It offers conversational reflections strictly grounded in your authentic memories with full source transparency.

---

## Architecture & Ownership

Strictly frontend-owned according to team boundaries:
- **`src/services/stillHereApi.ts`**: The canonical frontend API adapter. Connects UI components to Person 2's backend while maintaining an offline-ready, deterministic demo archive fallback with zero simulated-data ambiguity.
- **`src/types/index.ts`**: Standardized TypeScript contracts for `Memory`, `MessageSource`, `ConversationMessage`, `ChatRequest`, and `ChatResponse`.
- **`src/components/`**:
  - `common/`: Analogue audio player, persistent playback banner, accessible modals, confirmation dialogs, toasts, tag pills, and top navigation.
  - `memory/`: Editorial album cards, memory detail modal, and interactive upload modal with file validation and preview.
  - `conversation/`: Editorial reflection interface with three distinct badges:
    1. **Original recording** — Authentic saved audio.
    2. **Words from your archive** — Exact quotations with source references.
    3. **AI-generated reflection** — Newly generated content, not an authentic message.
- **`src/views/`**:
  - **A. Welcome / Introduction** (`WelcomeView.tsx`)
  - **B. Home / Memory Space** (`MemorySpaceView.tsx`)
  - **C. Memories Gallery** (`GalleryView.tsx`)
  - **D. Memory Detail** (`MemoryDetailModal.tsx`)
  - **E. Add & Edit Memory** (`AddMemoryModal.tsx`)
  - **F. Conversation** (`ConversationView.tsx`)
  - **G. Chronological Timeline** (`TimelineView.tsx`)
  - **H. Settings & Privacy** (`SettingsPrivacyView.tsx`)

---

## Visual Design & Aesthetics

- **Color Palette**: Warm ivory & parchment backgrounds (`#FAF6F0`, `#F5EFEB`), deep espresso text (`#231C18`), muted terracotta (`#C25E42`), dusty rose (`#B8736B`), restrained olive (`#58674E`), and brass metal accents.
- **Typography**: Google Fonts editorial serif (`Newsreader`) paired with clean sans-serif (`Plus Jakarta Sans`).
- **Analogue Audio Equipment Touches**: Tactile cassette reels, subtle rotation during playback, SVG/canvas waveform visualizer with click-to-seek, numerical time tracking, speed controls (0.75x–1.5x), and volume controls.
- **Accessibility**: Semantic HTML, visible focus rings, ARIA roles, touch-friendly hit areas, and `prefers-reduced-motion` compliance.

---

## Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or pnpm

### Local Installation
```bash
# Navigate to the project directory
cd still-here

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be live at `http://localhost:5173`.

### Environment Variables

Create a `.env` file in the root directory (based on `.env.example`):

| Variable | Type | Description |
|---|---|---|
| `VITE_API_BASE_URL` | Optional String | URL of the backend API (e.g. `http://localhost:8000`). If left blank, the app defaults to deterministic **Demo Archive Mode** with offline storage. |

*Note: No secret API keys or credentials should ever be placed in frontend environment variables.*

---

## Scripts

- `npm run dev`: Starts the Vite local development server.
- `npm run build`: Type-checks with `tsc -b` and builds production bundle with Vite.
- `npm run lint`: Runs code linter (`oxlint`).
- `npm run preview`: Previews the production build locally.

---

## Deployment Configuration

### Vercel
Configuration is provided in [`vercel.json`](file:///Users/mayankchoubey/.gemini/antigravity-ide/scratch/still-here/vercel.json):
- Framework: `vite`
- Build command: `npm run build`
- Output directory: `dist`
- Single Page Application (SPA) rewrites to `/index.html`

### Netlify
Configuration is provided in [`netlify.toml`](file:///Users/mayankchoubey/.gemini/antigravity-ide/scratch/still-here/netlify.toml):
- Command: `npm run build`
- Publish directory: `dist`
- Redirect rule: `/*` -> `/index.html` (200 status)

---

## License & Privacy
Private personal memory sanctuary. All memories belong solely to the user.
