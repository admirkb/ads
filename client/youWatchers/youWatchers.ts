import 'reflect-metadata';
import 'zone.js/dist/zone';
import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component, EventEmitter, OnInit, provide, ViewContainerRef} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';
import {bootstrap} from 'angular2-meteor-auto-bootstrap';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, RouteConfig} from '@angular/router-deprecated';
import { APP_BASE_HREF } from '@angular/common';
import {RouterLink} from '@angular/router-deprecated';
import {Router} from '@angular/router-deprecated';
import {InjectUser} from 'angular2-meteor-accounts-ui';

// Admir

import {AdmirMessagingWatchCore} from  '../../client/coreWatch';

import {Staffs} from '../../imports/api/staffs';
import {StaffsList} from '../../imports/staffs/staffs-list/staffs-list';
import {Bugs} from '../../imports/api/bugs';
import {BugsList} from '../../imports/bugs/bugs-list/bugs-list';
import {Locales} from '../../imports/api/locales';
import {LocalesList} from '../../imports/locales-list/locales-list';
import {UsersList} from '../../imports/users/users-list/users-list';
import {RolesList} from '../../imports/roles/roles-list/roles-list';
import {Register} from '../../imports/auth/register/register';
import {Login} from '../../imports/auth/login/login';
import {HomeView} from '../../imports/homeView/homeView';
import {DisplayName} from '../../imports/pipes/pipes.ts';

import {GenericList} from '../../imports/generic/generic-list/generic-list';
import {MediaLibrariesList} from '../../imports/mediaLibraries/mediaLibraries-list/mediaLibraries-list';
import {MediaLibrariesList2} from '../../imports/mediaLibraries/mediaLibraries-list/mediaLibraries-list2';

import {CustomerChannel1} from '../../imports/programSchedule/customerChannel1';



// import {enableProdMode} from '@angular/core';
// enableProdMode();

@Component({
  selector: 'you-watchers',
  templateUrl: 'client/youWatchers/youWatchers.html',
  directives: [CustomerChannel1, MediaLibrariesList, MediaLibrariesList2, StaffsList, RouterLink, ROUTER_DIRECTIVES, BugsList, HomeView, LocalesList, Register, Login, UsersList, RolesList],
  pipes: [DisplayName]
})
@RouteConfig([
  { path: '/', as: 'HomeView', component: HomeView },
  { path: '/staffs', as: 'Staffs', component: StaffsList },
  { path: '/users', as: 'Users', component: UsersList },
  { path: '/register', as: 'Register', component: Register },
  { path: '/login', as: 'Login', component: Login },
  { path: '/bugs', as: 'Bugs', component: BugsList },
  { path: '/medialibraries', as: 'MediaLibraries', component: MediaLibrariesList },
  { path: '/medialibraries2', as: 'MediaLibraries2', component: MediaLibrariesList2 },
  { path: '/locales', as: 'Locales', component: LocalesList },
  { path: '/homeView', as: 'HomeView', component: HomeView },
  { path: '/roles', as: 'Roles', component: RolesList },
  { path: '/generic', as: 'Generic', component: GenericList },
  { path: '/customerChannel1', as: 'CustomerChannel1', component: CustomerChannel1 },

])

@InjectUser("user")
class AdmirYouWatchers extends AdmirMessagingWatchCore implements OnInit {


  private customerId: string = "CUST1";
  private userId: string = "USER1";
  private name: string = "Kelvin";
  public user: Meteor.User;
  public role: string;

  constructor(private router: Router, viewContainerRef: ViewContainerRef) {
    super();


    this.role = "Admin";

  }
  // this.inAdmin () {
  //   return Roles.userIsInRole(Meteor.userId(), ['admin'], 'default-group');
  // }
  ngOnInit() {
    console.log(this._today.getTime());


    this.activate();
    console.log("I'm being called when component is initalized after constructor method in AdmirYouWatchers in youWatchers.ts");
  }



  activate() {
    console.log("in activate()")

  }



  logout() {
    this.autorun(() => {
      Meteor.logout();
      this.router.navigate(['/HomeView']);
    });
  }



}



bootstrap(AdmirYouWatchers, [ROUTER_PROVIDERS, provide(APP_BASE_HREF, { useValue: '/' })]);