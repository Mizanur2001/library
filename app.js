console.log("this is My book library Console");

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {
    fetchData() {
        let data = localStorage.getItem('data');
        let obj;
        if (data == null) {
            obj = [];
        }
        else {
            obj = JSON.parse(data);
        }
        let html = ``;
        obj.forEach(function (element, index) {
            html += `<tr>
                          <td>${index + 1}</td>
                          <td>${element.Name}</td>
                          <td>${element.author}</td>
                          <td>${element.type}</td>
                          <td><button type="button" class="btn btn-danger" onclick=funcDelete(${index})>Delete</button></td>
                        </tr>`;
        });
        let tableBody = document.getElementById('tableBody');
        if (obj.length != 0) {
            tableBody.innerHTML = html;
        }
        else {
            tableBody.innerHTML = ` <div class="container">
            <div class="row justify-content-center mx-5 my-5 px-4">
                <h5>No Notes Available :(</h5>
            </div>
            </div>`;
        }
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validation(book) {
        if (book.name.length < 3 || book.author.length < 3) {
            return false;
        }
        else {
            return true;
        }
    }

    message(color, alert, msg) {
        let idMsg = document.getElementById('idMsg');
        let msgHtml = `<div class="alert alert-${color} alert-dismissible fade show" role="alert">
                         <strong>${alert}!</strong>  ${msg}
                         <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`;
        idMsg.innerHTML = msgHtml;

        setTimeout(function () {
            idMsg.innerHTML = '';
        }, 5000);
    }
}

const display = new Display();
display.fetchData();

class StoreData {
    Localstorage(book) {
        let data = localStorage.getItem('data');
        let obj;
        if (data == null) {
            obj = [];
        }
        else {
            obj = JSON.parse(data);
        }
        let dataObj = {
            Name: book.name,
            author: book.author,
            type: book.type
        }
        obj.push(dataObj);
        localStorage.setItem('data', JSON.stringify(obj));
        display.fetchData();
    }
}

let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', formSubmit);

function formSubmit(e) {
    e.preventDefault();
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');
    let type;
    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }
    let book = new Book(name, author, type);
    let storeData = new StoreData();
    if (display.validation(book)) {
        display.clear();
        display.fetchData();
        display.message('success', 'Success', 'Book added successfully :)');
        storeData.Localstorage(book);
    }
    else {
        display.message('danger', 'Error', 'Please Enter A valid Book or Author name :(');
        display.fetchData();
    }

}

//delete function
function funcDelete(index) {
    let data = localStorage.getItem('data');
    let obj;
    if (data == null) {
        obj = [];
    }
    else {
        obj = JSON.parse(data);
    }
    obj.splice(index,1);
    localStorage.setItem('data', JSON.stringify(obj));
    display.fetchData();
}