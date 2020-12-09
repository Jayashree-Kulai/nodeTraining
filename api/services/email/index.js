var nodemailer = require("nodemailer");
var config = require("../../configs/config");
var Mailgen = require("mailgen");
module.exports = {
    sendMail: function (name, email, intro, subject, cb) {
        let transporter = nodemailer.createTransport({
            service: "Yahoo",
            secure: true,
            auth: {
                user: config.email.user,
                pass: config.email.pass,
            },
        });

        let MailGenerator = new Mailgen({
            theme: "default",
            product: {
                name: "Invision Policy App",
                link: "https://robosoftin.com",
            },
        });

        let response = {
            body: {
                name,
                intro: intro,
            },
        };

        let mail = MailGenerator.generate(response);

        let message = {
            from: config.email.user,
            to: email,
            subject: subject,
            html: mail,
        };

        transporter
            .sendMail(message)
            .then(() => {
                cb();
                console.log("------------------> Mail sent successfully<------------------");
            })
            .catch((error) => console.error(error));

    }
}
