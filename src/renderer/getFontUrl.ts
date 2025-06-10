export function getFontUrl(filePath: string): string {
  // Font server is running locally on port 240006:
  const url = new URL("http://localhost:24006/fonts");
  url.searchParams.set("path", filePath);
  return url.toString();
}
