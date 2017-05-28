"use strict";
const nodemailer = require('nodemailer');

class Mailer {
  constructor() {
    this.options = {
      from: "",
      to: "",
      subject: "",
      html: ""
    }
  }
  sendMail(callback) {
    this.transporter.sendMail(mailOptions, function(error, info) {
      if (error) throw err;
      console.log('Message %s sent: %s', info.messageId, info.response);
      transporter.close();
    });
    callback();
  }

  setSender(sender) {
    this.options.from = sender;
  }

  setReceiver(receiver) {
    this.options.to = receiver;
  }

  setSubject(subject) {
    this.options.subject = subject;
  }

  setHTML(html) {
    this.options.html = html;
  }

  setOptions(options) {
    this.options = options;
  }
}

class GmailMailer extends Mailer {
  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      secure: true,
      auth: {
          user: "hospitalmailer@gmail.com",
          pass: "hospitalpassword123"
      }
      /* Extensible for more GMAIL based options */
    });
  } 
}

class HotmailMailer extends Mailer {
  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      service: 'Hotmail',
      auth: {
          user: "hospitalmailer@hotmail.com",
          pass: "hospitalpassword123"
      }
      /* Extensible for more HOTMAIL based options */
    });
  }
}

class YahooMailer extends Mailer {
  constructor() {
    super();
    this.transporter = nodemailer.createTransport({
      service: 'Yahoo',
      auth: {
          user: "hospitalmailer@yahoo.com",
          pass: "hospitalpassword123"
      }
      /* Extensible for more YAHOO based options */
    });
  }
}

class Factory {
  createMailer(type) {
    if (type.toUpperCase() === 'GMAIL')
      return new GmailMailer();
    else
    if (type.toUpperCase() === 'HOTMAIL')
      return new HotmailMailer();
    else
    if(type.toUpperCase() === 'YAHOO')
      return new YahooMailer();
  }
}

module.exports = { Factory };