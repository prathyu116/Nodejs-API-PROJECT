require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
var bodyParser = require('body-parser');

//Database
// const database = require("./database/dataset");
 //Models
 const BookModel = require('./database/book');
 const AuthorModel = require('./database/author');
 const PublicationModel = require('./database/publication');

const booky = express();
booky.use(bodyParser.urlencoded({ extended: true }))
booky.use(bodyParser.json());

//DB Connection
 mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connection established"))


/**
 * Route        
 * Description  to get all book
 * Acces        public
 * Parameter    Nono
 * Method       Get
 */
booky.get('/', async(req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
})
/**
 * Route         /is
 * Description  to get specific book
 * Parameter    isbn
 * Method       Get
 */
booky.get('/is/:isbn', async(req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
    if (!getSpecificBook) {
        return res.json({ error: `No Book Found for the ISBN of ${req.params.isbn} `, });
    }
    return res.json({ book: getSpecificBook });
})

/**
 * Route         /c
 * Description  to get specific book category
 * Parameter    category
 * Method       Get
 * Acces        public
 */

booky.get('/c/:category', async(req, res) => {
    const getSpecificBooks = await BookModel.findOne({ category: req.params.category });
    if (!getSpecificBooks) {
        return res.json({ error: `No Book Found for the category of ${req.params.category} `, });
    }
    return res.json({ book: getSpecificBooks });
})
/**
 * Route         /lang
 * Description  to get specific book based on language
 * Parameter    language
 * Method       Get
 * Acces        public
 */
booky.get('/lang/:language', async(req, res) => {
    const getSpecificBooks = await BookModel.findOne({ language: req.params.language });
    if (!getSpecificBooks) {
        return res.json({ error: `No Book Found for the language of ${req.params.language} `, });
    }
    return res.json({ book: getSpecificBooks });

})

/**
 * Route         /author
 * Description  to get author all
 * Parameter    none
 * Method       Get
 * Acces        public
 */
booky.get('/author', async(req, res) => {
    const getAllAuthor = await AuthorModel.find();
    return res.json(getAllAuthor);
})

/**
 * Route         /author/book
 * Description  To get a specific author 
 * Parameter    name
 * Method       Get
 * Acces        public
 */
booky.get('/author/:name', async(req, res) => {
    const getSpecificAuthors = await AuthorModel.findOne({ name: req.params.name });
    if (!getSpecificAuthors) {
        return res.json({ error: `No Author Found for the Name  ${req.params.name} `, });
    }
    return res.json({ authors: getSpecificAuthors });

})



/**
 * Route         /author/book
 * Description  to get all author based on book
 * Parameter    isbn
 * Method       Get
 * Acces        public
 */
booky.get('/author/book/:isbn', async(req, res) => {
    const getSpecificAuthors = await AuthorModel.findOne({ books: req.params.isbn });
    if (!getSpecificAuthors) {
        return res.json({ error: `No Author Found for the ISBN  ${req.params.isbn} `, });
    }
    return res.json({ authors: getSpecificAuthors });
})

/**
 * Route         /publication
 * Description  to get all publication
 * Parameter    none
 * Method       Get
 * Acces        public
 */

booky.get('/publication',async (req, res) => {
    const getAllPublication = await PublicationModel.find();
    return res.json(getAllPublication);
})
/**
 * Route         /publication/
 * Description  to get specifivc publication
 * Parameter    name
 * Method       Get
 * Acces        public
 */
booky.get('/publication/:name', async(req, res) => {
    const getSpecificPublications = await PublicationModel.findOne({ name: req.params.name });
    if (!getSpecificPublications) {
        return res.json({ error: `No publication Found for the name  ${req.params.name} `, });
    }
    return res.json({ publications: getSpecificPublications });

})
/**
 * Route         /publication/book
 * Description  to get all publication based on book
 * Parameter    isbn
 * Method       Get
 * Acces        public
 */
booky.get('/publication/book/:isbn', async(req, res) => {
    const getSpecificPublications = await PublicationModel.findOne({ books: req.params.isbn });
    if (!getSpecificPublications) {
        return res.json({ error: `No publication Found for the ISBN  ${req.params.name} `, });
    }
    return res.json({ publications: getSpecificPublications });
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
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    return res.json({ books: addNewBook, message: "Book was added!!!" })

})
/**
 * Route         /author/new
 * Description  add new author
 * Parameter    none
 * Method       post
 * Acces        public
 */
booky.post("/author/new", (req, res) => {
    const { newAuthor } = req.body;
    AuthorModel.create(newAuthor);
    return res.json({author:newAuthor, message: "Author was added!!!" });

})
/**
 * Route         /publicaion/new
 * Description  add new publicaion
 * Parameter    none
 * Method       post
 * Acces        public
 */
booky.post("/publicaion/new", (req, res) => {
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);
    return res.json({publication:newPublication, message: "Publication was added!!!" })


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
            pub.books.forEach((book) => {
                if (book.includes(req.params.isbn)) {
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
booky.delete("/book/delete/:isbn", (req, res) => {
    const updatedBook = database.books.filter(
        (book) => book.ISBN !== req.params.isbn
    )
    database.books = updatedBook;
    return res.json(
        {
            books: database.books
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
booky.delete("/auth/delete/:Id", (req, res) => {
    const updatedAuthor = database.author.filter(
        (auth) => auth.id !== parseInt(req.params.Id)
    )
    database.author = updatedAuthor;
    return res.json(
        {
            Author: database.author
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

booky.delete("/book/delete/author/:isbn/:authorId", (req, res) => {
    //update book DB
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const newAuthorList = book.author.filter(
                (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
            );
            book.author = newAuthorList
            return;
        }
    })
    //Update Author DB
    database.author.forEach((eachauthors) => {
        if (eachauthors.id === parseInt(req.params.authorId)) {
            const NewbookList = eachauthors.books.filter(
                (book) => book !== req.params.isbn
            )
            eachauthors.books = NewbookList;
            return;
        }
    })
    return res.json({
        book: database.books,
        author: database.author,
        Message: "author deleted!!!!!"
    })

})
booky.listen(3001, () => {
    console.log("server is running");
})