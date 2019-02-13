import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { Heroe } from "../interfaces/heroe.interface";
import { map } from "rxjs/operators";

@Injectable()

export class HeroesService {

    heroesUrl:string = "https://heroesapp-d951d.firebaseio.com/heroes.json";
    heroeUrl:string = "https://heroesapp-d951d.firebaseio.com/heroes/";

  constructor( private http:Http ) { }

  nuevoHeroe( heroe: Heroe ){

      let body = JSON.stringify( heroe );
      let headers = new Headers({
        'Content-Type' : 'application/json'
      });
      return this.http.post( this.heroesUrl,body,{headers:headers}).pipe(
          map( res => {
              console.log( res.json() );
              return res.json();
          })
      )
  }
    actualizarHeroe( heroe: Heroe, key$:string ){

        let body = JSON.stringify( heroe );
        let headers = new Headers({
            'Content-Type' : 'application/json'
        });
        let url = `${ this.heroeUrl }/${ key$ }.json`;
        return this.http.put( url,body,{headers:headers}).pipe(
            map( res => {
                console.log( res.json() );
                return res.json();
            })
        )
    }
    getheroe(key$: string){
      let url = `${ this.heroeUrl }/${ key$ }.json`;
      return this.http.get( url ).pipe(
          map(res => {
              return res.json();
          })
      );
    }
    getheroes(){
      return this.http.get( this.heroesUrl ).pipe(
          map(res => {
              return res.json();
          })
      );
    }
    borrarHeroe(key$: string){
      let url = `${ this.heroeUrl }/${ key$ }.json`;
      return this.http.delete( url ).pipe(
          map(res => {
              return res.json();
          })
      );
    }
}
