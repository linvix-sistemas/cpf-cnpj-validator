import "jest";

import validator from "../src";

describe("CNPJ", () => {
  test("números de listas negras", () => {
    expect(validator.cnpj.isValid("00000000000000")).toBeFalsy();
    expect(validator.cnpj.isValid("11111111111111")).toBeFalsy();
    expect(validator.cnpj.isValid("22222222222222")).toBeFalsy();
    expect(validator.cnpj.isValid("33333333333333")).toBeFalsy();
    expect(validator.cnpj.isValid("44444444444444")).toBeFalsy();
    expect(validator.cnpj.isValid("55555555555555")).toBeFalsy();
    expect(validator.cnpj.isValid("66666666666666")).toBeFalsy();
    expect(validator.cnpj.isValid("77777777777777")).toBeFalsy();
    expect(validator.cnpj.isValid("88888888888888")).toBeFalsy();
    expect(validator.cnpj.isValid("99999999999999")).toBeFalsy();
  });

  test("rejeita valores falsos", () => {
    expect(validator.cnpj.isValid("")).toBeFalsy();
    expect(validator.cnpj.isValid(null)).toBeFalsy();
    expect(validator.cnpj.isValid(undefined)).toBeFalsy();
  });

  test("valida strings formatadas", () => {
    expect(validator.cnpj.isValid("54.550.752/0001-55")).toBeTruthy();
  });

  test("valida strings não formatadas", () => {
    expect(validator.cnpj.isValid("54550752000155")).toBeTruthy();
  });

  test("valida strings confusas", () => {
    expect(validator.cnpj.isValid("54550[752#0001..$55")).toBeTruthy();
  });

  test("valida cadeias de caracteres", () => {
    expect(validator.cnpj.isValid("54550[752#0001..$55", true)).toBeFalsy();
    expect(validator.cnpj.isValid("54.550.752/0001-55", true)).toBeTruthy();
    expect(validator.cnpj.isValid("54550752000155", true)).toBeTruthy();
  });

  test("retorna número não formatado", () => {
    var number = validator.cnpj.strip("54550[752#0001..$55");
    expect(number).toEqual("54550752000155");
  });

  test("retorna número formatado", () => {
    var number = validator.cnpj.format("54550752000155");
    expect(number).toEqual("54.550.752/0001-55");
  });

  test("gera número formatado", () => {
    var number = validator.cnpj.generate(true);

    expect(number).toMatch(/^(\d{2}).(\d{3}).(\d{3})\/(\d{4})-(\d{2})$/);
    expect(validator.cnpj.isValid(number)).toBeTruthy();
  });

  test("gera número não formatado", () => {
    var number = validator.cnpj.generate();

    expect(number).toMatch(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/);
    expect(validator.cnpj.isValid(number)).toBeTruthy();
  });
});
