import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withSyncToRouteQueryParams, withSyncToWebStorage } from '@ngrx-traits/signals';
import { catchError, EMPTY, filter, finalize, pipe, switchMap, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { IUsersState } from '../interfaces/IUsersState';
import { UserApiService } from '../services/user-api.service';
import { LoaderService } from '../../../core/services/loader.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

const USERS_STORAGE_KEY: string = 'users-state';

export const initialState: IUsersState = {
  users: [],
  loading: false,
  error: null,
  search: '',
};

export const UsersStore = signalStore(
  withState(initialState),

  withComputed(({ users, search }) => ({
    filteredUsers: computed(() => {
      const value: string = search().trim().toLowerCase();

      if (!value) {
        return users();
      }

      return users().filter((user: IUser) =>
        user.name.trim().toLowerCase().includes(value),
      );
    }),
  })),

  withMethods((store) => {
    const userApiService: UserApiService = inject(UserApiService);
    const loaderService: LoaderService = inject(LoaderService);
    const notificationService: NotificationService = inject(NotificationService);
    const translateService: TranslateService = inject(TranslateService);

    return {
      loadUsers: rxMethod<boolean>(
        pipe(
          filter((forceUpdate: boolean) => forceUpdate || store.users().length === 0),
          tap(() => {
            patchState(store, { loading: true, error: null });
            loaderService.showLoader();
          }),
          switchMap(() =>
            userApiService.getUsers().pipe(
              tap((users: IUser[]) => patchState(store, { users, loading: false })),
              catchError((error: HttpErrorResponse) => {
                patchState(store, { error: error.message, loading: false });
                notificationService.showError(translateService.instant('users.loadError'));
                return EMPTY;
              }),
              finalize(() => loaderService.hideLoader()),
            ),
          ),
        ),
      ),

      addUser(user: IUser): void {
        patchState(store, { users: [...store.users(), user] });
      },

      deleteUser(id: number): void {
        patchState(store, {
          users: store.users().filter((user: IUser) => user.id !== id),
        });
      },

      setSearch(search: string): void {
        patchState(store, { search });
      },
    };
  }),

  withSyncToWebStorage({
    key: USERS_STORAGE_KEY,
    type: 'local',
    saveStateChangesAfterMs: 300,
    filterState: ({ users, search }) => ({ users, search }),
  }),

  withSyncToRouteQueryParams({
    mappers: [
      {
        queryParamsToState: (query, store, firstLoad) => {
          if (typeof query.search === 'string') {
            patchState(store, { search: query.search.trim() });
            return;
          }

          if (!firstLoad) {
            patchState(store, { search: initialState.search });
          }
        },
        stateToQueryParams: (store) =>
          computed(() => ({ search: store.search().trim() || undefined })),
      },
    ],
    defaultDebounce: 0,
  }),
);
