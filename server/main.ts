import { Meteor } from 'meteor/meteor';

import {loadBugs} from './load-bugs';
import {loadStaffs} from './load-staffs';
import {loadLocales} from './load-locales';
import {loadGenericCollection} from './startup/load-generic';
import {loadMediaLibraries} from './startup/loadMediaLibraries';

import './bugs';
import './staffs';
import './locales';

Meteor.startup(() => {
  console.log("Meteor is starting")
  
   loadBugs();
      loadStaffs();
            loadLocales();
              // console.log("Meteor is starting loadGenericCollection")
            // loadGenericCollection();
    console.log("Meteor is starting loadMediaLibraries")
  loadMediaLibraries();
       

});
