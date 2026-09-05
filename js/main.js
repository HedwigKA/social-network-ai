/**
 * Application Entry Point / Bootstrapper (ES6 Modules).
 */
import { navigationComponent } from './components/navigation.js';
import { glossaryComponent } from './components/glossary.js';
import { graphSimulatorComponent } from './components/graphSimulator.js';
import { centralityChartsComponent } from './components/centralityCharts.js';
import { algorithmWorkbenchComponent } from './components/algorithmWorkbench.js';
import { aiLabComponent } from './components/aiLab.js';
import { researchComponent } from './components/research.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Modular Social Network Knowledge Hub...');

    navigationComponent.init();
    glossaryComponent.init();
    graphSimulatorComponent.init();
    centralityChartsComponent.init();
    algorithmWorkbenchComponent.init();
    aiLabComponent.init();
    researchComponent.init();

    console.log('✅ Application loaded successfully!');
});
