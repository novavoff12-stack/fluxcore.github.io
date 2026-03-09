import type { NextApiRequest, NextApiResponse } from "next";

let cachedPartners: number[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 10 * 60 * 1000;

async function fetchPartners(): Promise<number[]> {
  const now = Date.now();
  if (cachedPartners && now - cacheTimestamp < CACHE_DURATION) {
    return cachedPartners;
  }

  try {
    const res = await fetch("https://cdn.firefli.net/partners.json");
    if (!res.ok) throw new Error(`Failed to fetch partners: ${res.status}`);
    const data = await res.json();
    cachedPartners = data.groupIds ?? [];
    cacheTimestamp = now;
    return cachedPartners!;
  } catch {
    return cachedPartners ?? [];
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const groupIds = await fetchPartners();
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=300, stale-while-revalidate=600",
  );
  return res.status(200).json({ groupIds });
}

export { fetchPartners };
