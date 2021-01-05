'use strict';

const Hapi = require('@hapi/hapi');
const Path = require('path');

const start = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: Path.join(__dirname)
            }
        }
    });

    await server.register(require('@hapi/inert'));

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, h) {
            return h.file('index copy.html');
        }
    });

    server.route({
        method: 'POST',
        path: '/',
        handler: function (request, h) {
            var num1 = parseInt(request.payload.n1);
            var num2 = parseInt(request.payload.n2);
            var result = num1 - num2;
            return `the result is ${result}`;
        }
    });


    server.route({
        method: 'GET',
        path: '/bmicalculator',
        handler: function (request, h) {
            return h.file('bmiCalculator.html');
        }
    });


    server.route({
        method: 'POST',
        path: '/bmicalculator',
        handler: function (request, h) {
            let userWeight = parseFloat(request.payload.weight);
            let userHeight = parseFloat(request.payload.height);
            let bmi = Math.round(userWeight / (userHeight * userHeight));
            return `your bmi is ${bmi}`;
        }
    });

    await server.start();

    console.log('Server running at:', server.info.uri);
};

start();