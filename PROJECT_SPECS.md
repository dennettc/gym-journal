# Project Specifications: Mission-Direct Alpine Ski Training Journal

## 1. Overview
A "Mission-Direct" Alpine Ski Training Journal web app designed exclusively for Dryland Training. This application will track workouts, manage training phases, and provide specific templates for ski-specific exercises. It is a mobile-first, zero-cost, private application with no backend.

**Scope:** Dryland Training ONLY. No "On-Snow" or "SkillsQuest" features.

## 2. Core Constraints & Architecture
*   **Data Persistence:** `localStorage` only.
    *   **Key:** `ski_journal_data`
    *   **Privacy:** 100% on-device. No backend, no authentication.
*   **Data Portability:** Feature to "Export to CSV". Ensure all user-generated content is sanitized (e.g., by prepending `'` to fields starting with `=`, `+`, `-`, or `@`) to prevent CSV Injection attacks.
*   **UI/UX:** Mobile-First. Large, tap-friendly buttons for gym use.
*   **Tech Stack:**
    *   React (Vite)
    *   Tailwind CSS (Slate & Blue theme)
    *   Lucide-React icons

## 3. Data Structure
The application state will be stored in a single JSON object in `localStorage`.

```json
{
  "userSettings": {
    "currentPhase": "1", // 1, 2, or 3
    "tjtMaxReps": 0, // Integer, max reps in 2 minutes
    "theme": "light" // Optional
  },
  "workouts": [
    {
      "id": "uuid",
      "date": "ISO-8601 String",
      "type": "Leg Blaster" | "TJT" | "Max Strength" | "Recovery",
      "subtype": "Mini" | "Full" | null,
      "metrics": {
        "setsCompleted": 5,
        "rounds": 10,
        "notes": "Felt good"
      }
    }
  ]
}
```

## 4. Feature Roadmap

### Phase 1: Foundation & Settings
*   **Initialize Project:** Setup React + Vite + Tailwind.
*   **Storage Manager:** Implement a service to handle reading/writing to `localStorage`.
*   **Settings Page:**
    *   Global Phase Selector (Phase 1, 2, 3).
    *   TJT "2-minute max reps" Input.
    *   "Export to CSV" Button.

### Phase 2: Dynamic Dashboard
The Dashboard must adapt based on the `currentPhase` setting:
*   **Phase 1: Capacity (Off-Season):**
    *   Show "Max Strength" inputs.
    *   Show Zone 1-2 Timers.
*   **Phase 2: Utilization (Pre-Season):**
    *   Show "Leg Blaster" checklists.
    *   Show "TJT Interval" timers.
*   **Phase 3: Maintenance (In-Season):**
    *   Show low-volume "Recovery" workouts (Mini Leg Blasters).

### Phase 3: Workout Implementation

#### Leg Blaster Templates
*   **Types:**
    *   **Mini:** 10x Air Squats, 10x Lunges (5/leg), 10x Jumping Lunges (5/leg), 5x Jump Squats.
    *   **Full:** 20x Air Squats, 20x Lunges (10/leg), 20x Jumping Lunges (10/leg), 10x Jump Squats.
*   **Features:**
    *   Checklist for sets.
    *   **30s Rest Timer** between sets.

#### TJT (The Jumps Training) Calculator
*   **Logic:**
    *   Retrieve "2-minute max reps" from Settings.
    *   Calculate Daily EMOM Target = `Round(0.25 * max_reps)`.
*   **UI:**
    *   Display target reps per minute.
    *   Interval Timer for EMOM (Every Minute on the Minute).

## 5. UI/UX Design Guidelines
*   **Theme:** Slate (Backgrounds/Text) & Blue (Accents/Buttons).
*   **Layout:**
    *   Bottom Navigation: Dashboard, History, Settings.
    *   Top Bar: Current Phase Indicator.
*   **Components:**
    *   Large Cards for Workout Types.
    *   Big "Start" / "Stop" buttons for timers.
    *   Simple Input fields for numbers.
