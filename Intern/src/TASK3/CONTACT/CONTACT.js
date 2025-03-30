let contacts = [];

function addContact() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let email = document.getElementById("email").value.trim();

    if (name === "" || phone === "" || email === "") return;

    contacts.push({ name, phone, email });
    displayContacts();
    clearInputs();
}

function displayContacts() {
    let contactList = document.getElementById("contactList");
    contactList.innerHTML = "";

    contacts.forEach((contact, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${contact.name} - ${contact.phone} - ${contact.email}</span>
            <div>
                <button class="edit" onclick="editContact(${index})">Edit</button>
                <button class="delete" onclick="deleteContact(${index})">Delete</button>
            </div>
        `;
        contactList.appendChild(li);
    });
}

function editContact(index) {
    let contact = contacts[index];
    let newName = prompt("Edit Name:", contact.name);
    let newPhone = prompt("Edit Phone:", contact.phone);
    let newEmail = prompt("Edit Email:", contact.email);

    if (newName && newPhone && newEmail) {
        contacts[index] = { name: newName, phone: newPhone, email: newEmail };
        displayContacts();
    }
}

function deleteContact(index) {
    contacts.splice(index, 1);
    displayContacts();
}

function clearInputs() {
    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("email").value = "";
}

displayContacts();
