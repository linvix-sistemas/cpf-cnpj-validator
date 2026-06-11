// Blacklist common values.
const BLACKLIST: Array<string> = [
  "00000000000000",
  "11111111111111",
  "22222222222222",
  "33333333333333",
  "44444444444444",
  "55555555555555",
  "66666666666666",
  "77777777777777",
  "88888888888888",
  "99999999999999",
];

// Strict: remove only mask separators. Loose: remove anything that is not an alphanumeric char.
const STRICT_STRIP_REGEX: RegExp = /[.\/-]/g;
const LOOSE_STRIP_REGEX: RegExp = /[^A-Z\d]/gi;

// Nova lógica alfanumérica da Receita Federal (Instrução Normativa RFB nº 2.229/2024).
// Cada caractere é convertido para seu valor numérico via (charCode - charCode('0')).
// Letras: A=17, B=18, …, Z=42. Dígitos: 0=0, 1=1, …, 9=9.
const VALOR_BASE: number = "0".charCodeAt(0); // 48
const PESOS_DV: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

// Aceita 12 chars (calcula DV1) ou 13 chars (calcula DV2).
const CNPJ_REGEX: RegExp = /^[A-Z\d]{12}\d{2}$/;

const verifierDigit = (cnpj: string): number => {
  const s = cnpj.toUpperCase();
  const offset = PESOS_DV.length - s.length;
  const sum = s.split("").reduce((acc, char, i) => {
    return acc + (char.charCodeAt(0) - VALOR_BASE) * PESOS_DV[offset + i];
  }, 0);
  const mod = sum % 11;
  return mod < 2 ? 0 : 11 - mod;
};

const strip = (number: string, strict?: boolean): string => {
  const regex: RegExp = strict ? STRICT_STRIP_REGEX : LOOSE_STRIP_REGEX;
  return (number || "").replace(regex, "");
};

const format = (number: string): string => {
  return strip(number)
    .toUpperCase()
    .replace(
      /^([A-Z\d]{2})([A-Z\d]{3})([A-Z\d]{3})([A-Z\d]{4})(\d{2})$/,
      "$1.$2.$3/$4-$5"
    );
};

const isValid = (number: string, strict?: boolean): boolean => {
  const stripped: string = strip(number, strict).toUpperCase();

  if (!stripped) return false;
  if (stripped.length !== 14) return false;
  if (!CNPJ_REGEX.test(stripped)) return false;
  if (BLACKLIST.includes(stripped)) return false;

  const base: string = stripped.slice(0, 12);
  const dv1: number = verifierDigit(base);
  const dv2: number = verifierDigit(base + dv1);

  return `${dv1}${dv2}` === stripped.slice(-2);
};

const generate = (formatted?: boolean): string => {
  let numbers: string = "";

  for (let i = 0; i < 12; i += 1) {
    numbers += Math.floor(Math.random() * 9);
  }

  numbers += verifierDigit(numbers);
  numbers += verifierDigit(numbers);

  return formatted ? format(numbers) : numbers;
};

export default {
  verifierDigit,
  strip,
  format,
  isValid,
  generate,
};
