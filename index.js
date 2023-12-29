fetch('http://localhost:3000/books/')
    .then(resp => resp.json())
    .then(data => console.log(data))

fetch('http://localhost:3000/reviews/')
    .then(resp => resp.json())
    .then(data => renderBooks(data))

//DOM locations 
const bookListLoc = document.querySelector('#book-list');

const coverLoc = document.querySelector('#detail-image');
const titleLoc = document.querySelector('#title');
const yearReleasedLoc = document.querySelector('#year-released');
const pageNumberLoc = document.querySelector('#page-numbers');
const summaryLoc = document.querySelector('#summary');
const ratingLoc = document.querySelector('#rating');
const userRatingLoc = document.querySelector('#user-rating');
const reviewsLoc = document.querySelector('#review-display');

function renderBooks(bookDataObj){
    //add user rating to each object in array 'books'
    const booksArr = bookDataObj.books;

    

    booksArr.forEach(book => {

        //adds book cover to book list
        const bookImg = document.createElement('img');
        bookImg.src = book.cover;
        bookListLoc.appendChild(bookImg);

        //adds click event on each element in book list to display clicked book
        bookImg.addEventListener('click', displayBook);

        function displayBook(){
            coverLoc.src = book.cover;
            titleLoc.innerText = book.title;
            yearReleasedLoc.innerText = book.released;
            pageNumberLoc.innerText = book.pages;
            summaryLoc.innerText = book.summary;
            ratingLoc.innerText = book.rating;
        }
        
    });

}
