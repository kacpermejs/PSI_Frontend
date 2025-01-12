import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ConfigService } from '@core/services/config/config.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'PSI_Frontend';

  configService = inject(ConfigService);
  env = this.configService.readConfig().Environment

  ngOnInit(): void {
    console.log(`App is running in ${this.env} environment!`); 
  }
}
