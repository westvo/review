import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

export const HEROES: any[] = [
  { id: 12, name: 'Dr. Nice', description: 'Hey ' },
  { id: 13, name: 'Bombasto' },
  { id: 14, name: 'Celeritas' },
  { id: 15, name: 'Magneta' },
  { id: 16, name: 'RubberMan' },
  { id: 17, name: 'Dynama' },
  { id: 18, name: 'Dr. IQ' },
  { id: 19, name: 'Magma' },
  { id: 20, name: 'Tornado' }
];

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<any[]> {
    return of(HEROES);
  }

  getCategories() {
    return this.http.get<any[]>('https://gce.onedev.top/api/v1/keeps')
  }

  getHero(id: number | string) {
    return this.getHeroes().pipe(
      // (+) before `id` turns the string into a number
      map((heroes: any[]) => heroes.find(hero => hero.id === +id)!)
    );
  }
}
