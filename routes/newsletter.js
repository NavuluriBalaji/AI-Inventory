const express = require("express");
const router = express.Router();
const Subscribe = require("../models/Subscribe");

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required." });

  try {
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Already subscribed." });
    }

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res.status(201).json({ message: "Subscribed successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Error subscribing.", error: err.message });
  }
});

module.exports = router;