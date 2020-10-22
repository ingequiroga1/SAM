// NGRX
import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
// CRUD
import { QueryParamsModel } from '../../_base/crud';
// Models
import { BasesModel } from '../_models/bases.model';
import { CustomerModel } from '../../e-commerce';

export enum BasesActionTypes {
  BaseOnServerCreated = '[Edit Base Dialog] Base On Server Created',
  BaseCreated = '[Edit Base Dialog] Base Created',
  BaseUpdated = '[Edit Base Dialog] Base Updated',
  BasesStatusUpdated = '[Base List Page] Bases Status Updated',
  OneBaseDeleted = '[Bases List Page] One Base Deleted',
  ManyBasesDeleted = '[Bases List Page] Many Base Deleted',
  BasesPageRequested = '[Bases List Page] Bases Page Requested',
  BasesPageLoaded = '[Bases API] Bases Page Loaded',
  BasesPageCancelled = '[Bases API] Bases Page Cancelled',
  BasesPageToggleLoading = '[Bases] Bases Page Toggle Loading',
  BaseActionToggleLoading = '[Bases] Bases Action Toggle Loading',
  UserNumbersLoaded = '[users] Bases Action numbers Loading',
  UserNumbersRequested = '[users] Bases Action numbers charged',
  BaseNextNumberLoaded = '[users] Bases Action numbers next',
  BaseNextNumberRequested = '[users] Bases Action numbers get'
}

export class BaseOnServerCreated implements Action {
  readonly type = BasesActionTypes.BaseOnServerCreated;
  constructor(public payload: { base: BasesModel }) {
  }
}

export class BaseCreated implements Action {
  readonly type = BasesActionTypes.BaseCreated;

  constructor(public payload: { base: BasesModel }) {
  }
}

// export class BaseUpdated implements Action {
//   readonly type = BasesActionTypes.BaseUpdated;

//   constructor(public payload: {
//     partialCustomer: Update<BasesModel>, // For State update
//     base: BasesModel // For Server update (through service)
//   }) {
//   }
// }

// export class BasesStatusUpdated implements Action {
//   readonly type = BasesActionTypes.BasesStatusUpdated;

//   constructor(public payload: {
//     base: BasesModel[],
//     status: number
//   }) {
//   }
// }

export class OneBaseDeleted implements Action {
  readonly type = BasesActionTypes.OneBaseDeleted;

  constructor(public payload: { id: number }) {
  }
}

export class ManyBasesDeleted implements Action {
  readonly type = BasesActionTypes.ManyBasesDeleted;

  constructor(public payload: { ids: number[] }) {
  }
}

export class BasesPageRequested implements Action {
  readonly type = BasesActionTypes.BasesPageRequested;

  constructor(public payload: { page: QueryParamsModel }) {
  }
}

export class BasesPageLoaded implements Action {
  readonly type = BasesActionTypes.BasesPageLoaded;

  constructor(public payload: { bases: BasesModel[], totalCount: number, page: QueryParamsModel }) {
  }
}

export class BasesPageCancelled implements Action {
  readonly type = BasesActionTypes.BasesPageCancelled;
}

export class BasesPageToggleLoading implements Action {
  readonly type = BasesActionTypes.BasesPageToggleLoading;

  constructor(public payload: { isLoading: boolean }) {
  }
}

export class BaseActionToggleLoading implements Action {
  readonly type = BasesActionTypes.BaseActionToggleLoading;

  constructor(public payload: { isLoading: boolean }) {
  }
}

export class UserNumbersLoaded implements Action {
  debugger;
  readonly type = BasesActionTypes.UserNumbersLoaded;
  constructor(public payload: { numbers: CustomerModel[] }) { }
}

export class UserNumbersRequested implements Action {
  readonly type = BasesActionTypes.UserNumbersRequested;
}

export class BaseNextNumberLoaded implements Action {
  readonly type = BasesActionTypes.BaseNextNumberLoaded;
  constructor(public payload: { nextId: string }) { }
}

export class BaseNextNumberRequested implements Action {
  readonly type = BasesActionTypes.BaseNextNumberRequested;
}



export type BasesActions = BaseOnServerCreated
| BaseCreated
// | BaseUpdated
// | BasesStatusUpdated
| OneBaseDeleted
| ManyBasesDeleted
| BasesPageRequested
| BasesPageLoaded
| BaseNextNumberLoaded
| BaseNextNumberRequested
| BasesPageCancelled
| BasesPageToggleLoading
| UserNumbersLoaded
| UserNumbersRequested
| BaseActionToggleLoading;
