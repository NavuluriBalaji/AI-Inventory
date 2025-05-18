const sendNewsletter = require("../sendNewsletter");


app.get("/send-newsletter", async (req, res) => {
  await sendNewsletter(
    "🎉 New Feature Update!",
    "<p>Hey there! We've launched something awesome — check it out now!</p>"
  );
  res.send("Newsletter sent!");
});