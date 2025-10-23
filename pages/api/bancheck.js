export default async function handler(req, res) {
  const numero = req.query.numero;
  if (!numero) return res.status(400).json({ error: "Numéro manquant" });

  const url = `https://banchek-by-awais.kesug.com/bancheck.php?numero=${encodeURIComponent(numero)}&i=1`;

  try {
    const response = await fetch(url);
    const text = await response.text();
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
