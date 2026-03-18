"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Building, Key, Save } from "lucide-react";
import toast from "react-hot-toast";
import PageHeader from "@/components/PageHeader";

export default function SettingsPage() {
  const [profile, setProfile] = useState({
    fullName: "Ola Nordmann",
    email: "ola@meglerkontor.no",
    phone: "+47 900 00 000",
    company: "Nordmann Eiendomsmegling",
    role: "Eiendomsmegler",
  });

  const [apiSettings, setApiSettings] = useState({
    defaultTone: "profesjonell",
    defaultLanguage: "no",
    maxTokens: "2000",
  });

  const handleSaveProfile = () => {
    toast.success("Profil oppdatert!");
  };

  const handleSaveApi = () => {
    toast.success("API-innstillinger lagret!");
  };

  return (
    <div>
      <PageHeader
        title="Innstillinger"
        description="Administrer profilen og innstillingene dine"
      />

      <div className="max-w-2xl space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <User size={20} className="text-accent" />
            <h2 className="text-lg font-serif text-text-primary">Profil</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Fullt navn
                </label>
                <input
                  type="text"
                  value={profile.fullName}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, fullName: e.target.value }))
                  }
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  E-post
                </label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Telefon
                </label>
                <input
                  type="tel"
                  value={profile.phone}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, phone: e.target.value }))
                  }
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Stilling
                </label>
                <input
                  type="text"
                  value={profile.role}
                  onChange={(e) =>
                    setProfile((p) => ({ ...p, role: e.target.value }))
                  }
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleSaveProfile}
              className="bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Save size={16} />
              Lagre profil
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Building size={20} className="text-accent" />
            <h2 className="text-lg font-serif text-text-primary">
              Firma
            </h2>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-1">
              Firmanavn
            </label>
            <input
              type="text"
              value={profile.company}
              onChange={(e) =>
                setProfile((p) => ({ ...p, company: e.target.value }))
              }
              className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-surface border border-border rounded-xl p-6"
        >
          <div className="flex items-center gap-2 mb-6">
            <Key size={20} className="text-accent" />
            <h2 className="text-lg font-serif text-text-primary">
              AI-innstillinger
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Standard tone
                </label>
                <select
                  value={apiSettings.defaultTone}
                  onChange={(e) =>
                    setApiSettings((s) => ({ ...s, defaultTone: e.target.value }))
                  }
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                >
                  <option value="profesjonell">Profesjonell</option>
                  <option value="varm">Varm og innbydende</option>
                  <option value="eksklusiv">Eksklusiv</option>
                  <option value="moderne">Moderne</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-text-secondary mb-1">
                  Maks lengde (tokens)
                </label>
                <input
                  type="number"
                  value={apiSettings.maxTokens}
                  onChange={(e) =>
                    setApiSettings((s) => ({ ...s, maxTokens: e.target.value }))
                  }
                  className="w-full bg-surface-light border border-border rounded-lg px-4 py-2.5 text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
              </div>
            </div>

            <button
              onClick={handleSaveApi}
              className="bg-accent hover:bg-accent-hover text-white px-4 py-2.5 rounded-lg transition-colors flex items-center gap-2 text-sm"
            >
              <Save size={16} />
              Lagre innstillinger
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
