// Enlace de búsqueda en YouTube en vez de un vídeo concreto: así siempre
// funciona y muestra varias opciones actuales, sin depender de un enlace
// fijo que pueda caducar o desaparecer.
export function youtubeSearchUrl(query: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
}
