const API_URL = '/contacts';
const contactList = document.getElementById('contact-list');
const contactForm = document.getElementById('contact-form');

// Fetch all contacts and render them
async function fetchContacts() {
  try {
    const response = await fetch(API_URL);
    const contacts = await response.json();
    renderContacts(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
  }
}

// Add a new contact
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }, // ispravljeno: "applicattion/json" → "application/json"
      body: JSON.stringify({ name, email, phone }),
    });
    if (response.ok) {
      const newContact = await response.json();
      addContactToList(newContact);
      contactForm.reset();
    }
  } catch (error) {
    console.error('Error adding contact:', error);
  }
});

async function deleteContact(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    if (response.ok) {
      document.getElementById(`contact-${id}`).remove();
    }
  } catch (error) {
    console.error('Error deleting contact:', error); // ispravljeno: "deletting" → "deleting"
  }
}

// Render contacts
function renderContacts(contacts) {
  contactList.innerHTML = '';
  contacts.forEach((contact) => addContactToList(contact));
}

// Add a single contact to the list
function addContactToList(contact) {
  const li = document.createElement('li');
  li.id = `contact-${contact.id}`;
  li.innerHTML = `
    ${contact.name} - ${contact.email} (${contact.phone || 'N/A'})
    <button onclick="deleteContact(${contact.id})">Delete</button> <!-- ispravljeno: "bubon" → "button" -->
  `;
  contactList.appendChild(li);
}

// Initial load
fetchContacts();