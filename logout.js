// Třída pro správu uživatelských akcí
class UserManager {
    constructor() {
        // Při vytvoření instance třídy získání reference na tlačítko pro odhlášení
        this.logoutButton = document.getElementById("logoutButton");

        // Pokud tlačítko pro odhlášení existuje, přidání posluchače události pro odhlášení
        if (this.logoutButton) {
            this.logoutButton.addEventListener("click", this.logout.bind(this));
        }
    }

    // Metoda pro odhlášení uživatele
    logout() {
        // Přesměrování na stránku úspěšného odhlášení
        window.location.href = "logout.html";
    }

    // Metoda pro přihlášení uživatele
    redirectToLogin() {
        // Přesměrování na hlavní stránku po přihlášení
        window.location.href = "index.html";
    }
}

// Vytvoření instance třídy pro správu uživatelských akcí
const userManager = new UserManager();
