class LivroDao {
    constructor(db) {
        this._db = db
    }

    lista() {
        return new Promise((resolve, reject) => {
            this._db.all('SELECT * FROM livros', (erro, resultados) =>
            {
                if (erro) return reject("Não foi possivel listar os livros");
                return resolve(resultados);
            })
        })
    }

    adiciona(livro) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO livros (titulo, preco, descricao) values (?, ?, ?)`
            this._db.run(query,
                [
                    livro.titulo,
                    livro.preco,
                    livro.descricao
                ],
                (erro) => {
                    if (erro) return reject("Não foi possivel adicionar o livro");
                    return resolve();
                }
            )
        })
    }



}

module.exports = LivroDao