
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

const emailTransporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

app.use(cors());
app.use(express.json());

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.on("error", (err) => {
  console.error("Unexpected PostgreSQL error:", err.message);
});

// Test API and database connection
app.get("/", async (req, res) => {
  try {
    await pool.query("SELECT 1");

    res.json({
      message: "Evergreen Chiropractic API is running!",
      database: "Connected",
    });
  } catch (err) {
    console.error("Database connection failed:", err.message);

    res.status(500).json({
      message: "Database connection failed.",
    });
  }
});

// Save appointment and send email notification
app.post("/api/appointments", async (req, res) => {
  const { name, email, phone, service, date, message } = req.body;

  if (!name || !email || !phone || !service || !date) {
    return res.status(400).json({
      message: "Please fill in all required appointment fields.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO appointments
       (name, email, phone, service, appointment_date, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [name, email, phone, service, date, message || null]
    );

    const appointmentId = result.rows[0].id;

    let emailSent = false;

    try {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "contact.khurram1@gmail.com",
        subject: "New Chiropractic Appointment Request",
        text: `
New appointment request

Appointment ID: ${appointmentId}
Name: ${name}
Email: ${email}
Phone: ${phone}
Service: ${service}
Date: ${date}
Message: ${message || "No additional message"}
        `,
      });

      emailSent = true;
      console.log("Appointment notification email sent.");
    } catch (emailError) {
      console.error("Appointment email failed:", emailError.message);
    }

    return res.status(201).json({
      message: "Appointment request saved successfully!",
      id: appointmentId,
      emailNotification: emailSent ? "Sent" : "Failed",
    });
  } catch (err) {
    console.error("Appointment save failed:", err.message);

    return res.status(500).json({
      message: "Could not save appointment. Please try again.",
    });
  }
});

// Save contact message and send email notification
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      message: "Please fill in all required contact fields.",
    });
  }

  try {
    const result = await pool.query(
      `INSERT INTO contact_messages (name, email, message)
       VALUES ($1, $2, $3)
       RETURNING id`,
      [name, email, message]
    );

    const messageId = result.rows[0].id;

    let emailSent = false;

    try {
      await emailTransporter.sendMail({
        from: process.env.EMAIL_USER,
        to: "contact.khurram1@gmail.com",
        subject: "New Chiropractic Contact Message",
        text: `
New contact message

Message ID: ${messageId}
Name: ${name}
Email: ${email}
Message: ${message}
        `,
      });

      emailSent = true;
      console.log("Contact message notification email sent.");
    } catch (emailError) {
      console.error("Contact message email failed:", emailError.message);
    }

    return res.status(201).json({
      message: "Contact message saved successfully!",
      id: messageId,
      emailNotification: emailSent ? "Sent" : "Failed",
    });
  } catch (err) {
    console.error("Contact message save failed:", err.message);

    return res.status(500).json({
      message: "Could not save message. Please try again.",
    });
  }
});

// Start a local server only; Vercel imports the exported app
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;
