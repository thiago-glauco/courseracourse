import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Feedback, ContactType } from '../shared/feedback';
import { FeedbackService } from '../services/feedback.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
    animations: [
    trigger('insertRemove', [
        state('*', style({ opacity: 1, transform: 'translateY(0)'})),
        transition(':enter', [
            style({ transform: 'translateY(-100%)', opacity: 0 }),
            animate('1s ease-in', style({ transform: 'translateY(5%)', opacity: 1}))
        ]),
        transition(':leave', [
            animate('500ms ease-out', style({ transform: 'translateY(5%)', opacity: 0}))
        ])
  ]),
  ]
})
export class ContactComponent implements OnInit {

  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  animationControls = {
    formSend: false,
    serverReturned: false,
    showFeedback: false
  }
  @ViewChild('fform') feedbackFormDirective;

  formErrors = {
    firstname: '',
    lastname: '',
    email: '',
    telnum: ''
  };

  validationMessages = {
    firstname: {
      required: "First name is required",
      minLength: "First name min length is 2 ccharacters",
      maxLength: "First name max length is 30 characters"
    },
    lastname: {
      required: "Last name is required",
      minLength: "Last name min length is 2 ccharacters",
      maxLength: "Last name max length is 30 characters"
    },
    telnum: {
      required: "Tel. number is required",
      pattern: "Tel. num: only numbers, please.",
      minLength: "Tel. num min length is 8 ccharacters",
      maxLength: "Tel num max length is 15 characters"
    },
    email: {
      required: "Email is required",
      minLength: "First name min length is 4 ccharacters",
      email:         'Email not in valid format.'
    },
  }

  constructor(
    private fb: FormBuilder,
    private feedbackService: FeedbackService
  ) {
    this.createForm();
  }

  createForm( ) {
    this.feedbackForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)] ],
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)] ],
      telnum: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), Validators.pattern]],
      email: new FormControl('', [Validators.email, Validators.required, Validators.minLength(4) ]),
      agree: false,
      contacttype: 'None',
      message: ''
    });

    this.feedbackForm.valueChanges.subscribe( data => { this.onValueChanged(data)});
    this.onValueChanged(); //reset form data

  }

onValueChanged(data?: any) {
  if (!this.feedbackForm) { return; }
  const form = this.feedbackForm;
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
    this.feedback = this.feedbackForm.value;
    this.animationControls.formSend = true;
    console.log(this.feedback);
    let status = this.feedbackService.postFeedback(this.feedback);
    var self = this
    status.subscribe(
      result => {
        console.dir(result);
        if(result.name){
          //Data is saved in firebase!
          this.animationControls.serverReturned = true;
          this.animationControls.showFeedback = true;
          setTimeout(function(){self.hideFeedback()}, 5000)
        }
      },
      error => {console.dir(error)}
    )
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });
    this.feedbackFormDirective.resetForm();
  }

  hideFeedback(){
    this.animationControls.showFeedback = false;
    this.animationControls.formSend = false;
  }

}