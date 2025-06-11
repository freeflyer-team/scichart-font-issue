export function getFontUrl(filePath: string): string {
  // Font server is running locally on port 24007:
  const url = new URL("http://localhost:24007/fonts");
  url.searchParams.set("path", filePath);
  return url.toString();
}
