# VECTORMON

## Project Overview

Vectormon is a fully 3D browser-based monster battle game inspired by the battle-focused experience of creature battling games, while maintaining its own identity through a small roster, stylized visuals, modern presentation, and extremely polished gameplay.

The project focuses on quality over quantity.

Instead of hundreds of monsters and endless mechanics, Vectormon delivers:

* 12 Monsters
* 3 Types
* 12 Trainers
* 4 Arenas
* Fast Battles
* Beautiful Graphics
* Smooth Mobile Gameplay
* Strong Visual Effects
* Memorable Sound Design

---

# Core Philosophy

> Small Scope. Massive Polish.

Every system should be easy to understand.

Every battle should feel exciting.

Every animation should feel impactful.

The goal is to create a game that looks far more expensive than it actually is.

---

# Platform Targets

## Primary Platform

Mobile Web Browsers (Portrait Mode)

## Secondary Platform

Desktop Browsers

---

# Technology Stack

## Frontend

* React
* TypeScript
* Vite

## 3D Engine

* Three.js
* React Three Fiber
* Drei

## State Management

* Zustand

## Audio

* Howler.js

## Animations

* React Spring

## Deployment

* Vercel

---

# Battle System

## Match Format

Singles Only

No Doubles

No Triple Battles

No Special Formats

---

## Team Size

2 Vectormons per Trainer

Every battle is:

Player Team (2)
VS
Opponent Team (2)

---

## Battle Flow

Choose Trainer

↓

Choose Team

↓

Battle Begins

↓

Select Move

↓

Attack Animation

↓

Damage Calculation

↓

Next Turn

↓

Victory / Defeat

---

# Level System

No Visible Levels

All Vectormons internally use fixed Level 100 stats.

Players never see level numbers.

No grinding.

No experience.

No stat training.

---

# Stats

Every Vectormon has:

* HP
* Attack
* Defense
* Speed

These values are fixed.

No hidden stats.

No EVs.

No IVs.

---

# Type System

Only 3 Types exist.

## Fire

Strong Against:

* Nature

Weak Against:

* Water

---

## Water

Strong Against:

* Fire

Weak Against:

* Nature

---

## Nature

Strong Against:

* Water

Weak Against:

* Fire

---

# Damage Multipliers

Advantage:
1.5x

Neutral:
1.0x

Disadvantage:
0.75x

---

# Status Effects

Only three status effects exist.

## Burn

Deals damage every turn.

---

## Freeze

Chance to lose a turn.

---

## Root

Reduces Speed.

---

# Moves

Every Vectormon has exactly 4 moves.

## Move 1

Reliable attack.

---

## Move 2

Stronger attack.

---

## Move 3

Riskier attack.

---

## Signature Move

Unique move with unique animation.

---

# Monster Roster

Total Monsters: 12

## Fire

1. Pyron
2. Emberix
3. Volflare
4. Magmite

## Water

5. Aquava
6. Tidera
7. Splashock
8. Cryofin

## Nature

9. Thornix
10. Florawk
11. Mossaur
12. Vineon

Names are placeholders.

---

# Trainers

Total Trainers: 12

## Male Trainers

1. Alex
2. Kai
3. Rex
4. Zane
5. Leo
6. Finn

## Female Trainers

7. Maya
8. Luna
9. Iris
10. Nova
11. Skye
12. Aria

Names are placeholders.

---

# Trainer Selection

At game start:

Player selects one trainer.

That trainer becomes the player's avatar.

The selected trainer is removed from the opponent pool.

---

# Opponent Rotation System

The remaining 11 trainers enter a shuffle bag.

Opponent order is randomized.

A trainer cannot repeat until all other trainers have appeared.

Example:

Player chooses Maya.

Fight Order:

Alex
Nova
Finn
Leo
Rex
Iris
Skye
Kai
Zane
Aria
Luna

After all 11 battles:

Shuffle Again

Repeat

---

# Arena System

Total Arenas: 4

---

## Crystal Forest

Features:

* Giant Crystals
* Glowing Plants
* Floating Particles

---

## Volcanic Crater

Features:

* Lava
* Smoke
* Heat Distortion

---

## Sky Temple

Features:

* Floating Islands
* Clouds
* Sun Rays

---

## Cyber Grid

Features:

* Neon Effects
* Holograms
* Digital Terrain

---

# Camera System

The camera should feel cinematic.

---

## Idle Camera

Slow orbit around arena.

---

## Attack Camera

Fast push toward attacker.

---

## Hit Camera

Impact shake.

---

## Critical Hit Camera

Freeze Frame

Strong Shake

Particle Burst

---

## Victory Camera

Hero shot of winning Vectormon.

---

# Visual Effects

## Fire Effects

* Sparks
* Flames
* Smoke

---

## Water Effects

* Splashes
* Mist
* Water Trails

---

## Nature Effects

* Leaves
* Vines
* Pollen

---

## Battle Effects

* Hit Sparks
* Damage Numbers
* Critical Effects
* Impact Flashes

---

# Sound Design

## Music

### Main Menu Theme

1 Track

### Trainer Select Theme

1 Track

### Battle Theme

1 Track

### Fire Remix

1 Track

### Water Remix

1 Track

### Nature Remix

1 Track

### Victory Theme

1 Track

### Defeat Theme

1 Track

Total:
8 Tracks

---

## Sound Effects

### UI

* Hover
* Click
* Confirm

### Battle

* Attacks
* Hits
* Critical Hits
* Victory
* Defeat

### Environment

* Wind
* Lava
* Water
* Forest Ambience

---

# Mobile Design

Portrait First

Primary target:

1080x1920

---

## Layout

Enemy Team

Arena

Player Team

Move Buttons

---

## Controls

Tap Only

No Joystick

No Camera Controls

No Complex Gestures

---

# Performance Philosophy

Looks AAA

Runs Everywhere

---

# Optimization Requirements

## Geometry

Monsters:
3k–8k Triangles

Trainers:
2k–5k Triangles

Arena:
20k–50k Triangles

---

## Rendering

Use:

* Frustum Culling
* Occlusion Culling
* GPU Instancing
* LOD Systems
* Texture Atlases

---

## Textures

Prefer:

* 512x512
* 1024x1024

Avoid excessive 4K textures.

---

## Lighting

Beauty should come from:

* Directional Lighting
* HDRI
* Bloom
* Volumetric Fog
* Reflections

Not from excessive polygon counts.

---

# Performance Targets

Desktop:

120 FPS+

Mid Range Mobile:

60 FPS+

Low End Mobile:

Playable and Stable

---

# Progression

No Grinding

No EXP

No Levels

No Evolution

No Breeding

No Trading

No Items

No Abilities

---

# Unlockables

After defeating all 11 trainers:

## Champion Title

Unlock Champion Status

---

## Monster Gallery

View all monsters

Rotate models

Play animations

Read lore

---

## Trainer Gallery

View all trainers

---

## Arena Viewer

Explore battle arenas

---

## Sound Test

Listen to all music and sounds

---

## Endless Mode

Infinite trainer battles

---

# Future Versions

## Version 1.0

Complete offline battle game

---

## Version 2.0

Custom Team Builder

---

## Version 3.0

Online Battles

---

## Version 4.0

Ranked Mode

---

# Success Criteria

Vectormon should:

* Look visually impressive
* Run smoothly on mobile
* Load quickly
* Feel responsive
* Have memorable battles
* Be easy to learn
* Be difficult to master
* Feel polished despite its small scope

If players say:

"How is this running in a browser?"

The project has succeeded.

# Development & Deployment Philosophy

## GitHub First

The entire project must be structured for GitHub from Day One.

Requirements:

* Clean folder structure
* Consistent naming conventions
* TypeScript throughout
* Modular components
* Reusable systems
* Clear documentation

Every completed feature should be committed to GitHub.

---

## Vercel First

Vectormon is designed to be deployed directly to Vercel.

Deployment should require:

1. Push to GitHub
2. Connect Repository to Vercel
3. Click Deploy

Nothing more.

No server setup.

No VPS.

No Docker requirements.

No manual configuration.

---

## Architecture Requirements

The project must be fully static whenever possible.

Preferred stack:

* React
* TypeScript
* Vite
* Three.js
* React Three Fiber
* Zustand

Avoid unnecessary backend services.

---

## Build Requirements

The project must successfully build using:

```bash
npm install
npm run build
```

and run locally using:

```bash
npm run dev
```

without additional setup.

---

## Repository Structure

```text
vectormon/

├── public/
│
├── src/
│   ├── assets/
│   ├── audio/
│   ├── monsters/
│   ├── trainers/
│   ├── arenas/
│   ├── battle/
│   ├── components/
│   ├── hooks/
│   ├── store/
│   ├── ui/
│   ├── pages/
│   └── utils/
│
├── docs/
│
├── README.md
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Asset Pipeline

All assets should be optimized before committing.

Preferred formats:

Models:

* glTF
* GLB

Textures:

* WebP

Audio:

* OGG
* MP3

---

## Performance Goals

Development Build:

* Smooth on modern PCs

Production Build:

* Smooth on mid-range Android devices

Target:

* Initial Load < 5 seconds
* Stable 60 FPS on mobile
* Stable 120 FPS on desktop

---

## CI/CD Workflow

Developer Workflow:

Code
↓
Git Commit
↓
Push to GitHub
↓
Vercel Auto Deploy
↓
Live Website Updated

No manual deployment steps.

---

## AI Development Compatibility

Project structure should be simple enough that:

* Claude
* ChatGPT
* Gemini

can understand and modify individual systems without breaking the rest of the project.

Each major system should remain isolated and self-contained.

---

## Rule

If a feature makes deployment, maintenance, or performance significantly harder, it should be rejected unless it creates substantial gameplay value.
