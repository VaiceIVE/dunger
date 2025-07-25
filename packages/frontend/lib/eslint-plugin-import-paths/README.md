# @dunger/eslint-plugin-import-paths

Исправляет импорты на абсолютные ИЛИ относительные, в зависимости от того, как два файла (текущий и импортируемый)
относятся друг к другу в рамках архитектуры веб-приложения (подробнее – см. ниже в разделе [Логика](#логика)).

## Настройка

В `eslint.config.mjs`:

```javascript
// массив директорий в src приложения, импорты из которых нужно проверять
const internalImportTypes = ['components', 'features', 'hooks', 'routes', 'store', 'utils'];

export default [
  // {}[]...
  {
    // ...
    plugins: { 'import-paths': eslintPluginImportPaths },
    rules: { 'import-paths/import-paths': ['warn', { rootPaths: internalImportTypes }] }
  }
];
```

## Логика

В архитектуре приложения относительно **`rootDir`** определяются структурные единицы (сущности) первого и второго уровней.
Сущности первого уровня задаются в **`rootPaths`** – это, например, `components` или `features`.
А сущности второго уровня – уже конкретные компоненты или фичи – например, `components/Button` или `features/PageHeader`.

Если оба файла (текущий и импортируемый) находятся в рамках одной сущности второго уровня,
то значит это чисто внутренний для нее импорт, так что он всегда должен быть относительным.
При этом внутренняя архитектура этой, скажем, фичи может быть какой угодно сложной и многоуровневой – это не имеет значения.

Если же, наоборот, файлы находятся в разных сущностях второго уровня, то импорт всегда должен быть абсолютным.
При этом структурная единица первого уровня у них может быть как тоже разной (определенный роут импортирует нужную ему фичу),
так и совпадать – один компонент импортирует соседний.

Сущности второго уровня можно группировать – если название директории начинается с `_`,
то плагин не считает ее за самостоятельную структурную единицу.
То есть `components/_buttons/Button` и `components/_buttons/IconButton` считаются разными сущностями второго уровня,
хотя формально находятся от **`rootDir`** на третьем.
