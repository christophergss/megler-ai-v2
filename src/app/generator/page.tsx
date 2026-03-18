"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  FileText,
  Sparkles,
  Copy,
  Check,
  ArrowLeft,
  ArrowRight,
  Loader2,
} from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/PageHeader";

const textTypes = [
  { id: "salgsoppgave", label: "Salgsoppgave", desc: "Komplett salgsoppgave for eiendom" },
  { id: "annonse", label: "Annonsetekst", desc: "Kort og fengende annonsetekst" },
  { id: "beskrivelse", label: "Eiendomsbeskrivelse", desc: "Detaljert beskrivelse av eiendommen" },
  { id: "nabolag", label: "Nabolagsbeskrivelse", desc: "Beskrivelse av nabolag og beliggenhet" },
];

const tones = [
  { id: "profesjonell", label: "Profesjonell" },
  { id: "varm", label: "Varm og innbydende" },
  { id: "eksklusiv", label: "Eksklusiv og luksuriøs" },
  { id: "moderne", label: "Moderne og trendy" },
];

const propertyTypes = [
  "Enebolig",
  "Leilighet",
  "Rekkehus",
  "Tomannsbolig",
  "Hytte",
  "Næringseiendom",
];

export default function GeneratorPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedText, setGeneratedText] = useState("");

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    propertyType: "",
    bedrooms: 3,
    bathrooms: 1,
    sizeSqm: 100,
    yearBuilt: 2000,
    price: 0,
    features: "",
    description: "",
    textType: "",
    tone: "profesjonell",
    extraInstructions: "",
  });

  const updateForm = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property: {
            address: formData.address,
            city: formData.city,
            property_type: formData.propertyType,
            bedrooms: formData.bedrooms,
            bathrooms: formData.bathrooms,
            size_sqm: formData.sizeSqm,
            year_built: formData.yearBuilt,
            price: formData.price,
            features: formData.features.split(",").map((f) => f.trim()),
            description: formData.description,
          },
          textType: formData.textType,
          tone: formData.tone,
          extraInstructions: formData.extraInstructions,
        }),
      });

      const data = await res.json();
      if (data.text) {
        setGeneratedText(data.text);
        setStep(4);
        toast.success("Tekst generert!");
      } else {
        toast.error(data.error || "Kunne ikke generere tekst");
      }
    } catch {
      toast.error("Noe gikk galt. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    toast.success("Kopiert til utklippstavle!");
    setTimeout(() => setCopied(false), 2000);
  };

  const steps = [
    { num: 1, label: "Eiendomsinfo" },
    { num: 2, label: "Teksttype" },
    { num: 3, label: "Detaljer" },
    { num: 4, label: "Resultat" },
  ];

  return (
    <div>
      <PageHeader
        title="Tekstgenerator"
        description="Generer profesjonelle eiendomstekster med AI"
      />

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {steps.map((s, i) => (
          <div key={s.num} className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                step >= s.num
                  ? "bg-accent text-white"
                  : "bg-surface-light text-text-muted"
              }`}
            >
              {s.num}
            </div>
            <span
              className={`ml-2 text-sm hidden sm:inline ${
                step >= s.num ? "text-text-primary" : "text-text-muted"
              }`}
            >
              {s.label}
            </span>
            {i < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-3 ${
                  step > s.num ? "bg-accent" : "bg-border"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto bg-surface border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Building2 size={20} className="text-accent" />
              <h2 className="text-xl font-serif text-text-primary">
                Eiendomsinformasjon
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm text-text-secondary mb-1">Adresse</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => updateForm("address", e.target.value)}
                  placeholder="Strandveien 45"
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">By</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateForm("city", e.target.value)}
                  placeholder="Oslo"
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Eiendomstype</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => updateForm("propertyType", e.target.value)}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="">Velg type</option>
                  {propertyTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Soverom</label>
                <input
                  type="number"
                  value={formData.bedrooms}
                  onChange={(e) => updateForm("bedrooms", parseInt(e.target.value))}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Bad</label>
                <input
                  type="number"
                  value={formData.bathrooms}
                  onChange={(e) => updateForm("bathrooms", parseInt(e.target.value))}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Størrelse (m²)</label>
                <input
                  type="number"
                  value={formData.sizeSqm}
                  onChange={(e) => updateForm("sizeSqm", parseInt(e.target.value))}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Byggeår</label>
                <input
                  type="number"
                  value={formData.yearBuilt}
                  onChange={(e) => updateForm("yearBuilt", parseInt(e.target.value))}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Prisantydning (NOK)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => updateForm("price", parseInt(e.target.value))}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={() => setStep(2)}
                className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
              >
                Neste <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto bg-surface border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <FileText size={20} className="text-accent" />
              <h2 className="text-xl font-serif text-text-primary">
                Velg teksttype
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {textTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => updateForm("textType", type.id)}
                  className={`p-4 rounded-lg border text-left transition-all ${
                    formData.textType === type.id
                      ? "border-accent bg-accent/10"
                      : "border-border bg-surface-light hover:border-accent/30"
                  }`}
                >
                  <p className="text-sm font-medium text-text-primary">
                    {type.label}
                  </p>
                  <p className="text-xs text-text-muted mt-1">{type.desc}</p>
                </button>
              ))}
            </div>

            <div className="mt-6">
              <label className="block text-sm text-text-secondary mb-2">Tone</label>
              <div className="flex flex-wrap gap-2">
                {tones.map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => updateForm("tone", tone.id)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all ${
                      formData.tone === tone.id
                        ? "bg-accent text-white"
                        : "bg-surface-light text-text-secondary hover:text-text-primary border border-border"
                    }`}
                  >
                    {tone.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(1)}
                className="text-text-secondary hover:text-text-primary px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Tilbake
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!formData.textType}
                className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                Neste <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-2xl mx-auto bg-surface border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-6">
              <Sparkles size={20} className="text-accent" />
              <h2 className="text-xl font-serif text-text-primary">
                Ekstra detaljer
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Egenskaper (kommaseparert)
                </label>
                <input
                  type="text"
                  value={formData.features}
                  onChange={(e) => updateForm("features", e.target.value)}
                  placeholder="Fjordutsikt, garasje, terrasse, peis"
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Kort beskrivelse av eiendommen
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  placeholder="Beskriv eiendommen med egne ord..."
                  rows={3}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Ekstra instruksjoner til AI (valgfritt)
                </label>
                <textarea
                  value={formData.extraInstructions}
                  onChange={(e) => updateForm("extraInstructions", e.target.value)}
                  placeholder="F.eks. 'Fremhev utsikten' eller 'Skriv for unge førstegangskjøpere'"
                  rows={2}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep(2)}
                className="text-text-secondary hover:text-text-primary px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Tilbake
              </button>
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Genererer...
                  </>
                ) : (
                  <>
                    <Sparkles size={16} />
                    Generer tekst
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl mx-auto"
          >
            <div className="bg-surface border border-border rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-serif text-text-primary">
                  Generert tekst
                </h2>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center gap-2 px-4 py-2 bg-surface-light border border-border rounded-lg text-sm text-text-secondary hover:text-text-primary transition-colors"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Kopiert!" : "Kopier"}
                </button>
              </div>
              <div className="prose prose-invert max-w-none">
                <div className="bg-surface-light rounded-lg p-6 whitespace-pre-wrap text-text-primary leading-relaxed">
                  {generatedText}
                </div>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  onClick={() => {
                    setStep(1);
                    setGeneratedText("");
                  }}
                  className="text-text-secondary hover:text-text-primary px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                >
                  <ArrowLeft size={16} /> Ny tekst
                </button>
                <button
                  onClick={handleGenerate}
                  disabled={loading}
                  className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50"
                >
                  {loading ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <Sparkles size={16} />
                  )}
                  Generer på nytt
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
