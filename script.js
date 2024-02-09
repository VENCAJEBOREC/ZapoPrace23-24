// Třída pro správu poznámek
class NoteManager {
    constructor() {
        // Inicializace proměnných pro práci s DOM
        this.selectedNoteText = null;
        this.noteList = document.getElementById("noteList");
        this.editNoteInput = document.getElementById("editNoteInput");
        this.editDueDate = document.getElementById("editDueDate");
        this.editColorPicker = document.getElementById("editColorPicker");
        this.editHasExclamation = document.getElementById("editHasExclamation");
    }

    // Metoda pro kontrolu hesla
    checkPassword() {
        const userKey = this.getCookie("userKey");

        // Pokud uživatel nemá klíč, přesměruje ho na stránku pro vytvoření hesla
        if (!userKey) {
            window.location.href = "createPassword.html";
        } else {
            // Uživatel má klíč, zeptat se ho
            const enteredPassword = prompt("Zadejte klíč:");

            if (enteredPassword !== userKey) {
                alert("Nesprávný klíč!");
                window.location.href = "loginagain.html";
            }
        }
    }


    // Metoda pro přidání nové poznámky
    addNote() {
        const noteText = document.getElementById("noteInput").value;
        const dueDate = document.getElementById("dueDate").valueAsDate;
        const color = document.getElementById("colorPicker").value;

        if (noteText === "") {
            alert("Napiš něco!");
            return;
        }

        const existingNotes = this.getExistingNotes();

        // Vytvoření nové poznámky
        if (!existingNotes.some((note) => note.text === noteText)) {
            const expirationMilliseconds = 365 * 24 * 60 * 60 * 1000;
            const hasExclamation = document.getElementById("hasExclamation").checked;
            const newNote = {
                text: noteText,
                expiration: new Date().getTime() + expirationMilliseconds,
                hasExclamation: hasExclamation,
                color: color
            };

            if (dueDate) {
                newNote.dueDate = dueDate.toISOString();
            }

            existingNotes.push(newNote);
            this.setCookie("notes", JSON.stringify(existingNotes), expirationMilliseconds);

            // Resetování vstupních polí a aktualizace seznamu poznámek
            document.getElementById("hasExclamation").checked = false;
            document.getElementById("colorPicker").value = "#243b55";
            this.clearInputFields();
            this.refreshNoteList();
        } else {
            alert("Tato poznámka již existuje!");
        }

        document.getElementById("noteInput").value = "";
        document.getElementById("dueDate").value = "";
    }

    // Metoda pro úpravu existující poznámky
    editNote() {
        const noteText = this.editNoteInput.value;
        const dueDate = this.editDueDate.valueAsDate;
        const color = this.editColorPicker.value;
        const hasExclamation = this.editHasExclamation.checked;

        const existingNotes = this.getExistingNotes();

        const index = existingNotes.findIndex((note) => note.text === this.selectedNoteText);

        // Aktualizace informací o poznámce
        if (index !== -1) {
            existingNotes[index].text = noteText;
            existingNotes[index].dueDate = dueDate ? dueDate.toISOString() : null;
            existingNotes[index].color = color;
            existingNotes[index].hasExclamation = hasExclamation;

            // Uložení aktualizovaných dat a aktualizace zobrazení
            this.setCookie("notes", JSON.stringify(existingNotes));
            this.clearInputFields();
            this.hideEditFields();
            this.refreshNoteList();
        } else {
            alert("Poznámka nenalezena!");
        }

        this.editNoteInput.value = "";
        this.editDueDate.value = "";
    }

    // Metoda pro zrušení úpravy poznámky
    cancelEdit() {
        this.hideEditFields();
    }

    // Metoda pro skrytí polí pro úpravu poznámky
    hideEditFields() {
        this.editNoteInput.style.display = "none";
        this.editDueDate.style.display = "none";
        this.editColorPicker.style.display = "none";
        document.getElementById("editHasExclamationContainer").style.display = "none";
        document.getElementById("editNoteButton").style.display = "none";
        document.getElementById("cancelEditButton").style.display = "none";
    }

    // Metoda pro zobrazení polí pro úpravu poznámky
    showEditFields() {
        this.editNoteInput.style.display = "block";
        this.editDueDate.style.display = "block";
        this.editColorPicker.style.display = "block";
        document.getElementById("editHasExclamationContainer").style.display = "block";
        document.getElementById("editNoteButton").style.display = "block";
        document.getElementById("cancelEditButton").style.display = "block";

        // Při zobrazení polí pro úpravu, zkontrolujte, zda existuje vybraná poznámka
        if (this.selectedNoteText) {
            // Získání existujících poznámek
            const existingNotes = this.getExistingNotes();

            // Najděte vybranou poznámku
            const selectedNote = existingNotes.find((note) => note.text === this.selectedNoteText);

            // Pokud byla poznámka nalezena a má platné datum splnění, vyplňte pole pro datum splnění
            if (selectedNote && selectedNote.dueDate) {
                this.editDueDate.valueAsDate = new Date(selectedNote.dueDate);
            }
        }
    }

    // Metoda pro odstranění poznámky
    removeNote(noteText) {
        const existingNotes = this.getExistingNotes();
        const index = existingNotes.findIndex((note) => note.text === noteText);

        // Odstranění poznámky, uložení aktualizovaných dat a aktualizace zobrazení
        if (index !== -1) {
            existingNotes.splice(index, 1);
            this.setCookie("notes", JSON.stringify(existingNotes));
            this.refreshNoteList();
        }
    }

    // Metoda pro načtení a zobrazení existujících poznámek
    loadNotes() {
        const existingNotes = this.getExistingNotes();

        // Řazení poznámek podle kritérií
        existingNotes.sort((a, b) => {
            if (a.hasExclamation && !b.hasExclamation) {
                return -1;
            } else if (!a.hasExclamation && b.hasExclamation) {
                return 1;
            } else if (a.dueDate && b.dueDate) {
                return new Date(a.dueDate) - new Date(b.dueDate);
            } else if (!a.dueDate && b.dueDate) {
                return 1;
            } else if (a.dueDate && !b.dueDate) {
                return -1;
            } else {
                return 0;
            }
        });

        const currentTime = new Date().getTime();

        // Zobrazení každé existující poznámky
        existingNotes.forEach((note) => {
            // Vytvoření prvků DOM pro každou poznámku
            if (note.expiration > currentTime) {
                const listItem = document.createElement("li");
                const noteContainer = document.createElement("div");
                noteContainer.style.display = "flex";
                noteContainer.style.alignItems = "center";

                // Přidání ikony s vykřičníkem, pokud je poznámka důležitá
                if (note.hasExclamation) {
                    const exclamationIcon = document.createElement("i");
                    exclamationIcon.className = "fas fa-exclamation";
                    exclamationIcon.style.color = "red";
                    noteContainer.appendChild(exclamationIcon);
                }

                // Vytvoření elementu pro zobrazení textu poznámky
                const noteTextElement = document.createElement("div");
                noteTextElement.classList.add('note-text'); // Přidání třídy pro omezení výšky
                noteTextElement.innerText = note.text;
                noteTextElement.style.flexGrow = "1";
                noteTextElement.style.backgroundColor = note.color || "#243b55";
                noteContainer.appendChild(noteTextElement);

                // Vytvoření elementu pro zobrazení data splnění, pokud existuje
                if (note.dueDate) {
                    const dateElement = document.createElement("div");
                    dateElement.innerText = "Datum splnění: " + new Date(note.dueDate).toLocaleDateString();
                    dateElement.classList.add('note-date');
                    noteContainer.appendChild(dateElement);
                }

                // Vytvoření tlačítek pro odstranění a úpravu poznámky
                const deleteButton = this.createButton("custom-delete-button", () => {
                    this.selectedNoteText = note.text;
                    this.removeNote(note.text);
                    listItem.remove();
                }, "fas fa-trash-alt");

                const editButton = this.createButton("custom-edit-button", () => {
                    this.selectedNoteText = note.text;
                    this.editNoteInput.value = note.text;
                    this.editDueDate.value = note.dueDate || "";
                    this.editColorPicker.value = note.color || "#ffffff";
                    this.editHasExclamation.checked = note.hasExclamation || false;
                    this.showEditFields();
                }, "fas fa-pencil-alt");

                // Přidání vytvořených prvků do DOM
                noteContainer.appendChild(deleteButton);
                noteContainer.appendChild(editButton);
                listItem.appendChild(noteContainer);
                this.noteList.appendChild(listItem);
            }
        });
    }

    // Metoda pro nastavení cookie
    setCookie(name, value, expirationMilliseconds) {
        let expires = "";
        if (expirationMilliseconds) {
            const date = new Date();
            date.setTime(date.getTime() + expirationMilliseconds);
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }

    // Metoda pro získání hodnoty cookie
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Metoda pro získání existujících poznámek z cookie
    getExistingNotes() {
        return JSON.parse(this.getCookie("notes") || "[]");
    }

    // Metoda pro aktualizaci zobrazení seznamu poznámek
    refreshNoteList() {
        this.noteList.innerHTML = "";
        this.loadNotes();
    }

    // Metoda pro vytvoření tlačítka s ikonou
    createButton(className, clickHandler, iconClass) {
        const button = document.createElement("button");
        button.className = className;
        button.onclick = clickHandler;

        const icon = document.createElement("i");
        icon.className = iconClass;
        button.appendChild(icon);

        return button;
    }

    // Metoda pro vyčištění vstupních polí
    clearInputFields() {
        document.getElementById("noteInput").value = "";
        document.getElementById("dueDate").value = "";
    }
}

// Vytvoření instance třídy pro správu poznámek
const noteManager = new NoteManager();

// Přidání posluchače události pro kontrolu hesla a načtení poznámek po načtení stránky
document.addEventListener("DOMContentLoaded", function() {
    noteManager.checkPassword();
    noteManager.loadNotes();
});

// Přidání posluchačů událostí pro přidání, editaci a zrušení úpravy poznámky
document.getElementById("addNoteButton").addEventListener("click", () => {
    noteManager.addNote();
});

document.getElementById("cancelEditButton").addEventListener("click", () => {
    noteManager.cancelEdit();
});

document.getElementById("editNoteButton").addEventListener("click", () => {
    noteManager.editNote();
});
