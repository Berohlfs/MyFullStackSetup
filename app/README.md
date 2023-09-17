# TypeORM

[Documentação](https://typeorm.io/)

## Migration Commands

* `yarn typeorm migration:create ./src/migrations/{NOME}` para **CRIAR** uma migration.
* `yarn typeorm migration:run -- -d src/db.ts` para **EXECUTAR** as migrations.
* `yarn typeorm migration:revert -- -d src/db.ts` para **REVERTER** as migrations.
