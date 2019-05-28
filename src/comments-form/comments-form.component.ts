import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.css']
})
export class CommentsFormComponent implements OnInit {
  
  commentsForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
    rate: ['', [Validators.required]],
    comment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
  })

  formErrors = {
    firstname: '',
    lastname: '',
    email: '',
    telnum: ''
  };
  constructor( private fb: FormBuilder ) { }

  ngOnInit() {
  }

}