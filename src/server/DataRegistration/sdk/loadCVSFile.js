// import getCSV from 'get-csv';
import  parse  from 'csv-parse';
import * as assert  from 'assert'
const output = []


const loadFile = async (filePath) => {
    const parser = parse({
        delimiter: ';'
    })

    parser.on('readable', function(){
        let record
        while (record = parser.read()) {
            output.push(record)
        }
    })

    parser.on('end', function(){
        console.table(output);
    })
}

export const loadFileCSV = loadFile;


