let shelf = document.querySelector('.shelf__wrapper');


let myLibrary = [

];

function Book(title, author, pages, read, cover) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
    this.cover = cover
}



const addBookToLibrary = () => {

}

const renderBooks = () => {
    shelf.innerHTML = '';
    myLibrary.forEach((book, idx) => {
        book.index = idx;
        console.log(book);
        let thing = document.createElement('div');
        thing.classList.add('shelf__book');
        thing.setAttribute('idx', idx);
        thing.innerHTML = `
        <i class="shelf__delete fa-solid fa-square-xmark"></i>
        <img class="shelf__thumb" src="${book.cover}">
        <div class="shelf__text">
            <h3 class="shelf__title">${book.title}</h3>
            <p class="shelf__author">${book.author}</p>
            <p class="shelf__pages">${book.pages} Pages</p>
            <button class="shelf__button shelf__button--read">Read</button>
        </div>`
        shelf.appendChild(thing);
    });
}

renderBooks();

let deleteBtn = document.querySelectorAll('.shelf__delete');

deleteBtn.forEach(btn => {
    btn.addEventListener('click', (e) => {
        let toDelete = e.target.parentElement.getAttribute('idx');
        myLibrary.splice(toDelete, 1);
        renderBooks();

    })
})
