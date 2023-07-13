# cpf-cnpj-validator
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
npm i cpf-cnpj-validator -S
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

// gera um número de cpnj
const num = validator.cnpj.generate();
// #=> 58403919000106

// verifica se é um número válido
validator.cnpj.isValid(num);
// #=> true

// formata o número gerado
validator.cnpj.format(num);
// #=> 58.403.919/0001-06
```

Veja mais exemplos práticos consultando os testes para [CPF](./test/cpf.test.ts) e [CNPJ.](./test/cpf.test.ts)

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
