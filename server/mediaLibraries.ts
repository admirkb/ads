
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import {Counts} from 'meteor/tmeasday:publish-counts';
import {MediaLibraries} from '../imports/api/medialibraries';

// Meteor.publish("mediaLibraries", function (options, customerId) {


//     //let selector = {
//     //    heading: 'Sign2'
//     //};

//     let selector = {
//         customerId: customerId
//     };

//     console.log("Meteor.publish(mediaLibraries) called: customerId:" + customerId)
//     //return MediaLibraries.find();

//     return MediaLibraries.find();

//     //return MediaLibraries.find(selector, options);



// });

Meteor.publish('mediaLibraries2', function (options: Object, customerId: number, channelId, number) {

    console.log("options")
    console.dir(options)
    console.log("customerId")
    console.dir(customerId)
    console.log("channelId")
    console.dir(channelId)

    // Counts.publish(this, 'numberOfRecords', MediaLibraries.find({ 'customerId': customerId }), { noReady: true });

    // return MediaLibraries.find({});
    // return MediaLibraries.find({ 'customerId': customerId }, options);

    return MediaLibraries.find({ "$and": [{ "customerId": customerId }, { "channelId": channelId }] }, options)

});

Meteor.publish("mediaLibraries", function (options: Object, searchString: string, customerId: number) {

    var search = new RegExp('.*' + searchString, 'i');
    console.log(search)

    Counts.publish(this, 'numberOfRecords', MediaLibraries.find({ "$and": [{ "heading": search }, { "customerId": customerId }] }), { noReady: true });
    // return Meteor.users.find({selector}, { fields: { 'emails.address': 1, profile: 1, roles: 1, createdAt: 1, width: 1, height: 1, imageAsData: 1 } });
    // return MediaLibraries.find({ 'heading': search }, options);


    // return MediaLibraries.find({ "$and": [
    //     { "color": "e4oqPeoBTJtCpG53K" },
    //     { "color": "cvmQv7vQHunPnmqP" },
    //     { "color": { "$size": 2 } }
    // ]}, options);

    // return MediaLibraries.find({ "$and": [
    //     { "heading": search },
    //     { "color": "cvmQv7vQHunPnmqP" },
    //     { "color": { "$size": 2 } }
    // ]}, options);

    return MediaLibraries.find({ "$and": [{ "heading": search }, { "customerId": customerId }] }, options)


});

// Meteor.publish('mediaLibraries', (options: Object, searchString: string) => {

//     console.log("options")


// }


// );

Meteor.methods({


    'mediaLibraries.insert'(ml) {
        MediaLibraries.insert(ml);
    },
    'mediaLibraries.remove'(mlId) {
        MediaLibraries.remove(mlId);
    },
    'mediaLibraries.update'(mlId, action) {

        MediaLibraries.update(mlId, action);
    },


});