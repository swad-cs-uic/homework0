import { desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { Hono } from "hono";
import { users } from "../../db/schema.ts";

const app = new Hono<{ Bindings: Env }>();

// TODO: change "Cloudflare" to your NetID
app.get("/api/name", (c) => c.json({ name: "Cloudflare" }));

app.get("/api/highScore", async (c) => {
  const db = drizzle(c.env.DB);
  const highScore = await db
    .select()
    .from(users)
    .orderBy(desc(users.score))
    .limit(1);
  return c.json({ highScore: highScore[0].score }); // Example high score
});

app.post("/api/highScore", async (c) => {
  const db = drizzle(c.env.DB);
  const { score } = await c.req.json<{ score: number }>();
  if (typeof score !== "number" || score < 0) {
    return c.json({ error: "Invalid score" }, 400);
  }
  const result = await db.insert(users).values({ score: score }).returning();
  return c.json({
    message: "Score saved successfully",
    score: result[0].score,
  });
});

export default app;
