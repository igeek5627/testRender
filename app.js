var express = require("express");

const pdf = require("html-pdf-node");

var app = express();

// view engine setup

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", function (req, res, next) {
  res.send("server running");
});

app.get("/generatePDF", function (req, res, next) {
  let options = { format: "A4" };
  let file = {
    content: `<!DOCTYPE html>
  <html>
  <head>
  <title>Page Title</title>
  </head>
  <body>
  
  <h1>This is a Heading</h1>
  <p>This is a paragraph.</p>
  
  </body>
  </html>    
  `,
  };
  pdf.generatePdf(file, options).then((pdfBuffer) => {
    const pdfBase64 = pdfBuffer.toString("base64");
    res.send({ status: true, base64: pdfBase64 });
  });
});

app.listen(3000);

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
