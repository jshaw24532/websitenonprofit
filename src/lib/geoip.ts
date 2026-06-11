export interface GeoLocation {
  ip: string;
  city: string | null;
  region: string | null;
  country: string | null;
  countryCode: string | null;
  latitude: number | null;
  longitude: number | null;
}

export async function lookupIp(ip: string): Promise<GeoLocation> {
  const base: GeoLocation = {
    ip,
    city: null,
    region: null,
    country: null,
    countryCode: null,
    latitude: null,
    longitude: null,
  };

  if (!ip || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("192.168.")) {
    return { ...base, city: "Local", region: "Development", country: "Local Network" };
  }

  try {
    const res = await fetch(
      `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,message,country,countryCode,regionName,city,lat,lon`,
      { next: { revalidate: 0 } }
    );
    const data = (await res.json()) as {
      status: string;
      country?: string;
      countryCode?: string;
      regionName?: string;
      city?: string;
      lat?: number;
      lon?: number;
    };
    if (data.status !== "success") return base;
    return {
      ip,
      city: data.city ?? null,
      region: data.regionName ?? null,
      country: data.country ?? null,
      countryCode: data.countryCode ?? null,
      latitude: data.lat ?? null,
      longitude: data.lon ?? null,
    };
  } catch {
    return base;
  }
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "127.0.0.1";
}
