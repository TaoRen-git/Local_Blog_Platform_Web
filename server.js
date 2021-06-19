const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override');
const app = express()


mongoose.connect('mongodb://localhost/blogs', 
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

const port = 5000
app.listen(port, () => {
    console.log(`We're live on port ${port}!`)
})
