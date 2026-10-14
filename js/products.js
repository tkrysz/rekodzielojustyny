// Katalog produktów. Aby użyć prawdziwego zdjęcia, dodaj pole  image: "assets/products/luna.jpg"
// Bez pola "image" wyświetli się ilustracja SVG (patrz js/art.js).
// category: naszyjniki | kolczyki | pierscionki | bransoletki
const PRODUCTS = [
  { id: "naszyjnik-luna", name: 'Naszyjnik "LUNA"', category: "naszyjniki", price: 249, art: "moon", tone: "#2f2a2a", bestseller: true,
    desc: "Delikatny półksiężyc z ręcznie młotkowanego mosiądzu pokrytego złotem 24k, na łańcuszku o długości 45 cm.",
    details: ["Mosiądz złocony 24k", "Łańcuszek 45 cm + 5 cm regulacji", "Wykonanie: ok. 3 dni"] },
  { id: "kolczyki-solar", name: 'Kolczyki "SOLAR"', category: "kolczyki", price: 189, art: "discs", tone: "#7a5a3d", bestseller: true,
    desc: "Okrągłe, fakturowane wisiorki przypominające słoneczne dyski. Lekkie i wygodne na co dzień.",
    details: ["Mosiądz złocony", "Sztyfty ze srebra 925", "Wysokość: 4,5 cm"] },
  { id: "pierscionek-perla", name: 'Pierścionek "PERŁA"', category: "pierscionki", price: 189, art: "ring-pearl", tone: "#e9e0d2", bestseller: true,
    desc: "Pierścionek z kamieniem księżycowym w oprawie ze złoconego drutu. Regulowany rozmiar.",
    details: ["Kamień księżycowy", "Srebro 925 złocone", "Rozmiar regulowany"] },
  { id: "pierscionek-turkus", name: 'Pierścionek "MORZE"', category: "pierscionki", price: 249, art: "ring-teal", tone: "#6e5a46", bestseller: true,
    desc: "Naturalny kamień w odcieniu morskiej zieleni otoczony złotym szlakiem z drutu.",
    details: ["Naturalny amazonit", "Srebro 925 złocone", "Rozmiar regulowany"] },
  { id: "naszyjnik-lisc", name: 'Naszyjnik "LIŚĆ"', category: "naszyjniki", price: 279, art: "leaf", tone: "#d8c9b0",
    desc: "Wianek maleńkich listków układających się w delikatny kołnierzyk. Prawdziwa ozdoba dekoltu.",
    details: ["Mosiądz złocony 24k", "Długość 42 cm", "Zapięcie karabińczyk"] },
  { id: "naszyjnik-kropla", name: 'Naszyjnik "KROPLA"', category: "naszyjniki", price: 199, art: "drop", tone: "#b79c7a",
    desc: "Minimalistyczna kropla z młotkowanego metalu. Pasuje do każdej stylizacji.",
    details: ["Srebro 925", "Długość 45 cm", "Kropla: 2 cm"] },
  { id: "kolczyki-kropla", name: 'Kolczyki "ROSA"', category: "kolczyki", price: 169, art: "drops", tone: "#cdbba0",
    desc: "Wydłużone krople przypominające poranną rosę. Lekkie, eleganckie, ręcznie kute.",
    details: ["Mosiądz złocony", "Sztyfty ze srebra 925", "Wysokość: 5 cm"] },
  { id: "kolczyki-ksiezyc", name: 'Kolczyki "NÓW"', category: "kolczyki", price: 159, art: "crescents", tone: "#3b3330",
    desc: "Małe półksiężyce – subtelny dodatek na wieczór i na co dzień.",
    details: ["Srebro 925", "Wysokość: 2,5 cm", "Zapięcie: wkręt"] },
  { id: "pierscionek-listek", name: 'Pierścionek "GAŁĄZKA"', category: "pierscionki", price: 139, art: "ring-plain", tone: "#c4ae8c",
    desc: "Cienka obrączka z motywem gałązki. Można nosić solo lub w zestawie.",
    details: ["Srebro 925 złocone", "Rozmiar regulowany", "Szerokość: 2 mm"] },
  { id: "bransoletka-fale", name: 'Bransoletka "FALE"', category: "bransoletki", price: 219, art: "bracelet", tone: "#8c7355",
    desc: "Sztywna bransoletka z delikatnie falującym wzorem, wykuta ręcznie.",
    details: ["Mosiądz złocony", "Obwód 17 cm (regulowana)", "Szerokość: 6 mm"] },
  { id: "bransoletka-kamienie", name: 'Bransoletka "ŁĄKA"', category: "bransoletki", price: 179, art: "bracelet-beads", tone: "#d9cdb8",
    desc: "Bransoletka z naturalnych kamieni w odcieniach ziemi i zieleni, na złotym łańcuszku.",
    details: ["Kamienie naturalne", "Obwód 16–19 cm", "Zapięcie karabińczyk"] },
  { id: "komplet-solar", name: 'Komplet "SŁOŃCE"', category: "naszyjniki", price: 399, art: "discs", tone: "#9b7a53",
    desc: "Naszyjnik i kolczyki w jednym zestawie – idealny na prezent, pakowany w ozdobne pudełko.",
    details: ["Mosiądz złocony 24k", "Pudełko prezentowe w cenie", "Oszczędzasz 39 zł"] }
];

const CATEGORIES = [
  { id: "naszyjniki", label: "Naszyjniki", art: "moon", tone: "#d9cdb8" },
  { id: "kolczyki", label: "Kolczyki", art: "discs", tone: "#a88a64" },
  { id: "pierscionki", label: "Pierścionki", art: "ring-teal", tone: "#6e5a46" }
];
