const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const cookieParser = require("cookie-parser")
const app = express();

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // or the actual frontend domain
    credentials: true
  })
);
// app.options("*", cors());
app.use(express.json());
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "karankumar560k@gmail.com",
    pass: "sxgshmlvcfmpjyri" // Not your Gmail password!
  }
});

app.post("/send", (req, res) => {
  console.log("📩 Email Request Received:");
  console.log("To:", req.body.to);
  console.log("Subject:", req.body.subject);
  console.log("Body:", req.body.text);

  const mailOptions = {
    from: "yourgmail@gmail.com",
    to: req.body.to,
    subject: req.body.subject,
    text: req.body.text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("❌ Email failed:", error);
      return res.status(500).send("Email failed to send");
    }
    console.log("✅ Email sent:", info.response);
    res.send("Email sent: " + info.response);
  });
});
app.get("/",(req , res)=>{
 return res.json({
  success: true , 
 message: " server is up"
 })
})


app.listen(4000 , ()=>{
 console.log("App is running live");
})