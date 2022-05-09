# Гайд по работе в команде Bali

Для того чтобы работать над проектом и соответствовать кодстайлу команды желательно установить Visual Studio Code со следующими расширениями :

- stylelint
- prettier
- eslint

> Я не пользуюсь VSC, что мне делать?

Вы можете погуглить как настроить описанные выше линтеры в вашей среде разработки, также доступны следующие команды:

`npm run eslint` - проверить все js/jsx/ts/tsx файлы проекта на ошибки.

`npm run eslint:fix` - попробовать исправить все ошибки в js/jsx/ts/tsx файлах проекта.

`npm run prettier` - проверить все js/jsx/ts/tsx файлы проекта в соответствии с кодстайлом команды.

`npm run prettier:fix` - отформатировать все js/jsx/ts/tsx файлы проекта в соответствии с кодстайлом команды.

`npm run stylelint` - проверить все css файлы проекта на ошибки.

`npm run stylelint:fix` - попробовать исправить все css файлы проекта.

`npm run format:check` - проверить все файлы проекта на ошибки всех линтеров.

`npm run format:fix` - попробовать исправить все ошибки линтеров.

## Как выполнить задачу:

1. Переходите в [Trello](https://trello.com/b/WP1awB1i/%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%D0%BD%D0%B0%D1%8F-%D0%BA%D1%83%D1%85%D0%BD%D1%8F)
2. Перетаскиваете задачу которую хотите взять в разработку из Backlog в In Progress, описываете ее и делаете себя участником.
3. Создаете отдельную ветку в репозитории.
4. После того как вы выполните задачу создайте пулл реквест из вашей ветке в ветку develop.

# Проектная кухня

Так мы называем коллективную работу над проектом, проходящую параллельно с курсом по React в Яндекс.Практикуме. По желанию студенты делятся на команды и переделывают несложное приложение на React и Redux. Это закрепляет навыки кодинга и тренирует навыки коллективной работы.

## О проекте в этом репозитории

Мы немного переделали проект Real World на React и Redux. Информацию об исходном проекте можно прочитать в [репозитории на GitHub](https://github.com/gothinkster/react-redux-realworld-example-app). Этот проект в меру сложен и в меру прост, он основан на универсальной механике, которую часто придется применять в работе. Лучшего выбора для дополнительной активности не найти.

## Установка

Вам точно потребуется бэкенд для локального запуска проекта. Вот ссылки на [репозиторий бэкенда на Express](https://github.com/gothinkster/node-express-realworld-example-app) и на [Контейнер в Docker](https://github.com/Yandex-Practicum/react-project-kitchen-backend). Инструкции по запуску бэкенда на локальной машине вы получите от команды сопровождения.

После запуска бэкенда локально, вам нужно:

1. Клонировать этот репозиторий
2. Убедиться, что в файле `/agent.js` указан корректный порт для обращения к бэкенду (константа `API_ROOT`)
3. Выполнить `npm install && npm start` в терминале, находясь в папке проекта

## Вопросы

Если возникли вопросы, пишите в slack, вам помогут.
