import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.css']
})
export class CommentsFormComponent implements OnInit {
  
  commentsForm: FormGroup;

  validationMessages = {
    name: {
      required: "First name is required",
      minLength: "First name min length is 2 ccharacters",
      maxLength: "First name max length is 50 characters"
    },
    rate: {
      required: "A rate is required",
    },
    comment: {
      required: "Please, leave a comment",
      minLength: "Comment min length is 5 characters",
      maxLength: "Comment max length is 500 characters"
    }
  }

  formErrors = {
    name: '',
    rate: '',
    comment: '',
  };

  constructor( private fb: FormBuilder ) { 
    this.createForm();
  }

  createForm() {
    this.commentsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      rate: ['', [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });
    this.commentsForm.valueChanges.subscribe( data => { this.onValueChanged(data)});
    this.onValueChanged(); //reset form data

  }

  onValueChanged(data) {
    if (!this.commentsForm) { return; }
    const form = this.commentsForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
  ngOnInit() {
  }

}