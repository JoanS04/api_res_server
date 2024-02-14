const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {readData, addData, writeData} = require("./ReadWrite");


app.use(bodyParser.json());



app.get('/api/videojocs', (req, res) => {
    let videojocs = readData();
    res.json(videojocs);
});

app.get('/api/videojocs/:id', (req, res) => {
    let videojocs = readData();
    const id = parseInt(req.params.id);
    const videojoc = videojocs.find(v => v.ID === id);
    if (!videojoc) {
        return res.status(404).send('Videojoc no trobat');
    }
    res.json(videojoc);
});

app.get('/api/videojocs/:empresa', (req, res) => {
    let videojocs = readData();
    const empresa = req.params.empresa;
    const videojocsEmpresa = videojocs.filter(v => v.EMPRESA === empresa);
    res.json(videojocsEmpresa);
});

app.post('/api/videojocs/create', (req, res) => {
    let videojocs = readData();
    const videojoc = req.body;
    console.log(req.body);
    videojocs.push(videojoc);
    addData(videojoc)
    res.status(201).send('Videojoc creat amb èxit');
});

app.put('/api/videojocs/update/:id', (req, res) => {
    let videojocs = readData();
    const id = parseInt(req.params.id);
    const videojocUpdate = req.body;
    const index = videojocs.findIndex(v => v.ID === id);
    if (index === -1) {
        return res.status(404).send('Videojoc no trobat');
    }
    videojocs[index] = { ...videojocs[index], ...videojocUpdate };
    writeData(videojocs)
    res.send('Videojoc actualitzat amb èxit');
});

app.delete('/api/videojocs/delete/:id', (req, res) => {
    let videojocs = readData();
    const id = parseInt(req.params.id);
    videojocs = videojocs.filter(v => v.ID !== id);
    writeData(videojocs)
    res.send('Videojoc eliminat amb èxit');
});

app.listen(8080, () => console.log('Servidor escoltant al port 8080'));
