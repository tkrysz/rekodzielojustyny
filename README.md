# Justyna Rękodzieło – statyczny sklep (wydmuszka)

Statyczna strona (HTML/CSS/JS, bez builda) przygotowana pod GitHub Pages.

## Uruchomienie lokalnie
```
python3 -m http.server 8000   # i otwórz http://localhost:8000
```

## Publikacja na GitHub Pages
1. Wrzuć zawartość katalogu do repozytorium na GitHubie.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `(root)`.

## Co jest w środku
- `index.html` – układ strony
- `css/style.css` – wygląd
- `js/products.js` – **katalog produktów** (nazwy, ceny, opisy) – tu edytujesz ofertę
- `js/art.js` – zastępcze ilustracje SVG
- `js/app.js` – koszyk (localStorage), ulubione, filtry, okno produktu

## Prawdziwe zdjęcia
Wrzuć zdjęcie do `assets/products/` i dodaj w produkcie `image: "assets/products/luna.jpg"`.

## Uwaga
To wydmuszka: koszyk działa, ale „Złóż zamówienie” otwiera tylko przygotowany e-mail,
a zapis do newslettera nie wysyła danych. Prawdziwe płatności wymagają backendu lub
zewnętrznej usługi (np. Stripe Payment Links, Snipcart, Shopify Buy Button).
Adres e-mail `kontakt@justyna-rekodzielo.pl` jest przykładowy.
