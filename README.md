# BaaadFLIX

## Описание проекта
[BaaadFLIX](https://mregor787.pythonanywhere.com/) - это сервис для онлайн-просмотра фильмов, сериалов, мультфильмов и аниме различных жанров. Без регистрации пользователю предоставляется возможность поиска желаемого фильма в базе данных, просмотр информации о нём на странице фильма, и просмотр самого фильма с помощью встроенного плеера. После регистрации пользователь может добавлять страницы фильмов в избранное, ставить им оценки, писать комментарии, также для зарегистрированного пользователя ведётся история просмотренных им фильмов. Зарегистрированные пользователи имеют возможность предлагать администрации фильмы для
добавления в базу данных через систему тикетов (сообщений в поддержку).

## Используемые технологии
Backend сайта написан с использованием фреймворка Django, для front'а используется Bootstrap + стандартные HTML (Django templates) & CSS + JavaScript (файл `top.js`, отвечающий за работу плеера, взят с сайта [kinoplayer.top](https://kinoplayer.top/)).

Для размещения сайта используется сервис [PythonAnywhere](https://pythonanywhere.com/), предоставляющий, помимо прочего (на основе бесплатного плана):

1) Хранилище для файлов проекта (512 МБ);
2) Базу данных MySQL/Postgres;
3) Возможность работы в консолях Bash/MySQL;
4) Личный адрес для сайта в формате `http(s)://username.pythonanywhere.com/`, где `username` - имя пользователя.

## Паттерны проектирования

### MVT, или Model-View-Template

Паттерн, используемый в Django. Представляет собой набор моделей (Models), представлений (Views) и шаблонов (Templates).

Основан на паттерне MVC (Model-View-Controller).

Как работает схема MVC?

- Модель (Model) предоставляет данные и реагирует на команды контроллера, изменяя своё состояние.
- Представление (View) отвечает за отображение данных модели пользователю, реагируя на изменения модели.
- Контроллер (Controller) интерпретирует действия пользователя, оповещая модель о необходимости изменений.

Model в MVT соответствует таковая в MVC, View соответствует Controller, а Template - View.

Подробнее:

- https://ru.wikipedia.org/wiki/Model-View-Controller
- https://docs.djangoproject.com/en/4.1/#the-model-layer

В проекте BaaadFLIX он представлен файлами `models.py` и `views.py`, а также папкой `templates/`.
