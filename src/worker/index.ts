import { Hono } from "hono";

const app = new Hono<{ Bindings: Env }>();

// TODO: change "Cloudflare" to your NetID
app.get("/api/", (c) => c.json({ name: "Cloudflare" }));

app.get("/api/highScore", (c) => {
	// This is a placeholder for a high score endpoint.
	// You can implement your own logic to retrieve high scores from a database or other storage.
	return c.json({ highScore: 100 }); // Example high score
});

app.post("/api/highScore", async (c) => {
	const { score } = await c.req.json<{ score: number }>();
	// Here you would typically save the score to a database or other storage.
	// For this example, we'll just return the score back.
	return c.json({ message: "Score saved successfully", score });
});

export default app;
