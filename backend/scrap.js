import express from 'express';
    import cors from 'cors';
    import Parser from 'rss-parser';
    import cron from 'node-cron';
    import { MongoClient } from 'mongodb';

    const app = express();
    app.use(cors());

    const PORT = process.env.PORT || 4002;

    // MongoDB configuration
    const MONGO_URI = 'mongodb+srv://balajinbtt:9908769232Bb@models.bidchql.mongodb.net/?retryWrites=true&w=majority&appName=Models'; // Change if needed
    const DB_NAME = 'LatestAINews';
    const COLLECTION = 'AINews';

    let db, summariesCollection;

    // Connect to MongoDB
    async function connectMongo() {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    db = client.db(DB_NAME);
    summariesCollection = db.collection(COLLECTION);
    console.log('Connected to MongoDB');
    }

    // List of RSS feeds to aggregate
    const FEEDS = [
    'https://venturebeat.com/category/ai/feed/',
    'https://www.artificialintelligence-news.com/feed/',
    'https://www.technologyreview.com/topic/artificial-intelligence/feed/',
    'https://ai.googleblog.com/feeds/posts/default',
    // Add more RSS feed URLs as needed
    ];

    // In-memory cache for news
    let cachedSummaries = [];
    let lastUpdated = null;

    // Function to fetch and cache news
    async function fetchAndCacheNews() {
    try {
        const parser = new Parser();
        let allItems = [];

        // Fetch and aggregate items from all feeds
        for (const feedUrl of FEEDS) {
        try {
            const feed = await parser.parseURL(feedUrl);
            allItems = allItems.concat(
            (feed.items || []).map(item => {
                // Try to extract image from common RSS fields
                let image = null;
                if (item.enclosure && item.enclosure.url) {
                    image = item.enclosure.url;
                } else if (item['media:content'] && item['media:content']['$'] && item['media:content']['$'].url) {
                    image = item['media:content']['$'].url;
                } else if (item.content && typeof item.content === 'string') {
                    // Try to extract first image from HTML content
                    const match = item.content.match(/<img[^>]+src="([^">]+)"/);
                    if (match && match[1]) {
                        image = match[1];
                    }
                }
                return {
                    title: item.title,
                    summary: item.contentSnippet || 'No summary available.',
                    link: item.link,
                    pubDate: item.pubDate || '',
                    source: feed.title || feedUrl,
                    image // new property
                };
            })
            );
        } catch (err) {
            // Skip feeds that fail to load
            continue;
        }
        }

        // Sort by publication date (descending)
        allItems.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

        const summaries = allItems.slice(0, 20).map((item, i) => ({
        id: i,
        title: item.title,
        summary: item.summary,
        link: item.link,
        source: item.source,
        pubDate: item.pubDate,
        image: item.image // include image in summaries
        }));

        // Save to MongoDB (replace all)
        if (summariesCollection) {
        await summariesCollection.deleteMany({});
        await summariesCollection.insertMany(summaries);
        }

        // Also update in-memory cache for fast access
        cachedSummaries = summaries;
        lastUpdated = new Date();
        console.log(`AI news cache updated at ${lastUpdated.toISOString()}`);
    } catch (err) {
        console.error('Failed to update AI news cache:', err);
    }
    }

    // Initial setup
    (async () => {
    await connectMongo();
    await fetchAndCacheNews();
    // Update cache every 15 minutes
    cron.schedule('*/15 * * * *', fetchAndCacheNews);
    })();

    app.get('/api/ai-news-rss', async (req, res) => {
    // Serve from MongoDB if available, else from memory
    if (summariesCollection) {
        const docs = await summariesCollection.find({}).sort({ id: 1 }).toArray();
        return res.json(docs);
    }
    res.json(cachedSummaries);
    });

    app.listen(PORT, () => {
    console.log(`AI News RSS backend running on http://localhost:${PORT}`);
    });
