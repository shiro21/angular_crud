import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// pages
import { CreateComponent } from './pages/create/create.component';
import { ReadComponent } from './pages/read/read.component';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'create/:id', component: CreateComponent },
  { path: 'read', component: ReadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
