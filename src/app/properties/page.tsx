"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Building2,
  MapPin,
  Bed,
  Bath,
  Maximize,
  Edit,
  Trash2,
  X,
} from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/PageHeader";
import AddressAutocomplete, {
  AddressSuggestion,
} from "@/components/AddressAutocomplete";

interface PropertyItem {
  id: string;
  address: string;
  city: string;
  propertyType: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  price: number;
  yearBuilt: number;
}

const initialProperties: PropertyItem[] = [
  {
    id: "1",
    address: "Strandveien 45",
    city: "Oslo",
    propertyType: "Enebolig",
    bedrooms: 4,
    bathrooms: 2,
    sizeSqm: 180,
    price: 8500000,
    yearBuilt: 2018,
  },
  {
    id: "2",
    address: "Parkveien 12",
    city: "Bergen",
    propertyType: "Leilighet",
    bedrooms: 2,
    bathrooms: 1,
    sizeSqm: 65,
    price: 3200000,
    yearBuilt: 2005,
  },
  {
    id: "3",
    address: "Fjordgata 8",
    city: "Tromsø",
    propertyType: "Rekkehus",
    bedrooms: 3,
    bathrooms: 1,
    sizeSqm: 120,
    price: 4800000,
    yearBuilt: 2012,
  },
];

const emptyForm = {
  address: "",
  city: "",
  propertyType: "Enebolig",
  bedrooms: 3,
  bathrooms: 1,
  sizeSqm: 100,
  price: 0,
  yearBuilt: 2020,
};

export default function PropertiesPage() {
  const [properties, setProperties] = useState<PropertyItem[]>(initialProperties);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  const filteredProperties = properties.filter(
    (p) =>
      p.address.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase())
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("nb-NO", {
      style: "currency",
      currency: "NOK",
      maximumFractionDigits: 0,
    }).format(price);

  const openCreate = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowModal(true);
  };

  const openEdit = (property: PropertyItem) => {
    setFormData({
      address: property.address,
      city: property.city,
      propertyType: property.propertyType,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      sizeSqm: property.sizeSqm,
      price: property.price,
      yearBuilt: property.yearBuilt,
    });
    setEditingId(property.id);
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.address || !formData.city) {
      toast.error("Fyll inn adresse og by");
      return;
    }

    if (editingId) {
      setProperties((prev) =>
        prev.map((p) =>
          p.id === editingId ? { ...p, ...formData } : p
        )
      );
      toast.success("Eiendom oppdatert!");
    } else {
      const newProperty: PropertyItem = {
        id: Date.now().toString(),
        ...formData,
      };
      setProperties((prev) => [...prev, newProperty]);
      toast.success("Eiendom lagt til!");
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setProperties((prev) => prev.filter((p) => p.id !== id));
    toast.success("Eiendom slettet");
  };

  const handleAddressSelect = (suggestion: AddressSuggestion) => {
    setFormData((prev) => ({
      ...prev,
      address: suggestion.address,
      city: suggestion.city,
    }));
  };

  const updateForm = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <PageHeader
        title="Eiendommer"
        description="Administrer eiendomsporteføljen din"
        action={
          <button
            onClick={openCreate}
            className="bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm"
          >
            <Plus size={16} />
            Legg til eiendom
          </button>
        }
      />

      <div className="relative mb-6">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Søk etter eiendom..."
          className="w-full bg-surface border border-border rounded-lg pl-10 pr-4 py-2.5 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProperties.map((property, index) => (
          <motion.div
            key={property.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-surface border border-border rounded-xl overflow-hidden group"
          >
            <div className="h-32 bg-gradient-to-br from-accent/20 to-surface-light flex items-center justify-center">
              <Building2 size={40} className="text-accent/40" />
            </div>
            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h3 className="font-medium text-text-primary">
                    {property.address}
                  </h3>
                  <div className="flex items-center gap-1 text-text-muted text-xs mt-0.5">
                    <MapPin size={12} />
                    {property.city}
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 bg-accent/10 text-accent rounded-full">
                  {property.propertyType}
                </span>
              </div>

              <p className="text-lg font-bold text-accent mt-2">
                {formatPrice(property.price)}
              </p>

              <div className="flex items-center gap-4 mt-3 text-text-secondary text-xs">
                <span className="flex items-center gap-1">
                  <Bed size={14} /> {property.bedrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Bath size={14} /> {property.bathrooms}
                </span>
                <span className="flex items-center gap-1">
                  <Maximize size={14} /> {property.sizeSqm} m²
                </span>
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                <button
                  onClick={() => openEdit(property)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 text-xs text-text-secondary hover:text-accent bg-surface-light rounded-lg transition-colors"
                >
                  <Edit size={12} /> Rediger
                </button>
                <button
                  onClick={() => handleDelete(property.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-2 text-xs text-text-secondary hover:text-red-400 bg-surface-light rounded-lg transition-colors"
                >
                  <Trash2 size={12} /> Slett
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredProperties.length === 0 && (
        <div className="text-center py-16 text-text-muted">
          <Building2 size={48} className="mx-auto mb-3 opacity-30" />
          <p>Ingen eiendommer funnet</p>
          <button
            onClick={openCreate}
            className="mt-4 text-accent hover:text-accent-hover text-sm"
          >
            Legg til din første eiendom
          </button>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface border border-border rounded-xl p-6 w-full max-w-lg"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-serif text-text-primary">
                {editingId ? "Rediger eiendom" : "Ny eiendom"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 hover:bg-surface-light rounded-lg text-text-muted"
              >
                <X size={18} />
              </button>
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
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">By</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                    className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Type</label>
                  <select
                    value={formData.propertyType}
                    onChange={(e) => updateForm("propertyType", e.target.value)}
                    className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                  >
                    <option>Enebolig</option>
                    <option>Leilighet</option>
                    <option>Rekkehus</option>
                    <option>Tomannsbolig</option>
                    <option>Hytte</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
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
                <div>
                  <label className="block text-sm text-text-secondary mb-1">Byggeår</label>
                  <input
                    type="number"
                    value={formData.yearBuilt}
                    onChange={(e) => updateForm("yearBuilt", parseInt(e.target.value))}
                    className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">Pris (NOK)</label>
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => updateForm("price", parseInt(e.target.value))}
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2.5 text-text-secondary hover:text-text-primary transition-colors text-sm"
              >
                Avbryt
              </button>
              <button
                onClick={handleSave}
                className="bg-accent hover:bg-accent-hover text-white px-6 py-2.5 rounded-lg transition-colors text-sm"
              >
                {editingId ? "Lagre endringer" : "Legg til"}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
