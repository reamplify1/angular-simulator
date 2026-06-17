import { ResolveFn } from '@angular/router';
import { PostApiService } from './post-api.service';
import { inject } from '@angular/core';
import { IPost } from './interfaces/IPost';
import { LoaderService } from '../../services/loader.service';
import { finalize } from 'rxjs';


export const postResolver: ResolveFn<IPost> = (route) => {
  const loaderService: LoaderService = inject(LoaderService);
  const postApiService: PostApiService = inject(PostApiService);
  const id: string | null = route.paramMap.get('id');
  if (!id) {
    throw new Error('Post id is missing');
  }
  loaderService.showLoader();
  return postApiService.getPostById(Number(id)).pipe(
    finalize(() => {
      loaderService.hideLoader();
    })
  );
};
