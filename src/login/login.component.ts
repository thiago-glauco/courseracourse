import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = {
    username: "",
    password: "",
    rememberme: false
  }

  constructor(public dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit() {
    
  }

  onSubmit( ) {
    console.log(this.user.username)
    this.dialogRef.close( );
  }


}