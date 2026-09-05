# 📖 Technical Architecture & Developer Documentation
## Social Network Knowledge Hub & AI Research Professor

---

## Table of Contents
1. [System Overview & Architecture Goals](#1-system-overview--architecture-goals)
2. [Modular Architecture & Directory Structure](#2-modular-architecture--directory-structure)
3. [Core Architectural Principles](#3-core-architectural-principles)
4. [Domain Layer Specifications](#4-domain-layer-specifications)
5. [Service Layer Specifications](#5-service-layer-specifications)
6. [UI Component Layer Specifications](#6-ui-component-layer-specifications)
7. [Utilities & Configuration](#7-utilities--configuration)
8. [Gemini AI REST API & Search Grounding Integration](#8-gemini-ai-rest-api--search-grounding-integration)
9. [Unit Testing & Verification](#9-unit-testing--verification)
10. [Developer Extension Guide](#10-developer-extension-guide)

---

## 1. System Overview & Architecture Goals

**Social Network Knowledge Hub** is an interactive web application designed for academic research and education in Social Network Analysis (SNA), Graph Theory, and Graph Machine Learning.

### Key Technical Goals:
- **Zero Monolithic Dependencies**: Refactored from a single 2,670+ line HTML file into native **ES6 Modules (`type="module"`)**.
- **100% Declarative & Event-Driven**: Zero inline event attributes (`onclick`, `onchange`, `onsubmit`) in HTML markup.
- **Strict Separation of Concerns (SoC)**: Clear boundaries between Presentation (UI Components), Domain Logic (Graph Algorithms & Data Structures), Services (Storage & External API), Data (Datasets), and Utilities.
- **Isolated Testing**: Domain graph logic and metrics can be imported and tested independently in Node or browser test runners without requiring a rendered DOM.

---

## 2. Modular Architecture & Directory Structure

```
social-network-hub/
│
├── index.html                           # Semantic HTML Shell (Zero inline JS)
├── README.md                            # Public Repository Overview
├── DOCUMENTATION.md                     # Deep Technical Architecture Documentation
│
├── styles/
│   ├── main.css                         # Core typography, layout, prose markdown styles
│   └── components.css                   # Glassmorphism cards & CSS animations
│
├── js/
│   ├── main.js                          # Application bootstrapper & component initializer
│   │
│   ├── config/
│   │   └── appConfig.js                 # Constants, storage keys, Gemini model endpoints, 5 prompt modes
│   │
│   ├── data/
│   │   ├── glossary.js                  # 17 key SNA terms dataset
│   │   ├── domains.js                   # 12 CS domain integration dataset
│   │   ├── graphs.js                    # Empirical dataset & topology presets
│   │   ├── research.js                  # 10 CS research problems dataset
│   │   ├── thesis.js                    # 4 deep thesis topics dataset
│   │   └── roadmap.js                   # 6-semester learning roadmap dataset
│   │
│   ├── domain/
│   │   ├── graph/
│   │   │   ├── Graph.js                 # Core Graph OOP Data Structure Class
│   │   │   ├── graphMetrics.js          # Degree, Betweenness, Closeness, PageRank, Louvain
│   │   │   └── graphUtils.js            # Barabási-Albert & Watts-Strogatz generators
│   │   │
│   │   └── algorithms/
│   │       ├── bfs.js                   # Step-by-step BFS step generator
│   │       └── dijkstra.js              # Step-by-step Dijkstra step generator
│   │
│   ├── services/
│   │   ├── storageService.js            # Encapsulated LocalStorage session & key manager
│   │   ├── exportService.js             # Markdown session export & Graph JSON export
│   │   └── geminiService.js             # REST API caller with Search Grounding & Fallback
│   │
│   ├── components/
│   │   ├── navigation.js                # Mobile nav menu & status indicator
│   │   ├── glossary.js                  # Searchable terminology concept grid
│   │   ├── graphSimulator.js            # D3.js physics simulator & constellation canvas
│   │   ├── centralityCharts.js          # Chart.js radar & complexity charts
│   │   ├── algorithmWorkbench.js        # Step visualizer for BFS, Dijkstra, & GNN
│   │   ├── aiLab.js                     # 5-mode Profesor AI chat feed & config modal
│   │   └── research.js                  # 12 CS domains, thesis topics & roadmap
│   │
│   └── utils/
│       ├── dom.js                       # Element selectors & event listeners
│       ├── validators.js                # Key & graph structural validators
│       └── formatters.js                # Markdown, KaTeX, dates & matrix stringifiers
│
└── tests/
    ├── graph.test.js                    # Graph & Centrality metrics unit tests
    └── geminiService.test.js            # Service & validator unit tests
```

---

## 3. Core Architectural Principles

### 🟢 SOLID Principles Implementation
1. **Single Responsibility Principle (SRP)**:
   - `Graph.js` is strictly responsible for graph data structures and representation matrices.
   - `graphMetrics.js` focuses exclusively on mathematical graph metrics calculations.
   - `storageService.js` handles client-side persistence (`localStorage`).
   - `geminiService.js` manages HTTP network calls to Google Gemini.
2. **Open/Closed Principle (OCP)**:
   - New graph presets can be added to `js/data/graphs.js` without altering simulation rendering logic.
   - New AI prompt modes can be added to `js/config/appConfig.js` without modifying UI chat feed code.
3. **Liskov Substitution Principle (LSP)**:
   - Data models strictly adhere to established contracts across components.
4. **Interface Segregation Principle (ISP)**:
   - Components only import specific functions/services they require (`storageService` vs `exportService`).
5. **Dependency Inversion Principle (DIP)**:
   - Components depend on high-level service interfaces rather than raw browser `localStorage` or `fetch` calls.

---

## 4. Domain Layer Specifications

The domain layer located under `js/domain/` contains zero DOM dependencies.

### `Graph.js`
Object-Oriented Graph Data Structure Class:
```javascript
import { Graph } from './js/domain/graph/Graph.js';

const graph = new Graph(nodes, links, isDirected);
graph.getNodeCount();               // Returns total vertices |V|
graph.getEdgeCount();               // Returns total edges |E|
graph.getDensity();                 // Calculates density ratio rho
graph.toAdjacencyMatrix();          // Returns { labels, matrix }
graph.toAdjacencyListString();      // Returns Adjacency List text
graph.toEdgeListString();           // Returns Edge List text
```

### `graphMetrics.js`
Provides quantitative network metrics:
- `calculateDegreeCentrality(graph)`: Normalised degree centrality $C_D(v) = \frac{\text{deg}(v)}{|V|-1}$.
- `calculateBetweennessCentrality(graph)`: Brandes' shortest-path accumulation $C_B(v) = \sum_{s \neq v \neq t} \frac{\sigma_{st}(v)}{\sigma_{st}}$.
- `calculateClosenessCentrality(graph)`: Inverse geodesic distance sum $C_C(v) = \frac{|V|-1}{\sum d(v, u)}$.
- `calculatePageRank(graph, damping, iterations)`: Power iteration PageRank algorithm.
- `calculateCommunityClusters(graph)`: Louvain-style connected component cluster partitioning.

### `bfs.js` & `dijkstra.js`
Generates step-by-step state arrays (`START`, `DEQUEUE`, `VISIT_NEIGHBOR`, `RELAX_SUCCESS`, `COMPLETE`) consumed by the interactive visualizer.

---

## 5. Service Layer Specifications

### `storageService.js`
Encapsulates `localStorage` reads and writes for:
- Gemini API Key (`STORAGE_KEY_API_KEY`)
- Active Model ID (`STORAGE_KEY_MODEL`)
- Search Grounding toggle (`STORAGE_KEY_SEARCH_GROUNDING`)
- Multi-session chat history (`STORAGE_KEY_PROF_SESSIONS`)

### `geminiService.js`
Communicates with Google Gemini API REST endpoints:
- Supports fallback model sequence (`gemini-2.5-flash`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-1.5-flash`).
- Automatically injects `{ tools: [{ googleSearch: {} }] }` for Google Search Grounding.
- Extracts grounding citations (`result.candidates[0].groundingMetadata.groundingChunks`).

### `exportService.js`
Handles file generation and browser downloads:
- `exportSessionToMarkdown(session, model)`: Generates Markdown research notes (`.md`).
- `exportGraphToJSON(graphData)`: Generates network topology data (`.json`).

---

## 6. UI Component Layer Specifications

Each UI component under `js/components/` implements an `init()` method:

- **`navigationComponent`**: Handles mobile hamburger menu toggles, logo smooth scrolling, and key status dot pulsing.
- **`glossaryComponent`**: Renders 17 terminology concept cards with live input filter.
- **`graphSimulatorComponent`**: Wraps D3.js force simulation, canvas hero constellation background, topology stats, and node color updates.
- **`centralityChartsComponent`**: Initializes Chart.js radar chart (4 actor roles) and line chart ($O(|V|^2)$ vs $O(|V|+|E|)$ complexity).
- **`algorithmWorkbenchComponent`**: Controls step-by-step playback (Play, Pause, Prev, Next, Reset) for BFS, Dijkstra, and GNN Message Passing.
- **`aiLabComponent`**: Manages 5-mode Profesor AI chat feed, session switching/creation/deletion, and the AI Config modal.
- **`researchComponent`**: Renders 12 Computer Science domain tabs, 10 research problems, 4 thesis topics, and 6-stage curriculum roadmap.

---

## 7. Utilities & Configuration

- **`js/config/appConfig.js`**: Contains API base URLs, default model IDs, preset fallback models, and the 5 Profesor AI mode system prompts.
- **`js/utils/dom.js`**: Helper functions `$(id)`, `createElement(tag, className, attrs)`, `setText(target, text)`, and `addEvent(target, event, handler)`.
- **`js/utils/validators.js`**: `isValidApiKey(key)`, `isValidGraphData(data)`, `sanitizeString(str)`.
- **`js/utils/formatters.js`**: Markdown parsing fallback (`parseMarkdown`), KaTeX renderer trigger (`renderKaTeX`), date formatter (`formatDateIndonesian`), and float formatting (`formatFloat`).

---

## 8. Gemini AI REST API & Search Grounding Integration

The application interacts with Google Gemini v1beta REST endpoints:

```http
POST https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={apiKey}
Content-Type: application/json

{
  "contents": [
    {
      "role": "user",
      "parts": [{ "text": "Formulasikan research gap terbaru pada Graph Neural Networks." }]
    }
  ],
  "systemInstruction": {
    "parts": [{ "text": "Anda adalah Profesor Riset AI..." }]
  },
  "tools": [
    { "googleSearch": {} }
  ]
}
```

Grounding references are dynamically rendered as citation links below the AI answer cards in `aiLab.js`.

---

## 9. Unit Testing & Verification

Unit tests are provided under the `tests/` directory:

### Running Tests in Browser Console:
1. Open the application in your browser.
2. Open Developer Tools (`F12` > Console).
3. Execute:
   ```javascript
   import('./tests/graph.test.js').then(m => console.table(m.runGraphTests()));
   import('./tests/geminiService.test.js').then(m => console.table(m.runServiceTests()));
   ```

---

## 10. Developer Extension Guide

### Adding a New Graph Preset:
1. Open `js/data/graphs.js`.
2. Add your node and edge definition:
   ```javascript
   export const PRESET_GRAPHS = {
       ...
       my_preset: {
           nodes: [{ id: '1' }, { id: '2' }],
           links: [{ source: '1', target: '2', weight: 1 }]
       }
   };
   ```
3. Add a matching `<option value="my_preset">` in `index.html` under `#preset-graph-select`.

### Adding a New AI Prompt Mode:
1. Open `js/config/appConfig.js`.
2. Add a new configuration key to `PROF_MODES_CONFIG`:
   ```javascript
   my_mode: {
       title: 'Judul Mode Baru',
       desc: 'Deskripsi mode baru',
       systemPrompt: 'System prompt untuk AI...',
       presets: ['Pertanyaan 1', 'Pertanyaan 2']
   }
   ```
3. Add a corresponding tab button in `index.html` inside `#ai-lab`.
