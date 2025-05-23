import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as cheerio from 'cheerio';

const app = express();
app.use(cors());

const PORT = 4000;

// Scrape summaries from the provided AI news category page
app.get('/api/ai-news', async (req, res) => {
  try {
    const { data } = await axios.get('https://www.artificialintelligence-news.com/all-categories/?e-filter-f8576aa-category=artificial-intelligence');
    const $ = cheerio.load(data);
    const summaries = [];

    // Try to select the latest news articles using multiple selectors for robustness
    const articles = $('.td_module_wrap, .td-block-span6, .td-block-span4');
    console.log(`Found ${articles.length} articles`);

    articles.slice(0, 7).each((i, el) => {
      const title = $(el).find('.entry-title a').text().trim();
      const link = $(el).find('.entry-title a').attr('href');
      let summary = $(el).find('.td-excerpt').text().trim();
      if (!summary) {
        summary = $(el).find('p').first().text().trim();
      }
      if (!summary) {
        summary = 'No summary available.';
      }
      if (title && link) {
        summaries.push({ id: i, title, summary, link });
      }
    });

    // If nothing found, send a friendly message
    if (summaries.length === 0) {
      return res.json([
        {
          id: 0,
          title: 'No news found',
          summary: 'Unable to fetch the latest AI news at this time. Please try again later.',
          link: 'https://www.artificialintelligence-news.com/'
        }
      ]);
    }

    res.json(summaries);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch AI news' });
  }
});

app.listen(PORT, () => {
  console.log(`AI News backend running on http://localhost:${PORT}`);
});
