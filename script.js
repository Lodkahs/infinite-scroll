// https://api.unsplash.com/photos/?client_id=YOUR_ACCESS_KEY
const imageContainer = document.getElementById("image-container")
const loader = document.getElementById("loader")

let photosArray = []

//image loader
let ready = false
let imagesLoaded = 0
let totalImages = 0

const count = 30
const apiKey = 'qLOIXHX9eE9S7m-xwSnRNn0sWM42YaoAB8-xq829U1Y'
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`

//check if all images were loaded
function imageLoaded() {
    imagesLoaded++

    if (imagesLoaded === totalImages) {
        loader.hidden = true
        ready = true
    }
}

//helper to set atributes function
function setAttributes(el, att) {
    for (const key in att) {
        el.setAttribute(key, att[key])
    }
}

// display photos
function displayPhotos() {
    imagesLoaded = 0
    totalImages = photosArray.length
    photosArray.forEach(el => {
        //create item <a>
        const item = document.createElement('a')
        setAttributes(item, {
            href: el.links.html,
            target: '_blank'
        })

        // create img for photo
        const img = document.createElement('img')

        setAttributes(img, {
            src: el.urls.regular,
            alt: el.alt_description,
            title: el.alt_description
        })

        img.addEventListener('load', imageLoaded)

        // put img inside a element and both inside div
        item.appendChild(img)
        imageContainer.appendChild(item)
    })
}

// get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl)
        photosArray = await response.json()
        displayPhotos()
    } catch(error) {
        // error
    }
}

// check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', () => {
    
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        getPhotos()
    }
})

//on load
getPhotos()