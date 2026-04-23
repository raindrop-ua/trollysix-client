export const COPY = {
  common: {
    viewSchedule: 'Zobacz rozkład',
    learnMore: 'Dowiedz się więcej',
    whyDifferent: 'Dlaczego to jest inne',
    openMainMenu: 'Otwórz menu główne',
    mainMenu: 'Menu główne',
    settings: 'Ustawienia',
    toggleTheme: 'Przełącz motyw',
    toggleFontSize: 'Zmień rozmiar czcionki',
    useNormalFontSize: 'Użyj normalnego rozmiaru czcionki',
    useLargeFontSize: 'Użyj dużego rozmiaru czcionki',
    brand: {
      first: 'Trolly',
      second: 'Six',
    },
    themeLabelPrefix: 'Motyw:',
    themeToggleHint: 'kliknij, aby przełączyć',
    navigation: {
      home: 'Strona główna',
      schedule: 'Rozkład jazdy',
      about: 'O projekcie',
    },
  },

  home: {
    title: 'Najlepszy rozkład jazdy dla trolejbusu linii 6',
    subtitle: 'Rozkład jazdy trolejbusu w mieście Dniepr.',
    masthead: {
      titleMain: 'Najlepszy rozkład',
      titleFor: 'dla trolejbusu',
      titleRoute: 'linia\u00A06',
    },
    works: {
      title: 'Po prostu działa.',
      description:
        'Bez instrukcji. Bez chaosu. Otwórz i zobacz wszystko, czego potrzebujesz. Mniej dotykania, więcej kontroli.',
    },
    precision: {
      title: 'Zaprojektowane z precyzją',
      description:
        'Każdy odjazd, każdy przyjazd — perfekcyjnie uporządkowane. Bo Twój czas zasługuje na perfekcję.',
    },
    readyForRouteSix: {
      title: 'Linia 6 — gotowy?',
    },
    bigClaims: {
      title: 'Wszystko, czego potrzebujesz, aby złapać linię\u00A06.',
      subtitle: 'I niczego, czego nie potrzebujesz.',
      description:
        'Znajdź, wybierz, jedź. To Twój kieszonkowy dyspozytor, zawsze pod ręką.',
    },
    thisIsTrollySix: {
      titleBeforeBrand: 'To nie jest po prostu transport publiczny.',
      titleAfterBreak: 'To jest Trolly',
      titleBrandSuffix: 'Six',
      description:
        'Poznaj przyszłość mobilności miejskiej — stworzoną dla tych, którzy oczekują więcej.',
      valueProps: [
        {
          title: 'Precyzja w standardzie',
          description:
            'Dokładny czas, przejrzyste statusy: przegapiony, następny, nadchodzący. Wszystko, by dotrzeć na czas — bez niespodzianek.',
        },
        {
          title: 'Zaprojektowane, by zniknąć',
          description:
            'Interfejs, który nie rozprasza. Skupiasz się tylko na trasie — bo czas jest najcenniejszy.',
        },
        {
          title: 'Stworzone na dziś',
          description:
            'Mobile first, lekkie, szybkie. Działa tak, jakby było jedyną rzeczą, której potrzebujesz.',
        },
      ],
    },
    testimonials: {
      title: 'Uwielbiane przez codziennych pasażerów',
      subtitle: 'Bez reklam. Bez szumu. Tylko to, co pomaga załatwiać sprawy.',
    },
  },

  schedule: {
    header: {
      title: 'Rozkład',
    },
    selectStop: 'Wybierz przystanek',
    scheduleValidFrom: 'Rozkład obowiązuje od',
    stop: 'Przystanek',
    stopSelected: 'Wybrany',
    stopDetails: 'Szczegóły przystanku',
    controlDay: 'Dzień',
    controlDirection: 'Kierunek',
    noDepartures: 'Brak odjazdów',
    noDeparturesFound: 'Nie znaleziono odjazdów.',
    noDeparturesFoundNote:
      'Ten przystanek może nie mieć odjazdów w wybranym kierunku. Spróbuj wybrać kierunek przeciwny.',
    departuresCountSuffix: 'odjazdów',
    stopToolbar: {
      findClosestStop: 'Znajdź najbliższy przystanek',
      findClosestStopTooltip:
        'Znajdź najbliższy przystanek na podstawie Twojej lokalizacji',
      share: 'Udostępnij',
    },
    departureTimeBar: {
      in: 'za',
      min: 'min',
      nextDepartureSr: 'Następny odjazd:',
      loading: 'Ładowanie...',
      tomorrow: 'Jutro',
    },
    departureLegend: {
      laterToday: 'Później dziś',
      soon: 'Wkrótce',
      departing: 'Odjeżdża',
      departed: 'Odjechał',
      canceled: 'Odwołany',
      soonTooltip: '≤ 15 min',
      departingTooltip: '≤ 5 min',
    },
    departureConfig: {
      showScheduleNumber: 'Pokaż numer rozkładu',
    },
    sharedRoutes: {
      title: 'Wspólne trasy',
      noSharedRoutes: 'Brak wspólnych tras',
    },
    weather: {
      title: 'Pogoda',
      feelsLike: 'Odczuwalna',
      pressure: 'Ciśnienie',
      humidity: 'Wilgotność',
      wind: 'Wiatr',
      sunrise: 'Wschód słońca',
      sunset: 'Zachód słońca',
      gust: 'porywy',
      mps: 'm/s',
      hpa: 'hPa',
    },
    geoBadge: {
      openInGoogleMaps: 'Otwórz w Google Maps',
    },
  },

  about: {
    header: {
      title: 'O linii 6',
      subtitle:
        'Krótka historia wyjątkowej linii trolejbusowej — łączącej dzielnice z sercem miasta.',
    },
    generalDescription: [
      'Trasa łączy urokliwą dzielnicę mieszkaniową Pridniprowskyj, lokalnie nazywaną po prostu Pridniprowsk, z centrum miasta.',
      `12 września 2020 roku — w Dniu Miasta — uruchomiono linię trolejbusową nr 6.`,
      `Zjeżdżając z alei Dmytra Jawornyckiego, trolejbus jedzie wzdłuż Nabrzeża Peremohy, nie wjeżdżając na osiedla mieszkaniowe, i kieruje się w stronę Mostu Południowego. Po przekroczeniu mostu kontynuuje trasę ulicą Hawańską, mijając Pridniprowską Elektrociepłownię.
Następnie trasa biegnie ulicami Elektryczną, Kolską oraz 20-lecia Zwycięstwa i kończy się na pętli przy budynku administracji dzielnicy.`,
      `Wraz z uruchomieniem tej linii trolejbusowej transport elektryczny wreszcie dotarł do Pridniprowska, do którego wcześniej można było dojechać wyłącznie autobusami lub marszrutkami.`,
      'Trasę obsługują trolejbusy AKSM 321D wyposażone w możliwość autonomicznej jazdy dzięki superkondensatorom. Na pętli końcowej w Pridniprowsku zbudowano stację ładowania do doładowywania baterii.',
      'W dni robocze na trasie kursuje 6 pojazdów, natomiast w weekendy ich liczba zmniejsza się do 4. Linię obsługują dwie zajezdnie trolejbusowe: po 3 pojazdy z każdej zajezdni w dni robocze i po 2 z każdej w weekendy.',
    ],
    infrastructure: {
      rollingStock: 'Tabor',
      vehiclesOnRouteSix: 'Pojazdy aktualnie kursujące na linii 6',
      primaryModel: 'Główny model',
      operation: 'Eksploatacja',
      media: 'Media',
      modelName: 'AKSM 321D',
      modelDescription:
        'Zdolny do wydłużonej jazdy autonomicznej — odpowiedni dla odcinka trasy bez sieci trakcyjnej.',
      weekdays: 'Dni robocze:',
      weekends: 'Weekendy:',
      servedBy: 'Obsługiwane przez',
      depotsBalancedAllocation: 'zajezdnie (zrównoważony przydział)',
      vehicles: 'pojazdy',
      stopPhotoAlt: 'Zdjęcie przystanku',
    },
    metrics: [
      {
        title: '6 → 4',
        description: 'pojazdy: dni robocze -> weekendy',
      },
      {
        title: '2',
        description: 'zajezdnie trolejbusowe',
      },
      {
        title: 'Autonomiczny',
        description: 'odcinek bez sieci trakcyjnej',
      },
    ],
    fullListOfStops: {
      title: 'Lista przystanków na trasie',
      forwardDirection: 'Kierunek tam',
      backwardDirection: 'Kierunek powrotny',
    },
    stopsListItem: {
      onDemand: 'Na żądanie',
      scheduled: 'Planowy',
      scheduledIn: 'Planowo za',
      appName: 'TrollySix',
    },
  },

  routeNote: {
    title:
      'Zmiany w rozkładzie jazdy mogą wystąpić z powodu nieprzewidzianych sytuacji na trasie.',
    subtitle: 'Dziękujemy za podróż trolejbusem!',
  },

  errors: {
    notFound: {
      title: 'Nie znaleziono strony',
      description: 'Strona, której szukasz, nie istnieje.',
      action: 'Przejdź do strony głównej',
      subtitle: 'Link może być nieaktualny albo strona została przeniesiona.',
      actionOpenSchedule: 'Otwórz rozkład',
    },
  },

  legal: {
    privacyPolicy: {
      title: 'Polityka prywatności',
      effectiveDate: 'Data wejścia w życie: 25.02.2026',
      sections: {
        introduction: '1. Wprowadzenie',
        informationCollected: '2. Jakie informacje zbieramy',
        cookies: '3. Pliki cookie',
        thirdParty: '4. Usługi stron trzecich',
        dataSecurity: '5. Bezpieczeństwo danych',
        childrenPrivacy: '6. Prywatność dzieci',
        changes: '7. Zmiany w niniejszej polityce',
        contact: '8. Kontakt',
      },
      lines: {
        welcome: 'Witamy w TrollySix.',
        intro1:
          'Twoja prywatność jest ważna. Niniejsza Polityka prywatności wyjaśnia, jakie informacje są zbierane (spoiler: prawie żadne), w jaki sposób są wykorzystywane oraz jakie masz prawa podczas korzystania z tej strony internetowej.',
        collect1:
          'TrollySix nie zbiera, nie przechowuje, nie przetwarza ani nie udostępnia żadnych danych osobowych.',
        specifically: 'Konkretnie:',
        cookie1:
          'TrollySix używa wyłącznie jednego wpisu w local storage lub pliku cookie, wyłącznie w celu zapisania wybranej przez Ciebie preferencji motywu (np. trybu jasnego lub ciemnego).',
        cookiePreference: 'Ta preferencja:',
        cookie2:
          'Możesz usunąć tę preferencję w dowolnym momencie, czyszcząc pamięć przeglądarki.',
        thirdParty1:
          'TrollySix nie integruje się z zewnętrznymi narzędziami analitycznymi, sieciami reklamowymi ani usługami śledzącymi.',
        thirdParty2:
          'Jeśli dostawca hostingu automatycznie zapisuje techniczne dane serwera (takie jak standardowe logi dostępu), pozostaje to poza kontrolą TrollySix i jest obsługiwane zgodnie z politykami dostawcy hostingu.',
        dataSecurity1:
          'Ponieważ TrollySix nie zbiera danych osobowych, nie istnieją żadne dane osobowe do przechowywania, ochrony ani udostępniania.',
        children1:
          'TrollySix nie jest skierowany do dzieci ani do żadnej konkretnej grupy wiekowej i świadomie nie zbiera informacji od dzieci.',
        changes1:
          'Niniejsza Polityka prywatności może zostać zaktualizowana, jeśli funkcjonalność TrollySix ulegnie zmianie w przyszłości.',
        changes2:
          'Jeśli praktyki związane ze zbieraniem danych ulegną zmianie, ten dokument zostanie odpowiednio zaktualizowany.',
        contact1:
          'Jeśli masz jakiekolwiek pytania dotyczące niniejszej Polityki prywatności, możesz skontaktować się z właścicielem projektu pod adresem:',
      },
      lists: {
        collect: [
          'Brak rejestracji użytkowników',
          'Brak systemu logowania',
          'Brak śledzenia analitycznego',
          'Brak reklamowych trackerów',
          'Brak zbierania danych osobowych',
          'Brak logowania adresów IP',
          'Brak śledzenia zachowań',
          'Brak zewnętrznych narzędzi analitycznych',
        ],
        cookie: [
          'Jest przechowywana lokalnie w Twojej przeglądarce',
          'Nie jest przesyłana na żaden serwer',
          'Nie jest używana do śledzenia',
          'Nie zawiera żadnych danych osobowych',
        ],
      },
      email: 'contacts@trolly6.com',
    },
    termsOfUse: {
      title: 'Warunki korzystania',
      effectiveDate: 'Data wejścia w życie: 25.02.2026',
      sections: {
        acceptance: '1. Akceptacja warunków',
        serviceDescription: '2. Opis usługi',
        accuracy: '3. Brak gwarancji dokładności',
        noAccounts: '4. Brak kont użytkowników',
        intellectualProperty: '5. Własność intelektualna',
        liability: '6. Ograniczenie odpowiedzialności',
        modifications: '7. Zmiany',
        governingLaw: '8. Prawo właściwe',
      },
      lines: {
        acceptance1:
          'Uzyskując dostęp do TrollySix i korzystając z niego, akceptujesz niniejsze Warunki korzystania.',
        acceptance2:
          'Jeśli się z nimi nie zgadzasz, prosimy o zaprzestanie korzystania ze strony.',
        service1:
          'TrollySix jest projektem informacyjnym, który udostępnia publicznie dostępne informacje o rozkładzie jazdy trolejbusów.',
        service2:
          'Strona internetowa jest udostępniana „tak jak jest”, wyłącznie w celach informacyjnych.',
        accuracy1:
          'Chociaż dokładamy starań, aby informacje były prawidłowe i aktualne:',
        accuracy2:
          'TrollySix nie ponosi odpowiedzialności za przegapiony transport, opóźnienia ani jakiekolwiek konsekwencje wynikające z polegania na udostępnionych informacjach.',
        accuracy3:
          'W razie potrzeby zawsze sprawdzaj oficjalne aktualizacje transportowe.',
        noAccounts1:
          'TrollySix nie oferuje kont użytkowników, rejestracji ani funkcji tworzenia treści przez użytkowników.',
        ip1: 'Wszystkie treści, projekt, kod i branding TrollySix stanowią własność intelektualną właściciela projektu, o ile nie zaznaczono inaczej.',
        youMay: 'Możesz:',
        youMayNot: 'Nie możesz:',
        liability1: 'TrollySix jest udostępniany bez jakichkolwiek gwarancji.',
        liability2: 'Właściciel projektu nie ponosi odpowiedzialności za:',
        modifications1:
          'Niniejsze Warunki mogą zostać zaktualizowane w dowolnym momencie. Dalsze korzystanie ze strony oznacza akceptację zaktualizowanych Warunków.',
        governingLaw1:
          'Niniejsze Warunki podlegają właściwym przepisom prawa kraju zamieszkania właściciela projektu, chyba że obowiązujące prawo wymaga inaczej.',
      },
      lists: {
        accuracy: [
          'Informacje o rozkładzie jazdy mogą się zmieniać',
          'Mogą wystąpić opóźnienia lub zmiany operacyjne',
          'Strona może zawierać nieścisłości',
        ],
        youMay: ['Przeglądać stronę internetową', 'Udostępniać do niej linki'],
        youMayNot: [
          'Kopiować ani rozpowszechniać treści w celach komercyjnych bez zgody',
        ],
        liability: [
          'Przerwy w działaniu usługi',
          'Błędy techniczne',
          'Nieprawidłowe dane rozkładowe',
          'Jakiekolwiek szkody bezpośrednie lub pośrednie wynikające z korzystania ze strony',
        ],
      },
    },
  },

  footer: {
    rightsReserved: 'Wszelkie prawa zastrzeżone.',
    privacyPolicy: 'Polityka prywatności',
    termsOfUse: 'Warunki korzystania',
  },
} as const;
