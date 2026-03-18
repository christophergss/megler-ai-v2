"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Supabase auth would go here
      toast.success("Konto opprettet! Sjekk e-posten din for bekreftelse.");
      router.push("/login");
    } catch {
      toast.error("Kunne ikke opprette konto. Prøv igjen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-lg">M</span>
          </div>
          <h1 className="text-3xl font-serif text-text-primary">
            Opprett konto
          </h1>
          <p className="text-text-secondary mt-2">
            Kom i gang med MeglerAI i dag
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Fullt navn
            </label>
            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ola Nordmann"
                required
                className="w-full bg-surface border border-border rounded-lg px-10 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              E-postadresse
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="din@epost.no"
                required
                className="w-full bg-surface border border-border rounded-lg px-10 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-text-secondary mb-2">
              Passord
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minst 8 tegn"
                required
                minLength={8}
                className="w-full bg-surface border border-border rounded-lg px-10 py-3 text-text-primary placeholder:text-text-muted focus:outline-none focus:border-accent transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-accent hover:bg-accent-hover text-white font-medium py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? "Oppretter konto..." : "Registrer deg"}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>

        <p className="text-center text-text-secondary mt-6">
          Har du allerede en konto?{" "}
          <Link href="/login" className="text-accent hover:text-accent-hover">
            Logg inn
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
