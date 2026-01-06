import * as cheerio from "cheerio";

export interface ScrapedEvent {
    source: string;
    title: string;
    url: string;
    price?: string;
    publishedAt: Date;
    hash: string; // Unique ID from source
}

// Mock Scraper for MVP
export async function scrapeSources(): Promise<ScrapedEvent[]> {
    console.log("Starting scrape...");

    // In a real app, you would fetch() a URL here
    // const res = await fetch("https://example.com/jobs");
    // const html = await res.text();
    // const $ = cheerio.load(html);

    // Mock Data
    const mockEvents: ScrapedEvent[] = [
        {
            source: "mock-freelance-site",
            title: "React Developer needed for MVP",
            url: "https://example.com/job/1",
            price: "$500 - $1000",
            publishedAt: new Date(),
            hash: "job-1-" + new Date().toISOString().split("T")[0], // Change hash daily to simulate new item
        },
        {
            source: "mock-freelance-site",
            title: "Python Scraper Expert",
            url: "https://example.com/job/2",
            price: "$300",
            publishedAt: new Date(),
            hash: "job-2-" + new Date().toISOString().split("T")[0],
        },
        {
            source: "mock-linkedin",
            title: "Senior Node.js Engineer",
            url: "https://linkedin.com/job/3",
            publishedAt: new Date(),
            hash: "job-3",
        },
    ];

    return mockEvents;
}
