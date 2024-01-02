//global variables
const baseURL = "http://localhost:3000/books/";
let selectedBook;
let userRating;

fetch(baseURL)
    .then(resp => resp.json())
    .then(data => {
        renderBooks(data);
        displayBook(data[0])
    })

//DOM locations 
const bookListLoc = document.querySelector('#book-list');

const coverLoc = document.querySelector('#detail-image');
const titleLoc = document.querySelector('#title');
const yearReleasedLoc = document.querySelector('#year-released');
const pageNumberLoc = document.querySelector('#page-numbers');
const summaryLoc = document.querySelector('#summary');
const ratingLoc = document.querySelector('#rating');
const userRatingLoc = document.querySelector('#user-rating');
const reviewsLoc = document.querySelector('#review-list');

const boltOne = document.querySelector('#bolt-1');
const boltTwo = document.querySelector('#bolt-2');
const boltThree = document.querySelector('#bolt-3');
const boltFour = document.querySelector('#bolt-4');
const boltFive = document.querySelector('#bolt-5');



function renderBooks(bookData){
    bookData.forEach(book => {
        //adds book cover to book list
        const bookImg = document.createElement('img');
        bookImg.src = book.cover;
        bookListLoc.appendChild(bookImg);

        //adds click event on each element in book list to display clicked book
        bookImg.addEventListener('click', () => displayBook(book));
    })
}

function displayBook(book){
            coverLoc.src = book.cover;
            titleLoc.innerText = book.title;
            yearReleasedLoc.innerText = book.released;
            pageNumberLoc.innerText = `${book.pages} pages`;
            summaryLoc.innerText = book.summary;
            ratingLoc.innerText = `Average Rating: ${book.rating} out of 5`;
            selectedBook = book;
            let id = selectedBook.id;
            
            fetch(`${baseURL}${id}`)
                .then(resp => resp.json())
                .then(data => renderReviews(data.reviews))

            userRating = selectedBook.user_rating;
            if (userRating === 0){
                boltOne.src = "unfilled-lightening-bolt.png"
                boltTwo.src = "unfilled-lightening-bolt.png"
                boltThree.src = "unfilled-lightening-bolt.png"
                boltFour.src = "unfilled-lightening-bolt.png"
                boltFive.src = "unfilled-lightening-bolt.png"
            }
            else if (userRating === 1){
                fillBolts(boltOne)
            }
            else if (userRating === 2){
                fillBolts(boltTwo)
            }
            else if (userRating === 3){
                fillBolts(boltThree)
            }
            else if (userRating === 4){
                fillBolts(boltFour)
            }
            else if (userRating === 5){
                fillBolts(boltFive)
            }
}
        
function renderReviews(reviewArr){
    removeAllChildren(reviewsLoc);
    reviewArr.forEach(review => {
            const reviewLi = document.createElement('li');
            const br = document.createElement('br');
            reviewLi.textContent = review.content;
            reviewsLoc.appendChild(reviewLi);
            reviewsLoc.appendChild(br)
            
    })
}
function removeAllChildren(parent){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    }

//Lightening Bolt Handler:
boltOne.addEventListener('click', () => fillBolts(boltOne));
boltTwo.addEventListener('click', () => fillBolts(boltTwo));
boltThree.addEventListener('click', () => fillBolts(boltThree));
boltFour.addEventListener('click', () => fillBolts(boltFour));
boltFive.addEventListener('click', () => fillBolts(boltFive));

function fillBolts(bolt){
    if (bolt.id === "bolt-1"){
        boltOne.src = "filled-lightening-bolt.png"
        boltTwo.src = "unfilled-lightening-bolt.png"
        boltThree.src = "unfilled-lightening-bolt.png"
        boltFour.src = "unfilled-lightening-bolt.png"
        boltFive.src = "unfilled-lightening-bolt.png"
        userRating = 1;
    }
    else if (bolt.id === "bolt-2"){
        boltOne.src = "filled-lightening-bolt.png"
        boltTwo.src = "filled-lightening-bolt.png"
        boltThree.src = "unfilled-lightening-bolt.png"
        boltFour.src = "unfilled-lightening-bolt.png"
        boltFive.src = "unfilled-lightening-bolt.png"
        userRating = 2;
    }
    else if (bolt.id === "bolt-3"){
        boltOne.src = "filled-lightening-bolt.png"
        boltTwo.src = "filled-lightening-bolt.png"
        boltThree.src = "filled-lightening-bolt.png"
        boltFour.src = "unfilled-lightening-bolt.png"
        boltFive.src = "unfilled-lightening-bolt.png"
        userRating = 3;
    }
    else if (bolt.id === "bolt-4"){
        boltOne.src = "filled-lightening-bolt.png"
        boltTwo.src = "filled-lightening-bolt.png"
        boltThree.src = "filled-lightening-bolt.png"
        boltFour.src = "filled-lightening-bolt.png"
        boltFive.src = "unfilled-lightening-bolt.png"
        userRating = 4;
    }
    else if (bolt.id === "bolt-5"){
        boltOne.src = "filled-lightening-bolt.png"
        boltTwo.src = "filled-lightening-bolt.png"
        boltThree.src = "filled-lightening-bolt.png"
        boltFour.src = "filled-lightening-bolt.png"
        boltFive.src = "filled-lightening-bolt.png"
        userRating = 5;
    }
    selectedBook.user_rating = userRating;
}

