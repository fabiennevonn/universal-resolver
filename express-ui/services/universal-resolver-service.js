const UNIVERSAL_RESOLVER_URL =
  process.env.UNI_RESOLVER_URL || "http://localhost:8080";

async function resolveDid(did) {
  const url =
    `${UNIVERSAL_RESOLVER_URL}/1.0/identifiers/${encodeURIComponent(did)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Resolver error: ${response.status}`);
  }

  return response.json();
}

module.exports = { resolveDid };
