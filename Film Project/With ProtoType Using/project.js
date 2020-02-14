const form = document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardbody = document.querySelectorAll(".card-body")[1];
const clear = document.getElementById("clear-films");


// UI object declaration
const ui = new UI();

// Storage object
const storage = new Storage();

// All events calling

eventListeners();

function eventListeners() {

    form.addEventListener("submit", addFilm);
    document.addEventListener("DOMContentLoaded", function () {
        let films = storage.getFilmsFromStorage();
        ui.loadAllFilms(films);
    });

    cardbody.addEventListener("click", deleteFilm);
    clear.addEventListener("click", clearAllFilms);


}
function addFilm(e) {
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === "") {
        // error messages
        ui.displayMessages("Please fill all inputs...", "danger");
    }
    else {
        const newFilm = new Film(title, director, url);

        ui.addFilmToUI(newFilm);
        storage.addFilmToStorage(newFilm);

        ui.displayMessages("Film is added successfully", "success");
    }

    ui.clearInputs(titleElement, directorElement, urlElement);

    e.preventDefault();
}

function deleteFilm(e) {

    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);

        ui.displayMessages("Successfully deleted!", "success");
    }

}
function clearAllFilms() {
    if (confirm("Are you sure for deleting?")) {
        ui.clearAllFilmsFromUI();
        storage.clearAllFilmsFromStorage();
    }

}

