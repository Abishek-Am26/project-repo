const express = require("express");
const cors = require("cors");

const app = express();


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

app.get("/health", (req, res) => {
  res.json({ status: "Backend is running!" });
});


app.post("/submit", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      error: "All fields are required"
    });
  }

 
  console.log("New message received:");
  console.log("Name:", name);
  console.log("Email:", email);
  console.log("Message:", message);
  console.log("------------------------");

  res.json({
    success: true,
    message: "Message received successfully!"
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
