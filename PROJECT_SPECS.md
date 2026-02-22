# Project Specifications: Mission-Direct Alpine Ski Training Journal

## 1. Overview
A "Mission-Direct" Alpine Ski Training Journal web app designed exclusively for Dryland Training. This application will track workouts, manage training phases, and provide specific templates for ski-specific exercises. It is a mobile-first, zero-cost, private application with no backend.

**Scope:** Dryland Training ONLY. No "On-Snow" or "SkillsQuest" features.

## 2. Core Constraints & Architecture
*   **Data Persistence:** `localStorage` only.
    *   **Key:** `ski_journal_data`
    *   **Privacy:** 100% on-device. No backend, no authentication.
*   **Data Portability:** Feature to "Export to CSV".
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
    "currentPhase": "1", // 1, 2, or 3 (See Sec 6 for validation)
    "tjtMaxReps": 0, // Integer, max reps in 2 minutes (See Sec 6 for validation)
    "theme": "light" // Optional
  },
  "workouts": [
    {
      "id": "uuid",
      "date": "ISO-8601 String",
      "type": "Leg Blaster" | "TJT" | "Max Strength" | "Recovery",
      "subtype": "Mini" | "Full" | null,
      "metrics": {
        "setsCompleted": 5, // (See Sec 6 for validation)
        "rounds": 10, // (See Sec 6 for validation)
        "notes": "Felt good" // (See Sec 6 for validation)
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
    *   Global Phase Selector (Phase 1, 2, 3) - **Input Validation Required** (See Sec 6).
    *   TJT "2-minute max reps" Input - **Input Validation Required** (See Sec 6).
    *   "Export to CSV" Button - **CSV Injection Protection Required** (See Sec 6).

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
    *   Retrieve "2-minute max reps" from Settings (Validate as per Sec 6).
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

## 6. Security & Data Integrity

### Input Validation Rules
To ensure data integrity and prevent security vulnerabilities, all inputs must adhere to the following rules:

*   **Global Phase Selector:**
    *   Allowed values: "1", "2", "3".
    *   Type: String.
*   **TJT "2-minute max reps":**
    *   Constraint: Non-negative integer.
    *   Maximum Value: 500.
*   **Workout Metrics:**
    *   `setsCompleted`: Non-negative integer (0-100).
    *   `rounds`: Non-negative integer (0-100).
*   **Workout Notes:**
    *   Maximum Length: 500 characters.
    *   **XSS Protection:** All notes must be HTML-escaped before being rendered in the DOM to prevent Cross-Site Scripting.

### Data Export Security
*   **CSV Injection Prevention:** When exporting data to CSV, all string fields must be sanitized. If a field begins with any of the following characters: `=`, `+`, `-`, `@`, it must be prepended with a single quote (`'`) to prevent execution of malicious formulas in spreadsheet software.
