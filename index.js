const allCont = document.querySelector(".all-cont");
const htmlForm = document.querySelector("form");
const subBtn = document.querySelector(".submit-btn");
const authorInput = document.querySelector("#author");
const titleInput = document.querySelector("#title");
const pagesInput = document.querySelector("#pages");
const noBtnCont = document.querySelector(".no-btn-cont");
const yesBtnCont = document.querySelector(".yes-btn-cont")
const newBookBtn = document.createElement("button");
newBookBtn.setAttribute("class", "new-book-btn");
newBookBtn.textContent = "NEW BOOK";
const allCardCont = document.querySelector(".all-card-cont");
let myLibrary = [];
function pushToLib(input) {
    myLibrary.push(input);
};
// Write a function that loops through the array and displays each book on the page.

// make cards for each book and display them on screen


function displayOnScreen() {
  // this is the main function and the important variables are stored in it.
  var myBook;
  var bookValues;
  var bookAuthor;
  var bookTitle;
  var bookPages;
  var bookRead;
  var removeBtn;
  
  // empty the container before every iteration because
  // iteration becomes zero on every run 
  
  allCardCont.innerHTML = "";
  for (let i = 0; i < myLibrary.length ; i++) {
    myBook = myLibrary[i];
    bookValues = Object.values(myBook);
    const cardCont = document.createElement("div");
    cardCont.setAttribute("class", `card-cont`);
    allCardCont.appendChild(cardCont);
    bookAuthor = document.createElement('p');
    bookAuthor.textContent =`Author: ${bookValues[0]}` ;
    cardCont.appendChild(bookAuthor);
    bookTitle = document.createElement('p');
    bookTitle.textContent = `Title: ${bookValues[1]}` ;
    cardCont.appendChild(bookTitle);
    bookPages = document.createElement('p');
    
    bookPages.textContent = `Number Of Pages: ${bookValues[2]}` ;
    cardCont.appendChild(bookPages);
    bookRead = document.createElement('button');
    bookRead.setAttribute("class", "book-read-btn")
    bookRead.addEventListener("click", toggleRead)
    bookRead.textContent = `Already Read? ${determineRead()}`;
    cardCont.appendChild(bookRead);
    removeBtn = document.createElement("button");
    removeBtn.setAttribute("class", "remove-btn");
    removeBtn.textContent = "Remove Book";
    cardCont.appendChild(removeBtn);
    removeBtn.addEventListener("click", ()=> remove(i));
    
    // problem: how to give the remove function an index? solved.
    
  };
  // create function inside of display function to access the local variables (closure)
  function toggleRead() {
    if (bookRead.textContent == 'Already Read? YES') {
      return bookRead.textContent = 'Already Read? NO';
    } else if (bookRead.textContent == 'Already Read? NO') {
      return bookRead.textContent = 'Already Read? YES'; 
    }
  };
  // show the new book btn to the user
  // remove the container so the form can show up
  allCont.removeChild(htmlForm);
  allCont.appendChild(newBookBtn);
  newBookBtn.addEventListener("click", createForm);

  
};
function remove(index) {
  myLibrary.splice(index,1);
  displayOnScreen()
  
}
// use an object constructor
function Book(author, title, pages, read) {
  // the constructor...
  this.author=author;
  this.title=title;
  this.pages=pages;
  this.read=read;
}

function addBookToLibrary() {
  // do stuff here
  const newBook = new Book(authorInput.value, titleInput.value, pagesInput.value, determineRead() );
  myLibrary.push(newBook);
  displayOnScreen();
  
  
}


function determineRead() {
  readInputYes = document.querySelector("#read-yes");
  readInputNo = document.querySelector("#read-no");
  if (readInputYes.checked) {
    return "YES";
  }else if (readInputNo.checked) {
    return "NO";
  }
  
};

function displayNewBookBtn() {
  
  allCont.removeChild(htmlForm);
  
  allCont.appendChild(newBookBtn);
  
  newBookBtn.addEventListener("click", createForm )
  newBookBtn.addEventListener("click", ()=> allCont.removeChild(newBookBtn));
  
}
displayNewBookBtn()

// delete newbook btn when clicked.

// when the user clicks on the btn, a form should show up
function createForm() {
  allCont.appendChild(htmlForm);
  subBtn.addEventListener("click", preventAction)
  subBtn.addEventListener("click",addBookToLibrary)
}
// the submit btn should not submit to the server
function preventAction(event) {
  event.preventDefault();
}