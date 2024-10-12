import axios from 'axios';
import * as cheerio from 'cheerio';
import { URL } from 'url';
import { ScrappingModel } from './scrapping.model';
 
async function scrapGoogleScholar(
  query: string,
  page: number = 0,
): Promise<{
  results: ScrappingModel[];
  totalResults: number;
  currentPage: number;
}> {
  try {
    const url = `https://scholar.google.com/scholar?q=${encodeURIComponent(query)}&start=${page * 10}&hl=es&as_sdt=0&ie=UTF-8&oe=UTF-8`;
    const response = await axios.get(url, {
      headers: {
        'Accept-Language': 'es-ES,es;q=0.9',
        'Accept-Charset': 'UTF-8',
      },
      responseType: 'arraybuffer',
    });
    const $ = cheerio.load(response.data.toString('utf-8'));

    const results = [];

    $('.gs_r').each((index, element) => {
      const title = $(element).find('.gs_rt').text().trim();
      const authorInfo = $(element).find('.gs_a').text().trim();

      // Parsear la información de autores, año y fuente
      let authorInfoParts = authorInfo.split('-');

      if (authorInfoParts.length >= 2) {
        const authors = authorInfoParts[0].trim();
        const year = authorInfoParts[1].trim();

        const link = $(element).find('.gs_rt a').attr('href') || '';
        const description = $(element).find('.gs_rs').text().trim();

        let domain = '';
        if (link) {
          try {
            const urlObject = new URL(link);
            domain = urlObject.hostname;
          } catch (error) {
            console.error('Error al extraer el dominio:', error);
          }
        }
        if (title && authors && link) {
          results.push({
            title,
            authors,
            year,
            link,
            description,
            domain,
            source: 'google-scholar',
          });
        }
      }
    });

    const totalResultsText = $('.gs_ab_mdw').text();
    const totalResultsMatch = totalResultsText.match(
      /aproximadamente ([\d.]+) resultados?/i,
    );
    const totalResults = totalResultsMatch
      ? parseInt(totalResultsMatch[1].replace(/\./g, ''), 10)
      : 0;

    if (totalResults === 0) {
      console.log('Texto completo de resultados:', totalResultsText);
    }

    const currentPage = page;

    const resultModels: ScrappingModel[] = results.map(
      (result) => new ScrappingModel(result),
    );
    return {
      results: resultModels,
      totalResults,
      currentPage,
    };
  } catch (error) {
    console.error('Error al extraer datos de Google Scholar:', error);
    return {
      results: [],
      totalResults: 0,
      currentPage: page,
    };
  }
}

async function scrapScielo(
  query: string,
  page: number = 1,
): Promise<{
  results: ScrappingModel[];
  totalResults: number;
  currentPage: number;
}> {
  try {
    const baseUrl = 'https://search.scielo.org/';
    const url = `${baseUrl}?q=${encodeURIComponent(query)}&page=${page}`;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const results: any[] = [];

    $('.results .item').each((_, element) => {
      const title = $(element).find('.title').text().trim();
      const authors = $(element).find('.author').text().trim();

      const year = $(element).find('.line').text().match(/\d{4}/)?.[0] || '';
      const link = $(element).find('.DOIResults').text().trim();

      let description = $('div[id*="scl_es"]').text().trim();

      if (!description) {
        description = $('div[id*="scl_en"]').text().trim();
      }
      if (!description) {
        description = $('div[id*="scl_pt"]').text().trim();
      }
      let domain = '';

      try {
        if (link) {
          const urlObject = new URL(link);
          domain = urlObject.hostname;
        }
      } catch (error) {
        console.error('Error al extraer el dominio:', error);
      }

      if (title && authors && link) {
        results.push({
          title,
          authors,
          year,
          link,
          description,
          domain,
          source: 'scielo',
        });
      }
    });

    console.log('Resultados encontrados:', results.length);

    const totalResultsText = $('.results-stats').text();
    const totalResultsMatch = totalResultsText.match(/(\d+)/);
    const totalResults = Number(
      $('.filterTitle strong').text().replace(/\D/g, '') || 0,
    );

    const resultModels: ScrappingModel[] = results.map(
      (result) =>
        new ScrappingModel({
          ...result,
          description: result.description,
        }),
    );

    return {
      results: resultModels,
      totalResults,
      currentPage: page,
    };
  } catch (error) {
    console.error('Error al extraer datos de Scielo:', error);
    return {
      results: [],
      totalResults: 0,
      currentPage: page,
    };
  }
}

export { scrapGoogleScholar, scrapScielo };
