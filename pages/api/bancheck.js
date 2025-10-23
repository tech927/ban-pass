export default async function handler(req, res) {
  const numero = req.query.numero;
  if (!numero) return res.status(400).json({ error: "Numéro manquant" });

  const url = `https://banchek-by-awais.kesug.com/bancheck.php?numero=${encodeURIComponent(numero)}&i=1`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
        "Accept":
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Connection": "keep-alive",
      },
    });

    // Récupère le texte brut
    const text = await response.text();

    // Si c’est une page HTML (challenge JS), renvoie un message clair
    if (text.includes("<html")) {
      return res.status(403).json({
        error:
          "Le site distant a renvoyé une page HTML (Cloudflare ou JS Challenge). Impossible d’accéder directement à l’API depuis Vercel.",
        raw: text.substring(0, 200) + "...",
      });
    }

    try {
      const json = JSON.parse(text);
      res.status(200).json(json);
    } catch {
      res.status(200).send(text);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
