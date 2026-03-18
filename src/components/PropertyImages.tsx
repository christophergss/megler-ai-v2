"use client";

import { useState, useEffect } from "react";
import { Camera, Map, Loader2, ImageOff } from "lucide-react";

interface PropertyImagesProps {
  address: string;
  city: string;
  latitude?: number | null;
  longitude?: number | null;
  compact?: boolean;
}

interface ImageData {
  streetViewUrl: string | null;
  mapUrl: string;
  streetViewAvailable: boolean;
}

export default function PropertyImages({
  address,
  city,
  latitude,
  longitude,
  compact = false,
}: PropertyImagesProps) {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [activeView, setActiveView] = useState<"street" | "map">("street");

  useEffect(() => {
    if (!address) return;

    const fetchImages = async () => {
      setLoading(true);
      setError(false);

      try {
        const params = new URLSearchParams();
        params.set("address", address);
        if (city) params.set("city", city);
        if (latitude) params.set("lat", latitude.toString());
        if (longitude) params.set("lng", longitude.toString());

        const res = await fetch(`/api/property/images?${params.toString()}`);
        if (!res.ok) {
          setError(true);
          return;
        }

        const data = await res.json();
        setImageData(data);

        // Default to map view if street view is not available
        if (!data.streetViewAvailable) {
          setActiveView("map");
        } else {
          setActiveView("street");
        }
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [address, city, latitude, longitude]);

  if (loading) {
    return (
      <div
        className={`bg-surface-light flex items-center justify-center ${compact ? "h-32" : "h-64"}`}
      >
        <div className="flex flex-col items-center gap-2">
          <Loader2 size={24} className="text-accent animate-spin" />
          <span className="text-xs text-text-muted">Laster bilder...</span>
        </div>
      </div>
    );
  }

  if (error || !imageData) {
    return (
      <div
        className={`bg-gradient-to-br from-accent/20 to-surface-light flex items-center justify-center ${compact ? "h-32" : "h-64"}`}
      >
        <div className="flex flex-col items-center gap-2">
          <ImageOff size={compact ? 24 : 32} className="text-accent/40" />
          {!compact && (
            <span className="text-xs text-text-muted">
              Kunne ikke laste bilder
            </span>
          )}
        </div>
      </div>
    );
  }

  const currentUrl =
    activeView === "street" && imageData.streetViewUrl
      ? imageData.streetViewUrl
      : imageData.mapUrl;

  return (
    <div className="relative group">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={currentUrl}
        alt={`${activeView === "street" ? "Gatebilde" : "Kart"} - ${address}`}
        className={`w-full object-cover ${compact ? "h-32" : "h-64"}`}
        onError={() => setError(true)}
      />

      {/* View toggle buttons */}
      {imageData.streetViewAvailable && (
        <div
          className={`absolute ${compact ? "bottom-1 right-1" : "bottom-2 right-2"} flex gap-1`}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveView("street");
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
              activeView === "street"
                ? "bg-accent text-white"
                : "bg-black/60 text-white/80 hover:bg-black/80"
            }`}
            title="Gatebilde"
          >
            <Camera size={12} />
            {!compact && "Gatebilde"}
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveView("map");
            }}
            className={`flex items-center gap-1 px-2 py-1 rounded text-xs transition-colors ${
              activeView === "map"
                ? "bg-accent text-white"
                : "bg-black/60 text-white/80 hover:bg-black/80"
            }`}
            title="Kart"
          >
            <Map size={12} />
            {!compact && "Kart"}
          </button>
        </div>
      )}
    </div>
  );
}
