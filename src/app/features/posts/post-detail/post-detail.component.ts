import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from '../interfaces/IPost';
import { Location } from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.scss',
})
export class PostDetailComponent implements OnInit {

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private location: Location = inject(Location);

  post: IPost | null = null;

  ngOnInit(): void {
    this.post = this.activatedRoute.snapshot.data['postData'];
  }

  goBack(): void {
    this.location.back();
  }

}
