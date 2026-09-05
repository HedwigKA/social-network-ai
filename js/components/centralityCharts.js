/**
 * Chart.js Wrapper Component for Complexity & Centrality Radar Charts.
 */
import { $ } from '../utils/dom.js';

export const centralityChartsComponent = {
    complexityChartInstance: null,
    radarChartInstance: null,

    init() {
        this.renderComplexityChart();
        this.renderRadarChart();
    },

    renderComplexityChart() {
        const canvas = $('complexityChart');
        if (!canvas || !window.Chart) return;

        if (this.complexityChartInstance) {
            this.complexityChartInstance.destroy();
        }

        const ctx = canvas.getContext('2d');
        const nodeSizes = [5, 10, 20, 50, 100];
        const adjMatrixStorage = nodeSizes.map(v => v * v);
        const adjListStorage = nodeSizes.map(v => v + v * 2);

        this.complexityChartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: nodeSizes.map(v => `${v} Simpul`),
                datasets: [
                    {
                        label: 'Adjacency Matrix O(|V|^2)',
                        data: adjMatrixStorage,
                        borderColor: '#ef4444',
                        backgroundColor: 'rgba(239, 68, 68, 0.1)',
                        fill: true,
                        tension: 0.3
                    },
                    {
                        label: 'Adjacency List O(|V|+|E|)',
                        data: adjListStorage,
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.1)',
                        fill: true,
                        tension: 0.3
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { labels: { font: { size: 10 } } }
                },
                scales: {
                    x: { ticks: { font: { size: 9 } } },
                    y: { ticks: { font: { size: 9 } } }
                }
            }
        });
    },

    renderRadarChart() {
        const canvas = $('centralityRadarChart');
        if (!canvas || !window.Chart) return;

        if (this.radarChartInstance) {
            this.radarChartInstance.destroy();
        }

        const ctx = canvas.getContext('2d');

        this.radarChartInstance = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: [
                    'Degree (Kontak)',
                    'Betweenness (Broker)',
                    'Closeness (Kecepatan)',
                    'PageRank (Kualitas)',
                    'Eigenvector (Elit)'
                ],
                datasets: [
                    {
                        label: 'Hub Akun Populer',
                        data: [95, 40, 70, 60, 55],
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16, 185, 129, 0.25)',
                        pointBackgroundColor: '#10b981'
                    },
                    {
                        label: 'Broker / Gatekeeper',
                        data: [45, 98, 60, 75, 80],
                        borderColor: '#38bdf8',
                        backgroundColor: 'rgba(56, 189, 248, 0.25)',
                        pointBackgroundColor: '#38bdf8'
                    },
                    {
                        label: 'Inisiator Penyiaran',
                        data: [60, 50, 95, 45, 40],
                        borderColor: '#6366f1',
                        backgroundColor: 'rgba(99, 102, 241, 0.25)',
                        pointBackgroundColor: '#6366f1'
                    },
                    {
                        label: 'Otoritas Tersembunyi',
                        data: [35, 60, 45, 90, 95],
                        borderColor: '#f59e0b',
                        backgroundColor: 'rgba(245, 158, 11, 0.25)',
                        pointBackgroundColor: '#f59e0b'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { size: 10 } }
                    }
                },
                scales: {
                    r: {
                        angleLines: { color: '#e2e8f0' },
                        grid: { color: '#f1f5f9' },
                        pointLabels: { font: { size: 10, weight: 'bold' } },
                        ticks: { display: false }
                    }
                }
            }
        });
    }
};
