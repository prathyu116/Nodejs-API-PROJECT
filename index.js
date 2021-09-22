const express = require("express");
var bodyParser = require('body-parser')

//Database
const database = require("./dataset")
// console.log(database);

const booky = express();
booky.use(bodyParser.urlencoded({ extended: true }))
booky.use(bodyParser.json());
/**
 * Route         /
 * Description  to get all book
 * Acces        public
 * Parameter    Nono
 * Method       Get
 */
booky.get('/', (req, res) => {
    return res.json({ books: database.books })
})
/**
 * Route         /is
 * Description  to get specific book
 * Parameter    isbn
 * Method       Get
 */
booky.get('/is/:isbn', (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn)
    console.log(getSpecificBook);
    if (getSpecificBook.length === 0) {
        return res.json({ error: `NO BOOK FOUND FOR THE ISBN OF ${req.params.isbn}` })
    }
    return res.json({ book: getSpecificBook })

})

/**
 * Route         /c
 * Description  to get specific book category
 * Parameter    category
 * Method       Get
 * Acces        public
 */

booky.get('/c/:category', (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.category.includes(req.params.category)
    )
    if (getSpecificBook.length === 0) {
        return res.json({ error: `NO BOOK FOUND FOR THE CATEGORY OF ${req.params.category}` })
    }
    return res.json({ book: getSpecificBook })
})
/**
 * Route         /lang
 * Description  to get specific book based on language
 * Parameter    language
 * Method       Get
 * Acces        public
 */
booky.get('/lang/:language', (req, res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language === req.params.language
    )
    if (getSpecificBook.length === 0) {
        return res.json({ error: `NO BOOK FOUND FOR THE LANGUAGE OF ${req.params.language}` })
    }
    return res.json({ book: getSpecificBook })

})

/**
 * Route         /author
 * Description  to get author all
 * Parameter    none
 * Method       Get
 * Acces        public
 */
booky.get('/author', (req, res) => {
    return res.json({ authors: database.author })
})

/**
 * Route         /author/book
 * Description  To get a specific author 
 * Parameter    name
 * Method       Get
 * Acces        public
 */
booky.get('/author/:name', (req, res) => {
    const getSpecificAuthor = database.author.filter(
        (author) => author.name === req.params.name
    )
    if (getSpecificAuthor.length === 0) {
        return res.json({
            error: `The author ${req.params.name} not found  `
        })
    }
    return res.json({ author: getSpecificAuthor })

})



/**
 * Route         /author/book
 * Description  to get all author based on book
 * Parameter    isbn
 * Method       Get
 * Acces        public
 */
booky.get('/author/book/:isbn', (req, res) => {
    const hetSpecificAuthor = database.author.filter(
        (author) => author.books.includes(req.params.isbn)
    )
    if (getSpecificAuthor.length === 0) {
        return res.json({
            error: `No author found for the book of ${req.params.isbn}`
        })
    }
    return res.json({ author: getSpecificAuthor })
})

/**
 * Route         /publication
 * Description  to get all publication
 * Parameter    none
 * Method       Get
 * Acces        public
 */

booky.get('/publication', (req, res) => {
    return res.json({ publication: database.publication })
})
/**
 * Route         /publication/
 * Description  to get specifivc publication
 * Parameter    name
 * Method       Get
 * Acces        public
 */
booky.get('/publication/:name', (req, res) => {
    const getSpecificpublication = database.publication.filter((publication) => publication.name === req.params.name)
    if (getSpecificpublication.length === 0) {
        return res.json({ error: `NO PUBLICATION FOUND FOR THE NAME OF ${req.params.name}` })
    }
    return res.json({ publication: getSpecificpublication })

})
/**
 * Route         /publication/book
 * Description  to get all publication based on book
 * Parameter    isbn
 * Method       Get
 * Acces        public
 */
booky.get('/publication/book/:isbn', (req, res) => {
    const getSpecificAuthor = database.publication.filter(
        (book) => book.books.includes(req.params.isbn)
    )
    if (getSpecificAuthor.length === 0) {
        return res.json({
            error: `No author found for the book of ${req.params.isbn}`
        })
    }
    return res.json({ publication: getSpecificAuthor })
})


//POST

/**
 * Route         /book/new
 * Description  add new book
 * Parameter    none
 * Method       post
 * Acces        public
 */
booky.post("/book/new", (req, res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({ updatedBook: database.books })

})
/**
 * Route         /author/new
 * Description  add new author
 * Parameter    none
 * Method       post
 * Acces        public
 */
booky.post("/author/new", (req, res) => {
    const newAuth = req.body;
    database.author.push(newAuth);
    return res.json({ updatedAuthor: database.author })

})
/**
 * Route         /publicaion/new
 * Description  add new publicaion
 * Parameter    none
 * Method       post
 * Acces        public
 */
booky.post("/publicaion/new", (req, res) => {
    const newPublication = req.body;

    database.publication.push(newPublication);
    return res.json({ updatepublication: database.publication })


})

/**  PUT
 * Route         /publicaion/update/book
 * Description  update or add new publication in book
 * Parameter    isbn
 * Method       put
 * Acces        public
 */
booky.put("/publication/update/book/:isbn", (req, res) => {
    //update the publication database

    database.publication.forEach((pub) => {
            if (pub.id === req.body.pubId) {
                //remove the duplicate one
                pub.books.forEach((book)=>{
                    if(book.includes(req.params.isbn)){
                        pub.books.pop(req.params.isbn)

                    }
                })
            return pub.books.push(req.params.isbn)
        }
    })

    //Update book datbase
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.publications = req.body.pubId
            return;
        }
    })
    return res.json({
        books: database.books,
        publications: database.publication,
        Message: "succus fully update publication"
    })
});


/**   DELETE
 * Route         /book/delete
 * Description  delete book
 * Parameter    isbn
 * Method       delete
 * Acces        public
 */
booky.delete("/book/delete/:isbn",(req,res)=>{
    const updatedBook=database.books.filter(
        (book)=>book.ISBN !== req.params.isbn
    )
    database.books=updatedBook;
    return res.json(
        {
            books:database.books
        }
    )
})
/**   
 * Route         /author/delete
 * Description  delete author
 * Parameter    id
 * Method       delete
 * Acces        public
 */
booky.delete("/auth/delete/:Id",(req,res)=>{
    const updatedAuthor=database.author.filter(
        (auth)=>auth.id !== parseInt(req.params.Id)
    )
    database.author=updatedAuthor;
    return res.json(
        {
            Author:database.author
        }
    )
})
/**   
 * Route         /author/delete
 * Description  delete an author from book and vice verca
 * Parameter    isbn,authorId
 * Method       delete
 * Acces        public
 */

booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    //update book DB
    database.books.forEach((book)=>{
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter(
                (eachAuthor)=> eachAuthor !== parseInt(req.params.authorId)
            );
            book.author =newAuthorList
            return;
        }
    })
    //Update Author DB
    database.author.forEach((eachauthors)=>{
        if(eachauthors.id === parseInt(req.params.authorId)){
            const NewbookList= eachauthors.books.filter(
                (book)=>book !== req.params.isbn
            )
            eachauthors.books = NewbookList;
            return;
        }
    })
    return res.json({
        book:database.books,
        author:database.author,
        Message:"author deleted!!!!!"
    })

})
booky.listen(3000, () => {
    console.log("server is running");
})