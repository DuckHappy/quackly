export default function extractJson(str: string): string {
  const match = str.match(/```json([\s\S]*?)```/i); // busca ```json ... ```
  if (match) return match[1].trim();

  // Si no tiene ```json, intenta extraer desde la primera llave
  const start = str.indexOf('{');
  const end = str.lastIndexOf('}');
  if (start !== -1 && end !== -1) return str.slice(start, end + 1).trim();

  return '{}'; // fallback
}
