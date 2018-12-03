const fs = require('fs');
const request = require('request');

// получаем данные с АПИ и кладем в JSON файл
request('https://reqres.in/api/users', { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    console.log(body.data);
    let data = JSON.stringify(body.data);
    fs.writeFileSync('./users.json', data);
});

// Изменяем данные в JSON файле, пока только с кода
    // console.log(window.location.hash.substr(1));
    // var fileName = './users.json';
    // let file = require(fileName);
    //
    // file[0].first_name = "Changec";
    //
    // fs.writeFile(fileName, JSON.stringify(file), function (err) {
    //     if (err) return console.log(err);
    // });





