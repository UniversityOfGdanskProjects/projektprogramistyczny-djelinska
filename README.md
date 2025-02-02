# MOvIES - Platforma do przeglądania i recenzowania filmów

MOvIES to aplikacja internetowa umożliwiająca użytkownikom przeglądanie, wyszukiwanie i recenzowanie filmów. Platforma oferuje uwierzytelnianie użytkowników, personalizowane listy do obejrzenia oraz panel administratora do zarządzania filmami, recenzjami i użytkownikami.

## Funkcjonalności

### Dla niezalogowanych użytkowników:

- Przeglądanie strony głównej z zachętą do rejestracji lub logowania.

- Dostęp do formularza rejestracji i logowania.

### Dla zalogowanych użytkowników:

- Przeglądanie listy filmów z możliwością filtrowania, sortowania i paginacji.

- Dodawanie ocen i recenzji do filmów.

- Zarządzanie swoim profilem.

- Dodawanie filmów do ulubionych i listy do obejrzenia.

### Panel administratora:

- Przeglądanie i zarządzanie listą użytkowników, filmów i recenzji.

- Dodawanie, edytowanie i usuwanie filmów.

- Zarządzanie użytkownikami.

- Moderowanie i zarządzanie recenzjami.

## Instalacja i konfiguracja

### Wymagania

- Node.js

- MongoDB

### Klonowanie repozytorium

```sh
git clone https://github.com/djelinska/movies-app.git
cd movies-app
```

#### Konfiguracja bazy danych

Ustaw zmienne środowiskowe w pliku .env.

#### Konfiguracja backendu

```sh
cd backend
npm install
npm start
```

#### Konfiguracja frontendu

```sh
cd frontend
npm install
npm start
```

## Użycie

- Otwórz aplikację w przeglądarce: http://localhost:3000

- Zarejestruj się lub zaloguj.

- Przeglądaj filmy, dodawaj do ulubionych i wystawiaj recenzje.

- Jeśli jesteś administratorem, przejdź do panelu admina i zarządzaj treścią.

## Technologie

- **Frontend**: React.js, TailwindCSS

- **Backend**: Node.js, Express.js

- **Baza danych**: MongoDB

- **Autoryzacja**: JWT
