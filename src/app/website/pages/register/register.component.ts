import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  onExit(){
    const rta = confirm('¿Estás seguro de salir, se perderan los datos?');
    return rta;
  }

}
