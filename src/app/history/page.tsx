"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, FileText, Copy, Trash2, Eye } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/PageHeader";

interface HistoryItem {
  id: string;
  title: string;
  type: string;
  tone: string;
  content: string;
  date: string;
  property: string;
}

const mockHistory: HistoryItem[] = [
  {
    id: "1",
    title: "Salgsoppgave - Strandveien 45",
    type: "Salgsoppgave",
    tone: "Profesjonell",
    content: "En unik eiendom med fantastisk beliggenhet ved sjøen. Denne eiendommen byr på...",
    date: "2024-01-15",
    property: "Strandveien 45, Oslo",
  },
  {
    id: "2",
    title: "Annonsetekst - Parkveien 12",
    type: "Annonsetekst",
    tone: "Varm og innbydende",
    content: "Drømmer du om å bo midt i byens grønne lunge? Denne sjarmerende leiligheten...",
    date: "2024-01-14",
    property: "Parkveien 12, Bergen",
  },
  {
    id: "3",
    title: "Nabolagsbeskrivelse - Fjordgata 8",
    type: "Nabolagsbeskrivelse",
    tone: "Moderne",
    content: "Fjordgata ligger i et av byens mest ettertraktede områder med gangavstand til...",
    date: "2024-01-13",
    property: "Fjordgata 8, Tromsø",
  },
  {
    id: "4",
    title: "Eiendomsbeskrivelse - Solveien 22",
    type: "Eiendomsbeskrivelse",
    tone: "Eksklusiv",
    content: "Velkommen til en eksklusiv enebolig som definerer moderne luksusliv...",
    date: "2024-01-12",
    property: "Solveien 22, Stavanger",
  },
];

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const [filterType, setFilterType] = useState("alle");

  const filteredHistory = mockHistory.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.property.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filterType === "alle" || item.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleCopy = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success("Tekst kopiert!");
  };

  return (
    <div>
      <PageHeader
        title="Historikk"
        description="Se og administrer dine genererte tekster"
      />

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
          />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Søk i historikk..."
            className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-surface border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
        >
          <option value="alle">Alle typer</option>
          <option value="Salgsoppgave">Salgsoppgave</option>
          <option value="Annonsetekst">Annonsetekst</option>
          <option value="Eiendomsbeskrivelse">Eiendomsbeskrivelse</option>
          <option value="Nabolagsbeskrivelse">Nabolagsbeskrivelse</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-3">
          {filteredHistory.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedItem(item)}
              className={`bg-surface border rounded-xl p-4 cursor-pointer transition-all ${
                selectedItem?.id === item.id
                  ? "border-accent"
                  : "border-border hover:border-accent/30"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full">
                      {item.type}
                    </span>
                    <span className="text-xs text-text-muted">{item.tone}</span>
                  </div>
                  <h3 className="text-sm font-medium text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-xs text-text-muted mt-1">
                    {item.property} &bull; {item.date}
                  </p>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.content);
                    }}
                    className="p-1.5 hover:bg-surface-light rounded-lg text-text-muted hover:text-text-primary transition-colors"
                  >
                    <Copy size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toast.success("Tekst slettet");
                    }}
                    className="p-1.5 hover:bg-surface-light rounded-lg text-text-muted hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredHistory.length === 0 && (
            <div className="text-center py-12 text-text-muted">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p>Ingen tekster funnet</p>
            </div>
          )}
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          {selectedItem ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Eye size={16} className="text-accent" />
                <h3 className="text-sm font-medium text-text-primary">
                  Forhåndsvisning
                </h3>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-text-muted">Tittel</p>
                  <p className="text-sm text-text-primary">{selectedItem.title}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Type</p>
                  <p className="text-sm text-text-primary">{selectedItem.type}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Eiendom</p>
                  <p className="text-sm text-text-primary">{selectedItem.property}</p>
                </div>
                <div>
                  <p className="text-xs text-text-muted">Innhold</p>
                  <p className="text-sm text-text-primary leading-relaxed mt-1">
                    {selectedItem.content}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleCopy(selectedItem.content)}
                className="w-full mt-4 bg-accent/10 text-accent py-2 rounded-lg text-sm hover:bg-accent/20 transition-colors flex items-center justify-center gap-2"
              >
                <Copy size={14} />
                Kopier tekst
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-text-muted py-12">
              <Eye size={32} className="mb-3 opacity-30" />
              <p className="text-sm">Velg en tekst for forhåndsvisning</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
