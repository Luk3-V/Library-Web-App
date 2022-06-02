const table = document.querySelector('.table');
const popup = document.querySelector(".popup");
const openbtn = document.querySelector('.add');
const closebtn = document.querySelector('.cancel');
const form = document.querySelector(".bookForm");

let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status
}

// ---------- FUNCTIONS ------------

const resetTable = () => {
    table.innerHTML = '';
}
const loadTable = () => {
    for(let i in myLibrary){
        const row = document.createElement('div');
        row.classList.add('row');

        const title = document.createElement('span');
        title.classList.add('col');
        title.textContent = myLibrary[i].title;
        const author = document.createElement('span');
        author.classList.add('col');
        author.textContent = myLibrary[i].author;
        const pages = document.createElement('span');
        pages.classList.add('col');
        pages.textContent = myLibrary[i].pages;
        const status = document.createElement('span');
        status.classList.add('col');
        status.textContent = myLibrary[i].status;

        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(status);
        table.appendChild(row);
    }    
}
const updateTable = () => {
    resetTable();
    loadTable();
}

const openForm = () => {
    form.reset();
    popup.style.display = "flex";
}
const closeForm = () => {
    popup.style.display = "none";
}

const addBook = (e) => {
    e.preventDefault()
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const status = document.querySelector("#status").value;
    const book = new Book(title, author, pages, status);

    myLibrary.push(book);
    updateTable();
    closeForm();
}

// ------------- EVENTS --------------

openbtn.onclick = openForm;
closebtn.onclick = closeForm;
form.onsubmit = addBook;

// ------------- LOAD ---------------

let book = new Book('The Hobbit', 'Tolkien', 300, 'Read');
myLibrary.push(book);
loadTable();