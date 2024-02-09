import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

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

  constructor(public http: HttpClient) { }

  getHeroes(): Observable<any[]> {
    return of(HEROES);
  }

  getCategories() {
    return this.http.get<any[]>(`http://localhost:3000/api/v1/keeps?limit=0`)
  }

  getKeeps(id: string) {
    return this.http.get<any[]>(`http://localhost:3000/api/v1/keeps?limit=0&parent_id=${id}`)
  }

  create(data: any) {
    return this.http.post<any[]>('http://localhost:3000/api/v1/keeps', data)
  }

  update(data: any) {
    return this.http.put<any[]>(`http://localhost:3000/api/v1/keeps/${data.id}`, data)
  }

  delete(id: string) {
    return this.http.delete<any[]>(`http://localhost:3000/api/v1/keeps/${id}`);
  }

  getHero(id: number | string) {
    return this.getHeroes().pipe(
      // (+) before `id` turns the string into a number
      map((heroes: any[]) => heroes.find(hero => hero.id === +id)!)
    );
  }
}
