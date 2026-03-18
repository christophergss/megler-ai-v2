"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PenTool, FileText, Building2, Sparkles } from "lucide-react";

const features = [
  {
    icon: PenTool,
    title: "AI Tekstgenerator",
    description: "Generer salgsoppgaver, annonser og beskrivelser med ett klikk.",
  },
  {
    icon: FileText,
    title: "Prospektgenerator",
    description: "Lag komplette salgsprospekter automatisk med AI.",
  },
  {
    icon: Building2,
    title: "Eiendomsportefølje",
    description: "Administrer alle dine eiendommer på ett sted.",
  },
  {
    icon: Sparkles,
    title: "Skreddersydd innhold",
    description: "Velg tone, stil og type for perfekt tilpassede tekster.",
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="font-serif text-xl text-text-primary">MeglerAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm text-text-secondary hover:text-text-primary transition-colors"
            >
              Logg inn
            </Link>
            <Link
              href="/signup"
              className="text-sm bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-lg transition-colors"
            >
              Kom i gang
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-serif text-text-primary leading-tight mb-6">
            Profesjonelle eiendomstekster
            <br />
            <span className="text-accent">på sekunder</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
            MeglerAI bruker kunstig intelligens til å generere salgsoppgaver,
            annonsetekster og prospekter skreddersydd for det norske
            eiendomsmarkedet.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/signup"
              className="bg-accent hover:bg-accent-hover text-white px-6 py-3 rounded-lg transition-colors flex items-center gap-2 font-medium"
            >
              Start gratis <ArrowRight size={18} />
            </Link>
            <Link
              href="/login"
              className="border border-border text-text-secondary hover:text-text-primary px-6 py-3 rounded-lg transition-colors"
            >
              Logg inn
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              className="bg-surface border border-border rounded-xl p-6"
            >
              <div className="p-2 bg-accent/10 rounded-lg w-fit mb-4">
                <feature.icon size={24} className="text-accent" />
              </div>
              <h3 className="font-serif text-lg text-text-primary mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-text-secondary">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-text-muted">
          &copy; {new Date().getFullYear()} MeglerAI. Alle rettigheter reservert.
        </div>
      </footer>
    </div>
  );
}
