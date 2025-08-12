import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PropertyService } from '../../service/PropertyService.Service';
import { PropertyTypeEnum } from '../../enums/PropertyType.enum';
import { ErrorService } from '../../shared/services/error.service';
import { SuccessService } from '../../shared/services/success.service';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './property-form.component.html',
  styleUrl: './property-form.component.css'
})

export class PropertyFormComponent implements OnInit {

  propertyType: { key: number, value: string }[] = [];
  errorSvc = inject(ErrorService);
  successSvc = inject(SuccessService);
  propertyForm: FormGroup;

  constructor(private fb: FormBuilder,
    private propertyService: PropertyService
  ) {
    this.propertyForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      ownerId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.propertyType = Object.keys(PropertyTypeEnum)
      .filter(key => isNaN(Number(key)))
      .map(key => ({
        key: PropertyTypeEnum[key as keyof typeof PropertyTypeEnum],
        value: key
      }))
  }

  onSubmit() {
    if (this.propertyForm.valid) {

      const dto = {
        name: this.propertyForm.value.name,
        type: Number(this.propertyForm.value.type),
        ownerId: this.propertyForm.value.ownerId
      };

      this.propertyService.createProperty(dto).subscribe({
        next: (res) => {          
          if(res.id){
            this.successSvc.show({
              title:'Property created',
              message:'The property was successfully registered !'
            })
            this.propertyForm.reset();
          }
          else
          {
              this.errorSvc.show({
                          title: `Creation failed`,
                          message: 'Property ID = 0 ?'
                        });
          }
        },
        error: (err) => {
          this.errorSvc.show({
            title: `Creation failed`,
            message: err?.error?.message || err?.message || 'Unexpected error'
          });
        }
      })
    }
  }
}

