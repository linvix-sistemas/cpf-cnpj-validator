# @linvix-sistemas/cpf-cnpj-validator
Valida e formata strings de CPF ou CNPJ.

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
![GitHub top language](https://img.shields.io/github/languages/top/linvix-sistemas/cpf-cnpj-validator)
![GitHub last commit](https://img.shields.io/github/last-commit/linvix-sistemas/cpf-cnpj-validator)

[travis-image]: https://travis-ci.org/linvix-sistemas/cpf-cnpj-validator.svg?branch=master
[travis-url]: https://travis-ci.org/linvix-sistemas/cpf-cnpj-validator
[npm-image]: https://img.shields.io/npm/v/cpf-cnpj-validator.svg?style=flat
[npm-url]: https://npmjs.org/package/cpf-cnpj-validator

### Requer:
Node ``^8.0.0``.

### Instalação:
```
yarn add @linvix-sistemas/cpf-cnpj-validator
```

### Uso:
:warning: __NOTE__: Os exemplos estão na versão es6, mas você pode está usando a sintaxe antiga como preferir.
```js
import validator from '@linvix-sistemas/cpf-cnpj-validator';
// or const validator = require('cpf-cnpj-validator');

// gera um número de cpf
const num = validator.cpf.generate();
// #=> 25634428777

// verifica se é um número válido
validator.cpf.isValid(num);
// #=> true

// formata o número gerado
validator.cpf.format(num);
// #=> 256.344.287-77
```

:warning: __NOTE__: Os módulos de cpf e cnpj possuem métodos nomeados de forma igual diferindo se apenas os resultados.

```js
import validator from '@linvix-sistemas/cpf-cnpj-validator';
// or const validator = require('cpf-cnpj-validator');

// gera um número de cnpj
const num = validator.cnpj.generate();
// #=> 58403919000106

// verifica se é um número válido
validator.cnpj.isValid(num);
// #=> true

// formata o número gerado
validator.cnpj.format(num);
// #=> 58.403.919/0001-06
```

#### CNPJ Alfanumérico (IN RFB nº 2.229/2024)

A partir de julho de 2026, a Receita Federal passou a emitir CNPJs com caracteres alfanuméricos nos 12 primeiros dígitos (A–Z e 0–9). Os dois dígitos verificadores continuam sendo sempre numéricos.

A conversão segue a fórmula: `valor = charCode(caractere) - charCode('0')`, o que preserva o valor dos dígitos (`'0'` → 0, `'9'` → 9) e mapeia letras a valores acima de 9 (`'A'` → 17, `'B'` → 18, …, `'Z'` → 42).

```js
// CNPJ alfanumérico sem máscara
validator.cnpj.isValid('1A2B3C4D5E6F34');
// #=> true

// com máscara (modo strict)
validator.cnpj.isValid('1A.2B3.C4D/5E6F-34', true);
// #=> true

// formatar
validator.cnpj.format('1A2B3C4D5E6F34');
// #=> 1A.2B3.C4D/5E6F-34
```

Veja mais exemplos práticos consultando os testes para [CPF](./test/cpf.test.ts) e [CNPJ](./test/cnpj.test.ts).

### Tests
```shell
npm test
```

### :rocket: Serviços

| Site | Descrição |
|---------|--------------|
| [GERADOR_CPF] | Interface para geração de números de CPF |
| [GERADOR_CNPJ] | Interface para geração de números de CNPJ |

[GERADOR_CPF]: https://geradorcpf.org/
[GERADOR_CNPJ]: https://geradorcnpj.org/

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present
