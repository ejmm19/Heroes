import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Heroe } from "../../interfaces/heroe.interface";
import { HeroesService } from "../../services/heroes.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  heroe: Heroe = {
    nombre: "",
    bio: "",
    casa: "Marvel",
    // key$: ""
  };

  nuevo:boolean = false;
  id:string;

  constructor(private _heroesService: HeroesService,private router:Router, private route: ActivatedRoute) {
      this.route.params.subscribe(
          parametros=>{
              console.log(parametros);
              this.id =  parametros['id'];
              if( this.id !== "nuevo" ){
                  this._heroesService.getheroe(this.id).subscribe(heroe => this.heroe = heroe)
              }
          }
      );
  }

  ngOnInit() {
  }

  guardar(){
      console.log(this.heroe);
      if (this.id == "nuevo"){
          //Insertando
          this._heroesService.nuevoHeroe(this.heroe).subscribe( data=>{
                  this.router.navigate(['/heroe',data.name])
              },
              error=>console.error(error)
          );
      }else {
          //actualizando
          this._heroesService.actualizarHeroe(this.heroe, this.id ).subscribe( data=>{
                  console.log(data);
              },
              error=>console.error(error)
          );
      }

  }
  agregarNuevo( form:NgForm){
      this.router.navigate(['/heroe','nuevo']);

      form.reset({
          casa:"Marvel"
      });
  }
}
