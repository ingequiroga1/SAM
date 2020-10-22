import { Component, OnInit , ChangeDetectorRef} from '@angular/core';
import { Router , ActivatedRoute } from '@angular/router';
import { AuthNoticeService, AuthService, Login } from '../../../../core/auth';
import {tap,takeUntil, finalize} from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../core/reducers';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';

import { BroadcastService,MsalService } from '@azure/msal-angular';
import { Logger, CryptoUtils } from 'msal';

@Component({
  selector: 'kt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	title = 'MSAL - Angular 9 Sample App';
	isIframe = false;
	loggedIn = false;

  loading = false;
  private returnUrl: any;
  private unsubscribe: Subject<any>;
  constructor(
    private router: Router,
    private auth: AuthService,
    private store: Store<AppState>,
    private route: ActivatedRoute,
    private authNoticeService:AuthNoticeService,
    private translate: TranslateService,
	private cdr: ChangeDetectorRef,
	private broadcastService: BroadcastService,
	private authService: MsalService) {
      this.unsubscribe = new Subject();
    }

  ngOnInit(){
	this.isIframe = window !== window.parent && !window.opener;
	this.checkoutAccount();
    // this.route.queryParams.subscribe(params => {
	// 		this.returnUrl = params.returnUrl || '/';
	// 	});
	this.broadcastService.subscribe('msal:loginSuccess', () => {
		this.checkoutAccount();
	  });

	  this.authService.handleRedirectCallback((authError, response) => {
		if (authError) {
		  console.error('Redirect Error: ', authError.errorMessage);
		  return;
		}
		console.log('Redirect Success: ', response);
	  });

	  this.authService.setLogger(new Logger((logLevel, message, piiEnabled) => {
		console.log('MSAL Logging: ', message);
	  }, {
		correlationId: CryptoUtils.createNewGuid(),
		piiLoggingEnabled: false
	  }));
  }
  
  checkoutAccount() {
	this.loggedIn = !!this.authService.getAccount();
	debugger;
	if (this.loggedIn) {
		this.store.dispatch(new Login({authToken: 'access-token-8f3ae836da744329a6f93bf20594b5cc'}));
		this.router.navigate(['/dashboard']); // Main page
	} else {
		this.authNoticeService.setNotice(this.translate.instant('AUTH.VALIDATION.INVALID_LOGIN'), 'danger');
	}
  }


  submit() {
	this.loading = true;


		const authData = {
			email: 'admin@demo.com',
			password: 'demo'
		};
		this.auth
			.login(authData.email, authData.password)
			.pipe(
				tap(user => {
					if (user) {
						this.store.dispatch(new Login({authToken: user.accessToken}));
						debugger;
						this.router.navigate(['/dashboard']) // Main page
					}
				}),
				takeUntil(this.unsubscribe),
				finalize(() => {
					this.loading = false;
					this.cdr.markForCheck();
				})
			)
			.subscribe()
  }


  login() {
	  debugger;
    const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

    if (isIE) {
    this.authService.loginRedirect();
     } else {
       this.authService.loginPopup();
     }
  }
}
