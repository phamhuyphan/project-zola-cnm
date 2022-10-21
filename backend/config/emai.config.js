require('dotenv/config');

module.exports = {
    MAILER: process.env.MAIL_MAILER,
    PORT: process.env.MAIL_PORT,
    USERNAME: process.env.MAIL_USERNAME,
    PASSWORD: process.env.MAIL_PASSWORD,
    FROM_ADDRESS: process.env.MAIL_FROM_ADDRESS,
}