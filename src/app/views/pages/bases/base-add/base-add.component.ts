import { Component, OnInit , AfterViewChecked, ViewChild, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { ToolbarService } from 'src/app/views/services/toolbar.service';

import {
	BasesModel,
	// BasesUpdated,
	selectBaseById,
	BaseOnServerCreated,
	selectLastCreatedBaseId,
	selectBasesActionLoading
} from '../../../../core/manage_bases';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { Observable, of, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from 'src/app/core/_base/layout';
import { Update } from '@ngrx/entity';
import { LayoutUtilsService, MessageType, QueryParamsModel } from 'src/app/core/_base/crud';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerModel, CustomersDataSource, CustomersPageRequested } from 'src/app/core/e-commerce';
import { delay, distinctUntilChanged, skip, take } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
// import { MatSelectModule } from '@angular/material';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BaseNextNumberRequested, UserNumbersRequested } from 'src/app/core/manage_bases/_actions/bases.actions';
import { SelectedNextNum, SelectedNum } from 'src/app/core/manage_bases/_selectors/bases.selectors';


@Component({
  selector: 'kt-base-add',
  templateUrl: './base-add.component.html',
  styleUrls: ['./base-add.component.scss']
})
export class BaseAddComponent implements OnInit, AfterViewChecked {

  dataSource: CustomersDataSource;
  base: BasesModel;
  BasesForm: FormGroup;
  loading$: Observable<boolean>;
  hasFormErrors = false;
  selectedTab = 0;
  ischecked = true;
  allNumbers: CustomerModel[];
  nextNumberBase: string;

  customersResult: CustomerModel[] = [];
  selection = new SelectionModel<CustomerModel>(true, []);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild("sort1", { static: true }) sort: MatSort;
  // Filter fields
  @ViewChild("searchInput", { static: true }) searchInput: ElementRef;
  filterStatus = "";
  filterType = "";
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private toolbarService:ToolbarService,
    private router: Router,
    private subheaderService: SubheaderService,
    private location:Location,
    private userFB: FormBuilder,
    private layoutUtilsService: LayoutUtilsService,
    private store: Store<AppState>,) { }
    private subscriptions: Subscription[] = [];

  ngOnInit() {

	this.loading$ = this.store.pipe(select(selectBasesActionLoading));
	
	this.store.subscribe( state => {console.log(state);
	});

	

		
		const routeSubscription =  this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id && id > 0) {
				this.store.pipe(select(selectBaseById(id))).subscribe(res => {
					if (res) {
						this.base = res;
						// this.initBase();
						const url = `/bases/details/${this.base.baseId}`;
						this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
					}
				});
			} else {

				this.store.dispatch(new UserNumbersRequested());
				this.store.pipe(select(SelectedNum)).subscribe(res => {
					this.allNumbers = res;
				})
				
				debugger;

				this.store.dispatch(new BaseNextNumberRequested());
				this.store.pipe(select(SelectedNextNum)).subscribe(res => {
					this.nextNumberBase = res;
				})

				this.base = new BasesModel();
				this.base.clear();
				this.initBase();
				
			}
		});
    this.subscriptions.push(routeSubscription);
    
  }

  ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}
	

	loadCustomersList() {
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
		this.store.dispatch(new CustomersPageRequested({ page: queryParams }));
		this.selection.clear();
	  }

	  filterConfiguration(): any {
		const filter: any = {};
		const searchText: string = this.searchInput.nativeElement.value;
	
		if (this.filterStatus && this.filterStatus.length > 0) {
		  filter.status = +this.filterStatus;
		}
	
		if (this.filterType && this.filterType.length > 0) {
		  filter.type = +this.filterType;
		}
	
		filter.lastName = searchText;
		if (!searchText) {
		  return filter;
		}
	
		filter.firstName = searchText;
		filter.email = searchText;
		filter.ipAddress = searchText;
		return filter;
	  }


  initBase() {
		this.createForm();
		if (!this.base.baseId) {
			this.subheaderService.setTitle('Create client');
			this.subheaderService.setBreadcrumbs([
				{ title: 'Clients',  page: `clients/list` },
				{ title: 'Create client', page: `clients/add` }
			]);
			return;
		}
		this.subheaderService.setTitle('Edit client');
		this.subheaderService.setBreadcrumbs([
      { title: 'Clients',  page: `clients/list` },
			{ title: 'Edit client', page: `clients/details`, queryParams: { id: this.base.baseId } }
		]);
	}

  ngAfterViewChecked(): void {
    this.toolbarService.emit({ parent:{name:'Community info',url:'/clients/list'}, children:[ {name:'Clientes', url:'/bases/add'},{name:'Alta de base del cliente', url:'/bases/add'}]});
  }
  back() {
    this.location.back();
  }
  
  createForm() {
		this.BasesForm = this.userFB.group({
	  contactName: [this.base.contactName,
	  Validators.compose([Validators.pattern("^(?! +$)[A-Za-zăâîșțĂÂÎȘȚ -]+$"),
	  Validators.minLength(3),
	  Validators.maxLength(50),
	  Validators.required])],
	  contactSurname:[this.base.contactSurname,
	  Validators.compose([Validators.pattern('^(?! +$)[A-Za-zăâîșțĂÂÎȘȚ -]+$'),
	  Validators.minLength(3),
	  Validators.maxLength(50),
	  Validators.required])],
	  contactLastname:[this.base.contactLastname,
	  Validators.compose([Validators.pattern('^(?! +$)[A-Za-zăâîșțĂÂÎȘȚ -]+$'),
	  Validators.minLength(3),
	  Validators.maxLength(50), 
	  Validators.required])],
	  contactPhone:[this.base.contactPhone,
	  Validators.compose([Validators.pattern('^[0-9]*$'),
	  Validators.minLength(10),
	  Validators.maxLength(10), 
	  Validators.required])],
	  contactEmail:[this.base.contactEmail,
	  Validators.compose([Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$'),
	  Validators.maxLength(50), 
	  Validators.required])],
	  street: [this.base.street,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(3),
	  Validators.maxLength(50), 
	  Validators.required])],
	  interiorNumber:[this.base.interiorNumber,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(1),
	  Validators.maxLength(20), 
	  Validators.required])],
	  exteriorNumber:[this.base.exteriorNumber,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(1),
	  Validators.maxLength(20), 
	  Validators.required])],      
	  zipCode: [this.base.zipCode,
	  Validators.compose([Validators.pattern('^[0-9]*$'),
	  Validators.minLength(5),
	  Validators.maxLength(5), 
	  Validators.required])],
	  neighborhood:[this.base.neighborhood,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(3),
	  Validators.maxLength(50),  
	  Validators.required])],
	  state:[this.base.state,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(3),
	  Validators.maxLength(50),  
	  Validators.required])],
	  city:[this.base.city,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(3),
	  Validators.maxLength(50),  
	  Validators.required])],
	  baseName:[this.base.baseName,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(3),
	  Validators.maxLength(50), 
	  Validators.required])],
	  clientNumber:[this.base.clientNumber,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(3),
	  Validators.maxLength(50), 
	  Validators.required])],

		});
  }

  onSumbit(withBack: boolean = false) {
    debugger;
		this.hasFormErrors = false;
		const controls = this.BasesForm.controls;
		/** check form */
		if (this.BasesForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}

		const editedBase = this.prepareBase();

		if (editedBase.baseId > 0) {
			// this.updateBase(editedBase, withBack);
			return;
		}

		this.addBase(editedBase, withBack);
  }
  
  prepareBase(): BasesModel {
    debugger;
		const controls = this.BasesForm.controls;
		const _base = new BasesModel();
    _base.clear();
    _base.contactName = controls.contactName.value;
    _base.contactSurname = controls.contactSurname.value;
    _base.contactLastname = controls.contactLastname.value;
    _base.contactPhone = +controls.contactPhone.value;
    _base.contactEmail = controls.contactEmail.value;
    _base.street = controls.street.value;
    _base.interiorNumber = controls.interiorNumber.value;
    _base.exteriorNumber = controls.exteriorNumber.value;
    _base.zipCode = controls.zipCode.value;
    _base.neighborhood = controls.neighborhood.value;
    _base.state = controls.state.value;
    _base.city = controls.city.value;
    _base.baseName = controls.baseName.value;
    // _base.clientNumber = controls.clientId.value;statusId;
	_base.statusId = 'Activo';
	_base.clientNumber = controls.clientNumber.value;
    
		return _base;
  }

  goBackWithId() {
		const url = `/bases/list`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }

  refreshBase(isNew: boolean = false, id = 0) {
		debugger;
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `/bases/details/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }
  
  addBase(_base: BasesModel, withBack: boolean = false) {
	  debugger;
		this.store.dispatch(new BaseOnServerCreated({ base: _base }));
		const addSubscription = this.store.pipe(select(selectLastCreatedBaseId)).subscribe(newId => {
			const message = `La base ha sido creada con éxito.`;
			this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
			if (newId) {
				if (withBack) {
					this.goBackWithId();
				} else {
					this.refreshBase(true, newId);
				}
			}
		});
		this.subscriptions.push(addSubscription);
  }

  // updateBase(_bases: BasesModel, withBack: boolean = false) {
	// 	// Update customer
	// 	// tslint:disable-next-line:prefer-const

	// 	const updatedBase: Update<BasesModel> = {
	// 		id: _bases.baseId,
	// 		changes: _bases
	// 	};
	// 	this.store.dispatch(new BaseUpdated( { partialCustomer: updatedcustomer, customer: _customer }));
	// 	const message = `Client successfully has been saved.`;
	// 	this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
	// 	if (withBack) {
	// 		this.goBackWithId();
	// 	} else {
	// 		this.refreshCustomer(false);
	// 	}
	// }
  

}
