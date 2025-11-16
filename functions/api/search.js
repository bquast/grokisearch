export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);

  const q = searchParams.get("q") || "";
  const limit = searchParams.get("limit") || "50";

  const url = `https://grokipedia.com/api/full-text-search?query=${encodeURIComponent(q)}&limit=${encodeURIComponent(limit)}`;

  // Server-to-server fetch (no CORS)
  const resp = await fetch(url, {
    method: "GET",
    headers: {
      "User-Agent": "Cloudflare-Worker"
    }
  });

  const data = await resp.text(); // grokipedia returns JSON text

  return new Response(data, {
    status: resp.status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
