// Meteor

import { Meteor } from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';

// Angular
import {Component} from '@angular/core';


// Admir
import {adProgramViewSchedule} from '../../imports/directives/adProgramViewSchedule/adProgramViewSchedule';


// Component

@Component({
  directives: [adProgramViewSchedule],
  templateUrl: '/imports/programSchedule/customerChannel1.html'
})
export class CustomerChannel1  {


  constructor() {


  }
}