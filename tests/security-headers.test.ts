import { afterEach, describe, expect, it, vi } from "vitest";
import nextConfig from "../next.config";

afterEach(() => vi.unstubAllEnvs());

async function getHeaders() {
  const routes = await nextConfig.headers!();
  const route = routes.find(({ source }) => source === "/(.*)");
  expect(route).toBeDefined();
  return Object.fromEntries(route!.headers.map(({ key, value }) => [key, value]));
}

describe("security headers", () => {
  it("restricts production resources and blocks framing, objects and inline handlers", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const headers = await getHeaders();
    const directives = headers["Content-Security-Policy"].split("; ");

    expect(directives).toEqual(expect.arrayContaining([
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'",
      "script-src-attr 'none'",
      "connect-src 'self'",
      "object-src 'none'",
      "frame-src 'none'",
      "frame-ancestors 'none'",
      "base-uri 'none'",
      "form-action 'self'",
    ]));
    expect(headers["Content-Security-Policy"]).not.toContain("'unsafe-eval'");
    expect(headers["Content-Security-Policy"]).not.toContain("ws:");
    expect(headers["X-Content-Type-Options"]).toBe("nosniff");
    expect(headers["X-Frame-Options"]).toBe("DENY");
    expect(headers["Referrer-Policy"]).toBe("strict-origin-when-cross-origin");
    expect(headers["Permissions-Policy"]).toBe("camera=(), microphone=(), geolocation=(), payment=()");
    expect(nextConfig.poweredByHeader).toBe(false);
  });

  it("allows the development runtime and local hot reload only in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const headers = await getHeaders();
    expect(headers["Content-Security-Policy"]).toContain("'unsafe-eval'");
    expect(headers["Content-Security-Policy"]).toContain("ws://localhost:*");
    expect(headers["Content-Security-Policy"]).toContain("ws://127.0.0.1:*");
  });
});
