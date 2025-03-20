const myKey = "sImbPnp7NHZEWJ4GL1oVBF9bgBxxgePT0xuDXKCz3W6wHPTnfKqsgpgh"

const mountainImg = "https://api.pexels.com/v1/search?query=mountains"
const kittensImg = "https://api.pexels.com/v1/search?query=kittens"

const loadButton = document.getElementById("load-button")
const secondaryLoadButton = document.getElementById("secondary-load-button")
// con questo URL ora facciamo un'operazione di Get per recuperare gli eventi attualmente salvati

// class Card {
//   constructor(_img, _photographer, _description) {
//     this.img = _img
//     this.photographer = this.photographer
//     this.description = _description
//   }
// }

const getImage = function (urlImg) {
  fetch(urlImg, {
    headers: {
      Authorization: myKey,
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
        //operazione asincrona che ritorna una promise come fetch che quindi ritorna anche lei un then e un catch
      } else {
        // vuol dire che la response è arrivata ma che ha un problema
        // se finiamo nell'else, lanciamoci nel blocco catch()
        throw new Error("la risposta non era valida")
      }
    })
    .then((data) => {
      const singlePhoto = data.photos
      console.log("DATI  RICEVUTI DAL SERVER", singlePhoto)
      // singlePhoto.forEach((photo) => {
      //   console.log(photo.src.landscape)
      // })-->PROVA PER VEDERE SE ESISTONO

      // prendo un riferimento alla row definita in HTML
      const imgRow = document.getElementById("img-row")
      imgRow.innerHTML = "" // Svuota il contenuto precedente

      singlePhoto.forEach((photo) => {
        const idCard = photo.id
        const card = document.createElement("div")
        card.classList.add("col-md-4", "first-card-div")

        card.innerHTML = `
                <div class="card shadow-sm mb-4">
                  <img
                    src="${photo.src.landscape}"
                    class="card-img-top bd-placeholder-img"
                  />
                  <div class="card-body">
                    <h5 class="card-title">${photo.photographer}</h5>
                    <p class="card-text">
                      ${photo.alt}
                    </p>
                    <div
                      class="d-flex align-items-center justify-content-between"
                    >
                      <div class="btn-group">
                        <button
                          type="button"
                          class="btn btn-outline-secondary btn-sm"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          class="btn btn-outline-secondary btn-sm hide-btn"
                        >
                          Hide
                        </button>
                      </div>
                      <small class="text-muted">${idCard}</small>
                    </div>
                  </div>
                </div>
              `

        imgRow.appendChild(card)
      })
      const hideButtons = document.querySelectorAll(".hide-btn")
      hideButtons.forEach((button) => {
        button.addEventListener("click", function () {
          const cardToHide = this.closest(".col-md-4") // Trova la card più vicina
          if (cardToHide) {
            cardToHide.classList.add("d-none") // Nasconde la card
          }
        })
      })
    })

    .catch((error) => {
      console.log("si è verificato un errore", error)
    })
}

const firstCardDiv = document.querySelectorAll(".first-card-div")
loadButton.addEventListener("click", function () {
  console.log(firstCardDiv)
  if (firstCardDiv.length > 0) {
    const imgRow = document.getElementById("img-row")
    imgRow.innerHTML = ""
    getImage(mountainImg)
  } else {
    getImage(mountainImg)
  }
})

secondaryLoadButton.addEventListener("click", function () {
  console.log(firstCardDiv)
  if (firstCardDiv.length > 0) {
    const imgRow = document.getElementById("img-row")
    imgRow.innerHTML = ""
    getImage(kittensImg)
  } else {
    getImage(kittensImg)
  }
})

const urlPar = new URLSearchParams(location.search)

const imgId = urlPar.get("id")
console.log(imgId)

const getImgDetails = function (urlImg) {
  fetch(urlImg + "/" + imgId)
    .then((response) => {
      console.log("response", response)
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nel recupero dei dettagli")
      }
    })
    .then((data) => {
      console.log("DETTAGLI EVENTO", data)
    })
    .catch((err) => {
      console.log("ERRORE NEL RECUPERO DATI CONCERTO", err)
    })
}
