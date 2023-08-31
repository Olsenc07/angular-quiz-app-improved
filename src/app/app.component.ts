import { Component } from '@angular/core'
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule, HttpClientModule]
})
export class AppComponent {
}
