import { Component, OnInit } from '@angular/core';

interface Business {
  name: string;
  address: string;
  description: string;
  logo: string;
  reviewCount: number;
  // Add whatever other fields you need
}

@Component({
  selector: 'app-business-list',
  templateUrl: './business-list.component.html',
  styleUrls: ['./business-list.component.css']
})
export class BusinessListComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}