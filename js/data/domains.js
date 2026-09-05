/**
 * 12 CS Domains Integration Dataset
 * Social Network Knowledge Hub
 */

export const csDomainsData = [
    {
        id: "cybersecurity",
        icon: "🛡️",
        title: "Keamanan Siber & Cryptography",
        desc: "SNA digunakan untuk memetakan jaringan botnet, menganalisis struktur serangan terdistribusi (DDoS), dan mengidentifikasi server Command & Control (C2) dengan mengukur Betweenness Centrality.",
        caseStudy: "Deteksi botnet Mirai dan investigasi sindikat ransomware melalui analisis graf aliran dana transaksi Blockchain Bitcoin.",
        tech: "Neo4j Cypher, NetworkX, Wireshark PCAP Graphing"
    },
    {
        id: "machine-learning",
        icon: "🤖",
        title: "Machine Learning & GNN",
        desc: "Transformasi graf menjadi representasi laten (Node Embeddings) menggunakan Node2Vec dan Graph Neural Networks (GCN, GAT, GraphSAGE) untuk klasifikasi simpul dan prediksi relasi.",
        caseStudy: "Sistem rekomendasi produk Shopee/Amazon dan prediksi ikatan molekul obat baru dengan PyTorch Geometric.",
        tech: "PyTorch Geometric (PyG), DGL, DeepWalk, Node2Vec"
    },
    {
        id: "ai-llm",
        icon: "🧠",
        title: "AI & GraphRAG (LLM Integration)",
        desc: "Menggabungkan Knowledge Graph dengan Large Language Models untuk mencegah halusinasi fakta dan memfasilitasi penalaran terstruktur pada dokumen hukum/medis.",
        caseStudy: "Sistem Tanya-Jawab Dokumen Hukum Medis berbasis GraphRAG menggunakan algoritma komunitas Leiden.",
        tech: "LangChain GraphRAG, LlamaIndex Knowledge Graph, Neo4j Vector"
    },
    {
        id: "software-eng",
        icon: "🏗️",
        title: "Software Engineering & Architecture",
        desc: "Pemetaan ketergantungan antar modul/kelas software (Call Graph & Dependency Graph) untuk mengukur tingkat coupling, cohesion, dan risiko refactoring.",
        caseStudy: "Refactoring sistem monolitik raksasa menjadi Microservices berbasis kluster ketergantungan kode.",
        tech: "SonarQube Dependency Graphs, Abstract Syntax Tree (AST)"
    },
    {
        id: "big-data",
        icon: "📊",
        title: "Big Data & Distributed Computing",
        desc: "Pemrosesan graf berskala terbilion simpul menggunakan kerangka komputasi terdistribusi seperti Apache Spark GraphX dan GraphFrames.",
        caseStudy: "Kalkulasi PageRank seluruh web menggunakan kluster Spark terdistribusi.",
        tech: "Apache Spark GraphX, GraphFrames, Pregel Architecture"
    },
    {
        id: "database",
        icon: "🗄️",
        title: "Database Systems & Graph DB",
        desc: "Penggunaan basis data graf NoSQL yang mengoptimalkan query kueri hubungan bertingkat (multi-hop traversal) tanpa operasi JOIN mahal.",
        caseStudy: "Pencarian relasi koneksi antar akun bank hingga kedalaman 5 hop dalam hitungan milidetik.",
        tech: "Neo4j, Amazon Neptune, Memgraph, ArangoDB"
    },
    {
        id: "blockchain",
        icon: "⛓️",
        title: "Blockchain & Web3 Forensics",
        desc: "Analisis graf transaksi heterogen (HIN) untuk mendeteksi money laundering, mixing services (Tornado Cash), dan akun bursa ilegal.",
        caseStudy: "Penyelidikan pencucian uang aset kripto Ethereum menggunakan algoritma kueri graf Cypher.",
        tech: "Etherscan API, GraphX, Gephi Anti-Money Laundering"
    },
    {
        id: "hci",
        icon: "🎨",
        title: "Human-Computer Interaction (HCI)",
        desc: "Visualisasi graf interaktif yang memungkinkan pengguna menjelajahi relasi kompleks secara intuitif melalui tata letak dinamis dan zooming.",
        caseStudy: "Antarmuka eksplorasi peta pengetahuan interaktif ilmiah untuk peneliti.",
        tech: "D3.js, Cytoscape.js, Vis.js, WebGL Graph Engines"
    },
    {
        id: "algo-ds",
        icon: "⚡",
        title: "Algoritma & Struktur Data",
        desc: "Penerapan representasi Adjacency Matrix, Adjacency List, serta traversal BFS/DFS, Shortest Path (Dijkstra/A*), dan Minimum Spanning Tree.",
        caseStudy: "Sistem navigasi peta lalu lintas Google Maps dan penentuan rute jaringan terpendek.",
        tech: "C++ Boost Graph Library, Python SciPy Sparse"
    },
    {
        id: "cloud-ops",
        icon: "☁️",
        title: "Cloud Computing & Network Topology",
        desc: "Pemetaan arsitektur Virtual Private Cloud (VPC), routing subnet, dan analisis titik kegagalan tunggal (Single Point of Failure).",
        caseStudy: "Optimasi latensi antar pusat dataAWS/GCP menggunakan algoritma flow jaringan.",
        tech: "Terraform Graph, AWS VPC Network Access Analyzer"
    },
    {
        id: "game-dev",
        icon: "🎮",
        title: "Game Development & AI Pathfinding",
        desc: "Navigasi NPC (Non-Player Character) menggunakan graf waypoint dan pemetaan relasi aliansi antar faksi dalam game MMORPG.",
        caseStudy: "Navigasi bot A* pada peta graf kompleks game strategi real-time (RTS).",
        tech: "Unity NavMesh Graph, Unreal Engine Pathfinding"
    },
    {
        id: "bioinformatics",
        icon: "🧬",
        title: "Bioinformatika & Network Medicine",
        desc: "Analisis Jaringan Interaksi Protein (PPI Networks), peta silsilah genetik, dan penemuan target obat terapeutik berbasis sentralitas.",
        caseStudy: "Prediksi efek samping obat dan penemuan kandidat terapi kanker berbasis klaster Protein.",
        tech: "STRING Database API, Cytoscape Desktop, BioPython"
    }
];
