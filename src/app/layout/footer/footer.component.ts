import { Component, OnInit, VERSION  } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit{
  public angular_version: string = '';
  public current_year: number = 0;
  constructor() {}

  ngOnInit(): void {
    this.angular_version = VERSION.full;
    this.current_year = new Date().getFullYear();
  }

}
