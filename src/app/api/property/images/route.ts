import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const address = request.nextUrl.searchParams.get("address");
  const city = request.nextUrl.searchParams.get("city");
  const lat = request.nextUrl.searchParams.get("lat");
  const lng = request.nextUrl.searchParams.get("lng");

  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Google Maps API-nøkkel mangler" },
      { status: 500 }
    );
  }

  let latitude = lat ? parseFloat(lat) : null;
  let longitude = lng ? parseFloat(lng) : null;

  // If no coordinates provided, geocode the address
  if (!latitude || !longitude) {
    if (!address) {
      return NextResponse.json(
        { error: "Adresse eller koordinater kreves" },
        { status: 400 }
      );
    }

    try {
      const query = city ? `${address}, ${city}, Norge` : `${address}, Norge`;
      const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${apiKey}`;
      const geocodeRes = await fetch(geocodeUrl);
      const geocodeData = await geocodeRes.json();

      if (geocodeData.status === "OK" && geocodeData.results.length > 0) {
        const location = geocodeData.results[0].geometry.location;
        latitude = location.lat;
        longitude = location.lng;
      } else {
        return NextResponse.json(
          { error: "Kunne ikke finne adressen" },
          { status: 404 }
        );
      }
    } catch {
      return NextResponse.json(
        { error: "Feil ved geokoding av adresse" },
        { status: 500 }
      );
    }
  }

  // Check Street View availability
  let streetViewAvailable = false;
  try {
    const metadataUrl = `https://maps.googleapis.com/maps/api/streetview/metadata?location=${latitude},${longitude}&key=${apiKey}`;
    const metadataRes = await fetch(metadataUrl);
    const metadata = await metadataRes.json();
    streetViewAvailable = metadata.status === "OK";
  } catch {
    // Street View metadata check failed, continue without it
  }

  const streetViewUrl = streetViewAvailable
    ? `https://maps.googleapis.com/maps/api/streetview?size=800x400&location=${latitude},${longitude}&fov=90&pitch=10&key=${apiKey}`
    : null;

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=16&size=800x400&maptype=hybrid&markers=color:red%7C${latitude},${longitude}&key=${apiKey}`;

  return NextResponse.json({
    streetViewUrl,
    mapUrl,
    latitude,
    longitude,
    streetViewAvailable,
  });
}
