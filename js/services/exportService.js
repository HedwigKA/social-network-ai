/**
 * Export Utility Service for Markdown session download and JSON graph export.
 */

/**
 * Triggers file download in browser
 * @param {string} content 
 * @param {string} filename 
 * @param {string} mimeType 
 */
function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export const exportService = {
    /**
     * Exports multi-turn Profesor AI Session to clean Markdown document
     * @param {Object} session 
     * @param {string} currentModel 
     */
    exportSessionToMarkdown(session, currentModel) {
        if (!session || !session.messages || session.messages.length === 0) {
            alert('Belum ada riwayat percakapan untuk diekspor pada sesi ini.');
            return;
        }

        let md = `# Catatan Riset: ${session.title}\n`;
        md += `**Tanggal Dibuat**: ${new Date(session.createdAt).toLocaleString('id-ID')}\n`;
        md += `**Model AI**: ${currentModel}\n\n---\n\n`;

        session.messages.forEach(m => {
            if (m.role === 'user') {
                md += `### 👤 Peneliti (Mode: ${m.mode || 'gap'})\n${m.text}\n\n`;
            } else {
                md += `### 🎓 Profesor Riset AI\n${m.text}\n\n`;
                if (m.citations && m.citations.length > 0) {
                    md += `#### Rujukan Literatur & Web Real-time:\n`;
                    m.citations.forEach(c => {
                        md += `- [${c.title}](${c.url})\n`;
                    });
                    md += `\n`;
                }
                md += `---\n\n`;
            }
        });

        const filename = `Catatan_Riset_${session.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
        downloadFile(md, filename, 'text/markdown;charset=utf-8');
    },

    /**
     * Exports active graph data structure to JSON file
     * @param {Object} graphData 
     */
    exportGraphToJSON(graphData) {
        if (!graphData) return;
        const cleanData = {
            nodes: graphData.nodes.map(n => ({ id: n.id, label: n.label || n.id })),
            links: graphData.links.map(l => ({
                source: typeof l.source === 'object' ? l.source.id : l.source,
                target: typeof l.target === 'object' ? l.target.id : l.target,
                weight: l.weight || 1
            }))
        };

        const jsonStr = JSON.stringify(cleanData, null, 2);
        downloadFile(jsonStr, 'graph_data_export.json', 'application/json');
    }
};
