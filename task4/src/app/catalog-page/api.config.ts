import { Injectable } from '@angular/core';

@Injectable()
export class APIConfig {
    apiUrl = "https://api.themoviedb.org/3";
    apiKey = '0994e7679a856150aadcecf7de489bce';
    filmsUrl = `${this.apiUrl}/movie`;
    searchUrl = `${this.apiUrl}/search`;
    personsUrl = `${this.apiUrl}/person`;
    params = `api_key=${this.apiKey}&language=ru-RU`;
    imgPath = 'https://image.tmdb.org/t/p';
    midImgPath = `${this.imgPath}/w500`;
    smallImgPath = `${this.imgPath}/w185`;
    bigBackPath = `${this.imgPath}/w1280`;
    midBackPath = `${this.imgPath}/w780`;
    smallBackPath = `${this.imgPath}/w300`;
}

