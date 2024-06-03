import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassCreatorComponent } from './class-creator/class-creator.component';
import { InstanceViewerComponent } from './instance-viewer/instance-viewer.component';

const routes: Routes = [
  { path: 'create-class', component: ClassCreatorComponent },
  { path: 'view-instances/:className', component: InstanceViewerComponent },
  { path: '', redirectTo: '/create-class', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
