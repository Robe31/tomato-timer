const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
app.set('views', './views')
app.set('view engine', 'pug' )
app.locals.basedir = path.join(__dirname, 'views');

app.get('/', (req, res) => {
    res.render('index')
    
})
app.use(express.static('static'))

app.use(function (req, res, next) {
    res.status(404).render('404')
  })

app.listen(port, () => {
    console.log(`This app is listening at http://localhost:${port}`)
});