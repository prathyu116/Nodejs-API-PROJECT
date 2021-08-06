const express = require("express");

//Database
const database = require("./dataset")
// console.log(database);

const booky = express();
/**
 * Route         /
 * Description  to get all book
 * Acces        public
 * Parameter    Nono
 * Method       Get
 */
booky.get('/',(req,res)=>{
    return res.json({books:database.books})
})
/**
 * Route         /is
 * Description  to get specific book
 * Parameter    isbn
 * Method       Get
 */
booky.get('/is/:isbn',(req,res)=>{
    const getSpecificBook = database.books.filter((book)=>book.ISBN === req.params.isbn)
    console.log(getSpecificBook);
    if(getSpecificBook.length === 0){
        return res.json({error:`NO BOOK FOUND FOR THE ISBN OF ${req.params.isbn}`})
    }
    return res.json({book:getSpecificBook})

})

/**
 * Route         /c
 * Description  to get specific book category
 * Parameter    category
 * Method       Get
 * Acces        public
 */

booky.get('/c/:category',(req,res)=>{
    const getSpecificBook  = database.books.filter(
        (book)=>book.category.includes(req.params.category)
    )
    if(getSpecificBook.length ===0){
        return  res.json({error:`NO BOOK FOUND FOR THE CATEGORY OF ${req.params.category}`})
    }
    return res.json({book:getSpecificBook})
})
/**
 * Route         /lang
 * Description  to get specific book based on language
 * Parameter    language
 * Method       Get
 * Acces        public
 */
booky.get('/lang/:language',(req,res)=>{
    const getSpecificBook=database.books.filter(
        (book)=>book.language===req.params.language
    )
    if(getSpecificBook.length ===0){
        return  res.json({error:`NO BOOK FOUND FOR THE LANGUAGE OF ${req.params.language}`})
    }
    return res.json({book:getSpecificBook})

})

/**
 * Route         /author
 * Description  to get author all
 * Parameter    none
 * Method       Get
 * Acces        public
 */
booky.get('/author',(req,res)=>{
    return res.json({authors:database.author})
})

/**
 * Route         /author/book
 * Description  To get a specific author 
 * Parameter    name
 * Method       Get
 * Acces        public
 */
booky.get('/author/:name',(req,res)=>{
    const getSpecificAuthor =database.author.filter(
        (author)=>author.name===req.params.name
    )
    if(getSpecificAuthor.length===0){
        return res.json({
            error:`The author ${req.params.name} not found  `
        })
    }
    return res.json({author:getSpecificAuthor})

})



/**
 * Route         /author/book
 * Description  to get all author based on book
 * Parameter    isbn
 * Method       Get
 * Acces        public
 */
booky.get('/author/book/:isbn',(req,res)=>{
    const hetSpecificAuthor =database.author.filter(
        (author)=>author.books.includes(req.params.isbn)
    )
    if(getSpecificAuthor.length===0){
        return res.json({
            error:`No author found for the book of ${req.params.isbn}`
        })
    }
    return res.json({author:getSpecificAuthor})
})

/**
 * Route         /publication
 * Description  to get all publication
 * Parameter    none
 * Method       Get
 * Acces        public
 */

booky.get('/publication',(req,res)=>{
    return res.json({publication:database.publication})
})
/**
 * Route         /publication/
 * Description  to get specifivc publication
 * Parameter    name
 * Method       Get
 * Acces        public
 */
booky.get('/publication/:name',(req,res)=>{
    const getSpecificpublication = database.publication.filter((publication)=>publication.name === req.params.name)
    if(getSpecificpublication.length === 0){
        return res.json({error:`NO PUBLICATION FOUND FOR THE NAME OF ${req.params.name}`})
    }
    return res.json({publication:getSpecificpublication})

})
/**
 * Route         /publication/book
 * Description  to get all publication based on book
 * Parameter    isbn
 * Method       Get
 * Acces        public
 */
booky.get('/publication/book/:isbn',(req,res)=>{
    const getSpecificAuthor =database.publication.filter(
        (book)=>book.books.includes(req.params.isbn)
    )
    if(getSpecificAuthor.length===0){
        return res.json({
            error:`No author found for the book of ${req.params.isbn}`
        })
    }
    return res.json({publication:getSpecificAuthor})
})
booky.listen(3000,()=>{
    console.log("server is running");
})