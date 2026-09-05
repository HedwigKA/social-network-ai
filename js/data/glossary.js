/**
 * Glossary Terms & Taxonomy Dataset
 * Social Network Knowledge Hub
 */

export const glossaryData = [
    { term: "Node (Simpul / Aktor)", desc: "Entitas individual dalam jaringan, seperti pengguna media sosial, komputer dalam jaringan, atau molekul kimia.", tag: "Landasan Graf" },
    { term: "Edge (Sisi / Relasi)", desc: "Koneksi atau hubungan antara dua simpul. Bisa berarah (directed) atau tidak berarah (undirected).", tag: "Landasan Graf" },
    { term: "Degree Centrality", desc: "Jumlah koneksi langsung yang dimiliki oleh sebuah simpul. Mengukur popularitas lokal.", tag: "Sentralitas" },
    { term: "Betweenness Centrality", desc: "Mengukur seberapa sering suatu simpul berada di jalur terpendek antara pasangan simpul lain. Peran broker/jembatan.", tag: "Sentralitas" },
    { term: "Closeness Centrality", desc: "Rata-rata jarak terpendek dari satu simpul ke seluruh simpul lain. Mengukur efisiensi penyebaran informasi.", tag: "Sentralitas" },
    { term: "Eigenvector Centrality", desc: "Mengukur pengaruh simpul berdasarkan kualitas koneksinya. Terhubung ke simpul penting memberi nilai lebih tinggi.", tag: "Sentralitas" },
    { term: "PageRank", desc: "Varian Eigenvector Centrality dengan faktor redaman (damping factor) untuk graf berarah, digunakan mesin pencari Google.", tag: "Sentralitas" },
    { term: "Structural Holes", desc: "Celah relasional antara dua klaster terpisah dalam jaringan. Aktor yang menjembatani celah ini memiliki keuntungan informasi (Ronald Burt).", tag: "Sosiometri" },
    { term: "Homophily (Homofili)", desc: "Prinsip 'birds of a feather flock together' — kecenderungan individu untuk berteman dengan mereka yang memiliki karakteristik serupa.", tag: "Dinamika Sosial" },
    { term: "Community Detection (Louvain / Leiden)", desc: "Algoritma pengklusteran simpul berdasarkan densitas relasi internal yang lebih tinggi dibandingkan relasi eksternal.", tag: "Algoritma Komputasi" },
    { term: "Scale-Free Network (Barabási-Albert)", desc: "Jaringan dengan distribusi derajat mengikuti Hukum Pangkat (Power-Law). Terdapat sedikit hub raksasa dan banyak simpul kecil.", tag: "Model Generatif" },
    { term: "Small-World Network (Watts-Strogatz)", desc: "Jaringan dengan koefisien klaster tinggi namun panjang jalur terpendek rata-rata yang sangat kecil (Fenomena 6 Derajat Pemisah).", tag: "Model Generatif" },
    { term: "Graph Convolutional Network (GCN)", desc: "Arsitektur Deep Learning yang menggeneralisasi operasi konvolusi pada struktur data graf non-Euclidean.", tag: "Graph AI / GNN" },
    { term: "Message Passing Paradigm", desc: "Mekanisme utama GNN di mana setiap simpul mengagregasi vektor fitur dari tetangganya untuk memperbarui representasi laporannya.", tag: "Graph AI / GNN" },
    { term: "GraphRAG", desc: "Penggabungan Knowledge Graph dengan LLM (Large Language Model) untuk pengambilan keputusan berbasis konteks terstruktur yang akurat.", tag: "Graph AI / GNN" }
];
