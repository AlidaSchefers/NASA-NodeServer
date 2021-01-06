const {Router} = require('express')
const router = new Router()
//const router = new require('express').Router()

//@path: GET
router.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/public/aboutpage.html') //sending it as xml and then go to front end convert to HTML
    // res.sendFile('./public/index.html')
})

console.log(`dirname: ${__dirname}`) //__dirname is a Node JS exclusive. it is relative to the file.
console.log(`cwd: ${process.cwd()}`) //also Node JS only and relative to the current process.

module.exports = router