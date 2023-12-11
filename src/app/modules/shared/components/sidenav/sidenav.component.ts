import { MediaMatcher } from '@angular/cdk/layout';
import { Component, inject} from '@angular/core';
import {KeycloakService} from 'keycloak-angular'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent{

  mobileQuery: MediaQueryList;
  private keycloakservice = inject(KeycloakService);
  username: any;

  menuNav =[
    {name: "Home", route: "home", icon: "home"},
    {name: "Categorias", route: "category", icon: "category"},
    {name: "Productos", route: "product", icon: "production_quantity_limits"}
  ]

  constructor(media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: )px');
  }

  ngOnInit(): void{
    this.username =  this.keycloakservice.getUsername();
  }

  logout(){
    this.keycloakservice.logout();
  }
}
