import { NextResponse } from "next/server";
import { scrapeSources } from "@/lib/scraper";
import { processMatches } from "@/lib/matcher";

export const dynamic = 'force-dynamic'; // Ensure it runs every time

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        // For MVP/Local dev, we might verify this loosely or skip
        // return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const scrapedData = await scrapeSources();
        await processMatches(scrapedData);
        return NextResponse.json({ success: true, count: scrapedData.length });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
    }
}
