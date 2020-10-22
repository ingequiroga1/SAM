import {QueryParamsModel} from './../../_base/crud/models/query-models/query-params.model';
import {forkJoin, of} from 'rxjs';
// Angular
import {Injectable} from '@angular/core';
// RxJS
import {filter, map, mergeMap, tap, withLatestFrom} from 'rxjs/operators';
// NGRX
import {Actions, Effect, ofType} from '@ngrx/effects';
import {select, Store} from '@ngrx/store';
// CRUD
import {QueryResultsModel} from '../../_base/crud';
// Services
import { BasesService } from '../_services/bases.service.fake';
// State
import {AppState} from '../../../core/reducers';
// Actions
import {
  BaseActionToggleLoading,
  BasesActionTypes,
  BaseCreated,
  BaseOnServerCreated,
  BasesPageLoaded,
  BasesPageRequested,
  BasesPageToggleLoading,
  // BasesStatusUpdated,
  // BaseUpdated,
  ManyBasesDeleted,
  OneBaseDeleted,
  UserNumbersRequested,
  UserNumbersLoaded,
  BaseNextNumberRequested,
  BaseNextNumberLoaded, 
  // BaseUpdated,
  // BasesStatusUpdated
} from '../_actions/bases.actions';
import { Logout } from '../../auth';
import { isNextNumbersReloaded, isNumbersReloaded, SelectedNum } from '../_selectors/bases.selectors';

@Injectable()
export class BaseEffects {
  showPageLoadingDistpatcher = new BasesPageToggleLoading({isLoading: true});
  showActionLoadingDistpatcher = new BaseActionToggleLoading({isLoading: true});
  hideActionLoadingDistpatcher = new BaseActionToggleLoading({isLoading: false});

  @Effect()
  loadBasesPage$ = this.actions$.pipe(
    ofType<BasesPageRequested>(BasesActionTypes.BasesPageRequested),
    mergeMap(({payload}) => {
      this.store.dispatch(this.showPageLoadingDistpatcher);
      const requestToServer = this.BasesService.findBases(payload.page);
      const lastQuery = of(payload.page);
      return forkJoin(requestToServer, lastQuery);
    }),
    map(response => {
      debugger;
      const result: QueryResultsModel = response[0];
      const lastQuery: QueryParamsModel = response[1];
      return new BasesPageLoaded({
        bases: result.items,
        totalCount: result.totalCount,
        page: lastQuery
      });
    })
  );

  @Effect()
  deleteBase$ = this.actions$
    .pipe(
      ofType<OneBaseDeleted>(BasesActionTypes.OneBaseDeleted),
      mergeMap(({payload}) => {
          this.store.dispatch(this.showActionLoadingDistpatcher);
          return this.BasesService.deleteBase(payload.id);
        }
      ),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      }),
    );

  @Effect()
  deleteBases$ = this.actions$
    .pipe(
      ofType<ManyBasesDeleted>(BasesActionTypes.ManyBasesDeleted),
      mergeMap(({payload}) => {
          this.store.dispatch(this.showActionLoadingDistpatcher);
          return this.BasesService.deleteBases(payload.ids);
        }
      ),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      }),
    );

  // @Effect()
  // updateBase$ = this.actions$
  //   .pipe(
  //     ofType<BaseUpdated>(BasesActionTypes.BaseUpdated),
  //     mergeMap(({payload}) => {
  //       this.store.dispatch(this.showActionLoadingDistpatcher);
  //       return this.BasesService.updateBase(payload.base);
  //     }),
  //     map(() => {
  //       return this.hideActionLoadingDistpatcher;
  //     })
  //   );

  // @Effect()
  // updateBasesStatus$ = this.actions$
  //   .pipe(
  //     ofType<BasesStatusUpdated>(BasesActionTypes.BasesStatusUpdated),
  //     mergeMap(({payload}) => {
  //       this.store.dispatch(this.showActionLoadingDistpatcher);
  //       return this.BasesService.updateStatusForBase(payload.base, payload.statusId);
  //     }),
  //     map(() => {
  //       return this.hideActionLoadingDistpatcher;
  //     })
  //   );

  @Effect({dispatch: false})
      loadUserNumbers$ = this.actions$
        .pipe(
          ofType<UserNumbersRequested>(BasesActionTypes.UserNumbersRequested),
          withLatestFrom(this.store.pipe(select(isNumbersReloaded))),
          filter(([action, _isNumbersLoaded]) => !_isNumbersLoaded),
          mergeMap(([action, _isNumbersLoaded]) => this.BasesService.getAllNumbers()),
          tap(_numbers => {
            if (_numbers) {
              this.store.dispatch(new UserNumbersLoaded({numbers: _numbers}));
             // this.store.dispatch(new UserBasesLoaded({user: _user.userId}));
            } else {
              this.store.dispatch(new Logout());
            }
          })
        );


        @Effect({dispatch: false})
        loadBaseNextNumber$ = this.actions$
          .pipe(
            ofType<BaseNextNumberRequested>(BasesActionTypes.BaseNextNumberRequested),
            withLatestFrom(this.store.pipe(select(isNextNumbersReloaded))),
            filter(([action, _isNextNumbersLoaded]) => !_isNextNumbersLoaded),
            mergeMap(([action, _isNextNumbersLoaded]) => this.BasesService.getNextNumber()),
            tap(_Nextnumber => {
              debugger;
              if (_Nextnumber) {
                this.store.dispatch(new BaseNextNumberLoaded({nextId: _Nextnumber}));
               // this.store.dispatch(new UserBasesLoaded({user: _user.userId}));
              } else {
                this.store.dispatch(new Logout());
              }
            })
          );


  @Effect()
  createBase$ = this.actions$
    .pipe(
      ofType<BaseOnServerCreated>(BasesActionTypes.BaseOnServerCreated),
      mergeMap(({payload}) => {
        this.store.dispatch(this.showActionLoadingDistpatcher);
        return this.BasesService.createBase(payload.base).pipe(
          tap(res => {
            this.store.dispatch(new BaseCreated({base: res}));
          })
        );
      }),
      map(() => {
        return this.hideActionLoadingDistpatcher;
      }),
    );

  constructor(private actions$: Actions, private BasesService: BasesService, private store: Store<AppState>) {
  }
}
