// import getCSV from 'get-csv';
import  parse  from 'csv-parse';
import * as assert  from 'assert'
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { addDataFromHospital } from '../sdk/DataFromHospital.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const loadFile = async (filePath) => {
    const output = []
    const headers = [];

    const fileContent = await fs.readFileSync(path.resolve( __dirname,"../data/donnees-hospitalieres.csv"));
    const parser = parse({
        delimiter: ';'
    })

    parser.on('readable', async function(){
        let record
        let index = 0;
        while (record = parser.read()) {
            if (index=== 0){
                headers.push(record)
            }
            else{
                output.push(record);
                await  addDataFromHospital(output[0],output[1],output[2],output[3],output[4],output[5],output[6])
            }
            index++;
        }

    })

    parser.on('end', function(){
        return {headers, output};
    })

    parser.write(fileContent);
    console.table(headers);
    parser.end();

}

export const loadFileCSV = loadFile;


