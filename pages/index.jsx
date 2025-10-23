import { useState } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [numero, setNumero] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCheck = async () => {
    setError(null);
    setResult(null);
    if (!numero) return setError("Veuillez entrer un numéro valide");

    setLoading(true);
    try {
      const res = await fetch(`/api/bancheck?numero=${encodeURIComponent(numero)}`);
      const text = await res.text();
      setResult(text);
    } catch (e) {
      setError("Erreur : " + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-indigo-900 to-purple-800 text-white flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-2xl p-6 shadow-xl"
      >
        <h1 className="text-3xl font-bold text-center mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          WhatsApp Number Status Checker
        </h1>
        <p className="text-center text-gray-400 mb-6">
          Entrez un numéro avec indicatif pays (ex : 5511999999999)
        </p>

        <div className="flex gap-2">
          <input
            value={numero}
            onChange={(e) => setNumero(e.target.value)}
            placeholder="Ex: 5511999999999"
            className="flex-1 bg-gray-800 text-white p-3 rounded-xl border border-gray-700 focus:border-indigo-500 outline-none"
          />
          <button
            onClick={handleCheck}
            disabled={loading}
            className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl font-semibold shadow-lg transition disabled:opacity-50"
          >
            {loading ? "Vérif..." : "Vérifier"}
          </button>
        </div>

        {error && (
          <div className="mt-4 text-red-400 bg-red-900/30 p-3 rounded-lg text-sm">
            ⚠️ {error}
          </div>
        )}

        {result && (
          <motion.pre
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-6 p-4 bg-black/60 rounded-lg text-green-400 text-sm overflow-x-auto border border-green-700"
          >
            {result}
          </motion.pre>
        )}
      </motion.div>

      <footer className="mt-10 text-xs text-gray-500">
        ⚙️ Propulsé par <b>banchek-by-awais API</b>
      </footer>
    </div>
  );
}
