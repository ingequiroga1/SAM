import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/views/services/toolbar.service';
import {Location} from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {
	CustomerModel,
	CustomerUpdated,
	selectCustomerById,
	CustomerOnServerCreated,
	selectLastCreatedCustomerId,
	selectCustomersActionLoading
} from '../../../../core/e-commerce';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/core/reducers';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SubheaderService } from 'src/app/core/_base/layout';
import { Update } from '@ngrx/entity';
import { LayoutUtilsService, MessageType } from 'src/app/core/_base/crud';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { CustomerNextNumberRequested } from 'src/app/core/e-commerce/_actions/customer.actions';
import { SelectedNextNumCustomer } from 'src/app/core/e-commerce/_selectors/customer.selectors';
import { weekdays } from 'moment';



@Component({
  selector: 'kt-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.scss']
})

export class ClientAddComponent implements OnInit, AfterViewChecked {

  customer: CustomerModel;
  customerForm: FormGroup;
  loading$: Observable<boolean>;
  hasFormErrors = false;
  selectedTab = 0;
  imgpreview = '/assets/media/users/default.jpg';
  userimage: File;
  ischecked = true;
  nextNumberCustomer: string;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    private toolbarService:ToolbarService,
    private router: Router,
    private subheaderService: SubheaderService,
    private location:Location,
    private userFB: FormBuilder,
    private layoutUtilsService: LayoutUtilsService,
    private store: Store<AppState>, ) { }
    private subscriptions: Subscription[] = [];

  ngOnInit() {

    this.loading$ = this.store.pipe(select(selectCustomersActionLoading));
		debugger;
		const routeSubscription =  this.activatedRoute.params.subscribe(params => {
			const id = params.id;
			if (id && id > 0) {
				this.store.pipe(select(selectCustomerById(id))).subscribe(res => {
					if (res) {
						debugger;
						this.customer = res;
						// this.initCustomer();
						const url = `/bases/details/${this.customer.clientId}`;
						this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
					}
				});
			} else {

				this.store.dispatch(new CustomerNextNumberRequested());
				this.store.pipe(select(SelectedNextNumCustomer)).subscribe(res => {
					this.nextNumberCustomer = res;
				})

				this.customer = new CustomerModel();
				this.customer.clear();
				this.initCustomer();
			}
		});
		this.subscriptions.push(routeSubscription);

  }

  ngOnDestroy() {
		this.subscriptions.forEach(sb => sb.unsubscribe());
	}

  initCustomer() {
	  debugger;
		this.createForm();
		if (!this.customer.clientId) {
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
			{ title: 'Detalle cliente', page: `clients/details`, queryParams: { id: this.customer.clientId } }
		]);
	}

  ngAfterViewChecked() {
    this.toolbarService.emit({ parent:{name:'Community info',url:'/community'}, children:[ {name:'Alta de clientes', url:'/clients/add'}]});
  }

  back() {
    this.location.back();
  }

  createForm() {
		this.customerForm = this.userFB.group({
    //   clientNumber: [this.customer.clientNumber,Validators.compose([Validators.pattern('^[a-zA-Z0-9 ]*$'),
    //   Validators.minLength(1),Validators.maxLength(30), Validators.required])],
	  rfc:[this.customer.rfc,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9]*$'),
	  Validators.minLength(13),
	  Validators.maxLength(13), 
	  Validators.required])],
	  clientName:[this.customer.clientName,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(3),
	  Validators.maxLength(50), 
	  Validators.required])],
	  street:[this.customer.street,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(3),
	  Validators.maxLength(50), 
	  Validators.required])],
	  exteriorNumber:[this.customer.exteriorNumber,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(1),
	  Validators.maxLength(20), 
	  Validators.required])],
	  interiorNumber: [this.customer.interiorNumber,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(1),
	  Validators.maxLength(20), 
	  Validators.required])],
	  zipCode:[this.customer.zipCode,
	  Validators.compose([Validators.pattern('^[0-9]*$'),
	  Validators.minLength(5),
	  Validators.maxLength(5), 
	  Validators.required])],
	  neighborhood:[this.customer.neighborhood,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(3),
	  Validators.maxLength(50), 
	  Validators.required])],      
	  state: [this.customer.state,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(3),
	  Validators.maxLength(50),
	  Validators.required])],
	  city:[this.customer.city,
	  Validators.compose([Validators.pattern('^(?! +$)[a-zA-Z0-9 ]*$'),
	  Validators.minLength(3),
	  Validators.maxLength(50), 
	  Validators.required])],
	  clientMobile:[this.customer.clientMobile,
	  Validators.compose([Validators.pattern('^[0-9]*$'),
	  Validators.minLength(10),
	  Validators.maxLength(10), 
	  Validators.required])],
	  clientEmail:[this.customer.clientEmail,
	  Validators.compose([Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$'),
	  Validators.maxLength(50),
	  Validators.required])],
    //   statusId:[this.customer.statusId,Validators.compose([Validators.pattern('^[a-zA-Z0-9 ]*$'),
    //   Validators.minLength(3),Validators.maxLength(20), Validators.required])],
	  contactName: [this.customer.contactName,
	  Validators.compose([Validators.pattern('^(?! +$)[A-Za-zăâîșțĂÂÎȘȚ -]+$'),
	  Validators.minLength(3),
	  Validators.maxLength(50), 
	  Validators.required])],
	  contactSurname:[this.customer.contactSurname,
	  Validators.compose([Validators.pattern('^(?! +$)[A-Za-zăâîșțĂÂÎȘȚ -]+$'),
	  Validators.minLength(3),
	  Validators.maxLength(50),
	  Validators.required])],
	  contactLastname:[this.customer.contactLastname,
	  Validators.compose([Validators.pattern('^(?! +$)[A-Za-zăâîșțĂÂÎȘȚ -]+$'),
	  Validators.minLength(3),
	  Validators.maxLength(50), 
	  Validators.required])],
	  contactPhone:[this.customer.contactPhone,
	  Validators.compose([Validators.pattern('^[0-9]*$'),
	  Validators.minLength(10),
	  Validators.maxLength(10), 
	  Validators.required])],
	  contactEmail:[this.customer.contactEmail,
	  Validators.compose([Validators.pattern('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$'),
	  Validators.maxLength(50),
	  Validators.required])],
		});
  }


  onSumbit(withBack: boolean = false) {
    debugger;
		this.hasFormErrors = false;
		const controls = this.customerForm.controls;
		/** check form */
		if (this.customerForm.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);

			this.hasFormErrors = true;
			this.selectedTab = 0;
			return;
		}




		const editedCustomer = this.prepareCustomer();

		if (editedCustomer.clientId > 0) {
			this.updateCustomer(editedCustomer, withBack);
			return;
		}

		this.addCustomer(editedCustomer, withBack);
	}

  prepareCustomer(): CustomerModel {
    debugger;
		const controls = this.customerForm.controls;
		const _customer = new CustomerModel();
		_customer.clear();
    _customer.contactName = controls.clientName.value;
    _customer.contactSurname = controls.contactSurname.value;
    _customer.contactLastname = controls.contactLastname.value;
    _customer.contactPhone = +controls.contactPhone.value;
    _customer.contactEmail = controls.contactEmail.value;
    _customer.street = controls.street.value;
    _customer.interiorNumber = controls.interiorNumber.value;
    _customer.exteriorNumber = controls.exteriorNumber.value;
    _customer.zipCode = controls.zipCode.value;
    _customer.neighborhood = controls.neighborhood.value;
    _customer.state = controls.state.value;
    _customer.city = controls.city.value;
    _customer.rfc = controls.rfc.value;
    _customer.clientName = controls.clientName.value;
    _customer.statusId = 'Alta';
    _customer.clientEmail = controls.clientEmail.value;
    _customer.clientMobile = +controls.clientMobile.value;
	_customer.clabe = parseInt(this.generaNss());
	// _customer.clabe = 15478;
    
		return _customer;
  }

  generaNss() {
    let result = '';
    const characters = '56789';
    const charactersLength = characters.length;
    for (let i = 0; i < charactersLength; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

  goBackWithId() {
		const url = `/clients/list`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
  }
  
  refreshCustomer(isNew: boolean = false, id = 0) {
		debugger;
		let url = this.router.url;
		if (!isNew) {
			this.router.navigate([url], { relativeTo: this.activatedRoute });
			return;
		}

		url = `/clients/details/${id}`;
		this.router.navigateByUrl(url, { relativeTo: this.activatedRoute });
	}

  addCustomer(_customer: CustomerModel, withBack: boolean = false) {
		this.store.dispatch(new CustomerOnServerCreated({ customer: _customer }));
		const addSubscription = this.store.pipe(select(selectLastCreatedCustomerId)).subscribe(newId => {
			const message = `El cliente ha sido creado con éxito.`;
			this.layoutUtilsService.showActionNotification(message, MessageType.Create, 5000, true, false);
			if (newId) {
				if (withBack) {
					this.goBackWithId();
				} else {
					this.refreshCustomer(true, newId);
				}
			}
		});
		this.subscriptions.push(addSubscription);
	}

	uploadimg(event){
		debugger;
		const file = (event.target as HTMLInputElement).files[0];
		this.userimage = file;
		const reader = new FileReader();
		reader.onload=() => {
			this.imgpreview = reader.result as string;
		}
		reader.readAsDataURL(file)
	}

  updateCustomer(_customer: CustomerModel, withBack: boolean = false) {
		// Update customer
		// tslint:disable-next-line:prefer-const

		const updatedcustomer: Update<CustomerModel> = {
			id: _customer.clientId,
			changes: _customer
		};
		this.store.dispatch(new CustomerUpdated( { partialCustomer: updatedcustomer, customer: _customer }));
		const message = `Client successfully has been saved.`;
		this.layoutUtilsService.showActionNotification(message, MessageType.Update, 5000, true, true);
		if (withBack) {
			this.goBackWithId();
		} else {
			this.refreshCustomer(false);
		}
	}


}
