import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UtilsService {
    // compareStrings orders two strings according to a given direction
    compareStrings(direct: number, str1: string, str2: string) {
        const lowerA = str1 ? str1.toLowerCase() : "";
        const lowerB = str2 ? str2.toLowerCase() : "";
        if (lowerA > lowerB) {
            return direct;
        }
        if (lowerA < lowerB) {
            return -1 * direct;
        }
        return 0;
    }

    // function receives the number of items per row given item width and current window  
    getItemsPerRow(size: number): number {
        const width = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
        return Math.floor(width / size);
    }
}
