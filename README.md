Сделать сайт с тремя страницами: 

Первая страница с описанием себя (можно как формочку с полями) 

Вторая страница с Гугл/Яндекс картой, с отметкой положения своего метро 

Третья страница с таймером, который отсчитывает секунды с открытия сайта (реализация должна быть на Pixi.JS), то есть нужно сделать таймером с холстом (canvas в котором будет тикующий таймер) https://www.pixijs.com/ 

 Проект должен быть выложен на гитхаб и собираться при запуске npm start, после чего он должен быть готов к работе.
 
Требования к технологиям 

Vue CLI + Vue + Vuex + VueRouter 

Для каждой страницы добавить Code Splitting (вырезать код страниц в отдельный чанки и грузить их когда пользователь переходит на эти страницы) 

Желательно использовать TypeScript 

Желательно время открытия сайта/координаты своего метро для карты хранить в Vuex 

(По желанию) Использовать Vue Composition Api (Vue 3) 
