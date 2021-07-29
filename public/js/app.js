const weatherform = document.querySelector('form')
const search = document.querySelector('input')
const message = document.querySelector('#message')

weatherform.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    message.textContent = 'Loading....'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.err) {
                message.textContent = data.err
            } else {
                message.textContent = data.location.placeName
            }
        })
    })
})