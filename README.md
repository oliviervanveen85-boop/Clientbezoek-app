# Cliëntbezoek-app (opzet)

Een eenvoudige app voor zorgverleners die bij cliënten op bezoek gaan.
Werkt in de browser van telefoon, tablet en computer. Er hoeft niets
geïnstalleerd te worden.

**Status:** prototype met verzonnen voorbeeldgegevens.

## Wat zit erin

| Tabblad   | Inhoud                                                                 |
|-----------|------------------------------------------------------------------------|
| Cliënten  | Overzicht van alle cliënten, zoeken, filters (vandaag / week / alle)   |
| Cliënt    | Cliëntkaart: NAW-gegevens, zorg & afspraken, korte info, contactpersoon |
| Bezoek    | *nog uit te werken*                                                    |
| Verslag   | *nog uit te werken*                                                    |
| Netwerk   | *nog uit te werken*                                                    |

## Bestanden

```
index.html              de app
css/style.css           kleuren en opmaak (kleuren staan bovenaan)
js/data.js              de (voorbeeld)cliënten
js/app.js               de werking van de schermen
manifest.webmanifest    zodat je de app op je beginscherm kunt zetten
img/icon.svg            app-icoon
```

## Op GitHub zetten en openen

1. Maak op github.com een nieuwe repository, bijvoorbeeld `clientbezoek-app`.
2. Klik op **Add file → Upload files** en sleep alle bestanden en mappen
   uit deze map erin. Klik op **Commit changes**.
3. Ga naar **Settings → Pages**. Kies bij *Source* **Deploy from a branch**,
   branch **main**, map **/ (root)** en klik op **Save**.
4. Na een minuut staat de app op
   `https://<jouw-gebruikersnaam>.github.io/clientbezoek-app/`.
5. Op je telefoon: open die link en kies **Zet op beginscherm**.

Je kunt de app ook zonder GitHub bekijken: dubbelklik op `index.html`.

## ⚠️ Belangrijk: geen echte cliëntgegevens

Een GitHub Pages-site is **openbaar**: iedereen met de link kan alles lezen,
ook als de repository privé is (bij een gratis account kan Pages alleen met een
openbare repository). Zet in `js/data.js` dus **alleen verzonnen gegevens**.

Voor echt gebruik met cliënten (AVG, bijzondere persoonsgegevens) is nodig:

- inloggen per zorgverlener en afgeschermde toegang per cliënt;
- opslag in een beveiligde, Europese database in plaats van in een bestand;
- een verwerkersovereenkomst met de partij die de opslag levert;
- vastleggen wie wat heeft bekeken of gewijzigd.

Deze opzet is daarvoor het startpunt voor de schermen.

## Aanpassen

- **Cliënten:** pas `js/data.js` aan. Bovenaan staat welke velden er zijn.
- **Huiskleur:** verander `--accent` bovenaan `css/style.css`.
