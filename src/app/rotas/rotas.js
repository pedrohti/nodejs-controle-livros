const LivroDao = require('../DAO/livro-dao')
const db = require('../../config/database');
const listaMarko = require('../views/livros/lista/lista.marko');
const { response } = require('express');

module.exports = (app) => {
    const livroDao = new LivroDao(db)

    app.get('/', (req, res) => res.send("Hello World Node!"))

    app.get('/livros', (req, res) => {

        livroDao.lista()
            .then(livros => res.marko(
                require('../views/livros/lista/lista.marko'),
                {
                    livros: livros
                }
            ))
            .catch(erro => console.log(erro))

    });

    app.get('/livros/form', (req, res) => {
        res.marko(require('../views/livros/form/form.marko'))
    })

    app.post('/livros', (req, res) => {
        console.log(req.body)

        livroDao.adiciona(req.body)
            .then(res.redirect('/livros'))
            .catch(erro => console.log(erro))

    })
};