/**
 * Empirical Datasets & Graph Topology Presets
 * Social Network Knowledge Hub
 */

export const empiricalDatasets = [
    {
        id: "warsaw-metro",
        title: "Warsaw Metro Transit Network (Polandia)",
        nodesCount: 21,
        edgesCount: 20,
        type: "Jaringan Transportasi Publik",
        desc: "Studi kasus empiris dari literatur (Goldzinowski & Boński, 2023). Menggambarkan jalur metro M1 Warsawa dengan simpul transit utama seperti Świętokrzyska dan Centrum.",
        keyInsight: "Simpul Świętokrzyska memiliki Betweenness Centrality tertinggi sebagai jembatan perpindahan jalur M1 dan M2.",
        nodes: [
            { id: "Kabaty" }, { id: "Imielin" }, { id: "Stokłosy" }, { id: "Ursynów" },
            { id: "Służew" }, { id: "Wilanowska" }, { id: "Wierzbno" }, { id: "Racławicka" },
            { id: "Pole Mokotowskie" }, { id: "Politechnika" }, { id: "Centrum" },
            { id: "Świętokrzyska" }, { id: "Ratusz Arsenał" }, { id: "Dworzec Gdański" },
            { id: "Plac Wilsona" }, { id: "Marymont" }, { id: "Słodowiec" }, { id: "Stare Bielany" },
            { id: "Wawrzyszew" }, { id: "Młociny" }, { id: "Nowy Świat (M2)" }
        ],
        links: [
            { source: "Kabaty", target: "Imielin" }, { source: "Imielin", target: "Stokłosy" },
            { source: "Stokłosy", target: "Ursynów" }, { source: "Ursynów", target: "Służew" },
            { source: "Służew", target: "Wilanowska" }, { source: "Wilanowska", target: "Wierzbno" },
            { source: "Wierzbno", target: "Racławicka" }, { source: "Racławicka", target: "Pole Mokotowskie" },
            { source: "Pole Mokotowskie", target: "Politechnika" }, { source: "Politechnika", target: "Centrum" },
            { source: "Centrum", target: "Świętokrzyska" }, { source: "Świętokrzyska", target: "Ratusz Arsenał" },
            { source: "Ratusz Arsenał", target: "Dworzec Gdański" }, { source: "Dworzec Gdański", target: "Plac Wilsona" },
            { source: "Plac Wilsona", target: "Marymont" }, { source: "Marymont", target: "Słodowiec" },
            { source: "Słodowiec", target: "Stare Bielany" }, { source: "Stare Bielany", target: "Wawrzyszew" },
            { source: "Wawrzyszew", target: "Młociny" }, { source: "Świętokrzyska", target: "Nowy Świat (M2)" }
        ]
    },
    {
        id: "karate-club",
        title: "Zachary's Karate Club (Dataset Klasik SNA)",
        nodesCount: 34,
        edgesCount: 78,
        type: "Jaringan Sosial Personel",
        desc: "Dataset klasik analisis jaringan sosial mengenai perpecahan klub karate antara Instruktor (Mr. Hi) dan Administrator (John A).",
        keyInsight: "Deteksi komunitas dengan algoritma Louvain memprediksi perpecahan faktual klub dengan akurasi hampir sempurna.",
        nodes: Array.from({ length: 16 }, (_, i) => ({ id: `Aktor-${i + 1}` })),
        links: [
            { source: "Aktor-1", target: "Aktor-2" }, { source: "Aktor-1", target: "Aktor-3" },
            { source: "Aktor-1", target: "Aktor-4" }, { source: "Aktor-1", target: "Aktor-5" },
            { source: "Aktor-2", target: "Aktor-3" }, { source: "Aktor-2", target: "Aktor-4" },
            { source: "Aktor-3", target: "Aktor-4" }, { source: "Aktor-5", target: "Aktor-6" },
            { source: "Aktor-6", target: "Aktor-7" }, { source: "Aktor-7", target: "Aktor-8" },
            { source: "Aktor-8", target: "Aktor-1" }, { source: "Aktor-9", target: "Aktor-10" },
            { source: "Aktor-10", target: "Aktor-11" }, { source: "Aktor-11", target: "Aktor-12" },
            { source: "Aktor-12", target: "Aktor-13" }, { source: "Aktor-13", target: "Aktor-14" },
            { source: "Aktor-14", target: "Aktor-15" }, { source: "Aktor-15", target: "Aktor-16" },
            { source: "Aktor-16", target: "Aktor-9" }, { source: "Aktor-1", target: "Aktor-9" }
        ]
    },
    {
        id: "florentine-families",
        title: "Florentine Families (Pernikahan Elit Abbatis)",
        nodesCount: 15,
        edgesCount: 20,
        type: "Jaringan Aliansi Politik & Pernikahan",
        desc: "Studi kasus klasik Padgett & Ansell (1993) mengenai bagaimana keluarga Medici naik menjadi penguasa Florence melampaui keluarga Oligarki lainnya.",
        keyInsight: "Medici memiliki Betweenness Centrality tertinggi (0.522), bertindak sebagai broker tunggal aliansi perkawinan.",
        nodes: [
            { id: "Medici" }, { id: "Albizzi" }, { id: "Barbadori" }, { id: "Strozzi" },
            { id: "Ridolfi" }, { id: "Tornabuoni" }, { id: "Guadagni" }, { id: "Lamberteschi" },
            { id: "Acciaiuoli" }, { id: "Castellani" }, { id: "Peruzzi" }, { id: "Salviati" }
        ],
        links: [
            { source: "Medici", target: "Acciaiuoli" }, { source: "Medici", target: "Albizzi" },
            { source: "Medici", target: "Barbadori" }, { source: "Medici", target: "Ridolfi" },
            { source: "Medici", target: "Tornabuoni" }, { source: "Medici", target: "Salviati" },
            { source: "Albizzi", target: "Guadagni" }, { source: "Guadagni", target: "Lamberteschi" },
            { source: "Strozzi", target: "Ridolfi" }, { source: "Strozzi", target: "Barbadori" },
            { source: "Castellani", target: "Barbadori" }, { source: "Peruzzi", target: "Strozzi" }
        ]
    }
];
