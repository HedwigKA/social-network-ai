/**
 * Research Problems Dataset for Social Network Analysis in Computer Science.
 */
export const researchProblemsData = [
    {
        title: 'Deteksi Jaringan Bot Terkoordinasi',
        domain: 'Keamanan / Medsos',
        prob: 'Kampanye disinformasi terorganisasi menghindari klasifikasi akun individual secara terisolasi.',
        data: 'API medsos, timestamp cuitan, graf retweet & mention.',
        method: 'GAT Multimodal & Semi-Supervised Node Classification.',
        output: 'Probabilitas akun bot & segmentasi subgraf aktor pengendali.'
    },
    {
        title: 'Prediksi Jalur & Kecepatan Difusi Hoaks',
        domain: 'NLP / Social Mining',
        prob: 'Menentukan lintasan perambatan dan simpul perantara utama kaskade hoaks.',
        data: 'Log URL berita, topologi pertemanan, vektor semantik klaim.',
        method: 'Independent Cascade + Temporal Graph Attention (TGAT).',
        output: 'Proyeksi pohon kaskade & daftar simpul prioritas intervensi.'
    },
    {
        title: 'Sistem Rekomendasi E-Commerce Dinamis',
        domain: 'Recommender Systems',
        prob: 'Masalah data interaksi renggang (sparsity) & cold-start pada item baru.',
        data: 'Graf bipartit user-item, riwayat browsing, metadata produk.',
        method: 'LightGCN + Dynamic Preference Embedding.',
        output: 'Skor peringkat rekomendasi produk personal adaptif.'
    },
    {
        title: 'Pemeringkatan Influencer Mahasiswa',
        domain: 'Social Analytics',
        prob: 'Model topologi klasik gagal membedakan otoritas formal vs pemegang opini informal.',
        data: 'Log pesan instan, partisipasi ormawa, kegiatan kampus.',
        method: 'Node embedding GAT + Sentralitas PageRank Terarah.',
        output: 'Peringkat aktor penyebar pengaruh optimal.'
    },
    {
        title: 'Deteksi Fraud Rings Perbankan Digital',
        domain: 'FinTech / Fraud',
        prob: 'Komplotan kejahatan memecah transaksi ke rantai sirkulasi tertutup (smurfing).',
        data: 'Log transfer rekening, IP perangkat, NIK, riwayat kontak.',
        method: 'Heterogeneous Info Networks (HIN) + RGCN.',
        output: 'Deteksi klaster rekening terisolasi terindikasi sindikat.'
    },
    {
        title: 'Prediksi Kolaborasi Riset Masa Depan',
        domain: 'Bibliometrik',
        prob: 'Mendorong pembentukan tim kolaborasi lintas disiplin sebelum interaksi fisik terjadi.',
        data: 'OpenAlex/DBLP, metadata abstrak, co-authorship graph.',
        method: 'Link Prediction + TransE Knowledge Graph Embedding.',
        output: 'Estimasi probabilitas kemitraan riset baru 3-5 tahun mendatang.'
    },
    {
        title: 'Rekonstruksi Pergerakan Lateral Malware',
        domain: 'Cybersecurity',
        prob: 'Memetakan titik infiltrasi awal (patient zero) dan pergerakan lateral malware di jaringan korporat.',
        data: 'Log NetFlow/IPFIX, autentikasi user, topologi server.',
        method: 'Attack Graph Analysis + Critical Percolation Algorithm.',
        output: 'Visualisasi pohon kill chain & rekomendasi pemutusan tautan.'
    },
    {
        title: 'Pengukuran Polarisasi & Echo Chamber',
        domain: 'Sosiometri Komputasi',
        prob: 'Polarisasi opini sulit diukur secara objektif tanpa analisis isolasi ruang gema.',
        data: 'Graf komentar/retweet, korpus opini, label topik.',
        method: 'Newman-Girvan Modularity + Transformer Sentiment Divergence.',
        output: 'Indeks polarisasi kuantitatif & identifikasi komunitas terisolasi.'
    },
    {
        title: 'Prediksi Layanan Sosial Lansia',
        domain: 'Health & Community',
        prob: 'Keterbatasan pemantauan kondisi kesehatan mental & keterisolasian warga lansia.',
        data: 'Log interaksi sosial harian, partisipasi kegiatan, rekam medis.',
        method: 'Graph Neural Network for Elderly Service (GNN-ESP).',
        output: 'Model prediktif kebutuhan intervensi perawatan sosial.'
    },
    {
        title: 'GraphRAG untuk Penalaran Terstruktur',
        domain: 'AI & LLM',
        prob: 'LLM konvensional mengalami halusinasi faktual saat penalaran lintas dokumen.',
        data: 'Korpus teks laporan investigasi / dokumen transaksi.',
        method: 'Hierarchical Leiden Community Extraction + Hybrid Traversal.',
        output: 'Jawaban komputasional akurat dengan rujukan bukti graf.'
    }
];
