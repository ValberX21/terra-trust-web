import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PropertyListComponent } from './components/property-list/property-list.component';
import { PropertyFormComponent } from './components/property-form/property-form.component';

export const routes: Routes = [
    { path: '', pathMatch:'full',redirectTo:'dashboard' },
    { path: 'dashboard', component: DashboardComponent}, 
    { path: 'listProperties', component: PropertyListComponent},  
    { path: 'createProperty', component: PropertyFormComponent},   
    {path: '**', redirectTo: 'dashboard'}
];
