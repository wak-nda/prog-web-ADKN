// import getCSV from 'get-csv';
const parse = require('csv-parse');
const fs = require('fs');
const path = require('path');
const url =  require('url');
const TauxIncidenceSdk = require('./TauxIncidenceSdk')


const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const loadFile = async (filePath) => {
    return new Promise(
        (resolve => {
            const output = [];
            const headers = [];

            const fileContent =  fs.readFileSync(path.resolve( __dirname,"../data/sp-pe-std-heb-fra-2021-02-27-19h20.csv"));
            const parser = parse({
                delimiter: ';'
            })

            parser.on('readable',  async function(){
                let record
                let index = 0;
                while (record = parser.read() ) {
                    if (index=== 0){
                        headers.push(record);
                    }
                    else{
                        output.push(record);
                        await  TauxIncidenceSdk.addDataTauxIncidence(record[0],record[1],record[2],record[3],record[4]);
                    }
                    index++;
                }
            });

            parser.on('end',  async function(){

                resolve({headers, output});
            });

            parser.write(fileContent);
            parser.end();


        })
    )
};

module.exports = { loadFile };
