const express = require('express')
const Article = require('../models/article')
const router = express.Router()

// create a new 
router.get('/new', (req, res) => {
    res.render('articles/new', { article: new Article() })
})

router.get('/edit/:id', async (req, res) => {
    const editedArticle = await Article.findById(req.params.id)
    if (editedArticle == null) {
        res.redirect('/')
    }
    res.render('articles/edit', { article: editedArticle })
})

router.get('/:slug', async (req, res) => {
    const foundArticle = await Article.findOne({ slug: req.params.slug })
    if (foundArticle == null) {
        res.redirect('/')
    }
    res.render('articles/show', { article: foundArticle })
})

router.post('/', async (req, res, next) => {
    req.article = new Article()
    next()
}, saveArticleAndRedirect('new'))

router.put('/:id', async (req, res, next) => {
    req.article = await Article.findById(req.params.id)
    next()
}, saveArticleAndRedirect('edit'))

router.delete('/:id', async (req, res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})

function saveArticleAndRedirect(path) {
    return async (req, res) => {
        let newArticle = req.article
        newArticle.title = req.body.title
        newArticle.description = req.body.description
        newArticle.markdown = req.body.markdown
    
        try {
            newArticle = await newArticle.save()
            res.redirect(`/articles/${newArticle.slug}`)
    
        } catch (error) {
            console.log(error)
            res.render(`articles/${path}`, { article: newArticle })
        }
    }
}

module.exports = router