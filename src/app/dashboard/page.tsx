"use client";

import { motion } from "framer-motion";
import {
  Building2,
  FileText,
  TrendingUp,
  PenTool,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import StatCard from "@/components/StatCard";

const recentTexts = [
  {
    id: "1",
    title: "Strandveien 45 - Salgsoppgave",
    type: "Salgsoppgave",
    date: "I dag",
  },
  {
    id: "2",
    title: "Parkveien 12 - Annonsetekst",
    type: "Annonsetekst",
    date: "I går",
  },
  {
    id: "3",
    title: "Fjordgata 8 - Prospekt",
    type: "Prospekt",
    date: "2 dager siden",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Oversikt over din aktivitet"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Eiendommer"
          value={12}
          icon={Building2}
          trend="+2 denne mnd"
        />
        <StatCard
          title="Genererte tekster"
          value={47}
          icon={FileText}
          trend="+8 denne mnd"
        />
        <StatCard
          title="Denne måneden"
          value={8}
          icon={TrendingUp}
        />
        <StatCard
          title="Prospekter"
          value={5}
          icon={PenTool}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-serif text-text-primary">
              Siste tekster
            </h2>
            <Link
              href="/history"
              className="text-sm text-accent hover:text-accent-hover flex items-center gap-1"
            >
              Se alle <ArrowRight size={14} />
            </Link>
          </div>
          <div className="space-y-3">
            {recentTexts.map((text) => (
              <div
                key={text.id}
                className="flex items-center justify-between p-3 bg-surface-light rounded-lg"
              >
                <div>
                  <p className="text-sm text-text-primary font-medium">
                    {text.title}
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">{text.type}</p>
                </div>
                <span className="text-xs text-text-muted">{text.date}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <h2 className="text-lg font-serif text-text-primary mb-4">
            Hurtighandlinger
          </h2>
          <div className="space-y-3">
            <Link
              href="/generator"
              className="flex items-center gap-3 p-4 bg-accent/10 border border-accent/20 rounded-lg hover:bg-accent/20 transition-colors group"
            >
              <div className="p-2 bg-accent/20 rounded-lg">
                <PenTool size={20} className="text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  Generer ny tekst
                </p>
                <p className="text-xs text-text-secondary">
                  Lag salgsoppgave, annonse eller beskrivelse
                </p>
              </div>
              <ArrowRight
                size={16}
                className="text-text-muted group-hover:text-accent transition-colors"
              />
            </Link>
            <Link
              href="/prospekt"
              className="flex items-center gap-3 p-4 bg-surface-light border border-border rounded-lg hover:border-accent/30 transition-colors group"
            >
              <div className="p-2 bg-surface rounded-lg">
                <FileText size={20} className="text-text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  Lag prospekt
                </p>
                <p className="text-xs text-text-secondary">
                  Generer et komplett salgsrospekt med AI
                </p>
              </div>
              <ArrowRight
                size={16}
                className="text-text-muted group-hover:text-accent transition-colors"
              />
            </Link>
            <Link
              href="/properties"
              className="flex items-center gap-3 p-4 bg-surface-light border border-border rounded-lg hover:border-accent/30 transition-colors group"
            >
              <div className="p-2 bg-surface rounded-lg">
                <Building2 size={20} className="text-text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-text-primary">
                  Legg til eiendom
                </p>
                <p className="text-xs text-text-secondary">
                  Registrer en ny eiendom i porteføljen
                </p>
              </div>
              <ArrowRight
                size={16}
                className="text-text-muted group-hover:text-accent transition-colors"
              />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
