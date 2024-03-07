import { Component } from '@angular/core';
import { MyService } from '../services/service';
import { take } from 'rxjs';

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [],
  templateUrl: './main-app.component.html',
  styleUrl: './main-app.component.css'
})
export class MainAppComponent {


  constructor(private myService: MyService) { }

  ngOnInit(): void {
    this.myService.getData(51.5085, -0.1257).pipe(take(1)).subscribe({
      next: data => {
        console.log(data);
      },
      error: error => {
        console.error(error);
      }
    });
  }


}
