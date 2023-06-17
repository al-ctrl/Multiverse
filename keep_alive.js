const http = require('http')
const port = 8080

const web = http.createServer(function(req, res){
  res.write("Hari memang akan patah, tapi meski patah akan terus hidup.")
  res.end()
})

web.listen(port, function(err) {
  if (err) {
    console.log(err)
  } else {
    console.log(`Web Ready`)
  }
})