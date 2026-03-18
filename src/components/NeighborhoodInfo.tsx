"use client";

import { useState } from "react";
import { MapPin, Loader2, Trees, Bus, ShoppingBag, Smile, ChevronDown, ChevronUp } from "lucide-react";

interface NeighborhoodInfoProps {
  address: string;
  city: string;
  municipality?: string;
  county?: string;
}

const sectionIcons: Record<string, React.ReactNode> = {
  "Område": <MapPin size={14} className="text-accent" />,
  "Transport": <Bus size={14} className="text-accent" />,
  "Tjenester": <ShoppingBag size={14} className="text-accent" />,
  "Friluftsliv": <Trees size={14} className="text-accent" />,
  "Atmosfære": <Smile size={14} className="text-accent" />,
};

function parseNeighborhoodSections(text: string) {
  const sections: { title: string; content: string }[] = [];
  const regex = /\*\*(\w+):\*\*\s*([\s\S]*?)(?=\*\*\w+:\*\*|$)/g;
  let match;

  while ((match = regex.exec(text)) !== null) {
    sections.push({
      title: match[1].trim(),
      content: match[2].trim(),
    });
  }

  return sections.length > 0
    ? sections
    : [{ title: "Informasjon", content: text }];
}

export default function NeighborhoodInfo({
  address,
  city,
  municipality,
  county,
}: NeighborhoodInfoProps) {
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [fetched, setFetched] = useState(false);

  const fetchInfo = async () => {
    if (fetched && info) {
      setExpanded(!expanded);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/neighborhood", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, city, municipality, county }),
      });
      const data = await res.json();
      if (data.neighborhood) {
        setInfo(data.neighborhood);
        setFetched(true);
        setExpanded(true);
      }
    } catch {
      setInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const sections = info ? parseNeighborhoodSections(info) : [];

  return (
    <div className="mt-3">
      <button
        onClick={fetchInfo}
        disabled={loading || !address}
        className="flex items-center gap-2 text-sm text-accent hover:text-accent-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <MapPin size={14} />
        )}
        {fetched ? "Nabolagsinformasjon" : "Hent nabolagsinformasjon"}
        {fetched &&
          (expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
      </button>

      {fetched && expanded && info && (
        <div className="mt-3 bg-surface-light border border-border rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={16} className="text-accent" />
            <h4 className="text-sm font-medium text-text-primary">
              Nabolag: {address}{city ? `, ${city}` : ""}
            </h4>
          </div>
          {sections.map((section) => (
            <div key={section.title} className="flex items-start gap-2">
              <span className="mt-0.5 flex-shrink-0">
                {sectionIcons[section.title] || (
                  <MapPin size={14} className="text-accent" />
                )}
              </span>
              <div>
                <span className="text-xs font-medium text-accent">
                  {section.title}
                </span>
                <p className="text-xs text-text-secondary leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
