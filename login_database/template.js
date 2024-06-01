module.exports = {
  HTML: function (title, head, body, authStatusUI) {  
    return `
    <!doctype html>
    <html>
    <head>    
      <title>Login TEST - ${title}</title>
      <meta charset="utf-8">
      ${head}
    </head>
    <body>
      <div class="background">
        ${authStatusUI}
        ${body}
      </div>
    </body>
    </html>
    `;
  }
}