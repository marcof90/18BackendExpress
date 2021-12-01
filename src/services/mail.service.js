const nodemailer = require('nodemailer')

const mail = {
    send: async (toMail, subjectMail, textMail)=>{
        const transporter = nodemailer.createTransport({
            host: process.env.HOST_MAIL,
            port: process.env.PORT_MAIL,
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.PASS_MAIL
            }
        })

        const mailOptions = {
            from: process.env.USER_MAIL,
            to: toMail,
            subject: subjectMail,
            text: textMail
        }

        let info = await transporter.sendMail(mailOptions)
        return info
    }
}

module.exports = mail