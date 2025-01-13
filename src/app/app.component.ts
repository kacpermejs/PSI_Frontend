import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavBarComponent } from '@core/components/nav-bar/nav-bar.component';
import { ConfigService } from '@core/services/config/config.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, NavBarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'PSI_Frontend';

  configService = inject(ConfigService);

  ngOnInit(): void {
    this.configService
      .setConfig()
      .then(() =>
        console.log(`App is running in ${this.configService.readConfig().Environment} environment!`)
      );
  }
}
