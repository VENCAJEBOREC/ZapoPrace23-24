/* Globální styly pro stránku */
html, body {
    height: 100%;
}

body {
    background: #243b55;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    overflow-y: auto; /* Povolení vertikálního posuvníku, pokud obsah přesahuje výšku */
}

h1 {
    color: white;
}

/* Styly pro hlavní kontejner */
.Container {
    border: 5px solid #141e30;
    border-radius: 5px;
    padding: 40px;
    margin: 55px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
    width: 80%;
}

#logoutButton {
    position: fixed;
    top: 10px;
    right: 10px;
    background-color: #e74c3c;
    color: white;
    border: none;
    padding: 10px 15px;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
    z-index: 999; /* Zajistí, aby bylo tlačítko vždy nahoře */
}

#logoutButton:hover {
    background-color: #c0392b; /* Barva tlačítka pro odhlášení při najetí myší */
}

#addNoteButton,
#editNoteButton,
#createPasswordButton,
#loginButton{
    background-color: #2ecc71; /* Zelená barva pro tlačítko přidání poznámky */
    color: white;
    border: none;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
}

#addNoteButton:hover,
#editNoteButton:hover,
#createPasswordButton:hover,
#loginButton:hover{
    background-color: #27ae60; /* Zelená barva při najetí myší */
}

#cancelEditButton {
    background-color: #e74c3c;
    color: white;
    border: none;
    font-size: 14px;
    cursor: pointer;
    border-radius: 5px;
}

#cancelEditButton:hover {
    background-color: #c0392b;
}

#formContainer .fa-exclamation {
    color: red; /* Barva červeného vykřičníku */
}

#editformContainer .fa-exclamation {
    color: red; /* Barva červeného vykřičníku pro úpravu poznámky */
}

/* Styly pro tlačítka Smazat a Upravit při najetí myší */
.custom-delete-button:hover {
    color: #e74c3c;
}
.custom-edit-button:hover {
    color: #27ae60;
}

/* Styly pro checkbox a popisek pro důležitost poznámky */
#hasExclamation,
#editHasExclamation {
    width: 25px; /* Nová šířka checkboxu */
    height: 25px; /* Nová výška checkboxu */
}

/* Styly pro ikonu s vykřičníkem */
#formContainer .fa-exclamation,
#editHasExclamationContainer .fa-exclamation {
    font-size: 30px; /* Zvětšeno z 14px na 24px */

}

/* Kontejnery pro formuláře pro přidání a úpravu poznámky */
#formContainer,
#editformContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start; /* Zarovnat na začátek kontejneru */
    align-items: center; /* Zarovnat vertikálně na střed */
}

/* Styly pro vstupní pole pro poznámku, datum, důležitost a tlačítka */
#noteInput,
#dueDate,
#colorPicker,
#hasExclamation,
#editNoteInput,
#editDueDate,
#editColorPicker,
#editHasExclamation {
    margin: 10px; /* Prostor mezi jednotlivými prvky */
    font-size: 20px;
}

/* Styly pro tlačítka Přidat poznámku, Upravit poznámku a Zrušit úpravu */
#addNoteButton,
#editNoteButton,
#cancelEditButton,
#createPasswordButton,
#loginButton{
    width: 130px;
    height: 40px;
    margin-left: 15px;
    font-size: 15px;
    border-radius: 5px;

}

/* Styly pro každou poznámku v seznamu */
#noteList li {
    margin-top: 1px;
    padding-bottom: 1px;
    width: 100%;
    border-bottom: 1px solid #ccc; /* Přidá linku pod každou poznámku */
    font-size: 25px;
    list-style-type: none; /* Odebrat tečku před každou položkou seznamu */
    height: auto; /* Zvětšit výšku podbarvení */

}

/* Styly pro obsah poznámky */
#noteList li div {
    align-items: flex-start; /* Zarovnání textu vlevo */
    height: auto; /* Automatická výška, která se přizpůsobí obsahu */
}
#noteList li div .note-text {
    width: 500px; /* Pevná šířka pole pro text */
    word-wrap: break-word; /* Přerušení slov pro přetékající text */
    flex-direction: column; /* Umístění textu do sloupce */
}

/* Styly pro ikonu s vykřičníkem */
#noteList li .fas.fa-exclamation {
    color: red;
    margin-right: 5px; /* Odsazení od textu */
}

/* Styly pro tlačítka Smazat a Upravit */
#noteList li button {
    display: inline-block;
    margin-right: 1px;
    margin-left: 5px;
    font-size: 20px;
}

/* Styly pro datum splnění */
#noteList li .note-date {
    margin-left: 10px; /* Odsazení od textu */
    font-size: 15px;
    color: gray;
}
