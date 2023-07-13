import "jest";

import validator from "../src";

describe("CPF", () => {
  test("números de listas negras", () => {
    expect(validator.cpf.isValid("00000000000")).toBeFalsy();
    expect(validator.cpf.isValid("11111111111")).toBeFalsy();
    expect(validator.cpf.isValid("22222222222")).toBeFalsy();
    expect(validator.cpf.isValid("33333333333")).toBeFalsy();
    expect(validator.cpf.isValid("44444444444")).toBeFalsy();
    expect(validator.cpf.isValid("55555555555")).toBeFalsy();
    expect(validator.cpf.isValid("66666666666")).toBeFalsy();
    expect(validator.cpf.isValid("77777777777")).toBeFalsy();
    expect(validator.cpf.isValid("88888888888")).toBeFalsy();
    expect(validator.cpf.isValid("99999999999")).toBeFalsy();
    expect(validator.cpf.isValid("12345678909")).toBeFalsy();
  });

  test("rejeita valores falsos", () => {
    expect(validator.cpf.isValid("")).toBeFalsy();
    expect(validator.cpf.isValid(null)).toBeFalsy();
    expect(validator.cpf.isValid(undefined)).toBeFalsy();
  });

  test("valida strings formatadas", () => {
    expect(validator.cpf.isValid("295.379.955-93")).toBeTruthy();
  });

  test("valida strings não formatadas", () => {
    expect(validator.cpf.isValid("29537995593")).toBeTruthy();
  });

  test("valida strings de caracteres confusas", () => {
    expect(validator.cpf.isValid("295$379\n955...93")).toBeTruthy();
  });

  test("valida cadeias de caracteres", () => {
    expect(validator.cpf.isValid("295$379\n955...93", true)).toBeFalsy();
    expect(validator.cpf.isValid("295.379.955-93", true)).toBeTruthy();
    expect(validator.cpf.isValid("29537995593", true)).toBeTruthy();
  });

  test("retorna o número não formatado", () => {
    const number = validator.cpf.strip("295.379.955-93");
    expect(number).toEqual("29537995593");
  });

  test("retorna o número formatador", () => {
    const number = validator.cpf.format("29537995593");
    expect(number).toEqual("295.379.955-93");
  });

  test("gera número formatado", () => {
    const number = validator.cpf.generate(true);

    expect(number).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
    expect(validator.cpf.isValid(number)).toBeTruthy();
  });

  test("gera número não formatado", () => {
    const number = validator.cpf.generate();

    expect(number).toMatch(/^\d{3}\d{3}\d{3}\d{2}$/);
    expect(validator.cpf.isValid(number)).toBeTruthy();
  });
});
