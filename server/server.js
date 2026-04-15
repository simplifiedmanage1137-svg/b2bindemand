require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const db = require('./config/db');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Contact form endpoint
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, phone, budget, message, source, agree } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !budget) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please fill in all required fields' 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    // Store in database
    await db.execute(
      'INSERT INTO contact_submissions (name, email, phone, budget, message, source, agreed_to_policy) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [name, email, phone, budget, message || '', source || '', agree ? 1 : 0]
    );

    try {
      // Send email to admin
      if (process.env.EMAIL_USER && process.env.ADMIN_EMAIL) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL,
          subject: 'New Contact Form Submission',
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Budget:</strong> ${budget}</p>
            <p><strong>Message:</strong> ${message || 'N/A'}</p>
            <p><strong>Source:</strong> ${source || 'N/A'}</p>
          `
        });

        // Send confirmation email to user
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Thank you for contacting B2B inDemand',
          html: `
            <h2>Thank you for reaching out!</h2>
            <p>Dear ${name},</p>
            <p>We've received your message and will get back to you shortly.</p>
            <p>Best regards,<br>B2B inDemand Team</p>
          `
        });
      }
    } catch (emailError) {
      console.error('Email error:', emailError);
      // Continue execution as email failure shouldn't affect form submission
    }

    res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully' 
    });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Error processing your request. Please try again.' 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error' 
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
