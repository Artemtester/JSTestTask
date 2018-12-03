var users = [];
var xhr = new XMLHttpRequest();



// Получаем данные с JSON файла и выводим на страницу
var url = './users.json';
new Promise(function(resolve, reject) {
    setTimeout(() => {
    xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (this.status == 200) {
            resolve(this.response);
        } else {
            var error = new Error(this.statusText);
            error.code = this.status;
            reject(error);
        }
        var data = JSON.parse(this.response);
        console.log(data);
        users = data;
        generateAllUsersHTML(users);
        $(window).trigger('hashchange');
    };
    xhr.onerror = function() {
        reject(new Error("Network Error"));
    };
    xhr.send();
    }, 1000);
});

// открыть одного юзера
var singleUserPage = $('.single-user');
singleUserPage.on('click', function (e) {
    if (singleUserPage.hasClass('visible')) {
        var clicked = $(e.target);
        if (clicked.hasClass('close') || clicked.hasClass('overlay')) {
            window.location.hash = '#';
        }
    }
});

// при каждом изменении рендерить соответствующий элемент
$(window).on('hashchange', function(){
    render(decodeURI(window.location.hash));
});

// Navigation
function render(url) {
    var temp = url.split('/')[0];
    var index = url.split('#user/')[1];
    $('.main-content .page').removeClass('visible');
    var	map = {
        '': function() {
            renderUsersPage(users);
        },
        '#user': function() {
            renderSingleUserPage(index, users);
        }
    };
    if(map[temp]){
        map[temp]();
    }
    else {
        renderErrorPage();
    }
}
function renderUsersPage() {}

// заполняем разметку данными с users.json
function generateAllUsersHTML(data){
    var list = $('.all-users .users-list');
    var theTemplateScript = $("#users-template").html();
    var theTemplate = Handlebars.compile (theTemplateScript);
    list.append (theTemplate(data));

// при клике, меняем хеш-адрес и отображаем одного юзера. Каждый клик запускает ф-ю рендеринга
    list.find('li').on('click', function (e) {
        e.preventDefault();
        var userIndex = $(this).data('index');
        window.location.hash = 'user/' + userIndex;
    })
}

// По индексу в хеш-адресе тянем id юзера и выводим в модальном окне
function renderSingleUserPage(index, data){
    var page = $('.single-user'),
        container = $('.preview-large');
    // прогоняем список юзеров для поиска совпадения id и индекса, чтобы вывести
    if(data.length){
        data.forEach(function (item) {
            if(item.id == index){
                // Populate '.preview-large' with the chosen product's data.
                container.find('img').attr('src', item.avatar);
                container.find('input#name').attr('value', item.first_name);
                container.find('input#surname').attr('value', item.last_name);
            }
        });
    }
    // показываем страницу
    page.addClass('visible');
}

// эрор сообшение
function renderErrorPage(){
    var page = $('.error');
    page.addClass('visible');
}


// function loadDoc() {
//     xhr = new XMLHttpRequest();
//     console.log(window.location.hash.substr(1));
//     var json = {
//         data: [{
//             first_name: document.forms.person.elements[0].value,
//             last_name: document.forms.person.elements[1].value
//         }]
//     };
//
//     xhr.open("POST", './users.json' + window.location.hash.substr(1), true);
//     xhr.setRequestHeader('Content-Type', 'application/json');
//     xhr.send(JSON.stringify(json));
// }

// function loadDoc() {
//
//     // console.log(window.location.hash.substr(1));
//     var fileName = './users.json';
//     var file = require(fileName);
//
//     file[0].first_name = "Change1";
//
//     fs.writeFile(fileName, JSON.stringify(file), function (err) {
//         if (err) return console.log(err);
//     });
// }
