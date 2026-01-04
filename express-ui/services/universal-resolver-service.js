const RESOLVER_PORTS = {
  key: 8098,
  webvh: 8154,
  indy: 8128,
  webs: 8147
};

async function resolveDid(did) {
  console.log("=== resolveDid called ===");
  console.log("Input DID:", did);

  if (!did.startsWith("did:")) {
    throw new Error("Ungültige DID");
  }

  const parts = did.split(":");
  const method = parts[1]; // key | webvh | indy | webs
  console.log("Parsed method:", method);

  const port = RESOLVER_PORTS[method];
  console.log("Resolved port:", port);

  if (!port) {
    throw new Error(`No resolver configured for DID method: ${method}`);
  }

  const url = `http://localhost:${port}/1.0/identifiers/${encodeURIComponent(did)}`;
  console.log("Resolver URL:", url);

  const response = await fetch(url);
  console.log("HTTP status:", response.status);

  if (!response.ok) {
    const text = await response.text();
    console.log("Resolver error body:", text);
    throw new Error(`Resolver error ${response.status}: ${text}`);
  }

  console.log("Resolution OK");
  return response.json();
}

module.exports = { resolveDid };
