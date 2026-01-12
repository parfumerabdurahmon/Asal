
export type Locale = 'uz' | 'ru';

export interface LocalizedString {
  uz: string;
  ru: string;
}

export interface HoneyProduct {
  id: number;
  name: LocalizedString;
  description: LocalizedString;
  price: number;
  image: string;
  origin: LocalizedString;
  flavorProfile: { uz: string[]; ru: string[] };
}

export interface ContactInfo {
  instagram: string;
  telegram: string;
  phone: string;
}
