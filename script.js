const table = document.querySelector('tbody');
const popup = document.querySelector(".popup");
const openBtn = document.querySelector('.add');
const closeBtn = document.querySelector('.cancel');
const form = document.querySelector(".bookForm");

let myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.status = status
}

// ---------- FUNCTIONS ------------

const getBookIndex = (title) => {
    for(let i in myLibrary){
        if(myLibrary[i].title === title)
            return i;
    }
    return;
}
const deleteBook = (e) => {
    const title = e.target.parentNode.parentNode.childNodes[0];
    if (confirm(`Are you sure you want to delete ${title.innerText}?`)) {
        const i = getBookIndex(title.innerText);
        myLibrary.splice(i, i+1);
        updateTable();
    }
}

const updateStatus = (e) => {
    const title = e.target.parentNode.parentNode.childNodes[0];
    const i = getBookIndex(title.innerText);
    if(myLibrary[i].status === 'Not Read')
        myLibrary[i].status = 'In Progress';
    else if(myLibrary[i].status === 'In Progress')
        myLibrary[i].status = 'Read';
    else   
        myLibrary[i].status = 'Not Read';
    updateTable();
}

const resetTable = () => {
    table.innerHTML = '';
}
const loadTable = () => {
    for(let i in myLibrary){
        const row = document.createElement('tr');

        const title = document.createElement('td');
        title.textContent = myLibrary[i].title;
        const author = document.createElement('td');
        author.textContent = myLibrary[i].author;
        const pages = document.createElement('td');
        pages.textContent = myLibrary[i].pages;


        const status = document.createElement('td');
        status.innerHTML = '<button class="btn status">'+myLibrary[i].status+'</button>';
        status.lastElementChild.onclick = updateStatus;

        const action = document.createElement('td');
        action.innerHTML = '<button class="btn edit">Edit</button><button class="btn delete">Delete</button>';
        action.firstElementChild.onclick = deleteBook;
        action.lastElementChild.onclick = deleteBook;


        row.appendChild(title);
        row.appendChild(author);
        row.appendChild(pages);
        row.appendChild(status);
        row.appendChild(action);
        table.appendChild(row);
    }    
}
const updateTable = () => {
    resetTable();
    loadTable();
}

const openForm = () => {
    popup.style.display = "flex";
}
const closeForm = () => {
    popup.style.display = "none";
    form.reset();
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

openBtn.onclick = openForm;
closeBtn.onclick = closeForm;
form.onsubmit = addBook;

// ------------- LOAD ---------------

let book = new Book('The Hobbit', 'Tolkien', 300, 'Not Read');
myLibrary.push(book);
loadTable();