// NGRX
import { createFeatureSelector, createSelector } from '@ngrx/store';
// Lodash
import { each } from 'lodash';
// CRUD
import { QueryResultsModel, HttpExtenstionsModel } from '../../_base/crud';
// State
import { BasesState } from '../_reducers/bases.reducers';
import { BasesModel } from '../_models/bases.model';

export const selectBasesState = createFeatureSelector<BasesState>('bases');

export const selectBaseById = (baseId: number) => createSelector(
    selectBasesState,
    BasesState => BasesState.entities[baseId]
);

export const selectBasesPageLoading = createSelector(
    selectBasesState,
    BasesState => BasesState.listLoading
);

export const selectBasesActionLoading = createSelector(
    selectBasesState,
    BasesState => BasesState.actionsloading
);

export const selectLastCreatedBaseId = createSelector(
    selectBasesState,
    BasesState => BasesState.lastCreatedBaseId
);

export const selectBasesShowInitWaitingMessage = createSelector(
    selectBasesState,
    BasesState => BasesState.showInitWaitingMessage
);

export const isNumbersReloaded = createSelector(
  selectBasesState, 
  BasesState => BasesState.isNumbersLoaded
);

export const SelectedNum = createSelector(
  selectBasesState, 
  BasesState => BasesState.numbers
);


export const isNextNumbersReloaded = createSelector(
  selectBasesState, 
  BasesState => BasesState.isNextNumbersLoaded
);

export const SelectedNextNum = createSelector(
  selectBasesState, 
  BasesState => BasesState.nextNumbers
);


export const selectBasesInStore = createSelector(
    selectBasesState,
    BasesState => {
      const items: BasesModel[] = [];
      each(BasesState.entities, element => {
        items.push(element);
      });
      const httpExtension = new HttpExtenstionsModel();
      const result: BasesModel[] =
        httpExtension.sortArray(items, BasesState.lastQuery.sortField, BasesState.lastQuery.sortOrder);
      return new QueryResultsModel(result, BasesState.totalCount, '');
    }
);
