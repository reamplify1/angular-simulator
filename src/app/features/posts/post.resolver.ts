import { ResolveFn } from '@angular/router';
import { PostApiService } from './post-api.service';
import { inject } from '@angular/core';
import { IPost } from './interfaces/IPost';

export const postResolver: ResolveFn<IPost> = (route) => {
  const postApiService: PostApiService = inject(PostApiService);
  const id: string | null = route.paramMap.get('id');
  if (!id) {
    throw new Error('Post id is missing');
  }
  return postApiService.getPostById(Number(id));
};
