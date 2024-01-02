//global variables
let selectedBook;
let userRating;

fetch('http://localhost:3000/books/')
    .then(resp => resp.json())
    .then(data => {
        renderBooks(data);
        displayBook(data[0])
    })

fetch('http://localhost:3000/reviews/')
    .then(resp => resp.json())
    .then(data => console.log(data))

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

        //adds event listener to handle highlighting book covers when moused over

        bookImg.addEventListener('mouseover', () => highlightElement(bookImg));
        bookImg.addEventListener('mouseleave', () => removeHighlight(bookImg));
        

   })
}

//functions to highlight elements while moused over
function highlightElement(elem){
    elem.style.height = '250px';
    elem.style.margin = '0px';
    elem.style.border = '10px solid #F0EAD6';
}
function removeHighlight(elem){
    elem.style.height = '200px';
    elem.style.margin = '7px';
    elem.style.border = '0px';
}


function displayBook(book){
            coverLoc.src = book.cover;
            titleLoc.innerText = book.title;
            yearReleasedLoc.innerText = book.released;
            pageNumberLoc.innerText = `${book.pages} pages`;
            summaryLoc.innerText = book.summary;
            ratingLoc.innerText = `Average Rating: ${book.rating} out of 5`;
            selectedBook = book;
            //console.log(selectedBook);

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
    reviewArr.forEach(review => {
        let id = selectedBook.id;
        if (review.bookId === id){
            const reviewLi = document.createElement('li');
            reviewLi.textContent = review.content;
            document.appendChild(reviewLi)
        }
    })
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



