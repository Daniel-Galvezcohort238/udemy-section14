//add item functionality---------------------------------------------------------------

const addButton = document.getElementById('add-button');

function buttonClicked(e) {
    e.preventDefault();
    const text = document.getElementById('item-input').value;

    if (isEditMode) {
        updateItem(text);
    } else {
        const listItems = document.querySelectorAll('li');
        let duplicateItem = false;
        
        for (let i = 0; i < listItems.length; i++) {
            if (listItems[i].firstChild.textContent == text) {
                duplicateItem = true;
                alert('Please no Duplicate items!');
                break;
            }
        }

        if (duplicateItem == false) {
            addItem(text);
            addItemToStorage(text);
        }

    }

}

function addItem (item) {

        const i = document.createElement('i');
        i.className = 'fa-solid fa-xmark';
    
        const button = document.createElement('button');
        button.className = 'remove-item btn-link text-red';
        button.appendChild(i);
    
        const li = document.createElement('li');
        const text = document.createTextNode(`${item}`
        );
        li.appendChild(text);
        li.appendChild(button);
        
        document.querySelector('ul').appendChild(li);
}

addButton.addEventListener('click', buttonClicked);




//remove item functionality---------------------------------------------------------------

const ul = document.querySelector('ul');

// const removeButton = document.querySelector('.remove-item');
// const i = document.querySelector('i');
// making event listeners for every i element and button element is just inefficient.


function removeItem(e) {
    const list = document.querySelectorAll('.remove-item');

    for (let item = 0; item < list.length; item++) {

        if (list[item] == e.target) {
            e.target.parentElement.remove();
            removeItemFromStorage(e.target.parentElement.firstChild.textContent)
            break;
        } else if (list[item] == e.target.parentElement) {
            e.target.parentElement.parentElement.remove();
            removeItemFromStorage(e.target.parentElement.parentElement.firstChild.textContent)
            break;
        } else if (list[item].parent = e.target) {
            liClicked(e.target);
            break;
        }

    }

}

// function removeItem1(e) {
//     console.log(e.target)
//     const list = document.querySelectorAll('.remove-item');
//     for (let item = 0; item < list.length; item++) {
//         if (list[item] == e.target) {
//             e.target.parentElement.remove();
//         }
//     }
// }
// making event listeners for every i element and button element is just inefficient.

// function removeItem2(e) {
//     console.log(e.target)
    
//     const list = document.querySelectorAll('.fa-xmark');
//     for (let item = 0; item < list.length; item++) {
//         if (list[item] == e.target) {
//             e.target.parentElement.parentElement.remove();
//         }
//     }
// }
// making event listeners for every i element and button element is just inefficient.

ul.addEventListener('click', removeItem)

// removeButton.addEventListener('click', removeItem1)
// i.addEventListener('click', removeItem2)
// making event listeners for every i element and button element is just inefficient.




// clear button functionality---------------------------------------------------------------

const clearBtn = document.querySelector('#clear')






function onClear() {
    //console.log(ul);
    //let time = 0;

    ul.innerHTML = ''; //this line would be the easiest way to clear the list but is not performant supposedely
    // How is this^^^^^^^^^^^^^^^^^^^not performant?

    // while(ul.firstChild) {
    //     console.log(time++);
    //     console.log(ul.firstChild);
    //     ul.removeChild(ul.firstChild);//this while loop is supposedly the most performant
    // }                                            //^^straight up lie^^straight up lie^^
}



clearBtn.addEventListener('click', onClear);




//Filter items functionality

const filter = document.getElementById('filter');

function filtering() {
    console.log('something works');
    const list = document.querySelectorAll('li');

    for (let item = 0; item < list.length; item++) {
        const text = filter.value.toLowerCase();
        const items = list[item].firstChild.textContent.toLowerCase();

        if (items.indexOf(text) != -1) {
            list[item].style.display = 'inline';
        } else {
            list[item].style.display = 'none';
        }

    }
}

filter.addEventListener('input', filtering);




//edit mode functionality

let isEditMode = false;

function liClicked(li) {

    if (isEditMode) {
        document.querySelector('.edit-mode').classList.remove('edit-mode');
    }
    isEditMode = true;
    li.classList.add('edit-mode');
    addButton.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item';
}

function updateItem(newText) {
    const editingItem = document.querySelector('.edit-mode');
    const list = document.querySelectorAll('li');
    const oldText = editingItem.firstChild.textContent

    //update text
    editingItem.firstChild.textContent = newText;
    //update storage
    let editingItemIndex = 0;
    for (let i = 0; i < list.length; i++) {
        if (editingItem == list[i]) {
            editingItemIndex = i;
        }
    }

    replaceItemFromStorage(oldText, newText);

    //undo edit mode
    isEditMode = false;
    editingItem.classList.remove('edit-mode');
    addButton.innerHTML = '<i class="fa-solid"></i> Add Item';

}



//local storage functionality

function addItemToStorage(item) {
    const itemsFromStorage = getItemsFromStorage();

    //add new item to array
    itemsFromStorage.push(item);

    //COnver to JSON string and set to local storage
    localStorage.setItem('items', JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
    let itemsFromStorage;

    if (localStorage.getItem('items') === null) {
        itemsFromStorage = [];
    } else {
        itemsFromStorage = JSON.parse(localStorage.getItem('items'));
    }

    return itemsFromStorage;
}

function displayItems () {
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item => addItem(item));
}

function removeItemFromStorage (item) {
    const items = getItemsFromStorage();

    for (let i = 0; i < items.length; i++) {
        if (item == items[i]) {
            items.splice(i, 1);
            break;
        }
        
    }

    localStorage.removeItem('items');
    localStorage.setItem('items', JSON.stringify(items));
}

function replaceItemFromStorage(oldText, newText) {
    const items = getItemsFromStorage();
    console.log(items);

    for (let i = 0; i < items.length; i++) {
        if (oldText == items[i]) {
            items.splice(i, 1, newText);
            break;
        }
        
    }

    localStorage.removeItem('items');
    localStorage.setItem('items', JSON.stringify(items));
}

document.addEventListener('DOMContentLoaded', displayItems);