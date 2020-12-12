const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override');
const app = express()
const port = 5000

mongoose.connect('mongodb://localhost/blogss', 
                { useNewUrlParser: true, 
                  useUnifiedTopology: true, 
                  useCreateIndex:true })

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))


app.get('/', async (req, res) => {
    const articleList = await Article.find().sort({ createdAt: 'desc' })
    res.render('articles/index', { articles: articleList })
})

app.use('/articles', articleRouter)

app.listen(port, () => {
    console.log(`We're live on port ${port}!`)
})
