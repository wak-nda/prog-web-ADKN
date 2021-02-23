const {readJson} = require('fs-extra')
const got = require('got')

async function fetchJson(url) {
    const response = await got(url, {responseType: 'json'})
    return response.body
}
  
async function loadJson(dataSource) {
    if (dataSource.startsWith('http')) {
      return fetchJson(dataSource)
    }
  
    return readJson(dataSource)
}

const {join} = require('path')
const {outputJson} = require('fs-extra')

const CONTRIB_DATA_URL = 'https://raw.githubusercontent.com/opencovid19-fr/data/master/dist/chiffres-cles.json'

async function main() {
  const records = await loadJson(CONTRIB_DATA_URL)
  const filtered = records
    .filter(r => {
      if (r.date < '2020-03-02') {
        return false
      }

      if (r.sourceType === 'sante-publique-france') {
        return true
      }

      if (r.sourceType === 'ministere-sante' && r.date < '2021-02-28') {
        return true
      }

      return false
    })

  await outputJson(join(__dirname,'src','server','data','contrib-data.json'), filtered, {spaces: 2})
}

main().catch(error => {
    console.error(error)
    process.exit(1)
})