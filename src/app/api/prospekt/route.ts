import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address, city, propertyType, bedrooms, bathrooms, sizeSqm, price, description, sellerName, agentName } = body;

    if (!ANTHROPIC_API_KEY) {
      const fallback = `[Demo-modus: ANTHROPIC_API_KEY ikke konfigurert]

SALGSPROSPEKT
${address}, ${city}

EIENDOMSINFORMASJON
Type: ${propertyType}
Soverom: ${bedrooms} | Bad: ${bathrooms} | Størrelse: ${sizeSqm} m²
Prisantydning: ${price ? new Intl.NumberFormat("nb-NO").format(price) + " NOK" : "Ikke oppgitt"}

BESKRIVELSE
${description || "Ingen beskrivelse oppgitt."}

KONTAKTINFORMASJON
Selger: ${sellerName || "Ikke oppgitt"}
Ansvarlig megler: ${agentName || "Ikke oppgitt"}

For å få AI-genererte prospekter, legg til din ANTHROPIC_API_KEY i .env.local-filen.`;

      return NextResponse.json({ content: fallback });
    }

    const prompt = `Du er en erfaren norsk eiendomsmegler. Skriv et komplett og profesjonelt salgsprospekt for følgende eiendom:

Adresse: ${address}
By: ${city}
Type: ${propertyType}
Soverom: ${bedrooms}
Bad: ${bathrooms}
Størrelse: ${sizeSqm} m²
Pris: ${price ? new Intl.NumberFormat("nb-NO").format(price) + " NOK" : "Ikke oppgitt"}
Beskrivelse: ${description || "Ikke oppgitt"}
Selger: ${sellerName || "Ikke oppgitt"}
Ansvarlig megler: ${agentName || "Ikke oppgitt"}

Prospektet skal inneholde:
1. Innledning og sammendrag
2. Detaljert eiendomsbeskrivelse
3. Beliggenhet og nabolag
4. Teknisk informasjon
5. Prisantydning og omkostninger
6. Kontaktinformasjon

Skriv på norsk med en profesjonell og innbydende tone.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.content && data.content[0]) {
      return NextResponse.json({ content: data.content[0].text });
    }

    return NextResponse.json(
      { error: "Kunne ikke generere prospekt" },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "En feil oppstod under generering" },
      { status: 500 }
    );
  }
}
