import { Component, OnInit, Inject } from '@angular/core';
import { Leader } from '../shared/leader';
import { LeaderService } from '../services/leader.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  errMsg: string
  leaderList: Leader[];
  featuredLeader: Leader;

  constructor( private leaderService: LeaderService,
  @Inject('BaseImageURL') private baseImageURL) { }

  ngOnInit() {
    this.leaderService.getLeaders( )
      .subscribe((leaders)=>{
        this.leaderList = leaders;
      },
      errmess => this.errMsg = <any>errmess
    );
  }

}