import { Component, OnInit } from '@angular/core';
import { PropertyService } from '../../service/PropertyService.Service';
import { CommonModule } from '@angular/common';
import { Property } from '../../interfaces/Property.interface';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PagedResult } from '../../interfaces/PagedResult.interface';

@Component({
  selector: 'app-property-list',
  standalone:true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './property-list.component.html',
  styleUrl: './property-list.component.css'
})

export class PropertyListComponent implements OnInit {

  constructor(private propertiesService: PropertyService) {}

  propertiesList : any[] = [];
  page = 1;
  pageSize = 5;
  totalItems = this.propertiesList?.length ?? 0; 
  Math = Math;
  get lastPage() { return Math.max(1, Math.ceil(this.totalItems / this.pageSize)); }
  get hasPrev()  { return this.page > 1; }
  get hasNext()  { return this.page < this.lastPage; }
  
  ngOnInit(){
    this.load(this.page, this.pageSize);
  }

  private load(page:number, pageSize:number){
    this.propertiesService.listProperty(page, pageSize).subscribe({
      next:(res) => {
        console.log(res)
        this.propertiesList =  res.items
        this.totalItems = res.totalItems

      }
    })
  }

  onPageSizeChange(newValueSelected: number) { 
    this.pageSize = +newValueSelected;
    this.load(this.page ,this.pageSize)
  }

  goToPage(p: number) {
     this.page = Math.min(Math.max(1,p), this.lastPage);
     this.load(this.page, this.pageSize);
  }

  onDelete(p: Property) { 
   
  }

  
   

  

}
