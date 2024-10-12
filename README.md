# Scrapping_ref

## Project Description

This project is a web scraping tool designed to extract academic information from Google Scholar and Scielo. It's built using TypeScript and provides a simple way to search for and collect research data from these two popular academic search engines.

## Features

- Scrapes data from Google Scholar and Scielo
- Searches based on user-defined queries
- Extracts information such as title, authors, year, link, and description
- Outputs results in a structured JSON format

## How to Use

1. Clone the repository
2. Install dependencies with `npm install`
3. Run the script with `npm run dev`
4. Results will be saved in `exported.json`

## Sample Output

Below is an example of the JSON output structure:

```json
{
  "googleScholar": {
    "results": [
      {
        "title": "[LIBRO][B] Machine learning",
        "authors": "ZH Zhou",
        "year": "2021",
        "link": "https://books.google.com/books?hl=es&lr=&id=ctM-EAAAQBAJ&oi=fnd&pg=PR6&dq=machine+learning&ots=o_Kp_3Wz3t&sig=P9SylBkXxEAvqFq5-4zrk4-fZow",
        "domain": "books.google.com",
        "description": "… machine learning. The second part includes Chapters 4–10, which presents some classic and \npopular machine learning … cover the core topics of machine learning in one semester, and …",
        "source": "google-scholar"
      },
    ],
    "totalResults": 0,
    "currentPage": 0
  },
  "scielo": {
    "results": [
      {
        "title": "Machine learning for ranking multivariate variables in cattle breeds raised in Paraguayan wetlands",
        "authors": "Pereira, Walter E.Centurión, Liz M.Valdez, CarolinaMartínez-López, Roberto",
        "year": "2025",
        "link": "https://doi.org/10.1590/1807-1929/agriambi.v29n1e283168",
        "domain": "doi.org",
        "description": "Resumen: Se trata de estudiar, en una primera aproximación, el impacto del cambio en el modo de producción como consecuencia de la telemática y el uso del aprendizaje de las máquinas y la inteligencia artificial en muchas de las aplicaciones y procesos repetitivos en los sistemas sociales de producción y distribución de bienes. Se utilizó el método del construccionismo sistémico, que, en definitiva, parte de la base de que los datos no son datos, sino construcciones con supuestos teóricos inevitables, y de que la lengua es el sistema en el que se construyen los lenguajes que son un límite general para obtener y comunicar información en la sociedad. Esto conduce a una teoría de las acciones algo diferente de las de Parsons y Luhmann, que lleva al concepto de praxemas, y a todo un nuevo análisis de la sociedad y su derecho. Resumen estudiar aproximación bienes sistémico definitiva inevitables Luhmann praxemas derecho",
        "source": "scielo"
      }
    ],
    "totalResults": 1075,
    "currentPage": 1
  }
}
```






