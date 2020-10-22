// Context

// Models and Consts
export { BasesModel } from './_models/bases.model';

// DataSources
export { BasesDataSource } from './_dataSources/bases.datasource';

// Actions

// Base Actions =>
export {
    BasesActionTypes,
    BasesActions,
    BaseOnServerCreated,
    BaseCreated,
    // BaseUpdated,
    // BasesStatusUpdated,
    OneBaseDeleted,
    ManyBasesDeleted,
    BasesPageRequested,
    BasesPageLoaded,
    BasesPageCancelled,
    BasesPageToggleLoading
} from './_actions/bases.actions';


// Effects
export { BaseEffects } from './_effects/bases.effects';

// Reducers
export { basesReducer } from './_reducers/bases.reducers';

// Selectors

// base selectors =>
export {
    selectBaseById,
    selectBasesInStore,
    selectBasesPageLoading,
    selectLastCreatedBaseId,
    selectBasesActionLoading,
    selectBasesShowInitWaitingMessage
} from './_selectors/bases.selectors';

// Services
export { BasesService } from './_services/bases.service.fake';
