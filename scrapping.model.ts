export class ScrappingModel {
    title: string;
    authors: string;
    year: string;
    link: string;
    domain: string;
    description: string;
    source: string;
    constructor(data: any) {
      this.title = data.title;
      this.authors = data.authors;
      this.year = data.year;
      this.link = data.link;
      this.domain = data.domain;
      this.description = data.description;
      this.source = data.source;
    }
  }
  