"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, ReactNode } from "react";

export type Lang = "en" | "pl" | "is";
export const LANGS: Lang[] = ["en", "pl", "is"];

const dict: Record<Lang, Record<string, string>> = {
  en: {
    "nav.about": "About Us", "nav.fleet": "Our Fleet", "nav.services": "Services", "nav.reviews": "Reviews", "nav.contact": "Contact Us", "nav.requestQuote": "Request Quote", "nav.back": "Back to mountaincar.is", "nav.hours": "Mon - Sat: 10:00 - 18:00",
    "hero.kicker": "Your Nordic Experience", "hero.title1": "Not Just A Rental.", "hero.title2": "Your Guide To Iceland's Wonders.", "hero.sub": "Looking for a straightforward, no-nonsense car rental? You've come to the right place — that's exactly what we do at Mountain Car.", "hero.ctaChoose": "Choose Your Car", "hero.ctaServices": "Our Services", "hero.feat1": "No Hidden Fees", "hero.feat2": "Free Minor Damages", "hero.cardTitle": "Get Started", "hero.cardSub": "Simple & Direct Booking", "hero.cardText": "We skip the complicated booking engines to give you the best personal service and rates. Fill out our simple request form and we'll get back to you instantly.", "hero.cardCta": "Request a Quote Now", "hero.cardNote": "*Drivers must be 20+ years old",
    "about.kicker": "Our Philosophy", "about.title": "Built on Trust, Not Policies", "about.p1": "We don't believe in the stiff, corporate way of doing things. At Mountain Car, we don't see you as a contract number or a risk factor — we see you as a friend visiting our home.", "about.p2": "Our business is built entirely on trust. We hand you the keys with full confidence, believing that you will care for our cars as if they were your own. In return, we offer you a rental experience that is personal, flexible, and free from hidden traps.", "about.p3": "We treat our customers the way we would like to be treated: with honesty, warmth, and a lot of heart.", "about.role": "Owner & Founder", "about.badge1": "Born in Iceland", "about.badge2": "Est. 2017",
    "values.title": "Actually, it's never about us", "values.sub": "At Mountain Car, it's all about you. We understand that a trip to Iceland is more than just a vacation — it's a journey into the heart of some of the world's most breathtaking landscapes.", "values.v1t": "Honesty & Transparency", "values.v1d": "We believe in clear communication. No hidden fees, no surprises. The price quoted is the price you pay.", "values.v2t": "Customer-Focused", "values.v2d": "Friendly approach and 24/7 support. We are here to assist you every step of the way with a smile.", "values.v3t": "Value for Money", "values.v3d": "Competitive prices and we don't charge for minor damages. We focus on your experience, not expenses.", "values.v4t": "Local Insights", "values.v4d": "Get the best out of your trip with our expert tips. Tap into our wealth of knowledge to find hidden gems.",
    "how.kicker": "Simple Booking", "how.title": "How It Works", "how.s1t": "Request a Quote", "how.s1d": "Fill out our simple form with your dates and preferred vehicle. No upfront payment required.", "how.s2t": "Receive Offer", "how.s2d": "We check availability and send you a personalized offer with the best possible price.", "how.s3t": "Start Driving", "how.s3d": "Confirm your booking, pick up your keys at our office (or airport), and explore Iceland!",
    "services.kicker": "What We Offer", "services.title": "Our Services", "services.sub": "From a single day to a month-long road trip — we have the right vehicle and service for you.", "services.s1t": "Car Rental", "services.s1d": "Comfortable, reliable cars for getting around Iceland. Perfect for the Ring Road, the Golden Circle and everyday driving.", "services.s1h": "From Day 1", "services.s2t": "Camper Rental", "services.s2d": "Hit the road and sleep under the midnight sun in our Renault Master Camper — fully equipped for a self-sufficient trip.", "services.s2h": "Sleep-In Ready", "services.s3t": "Airport Pickup", "services.s3d": "Arrive at KEF and drive straight off. We're just 5 minutes from the airport — no shuttles, no waiting.", "services.s3h": "5 min from KEF", "services.s4t": "Long-Term Rentals", "services.s4d": "Staying for a month or more? Ask about our long-term rates. Special prices for long stays or work contracts.", "services.s4h": "Best Rates", "services.browse": "Browse Our Fleet",
    "fleet.kicker": "Our Fleet", "fleet.title": "Find the Perfect Car", "fleet.requestQuote": "Request Quote", "fleet.d3": "Spacious camper with manual transmission and all the essentials for your journey.", "fleet.d4": "Compact camper for 4–5 people. Rooftop tent, camping kit, free WiFi — perfect for couples or small groups.", "fleet.d5": "Spacious 9-seat passenger van — ideal for groups, families and airport transfers with plenty of luggage room.", "spec.Seats": "Seats", "spec.Doors": "Doors", "spec.Fuel": "Fuel", "spec.Gearbox": "Gearbox", "spec.Cargo": "Cargo", "spec.AC": "A/C", "spec.Engine": "Engine", "spec.Drive": "Drive", "spec.Tent": "Tent", "spec.WiFi": "WiFi", "val.Manual": "Manual", "val.Rooftop": "Rooftop", "val.Free": "Free",
    "addons.kicker": "Enhance Your Trip", "addons.title": "Essential Add-Ons", "addon.gps": "GPS Navigation", "addon.wifi": "Wi-Fi Hotspots", "addon.tent": "Tent & Camping Gear", "addon.cooler": "Portable Coolers", "addon.heating": "Cabin Heating", "addon.childseat": "Child Seats", "addon.roofrack": "Roof Racks", "addon.gas": "Gas Bottles",
    "reviews.title": "What Clients Say", "review.1": "Renting from Mountain Car was a breeze. They set me up with the perfect car for my trip.", "review.2": "Mountain Car made it easy. Their transparency about costs meant no unpleasant surprises.", "review.3": "The vehicle was superb and came with all the amenities. The free minor damage policy was a relief.", "review.4": "No hidden fees, and their loyalty program is a perk. The staff's friendliness was impressive. We'll be back!",
    "quote.title": "Request a Quote", "quote.sub": "Tell us your dates and preferred vehicle, and we'll send you a personalized offer.", "quote.successTitle": "Quote Request Sent!", "quote.successText": "We'll get back to you as soon as possible with a personalized offer.", "quote.name": "Full Name *", "quote.phone": "Phone Number *", "quote.email": "Email Address *", "quote.pickup": "Pick-up Date *", "quote.return": "Return Date *", "quote.vehicle": "Preferred Vehicle", "quote.message": "Message (Optional)", "quote.namePh": "John Smith", "quote.messagePh": "Any specific requirements or questions...", "quote.vehicleOther": "Other / Unsure", "quote.sending": "Sending...", "quote.send": "Send Request", "quote.ssl": "SSL Secure", "quote.error": "Something went wrong. Please email us directly at rental@mountaincar.is",
    "loc.title": "Visit Our Office", "loc.sub": "Just 5 minutes from KEF Airport. Easy access to the main highway.", "loc.directions": "Get Directions",
    "cta.subQuote": "“It will all work out.” It's not just a motto, it's the Icelandic way of life. Don't worry, enjoy the drive.", "cta.sign": "— With Love, Mountain Car",
    "footer.blurb": "Providing top-notch car and camper rentals and mechanical services in Iceland. Travel with confidence.", "footer.contact": "Contact Us", "footer.quickLinks": "Quick Links", "footer.longTerm": "Long Term Rentals", "footer.privacy": "Privacy Policy", "footer.terms": "Terms & Conditions", "footer.hours": "Opening Hours", "footer.monSat": "Monday – Saturday:", "footer.sunday": "Sunday:", "footer.closed": "Closed", "footer.needHelp": "Need Help?", "footer.needHelpText": "Call us anytime for roadside assistance or booking inquiries.", "footer.rights": "All Rights Reserved.",
    "wa.chat": "Chat with us!",
  },
  pl: {
    "nav.about": "O nas", "nav.fleet": "Nasza flota", "nav.services": "Usługi", "nav.reviews": "Opinie", "nav.contact": "Kontakt", "nav.requestQuote": "Zapytaj o wycenę", "nav.back": "Powrót do mountaincar.is", "nav.hours": "Pon - Sob: 10:00 - 18:00",
    "hero.kicker": "Twoje nordyckie doświadczenie", "hero.title1": "To nie tylko wynajem.", "hero.title2": "To Twój przewodnik po cudach Islandii.", "hero.sub": "Szukasz prostego wynajmu auta, bez kombinowania? Trafiłeś idealnie. Właśnie to robimy w Mountain Car.", "hero.ctaChoose": "Wybierz swoje auto", "hero.ctaServices": "Nasze usługi", "hero.feat1": "Bez ukrytych opłat", "hero.feat2": "Drobne rysy gratis", "hero.cardTitle": "Zacznij tutaj", "hero.cardSub": "Prosta i bezpośrednia rezerwacja", "hero.cardText": "Odpuszczamy sobie skomplikowane systemy rezerwacji, żeby dać Ci najlepszą, osobistą obsługę i ceny. Wypełnij prosty formularz, a my odezwiemy się od razu.", "hero.cardCta": "Zapytaj o wycenę teraz", "hero.cardNote": "*Kierowcy muszą mieć ukończone 20 lat",
    "about.kicker": "Nasza filozofia", "about.title": "Oparte na zaufaniu, nie na regulaminach", "about.p1": "Nie wierzymy w sztywne, korporacyjne podejście. W Mountain Car nie jesteś dla nas numerem umowy ani czynnikiem ryzyka — jesteś przyjacielem, który odwiedza nasz dom.", "about.p2": "Nasz biznes opiera się w całości na zaufaniu. Wręczamy Ci kluczyki z pełnym przekonaniem, wierząc, że zadbasz o nasze auta jak o własne. W zamian oferujemy Ci wynajem, który jest osobisty, elastyczny i wolny od ukrytych pułapek.", "about.p3": "Traktujemy naszych klientów tak, jak sami chcielibyśmy być traktowani: z uczciwością, ciepłem i sercem.", "about.role": "Właściciel i założyciel", "about.badge1": "Założona w Islandii", "about.badge2": "Est. 2017",
    "values.title": "Tak naprawdę nigdy nie chodzi o nas", "values.sub": "W Mountain Car liczysz się Ty. Wiemy, że podróż na Islandię to coś więcej niż wakacje — to szansa, by zobaczyć jedne z najbardziej zapierających dech krajobrazów świata.", "values.v1t": "Uczciwość i przejrzystość", "values.v1d": "Stawiamy na jasną komunikację. Bez ukrytych opłat, bez niespodzianek. Cena, którą podajemy, to cena, którą płacisz.", "values.v2t": "Zorientowani na klienta", "values.v2d": "Przyjazne podejście i wsparcie 24/7. Jesteśmy tu, by pomóc Ci na każdym kroku — z uśmiechem.", "values.v3t": "Wartość za swoje pieniądze", "values.v3d": "Konkurencyjne ceny i nie liczymy za drobne rysy. Skupiamy się na Twoich wrażeniach, nie na kosztach.", "values.v4t": "Lokalna wiedza", "values.v4d": "Wyciśnij ze swojej podróży maksimum dzięki naszym wskazówkom. Skorzystaj z naszej wiedzy i odkryj miejsca, których nie ma w przewodnikach.",
    "how.kicker": "Prosta rezerwacja", "how.title": "Jak to działa", "how.s1t": "Zapytaj o wycenę", "how.s1d": "Wypełnij prosty formularz z datami i wybranym autem. Bez płatności z góry.", "how.s2t": "Odbierz ofertę", "how.s2d": "Sprawdzamy dostępność i wysyłamy Ci spersonalizowaną ofertę w najlepszej możliwej cenie.", "how.s3t": "Ruszaj w drogę", "how.s3d": "Potwierdź rezerwację, odbierz kluczyki w naszym biurze (lub na lotnisku) i odkrywaj Islandię!",
    "services.kicker": "Co oferujemy", "services.title": "Nasze usługi", "services.sub": "Od jednego dnia po miesięczny road trip — mamy dla Ciebie odpowiednie auto i obsługę.", "services.s1t": "Wynajem aut", "services.s1d": "Wygodne, niezawodne auta do poruszania się po Islandii. Idealne na Ring Road, Złoty Krąg i codzienną jazdę.", "services.s1h": "Już od 1 dnia", "services.s2t": "Wynajem kampera", "services.s2d": "Ruszaj w trasę i śpij pod nocnym słońcem w naszym Renault Master Camper — w pełni wyposażonym na samodzielną podróż.", "services.s2h": "Gotowy do spania", "services.s3t": "Odbiór z lotniska", "services.s3d": "Wyląduj na KEF i od razu ruszaj w drogę. Jesteśmy zaledwie 5 minut od lotniska — żadnych autobusów, żadnego czekania.", "services.s3h": "5 min od KEF", "services.s4t": "Wynajem długoterminowy", "services.s4d": "Zostajesz na miesiąc lub dłużej? Zapytaj o nasze stawki długoterminowe. Specjalne ceny na dłuższe pobyty lub kontrakty.", "services.s4h": "Najlepsze stawki", "services.browse": "Przeglądaj naszą flotę",
    "fleet.kicker": "Nasza flota", "fleet.title": "Znajdź idealne auto", "fleet.requestQuote": "Zapytaj o wycenę", "fleet.d3": "Przestronny kamper z manualną skrzynią biegów i wszystkim, czego potrzebujesz w podróży.", "fleet.d4": "Kompaktowy kamper dla 4–5 osób. Namiot dachowy, sprzęt kempingowy, darmowe WiFi — idealny dla par i małych grup.", "fleet.d5": "Przestronny 9-osobowy bus — idealny dla grup, rodzin i transferów z lotniska, z dużą przestrzenią na bagaż.", "spec.Seats": "Miejsca", "spec.Doors": "Drzwi", "spec.Fuel": "Paliwo", "spec.Gearbox": "Skrzynia biegów", "spec.Cargo": "Bagażnik", "spec.AC": "Klimatyzacja", "spec.Engine": "Silnik", "spec.Drive": "Napęd", "spec.Tent": "Namiot", "spec.WiFi": "WiFi", "val.Manual": "Manualna", "val.Rooftop": "Dachowy", "val.Free": "Gratis",
    "addons.kicker": "Ulepsz swoją podróż", "addons.title": "Niezbędne dodatki", "addon.gps": "Nawigacja GPS", "addon.wifi": "Hotspoty Wi-Fi", "addon.tent": "Namiot i sprzęt kempingowy", "addon.cooler": "Przenośne lodówki turystyczne", "addon.heating": "Ogrzewanie w kabinie", "addon.childseat": "Foteliki dziecięce", "addon.roofrack": "Bagażniki dachowe", "addon.gas": "Butle gazowe",
    "reviews.title": "Co mówią klienci", "review.1": "Wynajem w Mountain Car to była bułka z masłem. Dostałem idealne auto na moją podróż.", "review.2": "Mountain Car wszystko ułatwiło. Dzięki ich przejrzystości w kwestii kosztów nie było żadnych przykrych niespodzianek.", "review.3": "Auto było świetne i miało wszystkie udogodnienia. Zasada darmowych drobnych rys była dużą ulgą.", "review.4": "Bez ukrytych opłat, a ich program lojalnościowy to miły bonus. Życzliwość obsługi robiła wrażenie. Jeszcze tu wrócimy!",
    "quote.title": "Zapytaj o wycenę", "quote.sub": "Podaj nam daty i wybrane auto, a my prześlemy Ci spersonalizowaną ofertę.", "quote.successTitle": "Zapytanie wysłane!", "quote.successText": "Odezwiemy się do Ciebie najszybciej, jak to możliwe, ze spersonalizowaną ofertą.", "quote.name": "Imię i nazwisko *", "quote.phone": "Numer telefonu *", "quote.email": "Adres e-mail *", "quote.pickup": "Data odbioru *", "quote.return": "Data zwrotu *", "quote.vehicle": "Wybrane auto", "quote.message": "Wiadomość (opcjonalnie)", "quote.namePh": "Jan Kowalski", "quote.messagePh": "Jakieś szczególne wymagania lub pytania...", "quote.vehicleOther": "Inne / Nie jestem pewien", "quote.sending": "Wysyłanie...", "quote.send": "Wyślij zapytanie", "quote.ssl": "Bezpieczne SSL", "quote.error": "Coś poszło nie tak. Napisz do nas bezpośrednio na rental@mountaincar.is",
    "loc.title": "Odwiedź nasze biuro", "loc.sub": "Zaledwie 5 minut od lotniska KEF. Łatwy dojazd do głównej drogi.", "loc.directions": "Wyznacz trasę",
    "cta.subQuote": "„Jakoś to będzie.” To nie tylko motto, to islandzki styl życia. Bez stresu, ciesz się jazdą.", "cta.sign": "— Z miłością, Mountain Car",
    "footer.blurb": "Oferujemy najwyższej jakości wynajem aut i kamperów oraz usługi mechaniczne w Islandii. Podróżuj ze spokojem.", "footer.contact": "Kontakt", "footer.quickLinks": "Szybkie linki", "footer.longTerm": "Wynajem długoterminowy", "footer.privacy": "Polityka prywatności", "footer.terms": "Regulamin", "footer.hours": "Godziny otwarcia", "footer.monSat": "Poniedziałek – Sobota:", "footer.sunday": "Niedziela:", "footer.closed": "Zamknięte", "footer.needHelp": "Potrzebujesz pomocy?", "footer.needHelpText": "Zadzwoń o każdej porze w sprawie pomocy drogowej lub rezerwacji.", "footer.rights": "Wszelkie prawa zastrzeżone.",
    "wa.chat": "Napisz do nas!",
  },
  is: {
    "nav.about": "Um okkur", "nav.fleet": "Bílaflotinn okkar", "nav.services": "Þjónusta", "nav.reviews": "Umsagnir", "nav.contact": "Hafðu samband", "nav.requestQuote": "Fá verðtilboð", "nav.back": "Til baka á mountaincar.is", "nav.hours": "Mán - Lau: 10:00 - 18:00",
    "hero.kicker": "Þín norræna upplifun", "hero.title1": "Ekki bara bílaleiga.", "hero.title2": "Leiðsögumaðurinn þinn um undur Íslands.", "hero.sub": "Ertu að leita að einfaldri og óbrotinni bílaleigu? Þá ertu kominn á réttan stað — það er einmitt það sem við gerum hjá Mountain Car.", "hero.ctaChoose": "Veldu bílinn þinn", "hero.ctaServices": "Þjónustan okkar", "hero.feat1": "Engin falin gjöld", "hero.feat2": "Smáskemmdir innifaldar", "hero.cardTitle": "Byrjaðu hér", "hero.cardSub": "Einföld og bein bókun", "hero.cardText": "Við sleppum flóknu bókunarkerfunum til að bjóða þér bestu persónulegu þjónustuna og verðin. Fylltu út einfalda fyrirspurnareyðublaðið okkar og við svörum þér samstundis.", "hero.cardCta": "Fáðu verðtilboð núna", "hero.cardNote": "*Ökumenn verða að vera 20 ára eða eldri",
    "about.kicker": "Lífsspeki okkar", "about.title": "Byggt á trausti, ekki reglum", "about.p1": "Við trúum ekki á stífa og fyrirtækjalega leið til að gera hlutina. Hjá Mountain Car lítum við ekki á þig sem samningsnúmer eða áhættuþátt — við lítum á þig sem vin sem kemur í heimsókn til okkar.", "about.p2": "Reksturinn okkar er algjörlega byggður á trausti. Við réttum þér lyklana með fullu trausti og treystum því að þú hugsir um bílana okkar eins og þeir væru þínir eigin. Í staðinn bjóðum við þér bílaleiguupplifun sem er persónuleg, sveigjanleg og laus við faldar gildrur.", "about.p3": "Við komum fram við viðskiptavini okkar eins og við viljum að komið sé fram við okkur sjálf: af heiðarleika, hlýju og af heilum hug.", "about.role": "Eigandi og stofnandi", "about.badge1": "Stofnað á Íslandi", "about.badge2": "Est. 2017",
    "values.title": "Þetta snýst í raun aldrei um okkur", "values.sub": "Hjá Mountain Car snýst allt um þig. Við skiljum að ferð til Íslands er meira en bara frí — hún er ferðalag inn í hjarta nokkurra stórfenglegustu landslaga heims.", "values.v1t": "Heiðarleiki og gagnsæi", "values.v1d": "Við trúum á skýr samskipti. Engin falin gjöld, engar óvæntar uppákomur. Verðið sem þú færð tilboð um er verðið sem þú greiðir.", "values.v2t": "Viðskiptavinurinn í fyrirrúmi", "values.v2d": "Vinaleg nálgun og aðstoð allan sólarhringinn. Við erum hér til að aðstoða þig hvert skref á leiðinni með bros á vör.", "values.v3t": "Verðmæti fyrir peningana", "values.v3d": "Samkeppnishæf verð og við rukkum ekki fyrir smáskemmdir. Við einbeitum okkur að upplifun þinni, ekki kostnaði.", "values.v4t": "Staðbundin þekking", "values.v4d": "Fáðu sem mest út úr ferðinni þinni með góðum ráðum frá okkur. Nýttu þér víðtæka þekkingu okkar til að finna falda gimsteina.",
    "how.kicker": "Einföld bókun", "how.title": "Hvernig það virkar", "how.s1t": "Fáðu verðtilboð", "how.s1d": "Fylltu út einfalda eyðublaðið okkar með dagsetningunum þínum og þeim bíl sem þú vilt. Engin fyrirframgreiðsla.", "how.s2t": "Fáðu tilboð", "how.s2d": "Við könnum framboð og sendum þér persónulegt tilboð á besta mögulega verði.", "how.s3t": "Leggðu af stað", "how.s3d": "Staðfestu bókunina, sæktu lyklana á skrifstofuna okkar (eða á flugvöllinn) og kannaðu Ísland!",
    "services.kicker": "Það sem við bjóðum", "services.title": "Þjónustan okkar", "services.sub": "Frá einum degi til mánaðarlangrar leigu — við höfum réttan bíl og þjónustu fyrir þig.", "services.s1t": "Bílaleiga", "services.s1d": "Þægilegir og áreiðanlegir bílar til að ferðast um Ísland. Fullkomnir fyrir Ring Road, Golden Circle og daglegan akstur.", "services.s1h": "Frá fyrsta degi", "services.s2t": "Húsbílaleiga", "services.s2d": "Leggðu af stað og sofðu undir miðnætursólinni í Renault Master Camper okkar — fullbúnum fyrir sjálfstæða ferð.", "services.s2h": "Tilbúinn til gistingar", "services.s3t": "Sótt á flugvöll", "services.s3d": "Lentu á KEF og keyrðu beint af stað. Við erum aðeins 5 mínútur frá flugvellinum — engar rútur, engin bið.", "services.s3h": "5 mín frá KEF", "services.s4t": "Langtímaleiga", "services.s4d": "Dvelur þú í mánuð eða lengur? Spurðu um langtímaverðin okkar. Sérstök verð fyrir lengri dvöl eða vinnusamninga.", "services.s4h": "Bestu verðin", "services.browse": "Skoðaðu bílaflotann okkar",
    "fleet.kicker": "Bílaflotinn okkar", "fleet.title": "Finndu fullkomna bílinn", "fleet.requestQuote": "Fá verðtilboð", "fleet.d3": "Rúmgóður húsbíll með beinskiptingu og öllu því nauðsynlega fyrir ferðalagið þitt.", "fleet.d4": "Nettur húsbíll fyrir 4–5 manns. Þaktjald, tjaldbúnaður, frítt WiFi — fullkominn fyrir pör eða litla hópa.", "fleet.d5": "Rúmgóður 9 manna bíll — fullkominn fyrir hópa, fjölskyldur og flugvallarferðir með nóg pláss fyrir farangur.", "spec.Seats": "Sæti", "spec.Doors": "Hurðir", "spec.Fuel": "Eldsneyti", "spec.Gearbox": "Gírkassi", "spec.Cargo": "Farangursrými", "spec.AC": "Loftkæling", "spec.Engine": "Vél", "spec.Drive": "Drif", "spec.Tent": "Tjald", "spec.WiFi": "WiFi", "val.Manual": "Beinskiptur", "val.Rooftop": "Þaktjald", "val.Free": "Frítt",
    "addons.kicker": "Bættu ferðina þína", "addons.title": "Nauðsynlegir aukahlutir", "addon.gps": "GPS leiðsögn", "addon.wifi": "Wi-Fi heitir reitir", "addon.tent": "Tjald og tjaldbúnaður", "addon.cooler": "Færanlegir kælir", "addon.heating": "Miðstöðvarhiti", "addon.childseat": "Barnabílstólar", "addon.roofrack": "Þakgrindur", "addon.gas": "Gaskútar",
    "reviews.title": "Hvað viðskiptavinir segja", "review.1": "Það var leikur einn að leigja hjá Mountain Car. Þeir útveguðu mér fullkominn bíl fyrir ferðina.", "review.2": "Mountain Car gerði þetta auðvelt. Gagnsæi þeirra um kostnað þýddi engar leiðinlegar óvæntar uppákomur.", "review.3": "Bíllinn var frábær og kom með öllum þægindum. Stefnan um fríar smáskemmdir var léttir.", "review.4": "Engin falin gjöld, og tryggðakerfið þeirra er kostur. Vinalegt viðmót starfsfólksins var áhrifamikið. Við komum aftur!",
    "quote.title": "Fá verðtilboð", "quote.sub": "Segðu okkur dagsetningarnar þínar og hvaða bíl þú vilt, og við sendum þér persónulegt tilboð.", "quote.successTitle": "Fyrirspurn um tilboð send!", "quote.successText": "Við svörum þér eins fljótt og auðið er með persónulegu tilboði.", "quote.name": "Fullt nafn *", "quote.phone": "Símanúmer *", "quote.email": "Netfang *", "quote.pickup": "Afhendingardagur *", "quote.return": "Skiladagur *", "quote.vehicle": "Bíll að eigin vali", "quote.message": "Skilaboð (valfrjálst)", "quote.namePh": "Jón Jónsson", "quote.messagePh": "Sérstakar óskir eða spurningar...", "quote.vehicleOther": "Annað / óviss", "quote.sending": "Sendi...", "quote.send": "Senda fyrirspurn", "quote.ssl": "SSL öruggt", "quote.error": "Eitthvað fór úrskeiðis. Vinsamlegast sendu okkur tölvupóst beint á rental@mountaincar.is",
    "loc.title": "Heimsæktu skrifstofuna okkar", "loc.sub": "Aðeins 5 mínútur frá KEF flugvelli. Greiður aðgangur að þjóðveginum.", "loc.directions": "Fá leiðarlýsingu",
    "cta.subQuote": "„Þetta reddast.” Þetta er ekki bara einkunnarorð, þetta er íslenski lífsmátinn. Hafðu engar áhyggjur, njóttu ferðarinnar.", "cta.sign": "— Með ástarkveðju, Mountain Car",
    "footer.blurb": "Við bjóðum upp á fyrsta flokks bílaleigu, húsbíla og vélaviðgerðir á Íslandi. Ferðastu af öryggi.", "footer.contact": "Hafðu samband", "footer.quickLinks": "Flýtileiðir", "footer.longTerm": "Langtímaleiga", "footer.privacy": "Persónuverndarstefna", "footer.terms": "Skilmálar og skilyrði", "footer.hours": "Opnunartími", "footer.monSat": "Mánudagur – laugardagur:", "footer.sunday": "Sunnudagur:", "footer.closed": "Lokað", "footer.needHelp": "Þarftu aðstoð?", "footer.needHelpText": "Hringdu í okkur hvenær sem er fyrir vegaaðstoð eða fyrirspurnir um bókanir.", "footer.rights": "Allur réttur áskilinn.",
    "wa.chat": "Spjallaðu við okkur!",
  },
};

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (k: string) => string };
const LangContext = createContext<Ctx>({ lang: "en", setLang: () => {}, t: (k) => k });

// Jezyk trzymany poza Reactem (localStorage + fallback w pamieci), czytany przez
// useSyncExternalStore — na serwerze zawsze "en", wiec hydracja jest spojna.
const LANG_EVENT = "mc-lang-change";
let currentLang: Lang | undefined;

function readLang(): Lang {
  let saved: Lang | null = null;
  try { saved = localStorage.getItem("mc-lang") as Lang | null; } catch {}
  if (saved && LANGS.includes(saved)) return saved;
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  return nav === "pl" ? "pl" : nav === "is" ? "is" : "en";
}

function getLangSnapshot(): Lang {
  if (currentLang === undefined) currentLang = readLang();
  return currentLang;
}

function subscribeLang(onChange: () => void) {
  const onStorage = () => {
    currentLang = undefined; // zmiana w innej karcie — przeczytaj localStorage na nowo
    onChange();
  };
  window.addEventListener(LANG_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(LANG_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function LangProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribeLang, getLangSnapshot, () => "en" as Lang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = (l: Lang) => {
    currentLang = l;
    try { localStorage.setItem("mc-lang", l); } catch {}
    window.dispatchEvent(new Event(LANG_EVENT));
  };

  const t = (k: string) => (dict[lang] && dict[lang][k]) || dict.en[k] || k;

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>;
}

export const useT = () => useContext(LangContext);

const flags: Record<Lang, ReactNode> = {
  en: (
    <svg viewBox="0 0 24 12" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
      <rect width="24" height="12" fill="#012169" />
      <path d="M0 0L24 12M24 0L0 12" stroke="#fff" strokeWidth="2.5" />
      <path d="M0 0L24 12M24 0L0 12" stroke="#C8102E" strokeWidth="1.2" />
      <rect x="9.5" width="5" height="12" fill="#fff" />
      <rect y="3.5" width="24" height="5" fill="#fff" />
      <rect x="10.5" width="3" height="12" fill="#C8102E" />
      <rect y="4.5" width="24" height="3" fill="#C8102E" />
    </svg>
  ),
  pl: (
    <svg viewBox="0 0 20 12" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
      <rect width="20" height="12" fill="#fff" />
      <rect y="6" width="20" height="6" fill="#DC143C" />
    </svg>
  ),
  is: (
    <svg viewBox="0 0 25 18" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
      <rect width="25" height="18" fill="#02529C" />
      <rect x="6" width="4" height="18" fill="#fff" />
      <rect y="7" width="25" height="4" fill="#fff" />
      <rect x="7" width="2" height="18" fill="#DC1E35" />
      <rect y="8" width="25" height="2" fill="#DC1E35" />
    </svg>
  ),
};
const labels: Record<Lang, string> = { en: "English", pl: "Polski", is: "Íslenska" };

export function LangSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang } = useT();
  return (
    <div className={`flex items-center gap-1.5 ${className}`} role="group" aria-label="Language">
      {LANGS.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-label={labels[l]}
          aria-pressed={lang === l}
          title={labels[l]}
          className={`w-7 h-[18px] rounded-[3px] overflow-hidden border transition-all ${
            lang === l ? "border-brand-accent ring-1 ring-brand-accent scale-105" : "border-white/30 opacity-70 hover:opacity-100"
          }`}
        >
          {flags[l]}
        </button>
      ))}
    </div>
  );
}
