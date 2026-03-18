import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

const textTypeLabels: Record<string, string> = {
  salgsoppgave: "salgsoppgave",
  annonse: "kort og fengende annonsetekst",
  beskrivelse: "detaljert eiendomsbeskrivelse",
  nabolag: "nabolagsbeskrivelse",
};

const toneLabels: Record<string, string> = {
  profesjonell: "profesjonell og saklig",
  varm: "varm og innbydende",
  eksklusiv: "eksklusiv og luksuriøs",
  moderne: "moderne og trendy",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { property, textType, tone, extraInstructions } = body;

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json(
        {
          text: generateFallbackText(property, textType, tone),
        },
        { status: 200 }
      );
    }

    const textTypeLabel = textTypeLabels[textType] || textType;
    const toneLabel = toneLabels[tone] || tone;

    const prompt = `Du er en erfaren norsk eiendomsmegler og tekstforfatter. Skriv en ${textTypeLabel} med en ${toneLabel} tone for følgende eiendom:

Adresse: ${property.address || "Ikke oppgitt"}
By: ${property.city || "Ikke oppgitt"}
Type: ${property.property_type || "Ikke oppgitt"}
Soverom: ${property.bedrooms || "Ikke oppgitt"}
Bad: ${property.bathrooms || "Ikke oppgitt"}
Størrelse: ${property.size_sqm || "Ikke oppgitt"} m²
Byggeår: ${property.year_built || "Ikke oppgitt"}
Pris: ${property.price ? new Intl.NumberFormat("nb-NO").format(property.price) + " NOK" : "Ikke oppgitt"}
Egenskaper: ${property.features?.join(", ") || "Ikke oppgitt"}
Beskrivelse: ${property.description || "Ikke oppgitt"}

${extraInstructions ? `Ekstra instruksjoner: ${extraInstructions}` : ""}

Skriv teksten på norsk. Gjør den engasjerende og profesjonell.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.content && data.content[0]) {
      return NextResponse.json({ text: data.content[0].text });
    }

    return NextResponse.json(
      { error: "Kunne ikke generere tekst" },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "En feil oppstod under generering" },
      { status: 500 }
    );
  }
}

function generateFallbackText(
  property: Record<string, unknown>,
  textType: string,
  tone: string
): string {
  const address = (property.address as string) || "denne eiendommen";
  const city = (property.city as string) || "";
  const propertyType = (property.property_type as string) || "bolig";
  const bedrooms = property.bedrooms || 0;
  const sizeSqm = property.size_sqm || 0;
  const price = property.price as number;

  const toneLabel = toneLabels[tone] || "profesjonell";
  const typeLabel = textTypeLabels[textType] || "beskrivelse";

  return `[Demo-modus: ANTHROPIC_API_KEY ikke konfigurert]

${typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1)} — ${address}${city ? `, ${city}` : ""}

Velkommen til ${address}! Denne flotte ${propertyType.toLowerCase()}en byr på ${bedrooms} soverom og ${sizeSqm} m² med gjennomtenkte planløsninger.

${price ? `Prisantydning: ${new Intl.NumberFormat("nb-NO").format(price)} NOK` : ""}

Tone: ${toneLabel}

For å få AI-genererte tekster, legg til din ANTHROPIC_API_KEY i .env.local-filen.`;
}
