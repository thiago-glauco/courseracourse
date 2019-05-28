import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Comment } from '../shared/comment'
import { Dish } from '../shared/dish';

@Component({
  selector: 'app-comments-form',
  templateUrl: './comments-form.component.html',
  styleUrls: ['./comments-form.component.css']
})
export class CommentsFormComponent implements OnInit {
  
  commentsForm: FormGroup;
  comment: Comment;
  @Input() dish: Dish;

  @ViewChild('fform') commentsFormDirective;

  validationMessages = {
    author: {
      required: "Name is required",
      minLength: "Name min length is 2 ccharacters",
      maxLength: "Name max length is 50 characters"
    },
    rating: {
      required: "A rate is required",
    },
    comment: {
      required: "Please, leave a comment",
      minLength: "Comment min length is 5 characters",
      maxLength: "Comment max length is 500 characters"
    }
  }

  formErrors = {
    author: '',
    rating: '',
    comment: '',
  };

  constructor( private fb: FormBuilder ) { 
    this.createForm();
  }

  createForm() {
    this.commentsForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      rating: [5, [Validators.required]],
      comment: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(500)]]
    });
    this.commentsForm.valueChanges.subscribe( data => { this.onValueChanged(data)});
    this.onValueChanged(); //reset form data
  }

  onValueChanged(data?: any) {
    this.comment = this.commentsForm.value;
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

  onSubmit( ) {
    this.comment = this.commentsForm.value;
    this.comment.date = new Date().toDateString();
    this.dish.comments.push(this.comment);
    console.log(this.comment);
    this.commentsForm.reset({
      author: '',
      comment: '',
      rating: 5,
    });
    this.commentsFormDirective.resetForm();
  }

}