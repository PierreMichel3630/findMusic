export interface Language {
  iso_639_1: string;
  english_name: string;
  name: string;
}

export const LANGUAGES: Array<Language> = [
  {
    iso_639_1: "fr",
    english_name: "French",
    name: "Français",
  },
  {
    iso_639_1: "en",
    english_name: "English",
    name: "English",
  },
  {
    iso_639_1: "es",
    english_name: "Spanish",
    name: "Español",
  },
  {
    iso_639_1: "it",
    english_name: "Italian",
    name: "Italiano",
  },
  {
    iso_639_1: "de",
    english_name: "German",
    name: "Deutsch",
  },
];
