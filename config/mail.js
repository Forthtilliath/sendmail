exports.getOptions = (req) => {
    return {
      from: `${req.body.name} <${req.body.email}>`,
      to: `Me <${process.env.SEND_TO}>`,
      subject: 'Message from ' + req.body.name,
      text: `Email : ${req.body.email}\nMessage :\n${req.body.message}`, 
   };
}