import { Component, OnInit } from '@angular/core';

//Service
import { IngredientesService } from '../../../common/services/ingredientes.service';

//Modelo
import { Ingrediente } from '../../../common/models/ingrediente';


@Component({
  selector: 'app-lista-ingredientes',
  templateUrl: './lista-ingredientes.component.html',
  styleUrls: ['./lista-ingredientes.component.css']
})
export class ListaIngredientesComponent implements OnInit {

  constructor(
    private ingredientesServicio:IngredientesService,
  ) { }
 
  listaIngredientes:Ingrediente[];

  ngOnInit(){
    return this.ingredientesServicio.obtenerIngredientes().snapshotChanges().subscribe(item => {
      this.listaIngredientes = [];
      item.forEach(element => {
        let x = element.payload.toJSON();
        x["id"] = element.key;
        this.listaIngredientes.push(x as Ingrediente);
        
      });
    }); 
  }




}
