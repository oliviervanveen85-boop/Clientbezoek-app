/*
  VOORBEELDGEGEVENS — alle namen, adressen en nummers zijn verzonnen.

  LET OP: zet hier NOOIT echte cliëntgegevens in zolang de app op
  GitHub Pages staat. Alles in deze map is voor iedereen op internet
  te lezen. Zie README.md.

  Velden per cliënt:
  - id            korte unieke code, wordt gebruikt in de link (#/client/<id>)
  - aanhef, voornaam, achternaam, roepnaam
  - adres, postcode, woonplaats, telefoon, geboortedatum (dd-mm-jjjj)
  - huisarts, clientnummer
  - zorg          lijst met soorten zorg
  - financiering  bijv. "PGB · Wmo gemeente Gouda", "PGB · Wlz", "Particulier"
  - frequentie, urenPerBezoek, zorgverlener, indicatieTot (dd-mm-jjjj)
  - volgendBezoek { dag: "vandaag" | "ma" | "di" ..., tijd: "10:00", eind: "12:00" }
  - letOp         korte tekst voor bij binnenkomst (mag leeg zijn)
  - over          korte achtergrond
  - fijn, liever, communicatie
  - contact { naam, relatie, telefoon }
  - bijgewerkt    { datum, door }
*/
window.CLIENTEN = [
  {
    id: "annie",
    aanhef: "Mevr.", voornaam: "Annie", achternaam: "de Vries-Bakker", roepnaam: "Annie",
    adres: "Voorbeeldstraat 12", postcode: "2801 AB", woonplaats: "Gouda",
    telefoon: "0182 000000", geboortedatum: "14-03-1942",
    huisarts: "[Naam huisarts]", clientnummer: "C-0001",
    zorg: ["Begeleiding", "Gezelschap", "Hulp in huis", "Respijtzorg"],
    financiering: "PGB · Wmo gemeente Gouda",
    frequentie: "2× per week · di & vr", urenPerBezoek: "2 uur",
    zorgverlener: "[Naam zorgverlener]", indicatieTot: "31-03-2027",
    volgendBezoek: { dag: "vandaag", tijd: "10:00", eind: "12:00" },
    letOp: "Sleutel in sleutelkluis naast voordeur (code bij coördinator). Hond Max is lief maar springt op.",
    over: "Woont zelfstandig sinds haar man overleed. Dochter Marja is mantelzorger en werkt overdag. Beginnende vergeetachtigheid; vindt een vaste structuur en een bekend gezicht prettig.",
    fijn: "wandelen in het park, oude foto’s kijken, koffie met een koekje.",
    liever: "haast, harde tv, onverwachte wisselingen.",
    communicatie: "slechthorend links, rustig en duidelijk praten.",
    contact: { naam: "Marja de Vries", relatie: "Dochter · mantelzorger", telefoon: "06 00000000" },
    bijgewerkt: { datum: "[datum]", door: "[naam]" }
  },
  {
    id: "henk",
    aanhef: "Dhr.", voornaam: "Henk", achternaam: "Brouwer", roepnaam: "Henk",
    adres: "Voorbeeldlaan 4", postcode: "2741 AA", woonplaats: "Waddinxveen",
    telefoon: "0182 000001", geboortedatum: "02-11-1946",
    huisarts: "[Naam huisarts]", clientnummer: "C-0002",
    zorg: ["Respijtzorg", "Gezelschap"],
    financiering: "Particulier",
    frequentie: "1× per week · do", urenPerBezoek: "4 uur",
    zorgverlener: "[Naam zorgverlener]", indicatieTot: "n.v.t.",
    volgendBezoek: { dag: "vandaag", tijd: "13:30", eind: "17:30" },
    letOp: "Echtgenote Riet is thuis en gaat op pad zodra je er bent: neem de overdracht even met haar door.",
    over: "Oud-timmerman. Zijn vrouw is mantelzorger; jullie bezoek geeft haar een vrije middag.",
    fijn: "voetbal kijken, klusjes in de schuur, sterke verhalen vertellen.",
    liever: "betutteld worden.",
    communicatie: "direct en met humor.",
    contact: { naam: "Riet Brouwer", relatie: "Echtgenote · mantelzorger", telefoon: "06 00000001" },
    bijgewerkt: { datum: "[datum]", door: "[naam]" }
  },
  {
    id: "truus",
    aanhef: "Mevr.", voornaam: "Truus", achternaam: "Jansen", roepnaam: "Truus",
    adres: "Voorbeeldweg 27", postcode: "2811 AB", woonplaats: "Reeuwijk",
    telefoon: "0182 000002", geboortedatum: "21-06-1938",
    huisarts: "[Naam huisarts]", clientnummer: "C-0003",
    zorg: ["Gezelschap", "Begeleiding"],
    financiering: "PGB · Wlz",
    frequentie: "3× per week · ma, wo & do", urenPerBezoek: "1,5 uur",
    zorgverlener: "[Naam zorgverlener]", indicatieTot: "15-10-2026",
    volgendBezoek: { dag: "vandaag", tijd: "16:00", eind: "17:30" },
    letOp: "",
    over: "Woont aan de plas en zit graag in de serre. Zoon woont in het buitenland en belt elke zondag.",
    fijn: "puzzels, klassieke muziek, vogels kijken.",
    liever: "drukte en veel mensen tegelijk.",
    communicatie: "praat zacht; ga naast haar zitten.",
    contact: { naam: "Peter Jansen", relatie: "Zoon", telefoon: "+31 6 00000002" },
    bijgewerkt: { datum: "[datum]", door: "[naam]" }
  },
  {
    id: "kees",
    aanhef: "Dhr.", voornaam: "Kees", achternaam: "Meijer", roepnaam: "Kees",
    adres: "Voorbeeldsingel 8", postcode: "2802 AC", woonplaats: "Gouda",
    telefoon: "0182 000003", geboortedatum: "09-01-1950",
    huisarts: "[Naam huisarts]", clientnummer: "C-0004",
    zorg: ["Begeleid vervoer"],
    financiering: "Particulier",
    frequentie: "Op afspraak", urenPerBezoek: "wisselend",
    zorgverlener: "[Naam zorgverlener]", indicatieTot: "n.v.t.",
    volgendBezoek: { dag: "vr", tijd: "09:30", eind: "11:30" },
    letOp: "Gebruikt een rollator; die past in de kofferbak.",
    over: "Gaat graag zelf naar afspraken, maar rijdt geen auto meer.",
    fijn: "op tijd zijn, de krant.",
    liever: "wachten zonder uitleg.",
    communicatie: "vooraf de planning even doornemen.",
    contact: { naam: "Ingrid Meijer", relatie: "Nicht", telefoon: "06 00000003" },
    bijgewerkt: { datum: "[datum]", door: "[naam]" }
  },
  {
    id: "ria",
    aanhef: "Mevr.", voornaam: "Ria", achternaam: "Smit", roepnaam: "Ria",
    adres: "Voorbeeldkade 3", postcode: "2841 AA", woonplaats: "Moordrecht",
    telefoon: "0182 000004", geboortedatum: "30-08-1944",
    huisarts: "[Naam huisarts]", clientnummer: "C-0005",
    zorg: ["Hulp in huis", "Gezelschap"],
    financiering: "PGB · Wmo",
    frequentie: "1× per week · za", urenPerBezoek: "3 uur",
    zorgverlener: "[Naam zorgverlener]", indicatieTot: "01-06-2027",
    volgendBezoek: { dag: "za", tijd: "11:00", eind: "14:00" },
    letOp: "",
    over: "Actief in de buurt en kerkkoor; wil haar huis netjes houden maar het lukt alleen niet meer.",
    fijn: "samen boodschappen doen, zingen.",
    liever: "dat er spullen worden verplaatst zonder te vragen.",
    communicatie: "graag even koffie bij aankomst.",
    contact: { naam: "Anja Smit", relatie: "Dochter", telefoon: "06 00000004" },
    bijgewerkt: { datum: "[datum]", door: "[naam]" }
  },
  {
    id: "visser",
    aanhef: "Fam.", voornaam: "", achternaam: "Visser", roepnaam: "Fam. Visser",
    adres: "Voorbeeldhof 15", postcode: "2411 AB", woonplaats: "Bodegraven",
    telefoon: "0172 000005", geboortedatum: "—",
    huisarts: "[Naam huisarts]", clientnummer: "C-0006",
    zorg: ["Gezinshulp"],
    financiering: "PGB · Wmo",
    frequentie: "1× per week · di", urenPerBezoek: "3 uur",
    zorgverlener: "[Naam zorgverlener]", indicatieTot: "31-12-2026",
    volgendBezoek: { dag: "di", tijd: "15:00", eind: "18:00" },
    letOp: "Kinderen komen om 15:15 uit school.",
    over: "Jong gezin met drie kinderen; ondersteuning bij structuur rond eten en bedtijd.",
    fijn: "vaste routines, samen koken.",
    liever: "last-minute wijzigingen.",
    communicatie: "afspraken via moeder (Linda).",
    contact: { naam: "Linda Visser", relatie: "Moeder", telefoon: "06 00000005" },
    bijgewerkt: { datum: "[datum]", door: "[naam]" }
  },
  {
    id: "wim",
    aanhef: "Dhr.", voornaam: "Wim", achternaam: "Dekker", roepnaam: "Wim",
    adres: "Voorbeeldstraat 40", postcode: "2851 AB", woonplaats: "Haastrecht",
    telefoon: "0182 000006", geboortedatum: "17-04-1941",
    huisarts: "[Naam huisarts]", clientnummer: "C-0007",
    zorg: ["Begeleiding"],
    financiering: "PGB · Wlz",
    frequentie: "2× per week · ma & wo", urenPerBezoek: "2 uur",
    zorgverlener: "[Naam zorgverlener]", indicatieTot: "30-09-2027",
    volgendBezoek: { dag: "wo", tijd: "10:00", eind: "12:00" },
    letOp: "",
    over: "Oud-schipper, woont met zijn kat Dirk. Casemanager dementie is betrokken.",
    fijn: "verhalen over de binnenvaart, een rondje langs de IJssel.",
    liever: "een andere zorgverlener dan hij gewend is.",
    communicatie: "korte zinnen, één vraag tegelijk.",
    contact: { naam: "[Naam casemanager]", relatie: "Casemanager dementie", telefoon: "[telefoon]" },
    bijgewerkt: { datum: "[datum]", door: "[naam]" }
  }
];
