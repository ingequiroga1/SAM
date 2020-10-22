import { mergeMap, tap } from 'rxjs/operators';
// RxJS
import { delay, distinctUntilChanged, skip, filter, take, map } from 'rxjs/operators';
// NGRX
import { Store, select } from '@ngrx/store';
// CRUD
import { BaseDataSource, QueryResultsModel } from '../../_base/crud';
// State
import { AppState } from '../../reducers';
import {
  selectBasesInStore,
  selectBasesPageLoading,
  selectBasesShowInitWaitingMessage
} from '../_selectors/bases.selectors';

export class BasesDataSource extends BaseDataSource {
  constructor(private store: Store<AppState>) {
    super();

    this.loading$ = this.store.pipe(
      select(selectBasesPageLoading),
    );

    this.isPreloadTextViewed$ = this.store.pipe(
      select(selectBasesShowInitWaitingMessage)
    );

    this.store.pipe(
      select(selectBasesInStore),
    ).subscribe((response: QueryResultsModel) => {
      this.paginatorTotalSubject.next(response.totalCount);
      this.entitySubject.next(response.items);
    });
  }
}
