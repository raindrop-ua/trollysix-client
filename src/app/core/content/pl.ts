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
        description: 'pojazdy: dni robocze → weekendy',
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
      sections: [
        {
          title: '1. Wprowadzenie',
          content: [
            { type: 'paragraph', value: 'Witamy w TrollySix.' },
            {
              type: 'paragraph',
              value:
                'Twoja prywatność jest ważna. Niniejsza Polityka prywatności wyjaśnia, jakie informacje są zbierane (spoiler: prawie żadne), w jaki sposób są wykorzystywane oraz jakie masz prawa podczas korzystania z tej strony internetowej.',
            },
          ],
        },
        {
          title: '2. Jakie informacje zbieramy',
          content: [
            {
              type: 'paragraph',
              value:
                'TrollySix nie zbiera, nie przechowuje, nie przetwarza ani nie udostępnia żadnych danych osobowych.',
            },
            { type: 'paragraph', value: 'Konkretnie:' },
            {
              type: 'list',
              items: [
                'Brak rejestracji użytkowników',
                'Brak systemu logowania',
                'Brak śledzenia analitycznego',
                'Brak reklamowych trackerów',
                'Brak zbierania danych osobowych',
                'Brak logowania adresów IP',
                'Brak śledzenia zachowań',
                'Brak zewnętrznych narzędzi analitycznych',
              ],
            },
          ],
        },
        {
          title: '3. Pliki cookie',
          content: [
            {
              type: 'paragraph',
              value:
                'TrollySix używa wyłącznie jednego wpisu w local storage lub pliku cookie, wyłącznie w celu zapisania wybranej przez Ciebie preferencji motywu (np. trybu jasnego lub ciemnego).',
            },
            { type: 'paragraph', value: 'Ta preferencja:' },
            {
              type: 'list',
              items: [
                'Jest przechowywana lokalnie w Twojej przeglądarce',
                'Nie jest przesyłana na żaden serwer',
                'Nie jest używana do śledzenia',
                'Nie zawiera żadnych danych osobowych',
              ],
            },
            {
              type: 'paragraph',
              value:
                'Możesz usunąć tę preferencję w dowolnym momencie, czyszcząc pamięć przeglądarki.',
            },
          ],
        },
        {
          title: '4. Usługi stron trzecich',
          content: [
            {
              type: 'paragraph',
              value:
                'TrollySix nie integruje się z zewnętrznymi narzędziami analitycznymi, sieciami reklamowymi ani usługami śledzącymi.',
            },
            {
              type: 'paragraph',
              value:
                'Jeśli dostawca hostingu automatycznie zapisuje techniczne dane serwera (takie jak standardowe logi dostępu), pozostaje to poza kontrolą TrollySix i jest obsługiwane zgodnie z politykami dostawcy hostingu.',
            },
          ],
        },
        {
          title: '5. Bezpieczeństwo danych',
          content: [
            {
              type: 'paragraph',
              value:
                'Ponieważ TrollySix nie zbiera danych osobowych, nie istnieją żadne dane osobowe do przechowywania, ochrony ani udostępniania.',
            },
          ],
        },
        {
          title: '6. Prywatność dzieci',
          content: [
            {
              type: 'paragraph',
              value:
                'TrollySix nie jest skierowany do dzieci ani do żadnej konkretnej grupy wiekowej i świadomie nie zbiera informacji od dzieci.',
            },
          ],
        },
        {
          title: '7. Zmiany w niniejszej polityce',
          content: [
            {
              type: 'paragraph',
              value:
                'Niniejsza Polityka prywatności może zostać zaktualizowana, jeśli funkcjonalność TrollySix ulegnie zmianie w przyszłości.',
            },
            {
              type: 'paragraph',
              value:
                'Jeśli praktyki związane ze zbieraniem danych ulegną zmianie, ten dokument zostanie odpowiednio zaktualizowany.',
            },
          ],
        },
        {
          title: '8. Kontakt',
          content: [
            {
              type: 'paragraph',
              value:
                'Jeśli masz jakiekolwiek pytania dotyczące niniejszej Polityki prywatności, możesz skontaktować się z właścicielem projektu pod adresem:',
            },
            { type: 'paragraph', value: 'contacts@trolly6.com' },
          ],
        },
      ],
    },
    termsOfUse: {
      title: 'Warunki korzystania',
      effectiveDate: 'Data wejścia w życie: 25.02.2026',
      sections: [
        {
          title: '1. Akceptacja warunków',
          content: [
            {
              type: 'paragraph',
              value:
                'Uzyskując dostęp do TrollySix i korzystając z niego, akceptujesz niniejsze Warunki korzystania.',
            },
            {
              type: 'paragraph',
              value:
                'Jeśli się z nimi nie zgadzasz, prosimy o zaprzestanie korzystania ze strony.',
            },
          ],
        },
        {
          title: '2. Opis usługi',
          content: [
            {
              type: 'paragraph',
              value:
                'TrollySix jest projektem informacyjnym, który udostępnia publicznie dostępne informacje o rozkładzie jazdy trolejbusów.',
            },
            {
              type: 'paragraph',
              value:
                'Strona internetowa jest udostępniana „tak jak jest”, wyłącznie w celach informacyjnych.',
            },
          ],
        },
        {
          title: '3. Brak gwarancji dokładności',
          content: [
            {
              type: 'paragraph',
              value:
                'Chociaż dokładamy starań, aby informacje były prawidłowe i aktualne:',
            },
            {
              type: 'list',
              items: [
                'Informacje o rozkładzie jazdy mogą się zmieniać',
                'Mogą wystąpić opóźnienia lub zmiany operacyjne',
                'Strona może zawierać nieścisłości',
              ],
            },
            {
              type: 'paragraph',
              value:
                'TrollySix nie ponosi odpowiedzialności za przegapiony transport, opóźnienia ani jakiekolwiek konsekwencje wynikające z polegania na udostępnionych informacjach.',
            },
            {
              type: 'paragraph',
              value:
                'W razie potrzeby zawsze sprawdzaj oficjalne aktualizacje transportowe.',
            },
          ],
        },
        {
          title: '4. Brak kont użytkowników',
          content: [
            {
              type: 'paragraph',
              value:
                'TrollySix nie oferuje kont użytkowników, rejestracji ani funkcji tworzenia treści przez użytkowników.',
            },
          ],
        },
        {
          title: '5. Własność intelektualna',
          content: [
            {
              type: 'paragraph',
              value:
                'Wszystkie treści, projekt, kod i branding TrollySix stanowią własność intelektualną właściciela projektu, o ile nie zaznaczono inaczej.',
            },
            { type: 'paragraph', value: 'Możesz:' },
            {
              type: 'list',
              items: [
                'Przeglądać stronę internetową',
                'Udostępniać do niej linki',
              ],
            },
            { type: 'paragraph', value: 'Nie możesz:' },
            {
              type: 'list',
              items: [
                'Kopiować ani rozpowszechniać treści w celach komercyjnych bez zgody',
              ],
            },
          ],
        },
        {
          title: '6. Ograniczenie odpowiedzialności',
          content: [
            {
              type: 'paragraph',
              value: 'TrollySix jest udostępniany bez jakichkolwiek gwarancji.',
            },
            {
              type: 'paragraph',
              value: 'Właściciel projektu nie ponosi odpowiedzialności za:',
            },
            {
              type: 'list',
              items: [
                'Przerwy w działaniu usługi',
                'Błędy techniczne',
                'Nieprawidłowe dane rozkładowe',
                'Jakiekolwiek szkody bezpośrednie lub pośrednie wynikające z korzystania ze strony',
              ],
            },
          ],
        },
        {
          title: '7. Zmiany',
          content: [
            {
              type: 'paragraph',
              value:
                'Niniejsze Warunki mogą zostać zaktualizowane w dowolnym momencie. Dalsze korzystanie ze strony oznacza akceptację zaktualizowanych Warunków.',
            },
          ],
        },
        {
          title: '8. Prawo właściwe',
          content: [
            {
              type: 'paragraph',
              value:
                'Niniejsze Warunki podlegają właściwym przepisom prawa kraju zamieszkania właściciela projektu, chyba że obowiązujące prawo wymaga inaczej.',
            },
          ],
        },
      ],
    },
  },

  footer: {
    rightsReserved: 'Wszelkie prawa zastrzeżone.',
    privacyPolicy: 'Polityka prywatności',
    termsOfUse: 'Warunki korzystania',
  },
} as const;
