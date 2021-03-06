const express = require('express')
const nodemailer = require('nodemailer');
const dotenv = require('dotenv').config();
const fs = require('fs');
const app = express();


app.use(express.urlencoded());
app.use(express.static(`${__dirname}/public`))


const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  pool: true,
  auth: {
    user: `${process.env.EMAIL}`,
    pass: `${process.env.PASSWORD}`,
  }
});

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/form.html`);
})

app.post('/', (req, res) => {
  const mailOptions = {
    from: 'rohank2502@gmail.com',
    to: `${req.body.email}`,
    subject: 'A Special Mail from ROHAN',
    html: `<h1 align="center">Hello ${req.body.name}, Rohan here !!</h1><h3>Thanks for helping me in checking this nodemailer feature which is my first application which uses backend.</h3><h2>Get connected with me </h2>
    <h3><a href="https://github.com/rohan-kulkarni-25">GitHub</a><br>
    <a href="https://www.linkedin.com/in/rohan-k-2502/">LinkedIn</a><br>
    <a href="https://twitter.com/rohan_2502">Twitter</a><br>
    <a href="https://www.instagram.com/rohan_k_2502/">Instagram</a><br>
    <a href="https://t.me/rohankulkarnichannel">TELEGRAM CHANNEL</a><br>
    <a href="https://www.youtube.com/channel/UC9lHcqq-TOWCW_ee6fVwhrg">YOUTUBE CHANNEL</a><br></h>`
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
  console.log(req.body);
  res.sendFile(`${__dirname}/public/form-sucess.html`);
})

app.listen(process.env.PORT || 3000,
  () => console.log("Server is running..."));
