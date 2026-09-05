<div align="center">

  <h1>🕸️ Social Network Knowledge Hub & AI Research Professor</h1>
  <p><strong>Enterprise ES6 Modular Architecture, Interactive Learning Platform, Force-Directed Graph Physics Simulator, & AI Research Co-Pilot for Social Network Analysis (SNA) and Graph Machine Learning</strong></p>

  [![Live Demo](https://img.shields.io/badge/Live_Demo-GitHub_Pages-10b981?style=for-the-badge&logo=github)](https://hedwigka.github.io/social-network-ai/)
  [![Gemini Powered](https://img.shields.io/badge/AI-Gemini_2.5_Flash_&_3_Preview-0284c7?style=for-the-badge&logo=google)](https://aistudio.google.com/)
  [![Architecture](https://img.shields.io/badge/Architecture-ES6_Modules_(SOLID)-6366f1?style=for-the-badge&logo=javascript)](DOCUMENTATION.md)
  [![License](https://img.shields.io/badge/License-MIT-amber-500?style=for-the-badge)](LICENSE)
  [![Institution](https://img.shields.io/badge/University-Sanata_Dharma-059669?style=for-the-badge)](https://www.usd.ac.id/)

</div>

---

## 📌 About The Project

**Social Network Knowledge Hub** is a production-grade, enterprise ES6 modular web application designed to facilitate deep exploration, simulation, and academic research in **Social Network Analysis (SNA)**, **Graph Theory**, **Network Science**, and **Graph Neural Networks (GNN)**.

Built with clean architecture, strict Separation of Concerns (SoC), and SOLID design principles, the application features:
- **Physics Simulator Engine**: Real-time D3.js force-directed physics layout & empirical graph dataset explorer (Karate Club, Florentine Families, Warsaw Metro, Scale-Free, Small-World).
- **Interactive Algorithm Workbench**: Step-by-step visualizers for Breadth-First Search (BFS), Dijkstra Shortest Path, and Graph Neural Network (GNN) Message Passing.
- **Personalized AI Research Professor**: A multi-turn AI Research Co-Pilot powered by Google Gemini API with *Google Search Grounding (Web Real-time)*, assisting researchers in discovering unaddressed **Research Gaps**, mapping cross-disciplinary applications, detecting paradoxes, and formulating novel research questions.

🌐 **Access Live Application**: [https://hedwigka.github.io/social-network-ai/](https://hedwigka.github.io/social-network-ai/)  
📖 **Technical Architecture Documentation**: [Read DOCUMENTATION.md](DOCUMENTATION.md)

---

## ✨ Key Features

### 🎨 1. Modern Modular Design System & UX
- Modular CSS architecture (`styles/main.css` and `styles/components.css`) with glassmorphism cards and dynamic micro-animations.
- Fully responsive across desktop, tablet, and mobile browsers with 0% inline JavaScript handlers.
- LaTeX mathematical formatting for Graph Theory formulas using **KaTeX**.

### ⚛️ 2. Force-Directed Graph Physics Simulator (D3.js)
- Real-time interactive physics canvas to manipulate graph nodes and edges.
- Empirical & generative topology presets: **Zachary's Karate Club**, **Florentine Families**, **Warsaw Metro Network**, **Barabási–Albert Scale-Free Graph**, and **Watts–Strogatz Small-World Graph**.
- Live matrix representation generator (**Adjacency Matrix**, **Adjacency List**, **Edge List**).
- Node coloring by **Degree**, **Betweenness**, **Closeness**, **PageRank**, or **Louvain Community Clusters**.

### 🧪 3. Step-by-Step Algorithm Workbench
- Interactive execution step visualizer for **Breadth-First Search (BFS)** and **Dijkstra's Shortest Path Algorithm**.
- Visual step representation of **GNN Layer Message Passing Paradigm** ($\text{AGGREGATE} \rightarrow \text{UPDATE}$).
- Control panel with Play, Pause, Step Next, Step Prev, and Reset features.

### 🤖 4. AI Research Professor (5-Mode Workbench)
Interactive Research Agent featuring **5 Proactive Modes**:
1. 🔬 **Research Gap Scanner**: Scans recent literature to spot unaddressed research gaps & evaluate novelty.
2. 🌉 **Cross-Disciplinary Bridge Builder**: Maps SNA concepts across 12 Computer Science branches (Cybersecurity, Fraud Rings, Recommender Systems, NLP, Bibliometrics).
3. 🧪 **Paradox & Contradiction Detector**: Analyzes conflicting academic findings and methodological limits.
4. 📋 **Research Question Generator**: Formulates thesis/paper Research Questions (RQs) with methodology recommendations.
5. 📊 **Literature & Trend Monitor**: Tracks trending vs declining SNA research topics via real-time web search grounding.

### 🎛️ 5. Dynamic Model & API Key Configuration
- Secure UI modal to configure your Gemini API Key locally in `localStorage`.
- Runtime model selection (`Gemini 2.5 Flash`, `Gemini 2.5 Pro`, `Gemini 3 Flash Preview`, `Gemini 3 Pro Preview`, or custom model IDs) with automatic fallback handling.
- One-click **API Connection Test** directly from the UI.
- **Export Research Notes (.md)**: Download your multi-turn research session into a formatted Markdown document.
- **Export Graph (.json)**: Export active graph topology structure for external tool compatibility (NetworkX, Gephi).

---

## 🏗️ Architecture & Directory Structure

The project has been refactored into a scalable **ES6 Modular (`type="module"`) Architecture**:

```
social-network-hub/
│
├── index.html                           # Semantic HTML Shell (Zero inline JS event handlers)
├── README.md                            # Public Overview & Quickstart Guide
├── DOCUMENTATION.md                     # Deep Technical & Architecture Documentation
│
├── styles/
│   ├── main.css                         # Layout, typography, prose markdown rendering
│   └── components.css                   # Glassmorphism cards & node pulse animations
│
├── js/
│   ├── main.js                          # Bootstrapper initializing components on DOMContentLoaded
│   │
│   ├── config/
│   │   └── appConfig.js                 # App constants, prompt modes, model IDs
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
│   │   │   ├── Graph.js                 # Core Graph Object-Oriented Data Structure Class
│   │   │   ├── graphMetrics.js          # Centrality (Degree, Betweenness, Closeness, PageRank, Louvain)
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
│   │   ├── navigation.js                # Mobile nav menu & key status indicator
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

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Architecture** | Vanilla ES6 Modules (`type="module"`), SOLID Principles, Separation of Concerns |
| **Styling & Design** | Tailwind CSS CDN, Custom Modular CSS (`styles/*.css`) |
| **Physics & Graph Engine** | D3.js (v7 Force Simulation) |
| **Data Analytics Visuals** | Chart.js (Radar & Line Charts) |
| **Math Typesetting** | KaTeX (LaTeX Auto-rendering) |
| **Markdown Parser** | Marked.js |
| **AI Intelligence & Grounding** | Google Gemini API (v1beta REST) + Google Search Grounding |
| **Storage & Persistence** | LocalStorage API (Encapsulated) |

---

## 🚀 Local Getting Started

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/HedwigKA/social-network-ai.git
   cd social-network-ai
   ```

2. **Run Locally**:
   Serve the repository root directory using any local web server (e.g. VS Code Live Server, `npx serve`, or Python HTTP server):
   ```bash
   npx serve .
   ```
   *Note: Because the application uses native ES6 Modules (`import`/`export`), it must be opened via a local HTTP server (`http://localhost:...`) rather than direct `file://` URL.*

3. **Configure AI Research Professor**:
   - Click the **🔑 Model & Key** button in the top navigation bar.
   - Obtain a free API key from [Google AI Studio](https://aistudio.google.com/app/apikey).
   - Paste your API key, click **Test API Connection**, and click **Save Settings**.

---

## 🌐 Deploying to GitHub Pages

This repository is optimized for zero-build **GitHub Pages** deployment:
1. Go to your repository on GitHub: `Settings` > `Pages`.
2. Under **Build and deployment** > **Source**, choose `Deploy from a branch`.
3. Select branch `main` and folder `/ (root)`, then click **Save**.
4. The live site will be deployed at `https://HedwigKA.github.io/social-network-ai/`.

---

## 📖 Documentation & Technical References

For detailed architecture overview, SOLID design rationale, data structure specifications, API mechanics, and developer extension guides, please refer to [DOCUMENTATION.md](DOCUMENTATION.md).

---

## 🏛️ Academic Attribution & License

Developed as an open interactive learning & research workbench for Social Network Analysis and Computer Science education.

Released under the [MIT License](LICENSE).
