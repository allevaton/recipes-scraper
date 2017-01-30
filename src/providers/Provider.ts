interface Provider {
  hostname: string;

  scrape: (url: string) => Promise<Recipe>
}