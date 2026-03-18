"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Sparkles, Download, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/PageHeader";
import AddressAutocomplete, {
  AddressSuggestion,
} from "@/components/AddressAutocomplete";
import NeighborhoodInfo from "@/components/NeighborhoodInfo";

export default function ProspektPage() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: "",
    city: "",
    propertyType: "Leilighet",
    bedrooms: 2,
    bathrooms: 1,
    sizeSqm: 75,
    price: 0,
    description: "",
    sellerName: "",
    agentName: "",
  });
  const [selectedAddress, setSelectedAddress] = useState<AddressSuggestion | null>(null);
  const [prospectGenerated, setProspectGenerated] = useState(false);
  const [prospectContent, setProspectContent] = useState("");

  const updateForm = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddressSelect = (suggestion: AddressSuggestion) => {
    setSelectedAddress(suggestion);
    setFormData((prev) => ({
      ...prev,
      address: suggestion.address,
      city: suggestion.city,
    }));
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/prospekt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.content) {
        setProspectContent(data.content);
        setProspectGenerated(true);
        toast.success("Prospekt generert!");
      } else {
        toast.error(data.error || "Kunne ikke generere prospekt");
      }
    } catch {
      toast.error("Noe gikk galt. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <PageHeader
        title="Prospektgenerator"
        description="Generer komplette salgsprospekter med AI"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <FileText size={20} className="text-accent" />
            <h2 className="text-lg font-serif text-text-primary">
              Eiendomsdetaljer
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-text-secondary mb-1">Adresse</label>
              <AddressAutocomplete
                value={formData.address}
                onChange={(val) => updateForm("address", val)}
                onSelect={handleAddressSelect}
                placeholder="Skriv inn adresse..."
              />
              <NeighborhoodInfo
                address={formData.address}
                city={formData.city}
                municipality={selectedAddress?.municipality}
                county={selectedAddress?.county}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">By</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => updateForm("city", e.target.value)}
                  placeholder="Oslo"
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                  readOnly={!!selectedAddress}
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Type</label>
                <select
                  value={formData.propertyType}
                  onChange={(e) => updateForm("propertyType", e.target.value)}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                >
                  <option>Leilighet</option>
                  <option>Enebolig</option>
                  <option>Rekkehus</option>
                  <option>Tomannsbolig</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
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
                <label className="block text-sm text-text-secondary mb-1">m²</label>
                <input
                  type="number"
                  value={formData.sizeSqm}
                  onChange={(e) => updateForm("sizeSqm", parseInt(e.target.value))}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
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
            <div>
              <label className="block text-sm text-text-secondary mb-1">Beskrivelse</label>
              <textarea
                value={formData.description}
                onChange={(e) => updateForm("description", e.target.value)}
                placeholder="Beskriv eiendommen..."
                rows={3}
                className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">Selgers navn</label>
                <input
                  type="text"
                  value={formData.sellerName}
                  onChange={(e) => updateForm("sellerName", e.target.value)}
                  placeholder="Ola Nordmann"
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Meglers navn</label>
                <input
                  type="text"
                  value={formData.agentName}
                  onChange={(e) => updateForm("agentName", e.target.value)}
                  placeholder="Kari Hansen"
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={loading || !formData.address}
              className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Genererer prospekt...
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  Generer prospekt
                </>
              )}
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-serif text-text-primary">
              Forhåndsvisning
            </h2>
            {prospectGenerated && (
              <button className="flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-lg text-sm hover:bg-accent/20 transition-colors">
                <Download size={16} />
                Last ned PDF
              </button>
            )}
          </div>

          {prospectGenerated ? (
            <div className="bg-white rounded-lg p-8 text-gray-900 min-h-[600px]">
              <div className="text-center border-b border-gray-200 pb-6 mb-6">
                <h1 className="text-2xl font-serif text-gray-900">
                  Salgsprospekt
                </h1>
                <p className="text-lg text-gray-600 mt-2">
                  {formData.address}, {formData.city}
                </p>
              </div>
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {prospectContent}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[600px] text-text-muted">
              <FileText size={48} className="mb-4 opacity-30" />
              <p className="text-sm">
                Fyll inn eiendomsdetaljer og generer et prospekt
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
