import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './detail-page/detail-page.component';
import { CurrencyConvertComponent } from './currency-convert/currency-convert.component';

const routes: Routes = [
  {path:'',component:CurrencyConvertComponent},
  {path:'details',component:DetailPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
