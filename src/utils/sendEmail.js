const nodemailer = require("nodemailer");

const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    host: process.env.AUTH_TRANSPORT_EMAIL,
    service: "gmail",
    auth: {
      user: process.env.AUTH_TRANSPORT_EMAIL,
      pass: process.env.AUTH_TRANSPORT_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: process.env.AUTH_TRANSPORT_EMAIL,
    to: email,
    subject: "Your OTP Verification Code",
    html: `<div style=font-family:Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2><div style="margin:50px auto;width:70%;padding:20px 0"><div style="border-bottom:1px solid #eee"><a href=""style=font-size:1.4em;color:#00466a;text-decoration:none;font-weight:600>eCommerce</a></div><p style=font-size:1.1em>Hi,<p>Thank you for choosing eCommerce. Use the following OTP to complete your Sign Up procedures. OTP is valid for 5 minutes<h2 style="background:#00466a;margin:0 auto;width:max-content;padding:0 10px;color:#fff;border-radius:4px">${otp}</h2><p style=font-size:.9em>Regards,<br>eCommerce<hr style="border:none;border-top:1px solid #eee"><div style="float:right;padding:8px 0;color:#aaa;font-size:.8em;line-height:1;font-weight:300"><p>eCommerce Inc<p>1600 Amphitheatre Parkway<p>California</div></div></div>`,
  });
};

module.exports = sendEmail;
