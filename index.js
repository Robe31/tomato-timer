const express = require('express');
const app = express();
const port = 3000;

// Bringing in paths for the basedir option required for "pug includes"
const path = require('path')

app.set('views', './views')
app.set('view engine', 'pug' )

//the "basedir" option is required to use includes and extends with "absolute" paths
app.locals.basedir = path.join(__dirname, 'views'); 

app.get('/', (req, res) => {
    res.render('index');
})
app.use(express.static('static'))

app.use(function (req, res, next) {
    res.status(404).render('404');
});

app.listen(process.env.PORT || port, () => {
    console.log(`This app is listening at https://localhost:${port}`);
});