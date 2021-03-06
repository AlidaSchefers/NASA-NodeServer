//PROBLEM: the video thumbnail do not appear properly, but images do display properly.

//initialize
const mainContainer = document.createElement('div');
const nasaLogo = document.createElement('img')
const title = document.createElement('div')
title.innerText = "Welcome to NASA's APOD"
const btn = document.createElement('BUTTON');
const image = document.createElement('img')
const info = document.createElement('div')
const dateInput = document.createElement('INPUT');

const originalAPODLink = document.createElement('a')


    //props
nasaLogo.src = "publicpath/NASA-logo.png"
nasaLogo.width = 100
let officialSource = "Click here to go to NASA's official APOD website."
originalAPODLink.href = 'https://apod.nasa.gov/';
originalAPODLink.innerText = officialSource;

btn.innerHTML = "CLICK ME"
dateInput.type = 'date'
const todayInitialForm = new Date();
const today = todayInitialForm.toISOString().slice(0,10) //the slace gets rid of the hours and minutes
dateInput.defaultValue = today
dateInput.max = today
dateInput.min = '2015-01-01' //the first APOD

    //append
document.body.appendChild(mainContainer);
mainContainer.appendChild(nasaLogo)
mainContainer.appendChild(title);
mainContainer.appendChild(dateInput);
mainContainer.appendChild(document.createElement("br"))
mainContainer.appendChild(btn);
mainContainer.appendChild(document.createElement("br"))
mainContainer.appendChild(document.createElement("br"))
mainContainer.appendChild(image);
mainContainer.appendChild(document.createElement("br"))
mainContainer.appendChild(info);
mainContainer.appendChild(originalAPODLink);

//adding style
    //title
title.style.color = "white"
title.style.fontSize = "xx-large"
title.style.textAlign = "center" //does not work with 'alignContent' or 'alignItems'
    //button
btn.style.textAlign = "center"
    //image
image.style.textAlign = "center"
    //info
info.style.color = "white"
    //link
originalAPODLink.style.color = "blue"
    //overall
document.body.style.backgroundColor = "black"
mainContainer.style.textAlign = "center"

btn.onclick = function() {
    const xhr = new XMLHttpRequest()
        xhr.open("POST", `http://localhost:3000/bydate/${dateInput.value}`) //updates
        xhr.onload = () => { //define what to do once request sent back to user/received

            const rawResponse = xhr.responseText //returns as a DOMString... this has a JSON format (looks like a JSON) but it's just a string, not a JSON
            // console.log(`the responseText DOMString: ${rawResponse}`)
            // console.log(rawResponse)
            const parseResponse = JSON.parse(rawResponse)
            image.src = parseResponse.url
            info.innerText = parseResponse.explanation 
        }
        xhr.send();
}