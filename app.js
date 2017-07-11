var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cons = require('consolidate'),
    dust = require('dustjs-helpers'),
    pg = require('pg'),
    app = express();

var connect = "postgress://wady:1234@localhost/public.recipebookdb";

app.engine('dust', cons.dust);

app.set('view engine', 'dust');
app.set('views', __dirname + '/views');


app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));




app.get('/', function(req, res) {

    //res.render('index');

    const pool = require('./public/js/db');

    pool.query('SELECT * FROM public.recipes', function(err, result) {
        if (err) {
            return console.error('error running query', err);
        }

        res.render('index', { recipes: result.rows });

    });

});



app.post('/add', function(req, res) {
    
        const pool = require('./public/js/db');


        pool.query('INSERT INTO recipes(name, ingredients, directions) VALUES($1, $2, $3)', 
            [req.body.name, req.body.ingredients, req.body.directions],
            function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                }

                    //console.log('noOK');
                    res.redirect('/');
                    //res.send(200);
                
                //console.log('name', result.rows);
            });   

});

app.delete('/delete/:id', function(req, res) {

        const pool = require('./public/js/db');

        pool.query('DELETE FROM recipes WHERE id = $1', 
            [req.params.id],
            function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                //console.log('ok');
                res.send(200);

            });

    });

app.post('/edit', function(req, res){
    
    const pool = require('./public/js/db');

        pool.query('UPDATE recipes SET name=$1, ingredients=$2, directions=$3 WHERE ID=$4',
            [req.body.name, req.body.ingredients, req.body.directions, req.body.id],
            function(err, result) {
                if (err) {
                    return console.error('error running query', err);
                }
                //console.log('ok');
                res.redirect('/');

            });

});


app.listen(3000, function() {
    console.log('Server connected at Port 3000');
});
