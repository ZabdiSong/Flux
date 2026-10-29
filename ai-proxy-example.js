// Cloudflare Worker-style example. Set OPENAI_API_KEY as a server secret.
// Add authentication, rate limiting, and an origin allowlist before public use.
export default {
  async fetch(request, env) {
    if (request.method === "OPTIONS") return new Response(null, { headers: cors(request) });
    if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });
    const { message, context } = await request.json();
    const contextText = JSON.stringify(context || {}).slice(0, 12000);
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-5-mini",
        instructions: "You are a Socratic AP Physics C E&M tutor for a beginner. Use the supplied lesson or question context. Give one conceptual step at a time unless the learner explicitly requests a full solution. Emphasize physical direction, units, and why an integral represents a sum.",
        input: `Context: ${contextText}\n\nStudent: ${String(message || "").slice(0, 3000)}`
      })
    });
    if (!response.ok) return Response.json({ error: "Tutor service unavailable" }, { status: 502, headers: cors(request) });
    const data = await response.json();
    const answer = data.output_text || data.output?.flatMap(x => x.content || []).find(x => x.type === "output_text")?.text || "I could not form a response.";
    return Response.json({ answer }, { headers: cors(request) });
  }
};

function cors(request) {
  return {
    "Access-Control-Allow-Origin": request.headers.get("Origin") || "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "POST, OPTIONS"
  };
}
