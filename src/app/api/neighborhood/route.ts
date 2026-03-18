import { NextRequest, NextResponse } from "next/server";

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const { address, city, municipality, county } = await request.json();

    if (!address) {
      return NextResponse.json(
        { error: "Adresse er p\u00e5krevd" },
        { status: 400 }
      );
    }

    const location = [address, city, municipality, county]
      .filter(Boolean)
      .join(", ");

    if (!ANTHROPIC_API_KEY) {
      return NextResponse.json({
        neighborhood: generateFallback(address, city),
      });
    }

    const prompt = `Du er en ekspert p\u00e5 norske nabolag og boligomr\u00e5der. Gi en kort og informativ nabolagsbeskrivelse for adressen: ${location}

Svar p\u00e5 norsk med f\u00f8lgende struktur (bruk akkurat disse overskriftene):

**Omr\u00e5de:** En kort beskrivelse av omr\u00e5det og dets karakter (2-3 setninger).

**Transport:** N\u00e6rhet til kollektivtransport, veiforbindelser, og reisetid til sentrum.

**Tjenester:** N\u00e6rliggende butikker, skoler, barnehager, helsetjenester.

**Friluftsliv:** Parker, tursti\u00e5r, sportsanlegg, og naturomr\u00e5der i n\u00e6rheten.

**Atmosf\u00e6re:** Generelt inntrykk av nabolaget, type beboere, og stemning.

Hold det kort og relevant. Maks 150 ord totalt.`;

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const data = await response.json();

    if (data.content && data.content[0]) {
      return NextResponse.json({ neighborhood: data.content[0].text });
    }

    return NextResponse.json(
      { error: "Kunne ikke hente nabolagsinformasjon" },
      { status: 500 }
    );
  } catch {
    return NextResponse.json(
      { error: "En feil oppstod" },
      { status: 500 }
    );
  }
}

function generateFallback(address: string, city: string): string {
  return `[Demo-modus: ANTHROPIC_API_KEY ikke konfigurert]

**Omr\u00e5de:** ${address}${city ? `, ${city}` : ""} ligger i et attraktivt boligomr\u00e5de med god infrastruktur og hyggelig nabolag.

**Transport:** Gode kollektivforbindelser med buss og tog i n\u00e6rheten. Kort vei til hovedveier.

**Tjenester:** N\u00e6rhet til dagligvarebutikker, skoler og barnehager.

**Friluftsliv:** Tilgang til tursti\u00e5r og gr\u00f8ntomr\u00e5der i n\u00e6romr\u00e5det.

**Atmosf\u00e6re:** Et rolig og familievennlig nabolag.

For \u00e5 f\u00e5 AI-generert nabolagsinformasjon, legg til ANTHROPIC_API_KEY i .env.local.`;
}
