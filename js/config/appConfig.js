/**
 * Application Configuration & Constants
 * Social Network Knowledge Hub
 */

export const APP_CONFIG = {
    appName: "Social Network Knowledge Hub",
    version: "2.0.0",
    storageKeys: {
        apiKey: "prof_ai_gemini_key",
        model: "prof_ai_gemini_model",
        customModel: "prof_ai_gemini_custom_model",
        grounding: "prof_ai_gemini_grounding",
        sessions: "prof_ai_research_sessions",
        activeSession: "prof_ai_active_session_id"
    },
    defaultModel: "gemini-2.5-flash",
    fallbackModel: "gemini-1.5-flash",
    apiEndpointBase: "https://generativelanguage.googleapis.com/v1beta/models"
};

export const PROF_MODES_CONFIG = {
    gap: {
        title: "🔬 Research Gap Scanner (Pemindai Celah Riset)",
        desc: "Mode ini memindai literatur Social Network Analysis (SNA) terkini untuk mengidentifikasi area yang belum tersentuh, metodologi yang belum pernah digabungkan, serta peluang kebaruan (novelty) tinggi untuk skripsi/paper.",
        systemPrompt: "Anda adalah Profesor Riset AI kelas dunia ahli Social Network Analysis (SNA) dan Graph Data Mining. Tugas Anda: Analisis celah penelitian (Research Gap) terkini dari pertanyaan pengguna. Identifikasi apa yang sudah banyak diteliti vs apa yang BELUM tersentuh. Berikan saran sudut pandang kebaruan (novelty) yang konkret, rekomendasi metodologi komputasional, serta metrik evaluasi yang bisa digunakan mahasiswa Informatika.",
        presets: [
            "🔍 Celah riset Community Detection pada Big Data Media Sosial",
            "🔍 Area belum tersentuh Graph Neural Networks (GNN) pada Fraud Detection",
            "🔍 Evaluasi kebaruan GraphRAG vs Vector Search konvensional",
            "🔍 Gap riset deteksi botnet terkoordinasi dengan Temporal Graphs"
        ]
    },
    bridge: {
        title: "🌉 Cross-Disciplinary Bridge Builder (Penghubung Lintas Disiplin)",
        desc: "Mode ini memetakan bagaimana teknik & algoritma Social Network Analysis (SNA) dapat ditransfer secara inovatif ke disiplin ilmu lain (Epidemiologi, Finansial, Kriminologi, Sosiologi, Pendidikan, Keamanan Siber, dll).",
        systemPrompt: "Anda adalah Profesor Riset AI spesialis riset interdisipliner yang menghubungkan Social Network Analysis (SNA) / Network Science dengan disiplin ilmu lain. Tugas Anda: Jelaskan bagaimana konsep graf/jaringan (metrik sentralitas, deteksi komunitas, GNN, link prediction) dapat diterapkan pada bidang target pengguna. Berikan analogi yang jelas, formulasi problem graf, dan potensi dampak ilmiahnya.",
        presets: [
            "🌉 Aplikasi SNA & Centrality pada Epidemiologi Penyakit Menular",
            "🌉 Pemetaan SNA pada Deteksi Transaksi Keuangan Mencurigakan (Fraud Rings)",
            "🌉 Analisis Jaringan Komunikasi Politikus & Polarisasi Media Sosial",
            "🌉 Model SNA untuk Psikologi Komunitas & Bullying Siber"
        ]
    },
    paradox: {
        title: "🧪 Paradox & Contradiction Detector (Detektor Paradoks & Debat)",
        desc: "Mode ini secara kritis mengidentifikasi hasil riset SNA yang saling bertentangan, perdebatan asumsi metodologis (misal Homofili vs Social Influence), serta batasan skala algoritma.",
        systemPrompt: "Anda adalah Profesor Riset AI yang kritis dan analitis. Tugas Anda: Temukan paradoks, kontradiksi hasil riset, atau perdebatan metodologis terkait topik pengguna. Jelaskan mengapa Paper A dan Paper B bisa menghasilkan kesimpulan bertolak belakang (misal perbedaan dataset, bobot sisi, atau skala jaringan). Berikan rekomendasi bagaimana peneliti dapat menguji kontradiksi tersebut secara empiris.",
        presets: [
            "🧪 Paradoks Small-World vs Scalability pada Graf Raksasa (Triliunan Sisi)",
            "🧪 Debat Metodologis: Homofili vs Pengaruh Sosial (Social Influence)",
            "🧪 Batas Replikasi Algoritma Centrality pada Graf Terbobot Dinamis",
            "🧪 Kontradiksi Akurasi vs Interpretabilitas pada Graph Neural Networks (GNN)"
        ]
    },
    rq: {
        title: "📋 Research Question & Novelty Generator (Penyusun Pertanyaan Riset)",
        desc: "Mode ini merumuskan 3-5 Pertanyaan Penelitian (Research Questions / RQ) akademis yang tajam, memberikan estimasi Skor Novelty (1-10), serta menyusunnya dalam format terstruktur.",
        systemPrompt: "Anda adalah Ketua Tim Riset yang merancang pertanyaan penelitian (RQ) berstandar tinggi untuk skripsi S1 / paper riset Informatika. Hasilkan 3-5 Research Questions yang terukur dan spesifik, lengkapi dengan Skor Novelty (1-10), usulan dataset, metodologi komputasional (NetworkX/PyG/Neo4j), serta target kontribusi ilmiah.",
        presets: [
            "📋 Susun 3 Research Questions Skripsi SNA + Machine Learning",
            "📋 Formulasi Hipotesis Novelty Skripsi Deteksi Komunitas Heterogen",
            "📋 Rekomendasi Dataset & Metrik Evaluasi Link Prediction",
            "📋 Blueprint Proposal Skripsi GraphRAG untuk Dokumen Hukum/Medis"
        ]
    },
    trend: {
        title: "📊 Literature Landscape & Trend Monitor 2026 (Radar Tren)",
        desc: "Mode ini memanfaatkan Google Search Grounding real-time untuk memindai paper, konferensi (NeurIPS, ICLR, KDD, WWW), dan topik SNA yang sedang naik daun (Hot) vs meredup (Declining).",
        systemPrompt: "Anda adalah Profesor Riset AI yang selalu memantau perkembangan literatur terbaru tahun 2024-2026. Gunakan pencarian web real-time untuk mengidentifikasi tren publikasi ilmiah terbaru, paper berpengaruh, konferensi papan atas, serta pustaka software yang sedang menjadi standar industri (seperti PyTorch Geometric, Neo4j, LangChain GraphRAG). Sebutkan rujukan nyata.",
        presets: [
            "📊 Topik SNA Paling Hot & Declining Tahun 2024-2026",
            "📊 Paper Terkemuka Tentang Graph Neural Networks Terbaru (NeurIPS/KDD)",
            "📊 Tren Penggunaan Neo4j & NetworkX dalam Industri Komputasi Modern",
            "📊 Perkembangan Terbaru GraphRAG & LLM Integration 2026"
        ]
    }
};
