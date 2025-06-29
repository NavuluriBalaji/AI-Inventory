import express from 'express';
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import cors from 'cors';
import { MongoClient } from 'mongodb';

const app = express();
app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  port: 465,
  secure: true,
  logger: true,
  debug: true,
  Secureconnection: false,
  auth: {
    user: 'llminventory@gmail.com',
    pass: 'ahyc iivm lpcr ymnk' // <-- Replace with your Gmail App Password
  },
  tls: {
    rejectUnauthorized: true
  }
});

transporter.verify(function (error, success) {
  if (error) {
    console.error('Nodemailer transporter error:', error);
    console.error('If you see "Username and Password not accepted", check:');
    console.error('- The email and password are correct');
    console.error('- If you use 2-Step Verification, you must use an App Password');
    console.error('- App Passwords can be generated at https://myaccount.google.com/apppasswords');
    console.error('- Less secure app access is no longer supported by Google for most accounts');
    console.error('- See https://support.google.com/mail/?p=BadCredentials');
  } else {
    console.log('Nodemailer transporter is ready to send emails');
  }
});

const mongoUri = 'mongodb+srv://balajinbtt:9908769232Bb@models.bidchql.mongodb.net/?retryWrites=true&w=majority&appName=Models';

const userDbName = 'ModelDetailsDB';
const userCollection = 'ModelDetails';
const newsDbName = 'LatestAINews';
const newsCollection = 'AINews';

// Subscribe endpoint
app.post('/api/subscribe', async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email required' });

  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(userDbName);
    const collection = db.collection(userCollection);

    // Check if email already exists
    const existing = await collection.findOne({ email });
    if (existing) {
      return res.status(200).json({ success: false, message: 'You have already subscribed.' });
    }

    await collection.updateOne(
      { email },
      { $setOnInsert: { email, subscribedAt: new Date() } },
      { upsert: true }
    );

    try {
      const info = await transporter.sendMail({
        from: '"AI Inventory" <llminventory@gmail.com>',
        to: email,
        subject: 'Thank You for Subscribing to AI Inventory',
        text: 'Thank you for subscribing to AI Inventory updates! You will receive weekly news and updates.',
        html: `
          <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
              <h2 style="color: #4CAF50;">🎉 Welcome to LLM Website!</h2>
              <p style="font-size: 16px; color: #333;">
                Thank you for subscribing to <strong>LLM Website</strong> updates! We're thrilled to have you with us.
              </p>
              <p style="font-size: 16px; color: #333;">
                You'll now receive <strong>weekly news</strong>, insights, and updates on everything happening in the world of large language models and AI!
              </p>
              <hr style="margin: 30px 0; border: none; border-top: 1px solid #eee;" />
              <p style="font-size: 14px; color: #999;">
                If you have any questions, feel free to reply to this email. We're always happy to help.
              </p>
              <p style="font-size: 14px; color: #999;">— The AI Inventory Team</p>
            </div>
          </div>
        `
      });
      console.log('Confirmation mail sent:', info.response);
      res.json({ success: true });
    } catch (mailErr) {
      console.error('Confirmation mail error:', mailErr);
      return res.status(500).json({ success: false, error: 'Mail error', details: mailErr.message });
    }
  } catch (err) {
    console.error('MongoDB error:', err);
    return res.status(500).json({ error: 'DB error' });
  } finally {
    await client.close();
  }
});

// Get latest updates for newsletter
async function getLatestUpdates() {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(newsDbName);
    const collection = db.collection(newsCollection);
    const news = await collection.find().sort({ date: -1 }).limit(10).toArray();
    if (!news.length) {
      return {
        text: 'No news available this week.',
        html: '<b>No news available this week.</b>'
      };
    }

    // Build engaging text version
    const text = 🔥 Here are the latest AI updates from AI Inventory:\n\n +
      news.map((item, idx) =>
        `${idx + 1}. ${item.title || item.headline || 'Untitled'}\n${item.summary || ''}\n${item.link ? Read more: ${item.link} : ''}\n`
      ).join('\n') +
      \nStay curious! Explore more at https://ai-inventory-blond.vercel.app/;

    // Build beautiful HTML version
    const html = `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; background: #f9fafb; padding: 32px;">
        <div style="max-width: 600px; margin: auto; background: #fff; border-radius: 16px; box-shadow: 0 2px 16px rgba(34,197,94,0.07); padding: 32px;">
          <h2 style="color: #22c55e; text-align: center; margin-bottom: 24px;">
            🚀 This Week's Top AI News from <a href="https://ai-inventory-blond.vercel.app/" style="color:#22c55e;text-decoration:none;">AI Inventory</a>
          </h2>
          <ol style="padding-left: 20px; color: #222;">
            ${news.map(item => `
              <li style="margin-bottom: 24px;">
                <div style="font-size: 1.1em; font-weight: bold; color: #16a34a;">
                  ${item.title || item.headline || 'Untitled'}
                </div>
                <div style="margin: 8px 0 8px 0; color: #444;">
                  ${item.summary || ''}
                </div>
                ${item.link ? <a href="${item.link}" style="color: #22c55e; text-decoration: underline;" target="_blank">Read more</a> : ''}
              </li>
            `).join('')}
          </ol>
          <div style="margin-top: 32px; text-align: center;">
            <a href="https://ai-inventory-blond.vercel.app/" style="display: inline-block; background: linear-gradient(90deg,#22c55e,#16a34a); color: #fff; padding: 12px 32px; border-radius: 8px; font-weight: bold; text-decoration: none; font-size: 1.1em;">
              🌐 Visit AI Inventory for more!
            </a>
          </div>
          <p style="margin-top: 32px; color: #888; font-size: 0.95em; text-align: center;">
            You are receiving this email because you subscribed to AI Inventory.<br>
            If you wish to unsubscribe, just reply to this email.
          </p>
        </div>
      </div>
    `;

    return { text, html };
  } catch (err) {
    console.error('MongoDB fetch error:', err);
    return {
      text: 'Could not fetch news updates this week.',
      html: '<b>Could not fetch news updates this week.</b>'
    };
  } finally {
    await client.close();
  }
}

// Schedule newsletter: every 2 days at 9 AM IST
cron.schedule('*/2 * * * *', async () => {
  const client = new MongoClient(mongoUri);
  try {
    await client.connect();
    const db = client.db(userDbName);
    const collection = db.collection(userCollection);
    const users = await collection.find({}, { projection: { email: 1 } }).toArray();
    const emails = users.map(u => u.email);
    if (emails.length === 0) return;

    const updates = await getLatestUpdates();
    await transporter.sendMail({
      from: '"Updates of the Week" <llminventory@gmail.com>',
      to: '',
      bcc: emails,
      subject: 'Weekly LLM Website Updates',
      text: updates.text,
      html: updates.html
    });
    console.log('Newsletter sent to subscribers');
  } catch (err) {
    console.error('Newsletter error:', err);
  } finally {
    await client.close();
  }
}, {
  timezone: "Asia/Kolkata" // Ensures 9 AM IST
});

app.listen(4000, () => console.log('Newsletter backend running on port 4000'));