import { Injectable } from '@angular/core';
interface FieldDefinition {
  name:string
  type: string;
  defaultValue: any;
}

@Injectable({
  providedIn: 'root'
})
export class ClassManagerService {

  private classes: { [key: string]: any } = {};
  private fieldDefinitions: { [key: string]: FieldDefinition[] } = {};
  private instances: { [key: string]: any[] } = {};

  createClass(className: string, fields: { [key: string]: FieldDefinition }) {
    const dynamicClass = class {
      constructor(initValues: { [key: string]: any }) {
        Object.keys(fields).forEach(key => {
          this[key] = initValues[key] !== undefined ? initValues[key] : fields[key].defaultValue;
        });
      }
    };
    this.classes[className] = dynamicClass;
    this.fieldDefinitions[className] = Object.keys(fields).map(key => ({
      name: key,
      ...fields[key]
    }));
    this.instances[className] = [];
  }

  createInstance(className: string, initValues: { [key: string]: any }) {
    const dynamicClass = this.classes[className];
    if (dynamicClass) {
      const instance = new dynamicClass(initValues);
      this.instances[className].push(instance);
      return instance;
    } else {
      throw new Error(`Class ${className} does not exist`);
    }
  }

  updateInstance(className: string, index: number, updatedValues: { [key: string]: any }) {
    Object.assign(this.instances[className][index], updatedValues);
  }

  deleteInstance(className: string, index: number) {
    this.instances[className].splice(index, 1);
  }

  getInstances(className: string) {
    return this.instances[className];
  }


  getFieldDefinitions(className: string) {
    return this.fieldDefinitions[className];
  }

  getClassNames() {
    return Object.keys(this.classes);
  }
}
