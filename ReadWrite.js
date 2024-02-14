const fs = require('fs');
const {join} = require("path");

const filePath = join(__dirname, './DataBase/', `Videojocs_DB.txt`);

/*
    Funcio per llegir les dades del fitxer
    retorna un array amb les dades
 */
const readData = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

/*
    Funcio per afegir un nou item a la llista
    retorna un array amb el nou item
 */

const addData = (newItem) => {
    const dataList = readData();
    dataList.push(newItem);
    writeData(dataList);
};

/*
    Funcio per escriure les dades al fitxer
 */

const writeData = (dataList) => {

    try {
        if (!fs.existsSync(filePath)) {
            const dir = join(__dirname, './DataBase');
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
        }
        const jsonData = JSON.stringify(dataList, null, 2);
        fs.writeFileSync(filePath, jsonData, 'utf8');
    } catch (error) {
        console.log(error);
    }
};

module.exports = { readData, addData, writeData };