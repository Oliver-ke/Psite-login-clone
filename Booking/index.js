// Book Class: Represents a Book
class Book {
    constructor(title,author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}

//Store class: Handles Srorage
class Store{
   static getBooks(){
    let books;
    if(localStorage.getItem('books') === null){
        books = [];
    }else{
        books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
    }

   static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books',JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();
        books.forEach((book,index) =>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}
// Ui class: Handles Ui task
class UI{
    static dispayBooks(){
     
        const books = Store.getBooks();
        books.forEach((book,index) =>{
            UI.addBookToList(book,index)
        })
    }

    static addBookToList(book,index=0){
        const list = document.querySelector('#book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
        list.appendChild(row);
    }

    static deleteBook(target){
        if(target.classList.contains('delete')){
            target.parentElement.parentElement.remove();
        }
    }

    static showAlert(message,classname){
        const div = document.createElement('div');
        div.className = `alert alert-${classname}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div,form);
        //vanish in three seconds
        setTimeout(() =>{
            document.querySelector('.alert').remove();
        }, 3000);
    }

    static clearFields(){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    	
}


//Event: Display Books
document.addEventListener('DOMContentLoaded', UI.dispayBooks);

//Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) =>{
    e.preventDefault();
    //get values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    //validate book
    if (title ==='' || author === ''|| isbn === ''){
        //pass a message to the user
        UI.showAlert('Please fill all filed','danger')
    }
    else{
       //check to make sure the entered isbn does not exist in the local storage
       let books = Store.getBooks();
        let exist;
        books.forEach(book =>{
            if(book.isbn === isbn){
            exist = true;
            }
            else{
                exist = false
            }
        })
        if(exist){
        UI.showAlert('Book with the given ISBN already exis','danger');
        exist = false;
        }
        else if(!exist){
            //instantiate book
            const book = new Book(title,author,isbn);
            //add book to ui list
            UI.addBookToList(book);
            // add book to local storage
            Store.addBook(book);
            UI.showAlert('Book added successfully', 'success');
            // clear fileds
            UI.clearFields()
        }
        console.log(exist);
    }
    
})
//Event: Remove a Book
// here we used event propagation
document.querySelector('#book-list').addEventListener('click', (e) =>{
   // remove book from ui
   UI.deleteBook(e.target)
    // remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
   UI.showAlert('Book Removed ', 'success');
})
