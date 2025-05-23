import express from 'express';
import cors from 'cors';
import puppeteer from 'puppeteer';

const app = express();
app.use(cors());

const PORT = 4001;

app.get('/api/ai-news-puppeteer', async (req, res) => {
  try {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto('https://www.artificialintelligence-news.com/all-categories/?e-filter-f8576aa-category=artificial-intelligence', { waitUntil: 'networkidle2' });

    const summaries = await page.evaluate(() => {
      const articles = Array.from(document.querySelectorAll('.td_module_wrap, .td-block-span6, .td-block-span4'));
      return articles.slice(0, 7).map((el, i) => {
        const titleEl = el.querySelector('.entry-title a');
        const summaryEl = el.querySelector('.td-excerpt') || el.querySelector('p');
        return {
          id: i,
          title: titleEl ? titleEl.textContent.trim() : '',
          summary: summaryEl ? summaryEl.textContent.trim() : 'No summary available.',
          link: titleEl ? titleEl.href : ''
        };
      }).filter(a => a.title && a.link);
    });

    await browser.close();
    res.json(summaries.length ? summaries : [{
      id: 0,
      title: 'No news found',
      summary: 'Unable to fetch the latest AI news at this time. Please try again later.',
      link: 'https://www.artificialintelligence-news.com/'
    }]);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch AI news' });
  }
});

app.listen(PORT, () => {
  console.log(`AI News Puppeteer backend running on http://localhost:${PORT}`);
});
