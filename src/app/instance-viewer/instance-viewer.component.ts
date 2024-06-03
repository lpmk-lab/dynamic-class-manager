import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray } from '@angular/forms'; // Import necessary form-related modules
import { ActivatedRoute } from '@angular/router';
import { ClassManagerService } from '../services/class-manager.service';


@Component({
  selector: 'app-instance-viewer',
  templateUrl: './instance-viewer.component.html',
  styleUrls: ['./instance-viewer.component.css']
})
export class InstanceViewerComponent implements OnInit {
  className: string = '';
  instances: any[] = [];
  editIndex: number | null = null;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    public classManager: ClassManagerService,
    private fb: FormBuilder
  ) {
    this.editForm = this.fb.group({
      fields: this.fb.array([])
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.className = params['className'];
      this.instances = this.classManager.getInstances(this.className);
    });
    this.editForm = this.fb.group({
      fields: this.fb.array(this.instances)
    });
  }
  get(any:any){
    any:FormArray
    return any.controls

  }
  startEditing(index: number) {
    this.editIndex = index; // Set the index of the instance being edited
  }

  saveEdit() {
    const editedFields = this.editForm.get('fields') as FormArray;
    const editedInstance = editedFields.value.reduce((acc, field) => ({ ...acc, ...field }), {}); // Merge all edited fields into an object
    this.instances[this.editIndex] = editedInstance; // Replace the instance with edited data
    this.editIndex = null; // Reset editIndex after saving
  }

  cancelEdit() {
    this.editIndex = null; // Reset editIndex without saving changes
  }

  // Method to get the fields of an instance
  getFields(instance: any): { key: string, value: any }[] {
    return Object.keys(instance).map(key => ({ key, value: instance[key] }));
  }


}
