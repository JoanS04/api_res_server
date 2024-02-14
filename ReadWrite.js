const fs = require('fs');
const {join} = require("path");

const filePath = join(__dirname, './DataBase/', `Videojocs_DB.txt`);


const readData = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const addData = (newItem) => {
    const dataList = readData();
    dataList.push(newItem);
    writeData(dataList);
};

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