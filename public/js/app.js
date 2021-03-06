//client side
console.log('Client side javascript file is loaded')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const message1 = document.querySelector('#message1')
const message2 = document.querySelector('#message2')

//refresh not happening
weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const location = searchElement.value
    message1.textContent = 'Loading....'
    message2.textContent = ''

    fetch('/weather?address='+location).then((response) =>{
        response.json().then((data) => {

            if(data.error)
            {
                message1.textContent = data.error
                //console.log(data.error)
            }else{
                message1.textContent = data.location
                message2.textContent = data.forecast
                //console.log(data.location)
                //console.log(data.forecast)
            }
        })
    })

    console.log(location)
})


