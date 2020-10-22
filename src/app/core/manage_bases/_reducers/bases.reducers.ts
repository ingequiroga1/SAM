// NGRX
import { createFeatureSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter, Update } from '@ngrx/entity';
// Actions
import { BasesActions, BasesActionTypes } from '../_actions/bases.actions';
// Models
import { BasesModel } from '../_models/bases.model';
import { QueryParamsModel } from '../../_base/crud';
import { CustomerModel } from '../../e-commerce';

export interface BasesState extends EntityState<BasesModel> {
  listLoading: boolean;
  actionsloading: boolean;
  totalCount: number;
  lastCreatedBaseId: number;
  lastQuery: QueryParamsModel;
  showInitWaitingMessage: boolean;
  numbers: CustomerModel[];
  isNumbersLoaded: boolean;
  nextNumbers: string;
  isNextNumbersLoaded: boolean;

}

export const adapter: EntityAdapter<BasesModel> = createEntityAdapter<BasesModel>({
  selectId: base => base.baseId
});

export const initialBasesState: BasesState = adapter.getInitialState({
  baseForEdit: null,
  listLoading: false,
  actionsloading: false,
  totalCount: 0,
  lastCreatedBaseId: undefined,
  lastQuery: new QueryParamsModel({}),
  showInitWaitingMessage: true,
  numbers: [],
  isNumbersLoaded: undefined,
  nextNumbers: undefined,
  isNextNumbersLoaded: undefined
});

export function basesReducer(state = initialBasesState, action: BasesActions): BasesState {
  switch (action.type) {
    case BasesActionTypes.BasesPageToggleLoading: {
      return {
        ...state, listLoading: action.payload.isLoading, lastCreatedBaseId: undefined
      };
    }
    case BasesActionTypes.BaseActionToggleLoading: {
      return {
        ...state, actionsloading: action.payload.isLoading
      };
    }
    case BasesActionTypes.BaseOnServerCreated:
      return {
        ...state
      };
    case BasesActionTypes.BaseCreated:
      debugger;
      return adapter.addOne(action.payload.base, {
        ...state, lastCreatedBaseId: action.payload.base.baseId
      });

      case BasesActionTypes.UserNumbersLoaded: {
        const numbers: CustomerModel[] = action.payload.numbers;
        return {
          ...state,
          numbers,
          isNumbersLoaded: true
        };
      }

      case BasesActionTypes.BaseNextNumberLoaded: {
        debugger;
        const nextNumbers: string = action.payload.nextId;
        return {
          ...state,
          nextNumbers,
          isNextNumbersLoaded: true
        };
      }

    // case BasesActionTypes.BaseUpdated:
    //   return adapter.updateOne(action.payload.partialBase, state);
    // case BasesActionTypes.BasesStatusUpdated: {
    //   // tslint:disable-next-line
    //   const _partialBases: Update<BasesModel>[] = [];
    //   // tslint:disable-next-line:prefer-const
    //   // tslint:disable-next-line
    //   for (let i = 0; i < action.payload.base.length; i++) {
    //     _partialBases.push({
    //       id: action.payload.base[i].baseId,
    //       changes: {
    //         status: action.payload.statusId
    //       }
    //     });
    //   }
    //   return adapter.updateMany(_partialBases, state);
    // }
    case BasesActionTypes.OneBaseDeleted:
      return adapter.removeOne(action.payload.id, state);
    case BasesActionTypes.ManyBasesDeleted:
      return adapter.removeMany(action.payload.ids, state);
    case BasesActionTypes.BasesPageCancelled: {
      return {
        ...state, listLoading: false, lastQuery: new QueryParamsModel({})
      };
    }
    case BasesActionTypes.BasesPageLoaded: {
      return adapter.addMany(action.payload.bases, {
        ...initialBasesState,
        totalCount: action.payload.totalCount,
        listLoading: false,
        lastQuery: action.payload.page,
        showInitWaitingMessage: false
      });
    }
    default:
      return state;
  }
}

export const getBaseState = createFeatureSelector<BasesModel>('bases');

export const {
  selectAll,
  selectEntities,
  selectIds,
  selectTotal
} = adapter.getSelectors();
