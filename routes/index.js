const dotenv = require('dotenv');
dotenv.config();
const { USER, PASSWORD } = require('../config/config')
const  express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/contact', function(req, res, next) {
  res.render('contact', { title: 'Contact' });
});
router.get('/about', function(req, res, next) {
  res.render('about', { title: 'About' });
});

router.post('/contact',async  (req,res) => {
  const { email, message } = req.body;

  contentHTML = `
    <h3>Message received from ${email}</h3>
    <p>${message}</p>
  `;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
      user: USER,
      pass: PASSWORD
    }
  });

  const infoMail = await transporter.sendMail({
    from: 'Fly Porky - Nodemailer',
    to: 'federicodaw@gmail.com',
    subject: 'Nodemailer con nodejs',
    html: contentHTML
  });

  console.log('Messege send', infoMail.messageId);

  res.send('received')
});

module.exports = router;
