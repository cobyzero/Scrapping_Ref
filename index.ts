import { scrapGoogleScholar, scrapScielo } from './scrapping';
import * as fs from 'fs/promises';

async function testScrapping() {
  const query = 'machine learning';
  const resultadosGoogleScholar = await scrapGoogleScholar(query);
  const resultadosScielo = await scrapScielo(query);

  const resultados = {
    googleScholar: resultadosGoogleScholar,
    scielo: resultadosScielo
  };

  await fs.writeFile('exported.json', JSON.stringify(resultados, null, 2), 'utf-8');
  console.log('exported.json saved');
}

testScrapping();