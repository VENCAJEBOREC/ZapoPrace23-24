// Třída pro správu hesel
class PasswordManager {
    constructor() {
        // Při vytvoření instance třídy přidání posluchače události pro vytvoření hesla
        document.getElementById("createPasswordButton").addEventListener("click", this.createPassword.bind(this));
    }

    // Metoda pro vytvoření uživatelského hesla
    createPassword() {
        // Získání hodnoty z pole pro zadání hesla
        const password = document.getElementById("passwordInput").value;

        // Nastavení cookies s uživatelským heslem, platnými po dobu jednoho roku
        const expirationMilliseconds = 365 * 24 * 60 * 60 * 1000;
        document.cookie = "userPassword=" + password + "; path=/; expires=" + new Date(Date.now() + expirationMilliseconds).toUTCString();

        // Přesměrování na hlavní stránku
        window.location.href = "index.html";
    }
}

// Vytvoření instance třídy pro správu hesel
const passwordManager = new PasswordManager();
