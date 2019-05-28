import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { MenuComponent } from '../menu/menu.component';
import { DishdetailComponent } from '../dishdetail/dishdetail.component';
import { DishService } from '../services/dish.service';
import { LeaderService } from '../services/leader.service';

import { PromotionService } from '../services/promotion.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ContactComponent } from '../contact/contact.component';
import { AboutComponent } from '../about/about.component';
import { CommentsFormComponent } from '../comments-form/comments-form.component';
import { HomeComponent } from '../home/home.component';
import { LoginComponent } from '../login/login.component';
import 'hammerjs';
import { AppRoutingModule } from '../app-routing/app-routing.module';

@NgModule({
  imports:      [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
    MatSelectModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    DishdetailComponent,
    ContactComponent,
    AboutComponent,
    LoginComponent,
    CommentsFormComponent,
    HomeComponent
  ],
  bootstrap:    [
    AppComponent ],
  entryComponents: [
    LoginComponent,
  ],
  providers: [ 
    DishService,
    PromotionService,
    LeaderService
  ],
})
export class AppModule { }
