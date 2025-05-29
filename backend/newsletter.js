// Use ES module imports instead of require
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
  port:465,
  secure: true, 
  logger: true,
  debug: true, 
  Secureconnection: false, 
  auth: {
    user: 'llminventory@gmail.com',
    pass: 'bxyb iguy sfhk gede'
  },
  tls: {
    rejectUnauthorized: true 
  }
});

transporter.verify(function(error, success) {
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
        subject: '🎉 Thank You for Subscribing to AI Inventory!',
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
    const text = `Here are the latest updates from our website:\n` +
      news.map(item => `- ${item.title || item.headline || 'Untitled'}\n${item.summary || ''}`).join('\n');
    const html = `<b>Here are the latest updates from our website:</b><ul>` +
      news.map(item =>
        `<li><b>${item.title || item.headline || 'Untitled'}</b><br/>${item.summary || ''}</li>`
      ).join('') +
      `</ul><p>Visit our site for more.</p>`;
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

cron.schedule('0 9 * * 1', async () => {
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
      from: '"LLM Updates" <llminventory@gmail.com>',
      to: emails.join(','),
      subject: 'Weekly LLM Website Updates',
      text: updates.text,
      html: updates.html
    });
    console.log('Weekly newsletter sent to subscribers');
  } catch (err) {
    console.error('Weekly newsletter error:', err);
  } finally {
    await client.close();
  }
});

app.listen(4000, () => console.log('Newsletter backend running on port 4000'));
