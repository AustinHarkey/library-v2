// DOM elements
let shelf = document.querySelector('.shelf__wrapper');
let modal = document.querySelector('.modal__form');
let modalBtn = document.querySelector('.shelf__add');
let overlay = document.querySelector('.overlay');
let submitBook = document.querySelector('.modal__submit');

// data
let myLibrary = [
    {
        title: 'Catcher in the Rye',
        author: 'J.D. Salinger',
        pages: 234,
        read: true,
        cover: 'img/catcher-in-the-rye.jpg'
    },
    {
        title: 'Night Film',
        author: 'Marisha Pessl',
        pages: 640,
        read: true,
        cover: 'img/night-film.jpg'
    },
    {
        title: 'Red Sparrow',
        author: 'Jason Matthews',
        pages: 434,
        read: true,
        cover: 'img/red-sparrow.jpg'
    }
];



// book constructor
function Book(title, author, pages, read, cover, index) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.cover = cover
}

const renderBooks = () => {
    shelf.innerHTML = '';
    myLibrary.forEach((book, idx) => {

        // create element + assign class and index
        let thing = document.createElement('div');
        let status;
        thing.classList.add('shelf__book');
        thing.setAttribute('idx', idx);

        // toggle read status
        if(book.read === true) {
            status = 'shelf__button--read';
        }

        // push book values into object literal HTML
        thing.innerHTML = `
        <i class="shelf__delete fa-solid fa-square-xmark"></i>
        <img class="shelf__thumb" src="${book.cover}">
        <div class="shelf__text">
            <h3 class="shelf__title">${book.title}</h3>
            <p class="shelf__author">${book.author}</p>
            <p class="shelf__pages">${book.pages} Pages</p>
            <button class="shelf__button ${status}">Read</button>
        </div>`
        shelf.appendChild(thing);
    });

    // add delete event listeners after html render
    deleteBook();
    toggleRead();
}




// Modal Open
modalBtn.addEventListener('click', (e) => {
    modal.classList.add('modal__form--open');
    overlay.classList.add('overlay--open');
})

// modal background overlay
overlay.addEventListener('click', () => {
    if(overlay.classList.contains('overlay--open')) {
        modal.classList.remove('modal__form--open');
        overlay.classList.remove('overlay--open');
    }
})

// submit form + add to library
submitBook.addEventListener('click', (e) => {
    e.preventDefault();

    // collect form values
    let title = document.querySelector('#book__title').value;
    let author = document.querySelector('#book__author').value;
    let pages = document.querySelector('#book__pages').value;
    let read = document.querySelector('#book__read').checked;
    let index = myLibrary.length;

    // push values to constructor + add to library
    let newBook = new Book(title, author, pages, read, 'img/book.jpg');
    myLibrary.unshift(newBook);

    // re-render wit updated data
    renderBooks();

    // closs modal on submit
    modal.classList.remove('modal__form--open');
    overlay.classList.remove('overlay--open');
})

const deleteBook = () => {
    let deleteBtns = document.querySelectorAll('.shelf__delete');
    deleteBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let idx = e.target.parentElement.getAttribute('idx');
            myLibrary.splice(idx, 1);
            renderBooks();
        })
    })
}

const toggleRead = () => {
    let readBtns = document.querySelectorAll('.shelf__button');
    readBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            let index = e.target.parentElement.parentElement.getAttribute('idx');
            console.log(index)
            if(e.target.classList.contains('shelf__button--read')) {
                myLibrary[index].read = false;
            } else {
                myLibrary[index].read = true;
            }
            renderBooks();
        })
    })
}

renderBooks();
