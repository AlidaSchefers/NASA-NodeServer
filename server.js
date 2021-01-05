const express = require('express')
require('dotenv').config()
const cors = require('cors')
const { default: axios } = require('axios')

const PORT = 3000
const myKey = process.env.NASA_API_KEY

const server = express()

//express.json //would allow you to accept info as JSON. use as a middleware.
//need to parse incoming data to read it. set a standard yourself and expect client side to use that format. 
//if get something with more than plain text, usually use package to parse incoming info. 

const nasaEndPoint = 'https://api.nasa.gov/planetary/apod'

//remember to put middlewares first. 
server.use('/publicpath', express.static('public')) //the connection issue b/w the index.html and index.js files was the missing slash before the word static
server.use(cors())



server.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html') //sending it as xml and then go to front end convert to HTML
    // res.sendFile('./public/index.html')
})

//Route handler 1: request parameters. e.g. localhost:3007/route2/bydate/2020-12-30
server.post("/bydate/:date", async (req, res) => { //here the /route2 in the path is default b/c we are in the route2 router //a colon makes it not a hard date. it's express syntax
    try { 
        console.log("--request:")
        console.log(req.body)
        console.log(req.params) //stores the request parameters
        const {date} = req.params
        if (date === undefined)
          res.status(400).json({error: "Date info not complete"})
        let endpoint = `${nasaEndPoint}?api_key=${myKey}&date=${date}` //could check first if date is valid or in the right format
        //also can prevent DOS tax too. would be good to have implemnet
        const {data} = await axios.get(endpoint)
        res.json(data) 
        // res.send()
    } catch (error) {
        // console.log(error); 
        res.status(500).json({message: error.message || "An Unknown Error Occured"}) 
    }
}) 

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`) //at http://localhost:${PORT}
})