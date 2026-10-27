import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { withSyncToRouteQueryParams } from '@ngrx-traits/signals';
import { catchError, EMPTY, finalize, pipe, switchMap, tap } from 'rxjs';
import { IUser } from '../interfaces/IUser';
import { IUsersState } from '../interfaces/IUsersState';
import { UserApiService } from '../services/user-api.service';
import { LocalStorageService } from '../../../core/services/local-storage.service';
import { LoaderService } from '../../../core/services/loader.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TranslateService } from '@ngx-translate/core';

const LOCAL_STORAGE_KEY: string = 'users';

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
    const localStorageService: LocalStorageService = inject(LocalStorageService);
    const loaderService: LoaderService = inject(LoaderService);
    const notificationService: NotificationService = inject(NotificationService);
    const translateService: TranslateService = inject(TranslateService);

    function setUsers(users: IUser[]): void {
      patchState(store, { users });
      localStorageService.setItem(LOCAL_STORAGE_KEY, users);
    }

    return {
      loadUsers: rxMethod<boolean>(
        pipe(
          switchMap((forceUpdate: boolean) => {
            const storageUsers: IUser[] | null =
              localStorageService.getItem<IUser[]>(LOCAL_STORAGE_KEY);

            if (storageUsers && storageUsers.length > 0 && !forceUpdate) {
              patchState(store, { users: storageUsers });
              return EMPTY;
            }

            patchState(store, { loading: true, error: null });
            loaderService.showLoader();

            return userApiService.getUsers().pipe(
              tap((users: IUser[]) => {
                setUsers(users);
                patchState(store, { loading: false });
              }),
              catchError((error: HttpErrorResponse) => {
                patchState(store, { error: error.message, loading: false });
                notificationService.showError(translateService.instant('users.loadError'));
                return EMPTY;
              }),
              finalize(() => loaderService.hideLoader()),
            );
          }),
        ),
      ),

      addUser(user: IUser): void {
        setUsers([...store.users(), user]);
      },

      deleteUser(id: number): void {
        setUsers(store.users().filter((user: IUser) => user.id !== id));
      },

      setSearch(search: string): void {
        patchState(store, { search });
      },
    };
  }),

  withSyncToRouteQueryParams({
    mappers: [
      {
        queryParamsToState: (query, store) => {
          const search: string =
            typeof query.search === 'string'
              ? query.search.trim()
              : initialState.search;

          patchState(store, { search });
        },
        stateToQueryParams: (store) =>
          computed(() => ({ search: store.search().trim() || undefined })),
      },
    ],
    defaultDebounce: 0,
  }),
);
