
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
    // Save appointment in PostgreSQL
    const result = await pool.query(
      `INSERT INTO appointments
       (name, email, phone, service, appointment_date, message)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [name, email, phone, service, date, message || null]
    );

    const appointmentId = result.rows[0].id;

    // Send email to clinic owner
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

      console.log("Appointment notification email sent.");
    } catch (emailError) {
      console.error(
        "Appointment saved, but email failed:",
        emailError.message
      );
    }

    res.status(201).json({
      message: "Appointment request saved successfully!",
      id: appointmentId,
      emailNotification: "Check backend terminal for email status.",
    });
  } catch (err) {
    console.error("Appointment save failed:", err.message);

    res.status(500).json({
      message: "Could not save appointment. Please try again.",
    });
  }
});

// Save contact message
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

    res.status(201).json({
      message: "Contact message saved successfully!",
      id: result.rows[0].id,
    });
  } catch (err) {
    console.error("Contact message save failed:", err.message);

    res.status(500).json({
      message: "Could not save message. Please try again.",
    });
  }
});

// Start server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

module.exports = app;

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});