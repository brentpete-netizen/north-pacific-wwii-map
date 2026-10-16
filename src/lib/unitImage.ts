/** Resolve a public/ path for local dev and GitHub Pages. */
export function unitImageSrc(image: string): string {
  return `${import.meta.env.BASE_URL}${image}`;
}
