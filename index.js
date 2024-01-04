//global variables
const baseURL = "http://localhost:3000/books/";
const spellsURL = "http://localhost:3000/spells/"
let selectedBook;
let userRating;
let btnClick = 0;
let draggedAction;

//fetch
fetch(baseURL)
  .then((resp) => resp.json())
  .then((data) => {
    renderBooks(data);
    displayBook(data[0]);
  });

//DOM locations
const bookListLoc = document.querySelector("#book-list");

const coverLoc = document.querySelector("#detail-image");
const titleLoc = document.querySelector("#title");
const yearReleasedLoc = document.querySelector("#year-released");
const pageNumberLoc = document.querySelector("#page-numbers");
const summaryLoc = document.querySelector("#summary");
const ratingLoc = document.querySelector("#rating");
const userRatingLoc = document.querySelector("#user-rating");
const reviewsLoc = document.querySelector("#review-list");
const userReview = document.querySelector("form");

//selectors related to bolts
const boltOne = document.querySelector("#bolt-1");
const boltTwo = document.querySelector("#bolt-2");
const boltThree = document.querySelector("#bolt-3");
const boltFour = document.querySelector("#bolt-4");
const boltFive = document.querySelector("#bolt-5");

//selectors related to dropdown
const dropdown = document.querySelector(".dropbtn");
const dropdownContent = document.querySelector(".dropdown-content");
const header = document.querySelector("header");
const h1 = document.querySelector("h1");
const label = document.querySelector("label");
const submitBtn = document.querySelector("#submit");
const gryffindor = document.querySelector("#gryf");
const slytherin = document.querySelector("#slyth");
const hufflepuff = document.querySelector("#huff");
const ravenclaw = document.querySelector("#raven");

//selectors related to spells
const spellBook = document.querySelector("#spell-book")
const incantationsLoc = document.querySelector("#incantations");
const actionsLoc = document.querySelector("#actions");
const spellsDisplay = document.querySelector("#spells-display");


//Render functions
function renderBooks(bookData) {
  bookData.forEach((book) => {
    //adds book cover to book list
    const bookImg = document.createElement("img");
    bookImg.src = book.cover;
    bookListLoc.appendChild(bookImg);

    //adds click event on each element in book list to display clicked book
    bookImg.addEventListener("click", () => displayBook(book));

    //adds event listener to handle highlighting book covers when moused over

    bookImg.addEventListener("mouseover", () => highlightElement(bookImg));
    bookImg.addEventListener("mouseleave", () => removeHighlight(bookImg));
  });
}

function displayBook(book) {
  coverLoc.src = book.cover;
  titleLoc.innerText = book.title;
  yearReleasedLoc.innerText = book.released;
  pageNumberLoc.innerText = `${book.pages} pages`;
  summaryLoc.innerText = book.summary;
  ratingLoc.innerText = `Average Rating: ${book.rating} out of 5`;
  selectedBook = book;
  let id = selectedBook.id;

  fetch(`${baseURL}${id}`)
    .then((resp) => resp.json())
    .then((data) => renderReviews(data.reviews));

  userRating = selectedBook.user_rating;
  if (userRating === 0) {
    boltOne.src = "unfilled-lightening-bolt.png";
    boltTwo.src = "unfilled-lightening-bolt.png";
    boltThree.src = "unfilled-lightening-bolt.png";
    boltFour.src = "unfilled-lightening-bolt.png";
    boltFive.src = "unfilled-lightening-bolt.png";
  } else if (userRating === 1) {
    fillBolts(boltOne);
  } else if (userRating === 2) {
    fillBolts(boltTwo);
  } else if (userRating === 3) {
    fillBolts(boltThree);
  } else if (userRating === 4) {
    fillBolts(boltFour);
  } else if (userRating === 5) {
    fillBolts(boltFive);
  }
}

function renderReviews(reviewArr) {
  removeAllChildren(reviewsLoc);
  reviewArr.forEach((review) => {
    const reviewLi = document.createElement("li");
    const br = document.createElement("br");
    reviewLi.textContent = review.content;
    reviewsLoc.appendChild(reviewLi);
    reviewsLoc.appendChild(br);
  });
  const newUserReview = selectedBook.user_review;
  const newUserReviewLi = document.createElement("li");
  newUserReviewLi.textContent = newUserReview;
  reviewsLoc.appendChild(newUserReviewLi);
}
function removeAllChildren(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//functions to highlight elements while moused over
function highlightElement(elem) {
    elem.style.height = "250px";
    elem.style.margin = "0px";
    elem.style.border = "10px solid #F0EAD6";
}
  function removeHighlight(elem) {
    elem.style.height = "200px";
    elem.style.margin = "7px";
    elem.style.border = "0px";
}

//Lightening Bolt Handler:
boltOne.addEventListener("click", () => fillBolts(boltOne));
boltTwo.addEventListener("click", () => fillBolts(boltTwo));
boltThree.addEventListener("click", () => fillBolts(boltThree));
boltFour.addEventListener("click", () => fillBolts(boltFour));
boltFive.addEventListener("click", () => fillBolts(boltFive));

function fillBolts(bolt) {
  if (bolt.id === "bolt-1") {
    boltOne.src = "filled-lightening-bolt.png";
    boltTwo.src = "unfilled-lightening-bolt.png";
    boltThree.src = "unfilled-lightening-bolt.png";
    boltFour.src = "unfilled-lightening-bolt.png";
    boltFive.src = "unfilled-lightening-bolt.png";
    userRating = 1;
  } else if (bolt.id === "bolt-2") {
    boltOne.src = "filled-lightening-bolt.png";
    boltTwo.src = "filled-lightening-bolt.png";
    boltThree.src = "unfilled-lightening-bolt.png";
    boltFour.src = "unfilled-lightening-bolt.png";
    boltFive.src = "unfilled-lightening-bolt.png";
    userRating = 2;
  } else if (bolt.id === "bolt-3") {
    boltOne.src = "filled-lightening-bolt.png";
    boltTwo.src = "filled-lightening-bolt.png";
    boltThree.src = "filled-lightening-bolt.png";
    boltFour.src = "unfilled-lightening-bolt.png";
    boltFive.src = "unfilled-lightening-bolt.png";
    userRating = 3;
  } else if (bolt.id === "bolt-4") {
    boltOne.src = "filled-lightening-bolt.png";
    boltTwo.src = "filled-lightening-bolt.png";
    boltThree.src = "filled-lightening-bolt.png";
    boltFour.src = "filled-lightening-bolt.png";
    boltFive.src = "unfilled-lightening-bolt.png";
    userRating = 4;
  } else if (bolt.id === "bolt-5") {
    boltOne.src = "filled-lightening-bolt.png";
    boltTwo.src = "filled-lightening-bolt.png";
    boltThree.src = "filled-lightening-bolt.png";
    boltFour.src = "filled-lightening-bolt.png";
    boltFive.src = "filled-lightening-bolt.png";
    userRating = 5;
  }
  selectedBook.user_rating = userRating;
}

//Review Submission
userReview.addEventListener("submit", (event) => {
  event.preventDefault();
  const newReview = event.target["user-review"].value;
  const newReviewLi = document.createElement("li");
  newReviewLi.textContent = newReview;
  reviewsLoc.append(newReviewLi);
  selectedBook.user_review = newReview;
});

//Dropdown
dropdown.addEventListener("click", showHouses);
function showHouses() {
  if (btnClick % 2 == 0) {
    dropdownContent.style.display = "block";
    btnClick++;
  } else {
    dropdownContent.style.display = "none";
    btnClick++;
  }
}

gryffindor.addEventListener("click", () => changeColors(gryffindor));
slytherin.addEventListener("click", () => changeColors(slytherin));
hufflepuff.addEventListener("click", () => changeColors(hufflepuff));
ravenclaw.addEventListener("click", () => changeColors(ravenclaw));

function changeColors(house) {
  if (house.id === "gryf") {
    bookListLoc.style.backgroundColor = "#7F0909";
    document.body.style.backgroundColor = "#DAA520";
    header.style.backgroundColor = "#7F0909";
    h1.style.color = "#DAA520";
    userReview.style.backgroundColor = "#7F0909";
    label.style.backgroundColor = "#DAA520";
    label.style.color = "#311D00";
    submitBtn.style.backgroundColor = "#DAA520";
    submitBtn.style.color = "#311D00";
  }
  if (house.id === "slyth") {
    bookListLoc.style.backgroundColor = "#1A472A";
    document.body.style.backgroundColor = "#AAAAAA";
    header.style.backgroundColor = "#1A472A";
    h1.style.color = "#AAAAAA";
    userReview.style.backgroundColor = "#1A472A";
    label.style.backgroundColor = "#AAAAAA";
    label.style.color = "#000000";
    submitBtn.style.backgroundColor = "#AAAAAA";
    submitBtn.style.color = "#000000";
  }
  if (house.id === "huff") {
    bookListLoc.style.backgroundColor = "#000000";
    document.body.style.backgroundColor = "#FFD700";
    header.style.backgroundColor = "#000000";
    h1.style.color = "#FFD700";
    userReview.style.backgroundColor = "#000000";
    label.style.backgroundColor = "#FFD700";
    label.style.color = "#000000";
    submitBtn.style.backgroundColor = "#FFD700";
    submitBtn.style.color = "#000000";
  }
  if (house.id === "raven") {
    bookListLoc.style.backgroundColor = "#223164";
    document.body.style.backgroundColor = "#946B2D";
    header.style.backgroundColor = "#223164";
    h1.style.color = "#946B2D";
    userReview.style.backgroundColor = "#223164";
    label.style.backgroundColor = "#946B2D";
    label.style.color = "#000000";
    submitBtn.style.backgroundColor = "#946B2D";
    submitBtn.style.color = "#000000";
  }
}

//Spell Drag and Drop
fetch(spellsURL)
    .then(resp => resp.json())
    .then(data => renderSpellBook(data))

function renderSpellBook(spellBookObj){
    let spellArr = [];
    if (selectedBook.id === 1){
        spellBook.textContent = "Standard Book of Spells, Grade 1";

        spellArr = spellBookObj["Standard Book of Spells, Grade 1"];
        spellArr.forEach(element => renderIncantations(element))
        
        shuffleArr(spellArr)
        
        spellArr.forEach(element => renderActions(element))
    }
    
}

function renderIncantations(spell){
    const spellId = spell.id;
    const incantationDiv = document.createElement('div');
    incantationDiv.textContent = spell.incantation;
    incantationDiv.classList.add("incantation");
    incantationDiv.id = `incantation${spellId}`;
    incantationsLoc.appendChild(incantationDiv);

    incantationDiv.addEventListener("dragover", (e) => {
        e.preventDefault();},
    false,)

    incantationDiv.addEventListener('drop', dragHandler)
}

function renderActions(spell){
    const spellId = spell.id;
    const actionDiv = document.createElement('div');
    actionDiv.textContent = spell.action;
    actionDiv.setAttribute('draggable', true);
    actionDiv.classList.add("action");
    actionDiv.id = `action${spellId}`;
    actionsLoc.appendChild(actionDiv);
    
    
    actionDiv.addEventListener('drag', (e) => {
        draggedAction = e.target;
    })
}

function shuffleArr(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function dragHandler(e){
    e.preventDefault();
    const incantationId = e.target.id.charAt(e.target.id.length - 1);
    const actionId = draggedAction.id.charAt(draggedAction.id.length - 1);

    if (incantationId === actionId){
        e.target.textContent = `Correct! ${e.target.textContent} ${draggedAction.textContent}.`
        e.target.style.backgroundColor = "#DAA520"
        e.target.style.color = "#311D00"
        actionsLoc.removeChild(draggedAction)
    }

    if (actionsLoc.childElementCount === 0)
    {
        const congratulations = document.createElement("h3")
        congratulations.textContent = "Congratulations! You passed your end of year assessment! See you next term!"
        spellsDisplay.appendChild(congratulations)
    }
}