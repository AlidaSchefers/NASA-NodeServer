const express = require('express')
const path = require('path')

const PORT = 3000

const app = express()
app.use('/static', express.static('public')) //the connection issue b/w the index.html and index.js files was the missing slash before the word static
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'))
    // res.sendFile('./public/index.html')
    // console.log("get request sent")
})


app.listen(PORT, function() {
    console.log(`Listening on port ${PORT}`)
})

// app.listen(PORT, () => {
//     console.log(`listening on port ${PORT}`) //at http://localhost:${PORT}
// })