const table = document.querySelector('tbody');
const addModal = document.querySelector(".addModal");
const editModal = document.querySelector(".editModal");
const addBtn = document.querySelector('.addBtn');
const closeAddBtn = document.querySelector('.closeAddBtn');
const closeEditBtn = document.querySelector('.closeEditBtn');
const addForm = document.querySelector(".addForm");
const editForm = document.querySelector(".editForm");
const totalCount = document.querySelector(".totalCount");
const readCount = document.querySelector(".readCount");

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
const editBook = (e) => {
    e.preventDefault()
    const i = editForm.childNodes[0].innerHTML;
    myLibrary[i].title = editForm.title.value;
    myLibrary[i].author = editForm.author.value;
    myLibrary[i].pages = editForm.pages.value;
    myLibrary[i].status = editForm.status.value;

    updateTable();
    closeEditModal();
}
const deleteBook = (e) => {
    const title = e.currentTarget.parentNode.parentNode.childNodes[0];
    if (confirm(`Are you sure you want to delete ${title.innerText}?`)) {
        const i = getBookIndex(title.innerText);
        myLibrary.splice(i, i+1);
        updateTable();
    }
}
const addBook = (e) => {
    e.preventDefault()
    const book = new Book(addForm.title.value, addForm.author.value, addForm.pages.value, addForm.status.value);

    myLibrary.push(book);
    updateTable();
    closeAddModal();
}
const updateStatus = (e) => {
    const title = e.currentTarget.parentNode.parentNode.childNodes[0];
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
    totalCount.innerHTML = 0;
    readCount.innerHTML = 0;
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
        if(myLibrary[i].status === 'Not Read')
            status.innerHTML = '<button class="notreadBtn">Not Read</button>';
        else if(myLibrary[i].status === 'In Progress')
            status.innerHTML = '<button class="inprogressBtn">In Progress</button>';
        else
            status.innerHTML = '<button class="greenBtn">Read</button>';
        status.lastElementChild.onclick = updateStatus;

        const action = document.createElement('td');
        action.innerHTML = '<button class="editBtn"><i class="fa-solid fa-pen-to-square"></i></button><button class="deleteBtn"><i class="fa-solid fa-trash-can"></i></button>';
        action.firstElementChild.onclick = openEditModal;
        action.lastElementChild.onclick = deleteBook;

        totalCount.innerHTML = parseInt(totalCount.innerHTML)+1;
        if(myLibrary[i].status === 'Read')
            readCount.innerHTML = parseInt(readCount.innerHTML)+1;

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

const openAddModal = () => {
    addForm.reset();
    addModal.style.display = "flex";
}
const closeAddModal = () => {
    addModal.style.display = "none";
}
const openEditModal = (e) => {
    const title = e.currentTarget.parentNode.parentNode.childNodes[0];
    const i = getBookIndex(title.innerText);
    editForm.childNodes[0].innerHTML = i;
    editForm.title.value = myLibrary[i].title;
    editForm.author.value = myLibrary[i].author;
    editForm.pages.value = myLibrary[i].pages;
    editForm.status.value = myLibrary[i].status;
    editModal.style.display = "flex";
}
const closeEditModal = () => {
    editModal.style.display = "none";
}

// ------------- EVENTS --------------

addBtn.onclick = openAddModal;
closeAddBtn.onclick = closeAddModal;
closeEditBtn.onclick = closeEditModal;
editForm.onsubmit = editBook;
addForm.onsubmit = addBook;

// ------------- LOAD ---------------

let book = new Book('The Hobbit', 'Tolkien', 300, 'Not Read');
myLibrary.push(book);
loadTable();