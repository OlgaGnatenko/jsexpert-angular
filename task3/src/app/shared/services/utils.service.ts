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
}
