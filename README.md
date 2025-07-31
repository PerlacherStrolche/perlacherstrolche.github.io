# Perlacher Strolche

Copyright © 2025 Thomas Linke & Perlacher Strolche e.V. All rights reserved.

https://perlacher-strolche.de/

Website built with Vite and Tailwind CSS.

## Project Structure

```
PerlacherStrolche/ 
├── src/                # Source code
   ├── components/      # Modular page templates (Home, Blog, Strolche, Konzept, ...)
   ├── css/             # Stylesheet
   ├── data/            # JSON Data (Navigation, Blog, Images)
   ├── js/              # JavaScript utility functions
├── public/             # Static assets 
   ├── images/          # Images and other downloadable files
├── index.html          # Main HTML entry point 
├── vite.config.js      # Vite configuration 
├── package.json        # Project dependencies and scripts 
└── deploy.sh           # Deployment script
```

## Tech Stack

- **Build Tool**: Vite 7.0.6
- **CSS Framework**: Tailwind CSS 4.1.11
- **Template Engine**: Handlebars (via vite-plugin-handlebars)
- **Code Formatting**: Prettier 3.6.2
- **Package Manager**: bun

## Installation

1. Install bun

```bash
   curl -fsSL https://bun.sh/install | bash
```

2. Clone the repository

```bash
  git clone <repository-url> 
  cd PerlacherStrolche
```

3. Install dependencies

```bash
  bun install
```

## Development

Start the development server:

```bash
  bun run dev
```

## Build

Build for production:

```bash
  bun run build
```

## Deployment

Use the provided deployment script:

```bash
  ./deploy.sh
```
