"use strict";

const btn = document.querySelector("#btn");
const input = document.querySelector("#input");
const psw = document.querySelector("#password");

let users = [];

fetch("/users")
    .then(res => {
        if (!res.ok) {
            throw new Error(`Netzwerkfehler: ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        users = data;
    })
    .catch(e => {
        console.error("Fehler beim Laden der Benutzerdaten:", e.message);
    });

btn.addEventListener("click", (event) => {
    event.preventDefault(); // Prevent form submission if inside a form
    const username = input.value.trim();
    const password = psw.value.trim();

    if (username && password) {
        const user = users.find(user => user.username === username && user.password === password);
        if (!user) {
            alert("Ungültiger Benutzername oder Passwort.");
        } else {
            // Successful login action (e.g., redirect or show a message)
            alert("Login erfolgreich!");
            // window.location.href = "/dashboard"; // Uncomment and set your redirect path if needed
        }
    } else {
        alert("Bitte Benutzername und Passwort eingeben.");
    }
});
