import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ suggestions: [] });
  }

  try {
    const url = new URL("https://ws.geonorge.no/adresser/v1/sok");
    url.searchParams.set("sok", query);
    url.searchParams.set("treffPerSide", "8");
    url.searchParams.set("utkoordsys", "4258");

    const response = await fetch(url.toString(), {
      headers: { Accept: "application/json" },
    });

    if (!response.ok) {
      return NextResponse.json({ suggestions: [] });
    }

    const data = await response.json();

    const suggestions = (data.adresser || []).map(
      (addr: Record<string, unknown>) => ({
        address: `${addr.adressetekst}`,
        city: `${addr.poststed || addr.kommunenavn || ""}`,
        postalCode: `${addr.postnummer || ""}`,
        municipality: `${addr.kommunenavn || ""}`,
        county: `${addr.fylkesnavn || ""}`,
        latitude: addr.representasjonspunkt
          ? (addr.representasjonspunkt as Record<string, number>).lat
          : null,
        longitude: addr.representasjonspunkt
          ? (addr.representasjonspunkt as Record<string, number>).lon
          : null,
      })
    );

    return NextResponse.json({ suggestions });
  } catch {
    return NextResponse.json({ suggestions: [] });
  }
}
