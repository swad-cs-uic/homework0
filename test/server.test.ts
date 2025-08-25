import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

describe("Hello World worker", () => {
  it("responds with proper status for /", async () => {
    const response = await SELF.fetch("http://example.com/");
    expect(response.status).toBe(200);
  });
});
