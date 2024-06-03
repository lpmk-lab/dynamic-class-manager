import { Component } from '@angular/core';
import { ClassManagerService } from '../services/class-manager.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-class-creator',
  templateUrl: './class-creator.component.html',
  styleUrls: ['./class-creator.component.css']
})
export class ClassCreatorComponent {
  className = '';
  fieldName = '';
  fieldType = 'string';
  fieldDefaultValue: any = '';
  fields: { [key: string]: { name:string,type: string, defaultValue: any } } = {};
  instanceValues: { [key: string]: any } = {};
  selectedClass: string = '';
  classNames: string[] = [];
  editIndex: number | null = null;
  startEditing(index: number) {
    this.editIndex = index; // Set the index of the instance being edited
  }
  constructor(public classManager: ClassManagerService, private router: Router) {
    this.classNames = this.classManager.getClassNames();
  }

  addField() {
    if (this.fieldName && this.fieldType) {
      this.fields[this.fieldName] = {
        name:this.fieldName ,
        type: this.fieldType,
        defaultValue: this.fieldDefaultValue
      };
      this.fieldName = '';
      this.fieldType = 'string';
      this.fieldDefaultValue = '';
    }
  }

  createClass() {
    this.classManager.createClass(this.className, this.fields);
    this.classNames = this.classManager.getClassNames();
    // this.router.navigate(['/view-instances', this.className]); // Navigate to instance viewer for the new class
  }
  getFieldKeys(): string[] {
    return Object.keys(this.fields);
  }
  createInstance(className: string, initValues: { [key: string]: any }){
    this.classManager.createInstance(className,initValues)
  }
  getsd(){
    this.router.navigate(['/view-instances', this.className]);
  }
}
