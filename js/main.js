// Таймеры. интерпретатор их заносит в очередь и исполняет после основного потока!!!
myButton.addEventListener('click', () =>{
    setTimeout(() => {
        console.log('сообщение!');
    }, 3000); 
    console.time('Деление');
    for(let i=1; i < 600000000; i++) {
        let a = i / i;
    }
    console.timeEnd('Деление');
});

/////   PROMISE  и DEFERED  ///////////////
/*
Промисы - это объект, при создании которого вызывается функция которая возвращает статус. resolve/reject.
есть 3 состояния
    1. waiting/pending - ожидание
    2. fulfilled/resolve - выполнено 
    3. rejected - выполнено с ошибкой
*/

let url1 = 'http://minionomaniya.ru/wp-content/uploads/2016/01/миньоны-приколы-картинки.jpg';
let url2 = 'http://bm.img.com.ua/nxs/img/prikol/images/large/1/2/308321_879389.jpg';
let url3 = 'http://s00.yaplakal.com/pics/pics_original/4/6/8/8310864.jpg';

function loadImage (url) {   // Создаем функцию, которая возвращает новый промис.
   return new Promise((resolve, reject) => {
    let i = new Image();
    document.body.appendChild(i);
    i.src = url;

    i.addEventListener('load', () => {
        resolve();
    });
    i.addEventListener('error', () => {
        reject();
    });
});
}



let p = loadImage(url1);  // переменная р присваивает промис полученный из loadImage(url1);

p.then(  // метод промиса, включает в себя две функции 1 - выполняется, когда resolve, 2 - reject.
    () => {
        console.log('Картинка 1 загружена');
        return loadImage(url2);
    },
    () => {
        console.log('Картинка 1 загружена c ошибкой');
    }
).then(
    () => {
        console.log('Картинка 2 загружена');
        return loadImage(url3);
    },
    () => {
         console.log('Картинка 2 загружена c ошибкой');
    }
).then(
    () => {
        console.log('Картинка 3 загружена');
    },
    () => {
         console.log('Картинка 3 загружена c ошибкой');
    }
);



//////////////// AJAX with promise   ///////////////////

function sendAjax (url) {
    return new Promise((resolve, reject) =>{
        let xhr = new XMLHttpRequest(); // создание объекта 
        xhr.open('GET', url); // Настройка соединения
        xhr.addEventListener('load', () => { // делаем обработчик при загрузке
            resolve(xhr.responseText);  
        });
        xhr.addEventListener('error', () => { // делаем обработчик при загрузке
            reject();
        });
        xhr.send(); // отправляем запрос
    });
}


btnAjax.addEventListener('click', () => {
    sendAjax('text.txt').then(responseText =>{
        console.log(responseText);
    });
});


/////////////// JSON  /////////////////////////


