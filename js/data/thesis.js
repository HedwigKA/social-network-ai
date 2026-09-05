/**
 * Thesis Topics & Research Projects Dataset for Computer Science Students.
 */
export const thesisTopicsData = [
    {
        title: 'Deteksi Polaritas Opini Menggunakan Integrasi Graph Attention Networks dan Representasi Kontekstual Bahasa',
        bg: 'Analisis sentimen teks murni sering gagal menangkap satire/sarkasme tanpa konteks keterikatan sosial penuturnya.',
        dataset: 'Korpus percakapan medsos publik, metadata relasi pertemanan & reply graph.',
        method: 'IndoBERT mengekstraksi vektor semantik awal, lalu diinjeksikan sebagai fitur simpul ke dalam arsitektur Graph Attention Networks (GAT).',
        contrib: 'Membuktikan peningkatan F1-Macro signifikan dengan penggabungan topologi jaringan dibanding NLP berbasis teks murni.'
    },
    {
        title: 'Strategi Intervensi Kontra-Disinformasi Adaptif Berbasis Deep Reinforcement Learning pada Graf Dinamis',
        bg: 'Ketika kabar bohong merambat cepat di media sosial, satuan tugas penanggulangan memiliki keterbatasan sumber daya intervensi.',
        dataset: 'Topologi jaringan sintetis Barabási–Albert dan dataset perambatan disinformasi nyata (PHEME).',
        method: 'Pemodelan agen Deep Q-Network (DQN) yang berinteraksi dengan simulasi lingkungan graf dinamis.',
        contrib: 'Menghasilkan strategi intervensi yang adaptif terhadap dinamika kaskade temporal, mengungguli efisiensi penahanan disinformasi.'
    },
    {
        title: 'Algoritma Paralel Efisien untuk Pemeliharaan Dekomposisi K-Core pada Jaringan Sosial Dinamis Skala Besar',
        bg: 'Pada jaringan sosial produksi, sisi terus bertambah dan terhapus secara dinamis, sehingga recalculation k-core dari awal sangat boros komputasi.',
        dataset: 'Dataset repositori graf skala besar SNAP (Twitch, Reddit, X).',
        method: 'Algoritma inkremental paralel berbasis shared-memory OpenMP untuk membatasi pembaruan coreness.',
        contrib: 'Menghasilkan akselerasi komputasi (speedup) tinggi tanpa mengorbankan akurasi matematis nilai dekomposisi.'
    },
    {
        title: 'Simulasi Berbasis Agen (Agent-Based Modeling) Mengenai Dampak Algoritma Rekomendasi terhadap Pembentukan Segregasi Opini',
        bg: 'Kekhawatiran bahwa algoritma rekomendasi konten berbasis preferensi personal memicu polarisasi masyarakat ke dalam bilik-bilik gema.',
        dataset: 'Model jaringan interaksi sintetis bertipe Small-World Watts-Strogatz.',
        method: 'Simulasi komputasional berbasis agen dengan model keyakinan Bounded Confidence Hegselmann-Krause.',
        contrib: 'Mengidentifikasi titik batas kritis (tipping point) pada bobot fungsi rekomendasi yang menyebabkan transisi fase dari konsensus menuju polarisasi.'
    }
];
