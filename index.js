//global variables
const baseURL = "http://localhost:3000/books/";
let selectedBook;
let userRating;
let btnClick = 0;
let draggedAction;
let exam_passed;

//initial fetch and other fetch functions
fetch(baseURL)
  .then((resp) => resp.json())
  .then((data) => {
    renderBooks(data);
    displayBook(data[0]);
  });

  //fetches reviews and curriculum associate with each book
function fetchEmbeddedData(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      renderCurriculum(data.curriculum)
      renderReviews(data.reviews)
    });
}

//adds review to review json
function postReview(reviewObj) {
  fetch("http://localhost:3000/reviews", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(reviewObj),
  });
}

//patches user rating (and any other future changes) to db.json
function patchBook(bookObj) {
  fetch(`${baseURL}${bookObj.id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(selectedBook),
  });
}

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
const exam = document.querySelector("#exam");
const answersLoc = document.querySelector("#answers");
const actionsLoc = document.querySelector("#actions");
const currDisplay = document.querySelector("#curriculum-display");
const congratulations = document.querySelector("#congrats");

const passMessage = document.createElement("h3");

//Render functions
function renderBooks(bookData) {
  bookData.forEach((book) => {
    //adds book cover to book list
    const bookImg = document.createElement("img");
    bookImg.src = book.cover;
    bookListLoc.appendChild(bookImg);

    //adds click event on each element in book list to display clicked book info
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
  let id = book.id;

  userRating = book.user_rating;
  if (userRating === 0) {
    boltOne.src = "icons/unfilled-lightening-bolt.png";
    boltTwo.src = "icons/unfilled-lightening-bolt.png";
    boltThree.src = "icons/unfilled-lightening-bolt.png";
    boltFour.src = "icons/unfilled-lightening-bolt.png";
    boltFive.src = "icons/unfilled-lightening-bolt.png";
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

  fetchEmbeddedData(`${baseURL}${id}`); //fetches and renders reviews

  //re-appending congratulations as it may have been previously removed(clicking from one book to the next without taking exam)
  currDisplay.appendChild(congratulations);

  //fetchCurriculum(`${baseURL}${id}`); //fetches and renders curriculum
}

function renderReviews(reviewArr) {
  removeAllChildren(reviewsLoc); //removes previously rendered reviews
  reviewArr.forEach((review) => {
    const reviewLi = document.createElement("li");
    const br = document.createElement("br");
    reviewLi.textContent = review.content;
    reviewsLoc.appendChild(reviewLi);
    reviewsLoc.appendChild(br);
  });
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

//Lightening Bolt Event Listener and Handler
boltOne.addEventListener("click", () => fillBolts(boltOne));
boltTwo.addEventListener("click", () => fillBolts(boltTwo));
boltThree.addEventListener("click", () => fillBolts(boltThree));
boltFour.addEventListener("click", () => fillBolts(boltFour));
boltFive.addEventListener("click", () => fillBolts(boltFive));

function fillBolts(bolt) {
  if (bolt.id === "bolt-1") {
    boltOne.src = "icons/filled-lightening-bolt.png";
    boltTwo.src = "icons/unfilled-lightening-bolt.png";
    boltThree.src = "icons/unfilled-lightening-bolt.png";
    boltFour.src = "icons/unfilled-lightening-bolt.png";
    boltFive.src = "icons/unfilled-lightening-bolt.png";
    userRating = 1;
  } else if (bolt.id === "bolt-2") {
    boltOne.src = "icons/filled-lightening-bolt.png";
    boltTwo.src = "icons/filled-lightening-bolt.png";
    boltThree.src = "icons/unfilled-lightening-bolt.png";
    boltFour.src = "icons/unfilled-lightening-bolt.png";
    boltFive.src = "icons/unfilled-lightening-bolt.png";
    userRating = 2;
  } else if (bolt.id === "bolt-3") {
    boltOne.src = "icons/filled-lightening-bolt.png";
    boltTwo.src = "icons/filled-lightening-bolt.png";
    boltThree.src = "icons/filled-lightening-bolt.png";
    boltFour.src = "icons/unfilled-lightening-bolt.png";
    boltFive.src = "icons/unfilled-lightening-bolt.png";
    userRating = 3;
  } else if (bolt.id === "bolt-4") {
    boltOne.src = "icons/filled-lightening-bolt.png";
    boltTwo.src = "icons/filled-lightening-bolt.png";
    boltThree.src = "icons/filled-lightening-bolt.png";
    boltFour.src = "icons/filled-lightening-bolt.png";
    boltFive.src = "icons/unfilled-lightening-bolt.png";
    userRating = 4;
  } else if (bolt.id === "bolt-5") {
    boltOne.src = "icons/filled-lightening-bolt.png";
    boltTwo.src = "icons/filled-lightening-bolt.png";
    boltThree.src = "icons/filled-lightening-bolt.png";
    boltFour.src = "icons/filled-lightening-bolt.png";
    boltFive.src = "icons/filled-lightening-bolt.png";
    userRating = 5;
  }
  selectedBook.user_rating = userRating;
  patchBook(selectedBook);
}

//Review Submission
userReview.addEventListener("submit", (event) => {
  event.preventDefault();
  const newReview = event.target["user-review"].value;
  const newReviewLi = document.createElement("li");
  newReviewLi.textContent = newReview;
  reviewsLoc.append(newReviewLi);
  //adds break after review
  reviewsLoc.append(document.createElement("br"));

  //communicates with server to allow new review to persist
  const newReviewObj = {
    bookId: selectedBook.id,
    content: newReview,
  };
  postReview(newReviewObj);

  userReview.reset();
});

//Dropdown Event Listener and Handler to change style based on Hogwarts house
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

gryffindor.addEventListener("click", () => changeColors("#7F0909", "#DAA520"));
slytherin.addEventListener("click", () => changeColors("#1A472A", "#AAAAAA"));
hufflepuff.addEventListener("click", () => changeColors("#000000", "#FFD700"));
ravenclaw.addEventListener("click", () => changeColors("#223164", "#946B2D"));

function changeColors(color1, color2) {
  bookListLoc.style.backgroundColor = color1;
  document.body.style.backgroundColor = color2;
  header.style.backgroundColor = color1;
  h1.style.color = color2;
  userReview.style.backgroundColor = color1;
  label.style.backgroundColor = color2;
  label.style.color = "#000000";
  submitBtn.style.backgroundColor = color2;
  submitBtn.style.color = "#000000";
}

//Spell Drag and Drop
function renderCurriculum(curriculumArr) {
  //the next three lines remove previously rendered curricula and passing messing
  removeAllChildren(answersLoc);
  removeAllChildren(actionsLoc);
  currDisplay.removeChild(congratulations);
  
  currDisplay.appendChild(passMessage);
  
  const examTitle = "Welcome to Hogwarts End of Term Exams, Year";
  exam.textContent = `${examTitle} ${selectedBook.id}`;

  if (selectedBook.exam_passed === true){
    if(selectedBook.id === 7){
      passMessage.textContent = "Congratulations! You are an official graduate of Hogwarts School of Witchcraft and Wizardry! Good luck in your future endeavors!";
    }
    else{
      passMessage.textContent = "You have already passed this term's exam! Time to move on to harder subjects!";
    }
    curriculumArr.forEach((element) => renderAnswers(element));
  }
  else {
    currDisplay.removeChild(passMessage);
    
    curriculumArr.forEach((element) => renderAnswers(element));

    shuffleArr(curriculumArr); //shuffles array indexes, so that the actions do not render in the same order as the answers

    curriculumArr.forEach((element) => renderActions(element));
  }
}

function renderAnswers(subject) {
  const subjId = subject.id;
  const answerDiv = document.createElement("div");
  if (selectedBook.exam_passed === true){
    answerDiv.textContent = `Correct! ${subject.answer} ${subject.action}. This subject was covered in ${subject.course}.`;
    answerDiv.style.backgroundColor = "#DAA520";
    answerDiv.style.color = "#311D00";
    answerDiv.className = "answers";
    answersLoc.appendChild(answerDiv);
  }
  else{
    answerDiv.textContent = subject.answer;
    answerDiv.className = "answers";
    answerDiv.id = `answer${subjId}`;
    answerDiv.title = subject.course;
    answersLoc.appendChild(answerDiv);
  }

  answerDiv.addEventListener(
    "dragover",
    (e) => {
      //prevents default, which allows "drop" event to occur
      e.preventDefault();
    }
  );

  answerDiv.addEventListener("drop", dragHandler);
}

function renderActions(spell) {
  const spellId = spell.id;
  const actionDiv = document.createElement("div");
  actionDiv.textContent = spell.action;
  actionDiv.setAttribute("draggable", true);
  actionDiv.className = "action";
  actionDiv.id = `action${spellId}`;
  actionsLoc.appendChild(actionDiv);

  actionDiv.addEventListener("dragstart", (e) => {
    //creates a reference to the dragged item by assigning the event target to a global variable
    draggedAction = e.target;
  });
}

function shuffleArr(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

//this is the function called by the drop event
function dragHandler(e) {
  e.preventDefault();
  const answerId = e.target.id.charAt(e.target.id.length - 1);
  const actionId = draggedAction.id.charAt(draggedAction.id.length - 1);

  //compares the id of the event target element to the id of the dragged element
  if (answerId === actionId) {
    e.target.textContent = `Correct! ${e.target.textContent} ${draggedAction.textContent}. This subject was covered in ${e.target.title}.`;
    e.target.style.backgroundColor = "#DAA520";
    e.target.style.color = "#311D00";
    actionsLoc.removeChild(draggedAction);
  }

  if (actionsLoc.childElementCount === 0) {
    if (selectedBook.id === 7) {
      congratulations.textContent =
        "Congratulations! You are an official graduate of Hogwarts School of Witchcraft and Wizardry! Good luck in your future endeavors!";
      currDisplay.appendChild(congratulations);
      selectedBook.exam_passed = true;
      
    }
    else {
      congratulations.textContent =
        "Congratulations! You passed your end of year assessment! See you next term!";
      currDisplay.appendChild(congratulations);
      selectedBook.exam_passed = true;
    }
  }
  else {selectedBook.exam_passed = false;}
}
