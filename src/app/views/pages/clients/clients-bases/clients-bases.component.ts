
// Angular
import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectionStrategy,
  OnDestroy,AfterViewChecked
} from "@angular/core";
// Material
import { SelectionModel } from "@angular/cdk/collections";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
// RXJS
import {
  debounceTime,
  distinctUntilChanged,
  tap,
  skip,
  delay,
  take,
} from "rxjs/operators";
import { fromEvent, merge, Subscription, of } from "rxjs";
// Translate Module
import { TranslateService } from "@ngx-translate/core";
// NGRX
import { Store, ActionsSubject } from "@ngrx/store";
import { AppState } from '../../../../core/reducers';
// CRUD
import {
  LayoutUtilsService,
  MessageType,
  QueryParamsModel,
} from '../../../../core/_base/crud';
// Services and Models
import {
  BasesModel,
  BasesDataSource,
  BasesPageRequested,
  OneBaseDeleted,
  ManyBasesDeleted,
  // BasesStatusUpdated,
} from '../../../../core/manage_bases';

import { ToolbarService } from 'src/app/views/services/toolbar.service';

@Component({
  selector: 'kt-base-list',
  templateUrl: './clients-bases.component.html',
  styleUrls: ['./clients-bases.component.scss']
})
export class ClientsBasesComponent implements OnInit, OnDestroy,AfterViewChecked {
  // Table fields
  dataSource: BasesDataSource;
  displayedColumns = [
    "select",
    "baseNumber",
    // "Nombre(s)",
    "baseName",
    "contactName",
    "contactEmail",
    "contactPhone",
    "statusId",
    "baseId",
  ];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("sort1", { static: true }) sort: MatSort;
  // Filter fields
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  filterStatus = '';
  filterType = "";
  // Selection
  selection = new SelectionModel<BasesModel>(true, []);
  basesResult: BasesModel[] = [];
  // Subscriptions
  private subscriptions: Subscription[] = [];

  /**
   * Component constructor
   *
   * @param dialog: MatDialog
   * @param snackBar: MatSnackBar
   * @param layoutUtilsService: LayoutUtilsService
   * @param translate: TranslateService
   * @param store: Store<AppState>
   */
  constructor(
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private layoutUtilsService: LayoutUtilsService,
    private translate: TranslateService,
    private store: Store<AppState>,
    private toolbarService:ToolbarService
  ) {}

  /**
   * @ Lifecycle sequences => https://angular.io/guide/lifecycle-hooks
   */

  /**
   * On init
   */
  ngOnInit() {
    
    debugger;

    this.store.subscribe( state => {console.log(state);
		});
    // If the user changes the sort order, reset back to the first page.
    const sortSubscription = this.sort.sortChange.subscribe(
      () => (this.paginator.pageIndex = 0)
    );
    this.subscriptions.push(sortSubscription);

    /* Data load will be triggered in two cases:
		- when a pagination event occurs => this.paginator.page
		- when a sort event occurs => this.sort.sortChange
		**/
    const paginatorSubscriptions = merge(
      this.sort.sortChange,
      this.paginator.page
    )
      .pipe(tap(() => this.loadBasesList()))
      .subscribe();
    this.subscriptions.push(paginatorSubscriptions);

    // Filtration, bind to searchInput
    const searchSubscription = fromEvent(
      this.searchInput.nativeElement,
      "keyup"
    )
      .pipe(
        // tslint:disable-next-line:max-line-length
        debounceTime(50), // The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator, we are limiting the amount of server requests emitted to a maximum of one every 150ms
        distinctUntilChanged(), // This operator will eliminate duplicate values
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadBasesList();
        })
      )
      .subscribe();
    this.subscriptions.push(searchSubscription);

    // Init DataSource
    this.dataSource = new BasesDataSource(this.store);
    const entitiesSubscription = this.dataSource.entitySubject
      .pipe(skip(1), distinctUntilChanged())
      .subscribe((res) => {
        debugger;
        this.basesResult = res;
      });
    this.subscriptions.push(entitiesSubscription);
    // First load
    of(undefined)
      .pipe(take(1), delay(1000))
      .subscribe(() => {
        // Remove this line, just loading imitation
        this.loadBasesList();
      }); // Remove this line, just loading imitation
  }

  ngAfterViewChecked() {
    this.toolbarService.emit({
      isShowRightToolbar: true,
      rightToolbarLinks:{ nuevoUrl : '/bases/add'},
      parent:{name:'Clientes',url:'/clients/clients-bases'},
      children:[{name:'Bases del cliente',url:'/clients/clients-bases'}]});
  }

  /**
   * On Destroy
   */
  ngOnDestroy() {
    this.subscriptions.forEach((el) => el.unsubscribe());
  }

  /**
   * Load Customers List from service through data-source
   */
  loadBasesList() {
    debugger;
    this.selection.clear();
    const queryParams = new QueryParamsModel(
      this.filterConfiguration(),
      this.sort.direction,
      this.sort.active,
      this.paginator.pageIndex,
      this.paginator.pageSize
    );
    // Call request from server
    this.store.dispatch(new BasesPageRequested({ page: queryParams }));
    this.selection.clear();
  }

  /**
   * Returns object for filter
   */
  filterConfiguration(): any {
    const filter: any = {};
    const searchText: string = this.searchInput.nativeElement.value;

    debugger;

    if (this.filterStatus && this.filterStatus.length > 0) {
      filter.statusId = this.filterStatus;
    }

    if (this.filterType && this.filterType.length > 0) {
      filter.type = +this.filterType;
    }

    filter.baseName = searchText;
    if (!searchText) {
      return filter;
    }

    filter.contactName = searchText;
    filter.contactEmail = searchText;
    filter.contactPhone = searchText;
    return filter;
  }

  /** ACTIONS */
  /**
   * Delete customer
   *
   * @param _item: CustomerModel
   */


  /**
   * Delete selected customers
   */


  /**
   * Fetch selected customers
   */
  fetchBasess() {
    const messages = [];
    this.selection.selected.forEach((elem) => {
      messages.push({
        text: `${elem.baseId}, ${elem.baseName}`,
        id: elem.baseId.toString(),
        status: elem.statusId,
      });
    });
    this.layoutUtilsService.fetchElements(messages);
  }

  /**
   * Show UpdateStatuDialog for selected Bases
   */
  // updateStatusForCustomers() {
  //   const _title = this.translate.instant(
  //     "ECOMMERCE.CUSTOMERS.UPDATE_STATUS.TITLE"
  //   );
  //   const _updateMessage = this.translate.instant(
  //     "ECOMMERCE.CUSTOMERS.UPDATE_STATUS.MESSAGE"
  //   );
  //   const _statuses = [
  //     { value: 0, text: "Suspended" },
  //     { value: 1, text: "Active" },
  //     { value: 2, text: "Pending" },
  //   ];
  //   const _messages = [];

  //   this.selection.selected.forEach((elem) => {
  //     _messages.push({
  //       text: `${elem.lastName}, ${elem.firstName}`,
  //       id: elem.id.toString(),
  //       status: elem.status,
  //       statusTitle: this.getItemStatusString(elem.status),
  //       statusCssClass: this.getItemCssClassByStatus(elem.status),
  //     });
  //   });

  //   const dialogRef = this.layoutUtilsService.updateStatusForEntities(
  //     _title,
  //     _statuses,
  //     _messages
  //   );
  //   dialogRef.afterClosed().subscribe((res) => {
  //     if (!res) {
  //       this.selection.clear();
  //       return;
  //     }

  //     this.store.dispatch(
  //       new BasesStatusUpdated({
  //         status: +res,
  //         customers: this.selection.selected,
  //       })
  //     );

  //     this.layoutUtilsService.showActionNotification(
  //       _updateMessage,
  //       MessageType.Update,
  //       10000,
  //       true,
  //       true
  //     );
  //     this.selection.clear();
  //   });
  // }

  /**
   * Show add customer dialog
   */
  addBase() {
    const newBase = new BasesModel();
    newBase.clear(); // Set all defaults fields
    this.editBase(newBase);
  }

  /**
   * Show Edit customer dialog and save after success close result
   * @param customer: CustomerModel
   */
  editBase(base: BasesModel) {
   
  }

  /**
   * Check all rows are selected
   */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.basesResult.length;
    return numSelected === numRows;
  }

  /**
   * Toggle all selections
   */
  masterToggle() {
    if (this.selection.selected.length === this.basesResult.length) {
      this.selection.clear();
    } else {
      this.basesResult.forEach((row) => this.selection.select(row));
    }
  }

  /** UI */
  /**
   * Retursn CSS Class Name by status
   *
   * @param status: number
   */
  getItemCssClassByStatus(status: number = 0): string {
    switch (status) {
      case 0:
        return "danger";
      case 1:
        return "success";
      case 2:
        return "metal";
    }
    return "";
  }

  /**
   * Returns Item Status in string
   * @param status: number
   */
  getItemStatusString(status: number = 0): string {
    switch (status) {
      case 0:
        return "Suspended";
      case 1:
        return "Active";
      case 2:
        return "Pending";
    }
    return "";
  }

  /**
   * Returns CSS Class Name by type
   * @param status: number
   */
  getItemCssClassByType(status: number = 0): string {
    switch (status) {
      case 0:
        return "primary";
      case 1:
        return "danger";
      case 2:
        return "success";
    }
    return "success";
  }

  /**
   * Returns Item Type in string
   * @param status: number
   */
  getItemTypeString(status: number = 0): string {
    switch (status) {
      case 0:
        return "Business";
      case 1:
        return "Individual";
    }
    return "";
  }
}
