const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {readData, addData, writeData} = require("./ReadWrite");


app.use(bodyParser.json());


/*
    Funcio per obtenir tots els videojocs
    retorna un array amb tots els videojocs
 */

app.get('/API_REST_v1/api/videojocs', async (req, res) => {
    res.json(await readData());
});

/*
    Funcio per obtenir un videojoc segons el seu id
    si el videojoc no existeix retorna un 404
    si el videojoc existeix retorna el videojoc
 */

app.get('/API_REST_v1/api/videojocs/:id', async (req, res) => {
    let videojocs = await readData();
    const id = req.params.id;
    const videojoc = videojocs.find(v => v.ID === id);
    if (!videojoc) {
        return res.status(404).send('Videojoc no trobat');
    }
    res.json(videojoc);
});

/*
    Funcio per filtrar els videojocs segons la seva empresa
    retorna un array amb els videojocs que tenen la mateixa empresa
 */

app.get('/API_REST_v1/api/videojocs/filtrarEmpresa/:empresa', (req, res) => {
    let videojocs = readData();
    const empresa = req.params.empresa;
    const videojocsEmpresa = videojocs.filter(v => v.EMPRESA === empresa.replaceAll("+", " "));
    res.json(videojocsEmpresa);
});

/*
    Funcio per crear un videojoc
    retorna un missatge de exit
 */

app.post('/API_REST_v1/api/videojocs/create', async (req, res) => {
    let videojocs = await readData();
    const videojoc = req.body;
    videojocs.push(videojoc);
    addData(videojoc)
    res.status(201).send('Videojoc creat amb èxit');
});

/*
    Funcio per actualitzar un videojoc segons el seu id
    si el videojoc no existeix retorna un 404
    si el videojoc existeix actualitza el videojoc i retorna un missatge de exit
 */

app.put('/API_REST_v1/api/videojocs/update/:id', (req, res) => {
    let videojocs = readData();
    const id = parseInt(req.params.id);
    const videojocUpdate = req.body;
    const index = videojocs.findIndex(v => v.ID === id.toString())
    if (index === -1) {
        return res.status(404).send('Videojoc no trobat');
    }
    videojocs[index] = { ...videojocs[index], ...videojocUpdate };
    writeData(videojocs)
    res.send('Videojoc actualitzat amb èxit');
});

/*
    Funcio per eliminar un videojoc segons el seu id
    si el videojoc no existeix retorna un 404
    si el videojoc existeix esborra el videojoc i retorna un missatge de exit
 */

app.delete('/API_REST_v1/api/videojocs/delete/:id', async (req, res) => {
    let videojocs = await readData();
    const id = req.params.id;
    if (!videojocs.find(v => v.ID === id)) {
        return res.status(404).send('Videojoc no trobat');
    }
    videojocs = videojocs.filter(v => v.ID !== id);
    writeData(videojocs)
    res.send('Videojoc eliminat amb èxit');
});

app.listen(8080, () => console.log('Servidor escoltant al port 8080'));
