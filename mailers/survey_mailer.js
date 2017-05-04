var nodemailer = require('nodemailer');

function Mailer() {
  this.options = {
    from: "",
    to: "",
    subject: "",
    html: ""
  }
  this.initialiseTransporter();
}

Mailer.prototype.initialiseTransporter = function() {
  this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: "hospitalmailer@gmail.com",
          pass: "hospitalpassword123"
      }
  });
}

Mailer.prototype.sendMail = function() {
  this.transporter.sendMail(mailOptions, function(error, info) {
    if (error) throw err;
    console.log('Message %s sent: %s', info.messageId, info.response);
    transporter.close();
  });
}

Mailer.prototype.setSender = function(sender) {
  this.options.from = sender;
}

Mailer.prototype.setReceiver = function(receiver) {
  this.options.to = receiver;
}

Mailer.prototype.setSubject = function(subject) {
  this.options.subject = subject;
}

Mailer.prototype.setHTML = function(html) {
  this.options.html = html;
}

Mailer.prototype.setOptions = function(options) {
  this.options = options;
}

module.exports = Mailer;