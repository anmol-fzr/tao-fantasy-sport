# The Alter Office _ Fantasy Sport — Project Overview

This document explains what the project does, how it works internally, and the reasoning behind its architecture. It is written to give reviewers and recruiters a quick, clear understanding of the assignment.

---

## 1. Introduction

**Tao Fantasy Sport** is a modern frontend assignment that demonstrates clean UI architecture, state management, and TypeScript-driven development.  
It simulates the core flow of building a fantasy sports team, focusing on correctness, structure

---

## 2. Tech Stack

- **Bun** — Runtime & package manager  
- **React + TypeScript** — Component-based, type-safe UI development  
- **TanStack Router** — File-based routing with loaders  
- **TailwindCSS** — Utility-first, responsive styling  
- **Vite** — Fast dev server and bundler  

---

## 3. What the Application Does

The assignment focuses on building a **fantasy team selection interface**, including:

- Listing available players  
- Selecting a captain and vice-captain  
- Tracking number of selected players  
- Enforcing player limits and role constraints  
- Real-time updates to reflect user choices  
- Basic validation to ensure rules are followed

This demonstrates an understanding of state management, component composition, and performance-conscious logic.

---

## 4. Project Structure
```
.
└── src
    ├── components
    ├── data
    ├── integrations
    ├── lib
    ├── modules
    ├── routes
    └── store

```

What Else Could Be Done (If It Were a Larger Project)

Since this is a small-scale assignment, the primary goal was to keep the logic easy to follow and the state management simple.
However, in a more production-oriented version of this project, several improvements could be added:

- Skeleton Loaders
To improve user experience during API calls, suspense based skeleton loaders could be shown while the data loads.
This would make the interface feel smoother and more polished.

- Performance Improvements
Features such as memoized selectors, virtualization for long player lists, and more efficient data fetching patterns could be added to make the app feel extremely snappy even at scale.

- Normalizing Frontend Data
Data could be normalized into structures like sets and maps to avoid repetitive array operations and improve lookup performance.

- API Data Validation
We could add strict validation for incoming API data to ensure no unexpected values break the UI.
Libraries like Zod would help guarantee the shape and type of all responses.
