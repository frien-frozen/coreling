export default function sitemap() {
  const base = "https://coreling.org";
  const now = new Date();
  return [
    { url: base,         lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/docs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
  ];
}
