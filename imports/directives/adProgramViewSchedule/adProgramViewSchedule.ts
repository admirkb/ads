import 'reflect-metadata';
import 'zone.js/dist/zone';

// Meteor
import { Meteor } from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';
import {Tracker} from 'meteor/tracker';
import {Mongo} from 'meteor/mongo';

// angular
import {Component, ElementRef, EventEmitter, Output, OnInit, AfterViewInit, Input} from '@angular/core';

// Admir
import {MediaLibraries} from '../../../imports/api/medialibraries';
import {adProgramViewScheduleItem} from '../../../imports/directives/adProgramViewSchedule/adProgramViewScheduleItem';


@Component({
    selector: 'ad-program-view-schedule',
    directives: [adProgramViewScheduleItem],
    template: `

<div  [ngStyle]="{width: width, height: height}"  style="position:relative;background-color:orange; border-width:0px;border-style:solid; border-color:green;">


    <div style="width:100%; height:100%;background-color:purple; border-width:0px;border-style:solid; border-color:red;"
        *ngIf="showSignage">

        <div style="width:100%; height:100%; vertical-align:top;border-width:0px;border-style:solid; border-color:white; margin:0px; padding:0px;"
            *ngFor="let o of mediaLibrariesList; let key = index">

            <div  *ngIf="key==0">
                <ad-program-view-schedule-item [width]="width"  [height]="height" [playingId]="playingId" [playing]="o.playing" [theHtml]="o.html" [thedata]="o" [theId]="o.id"
                    [key]="key" type="static"></ad-program-view-schedule-item>
            </div>



        </div>
    </div>

    <div style="width:inherit; height:inherit;position:absolute;top:0px; left:0px; background-color:transparent; border-width:0px;border-style:none"
        *ngIf="showSignage">
        <table style="width:100%; height:10%; max-height:60px; white-space:nowrap;color:black;background-color:white;font-size:12px; opacity:.75;">
            <tr>
                <th style="text-align:left;">Id</th>
                <th style="text-align:left;">Time</th>
                <th style="text-align:left;">Key</th>
            </tr>
            <tr>
            </tr>
            <tr *ngFor="let o of RunAtArray; let key = index">
                <td style="width:20px;">
                    {{o.ID}}
                </td>
                <td style="width:20px;">
                    {{o.ProgramTime}}
                </td>
                <td style="width:20px;">
                    {{key}}
                </td>
            </tr>
        </table>

        <!--<div style="color:yellow;" [innerHTML]="playingId"></div>-->
        <div style="color:yellow;" [innerHTML]="'Admir customer # ' + customerId"></div>
        <div style="color:yellow;" [innerHTML]="'Admir channel # ' + channelId"></div>
    </div>



</div>

                    

    

    `,
})
export class adProgramViewSchedule implements OnInit, AfterViewInit {

    private showTime: boolean = true;
    private showSignage: boolean = true;
    private initialLoad: boolean = false;
    private search: any;
    private mediaLibraries: Mongo.Cursor<Object>;
    private mediaLibrariesList: any = [];
    private RunAtArray: any = [];
    private xxxx: any = [];
    protected searchCustomerId: ReactiveVar<number> = new ReactiveVar<number>(-1);
    protected searchChannelId: ReactiveVar<number> = new ReactiveVar<number>(-1);

    protected playingId: string;
    @Input() customerId: number;
    @Input() channelId: number;
    @Input() width;
    @Input() height;

    // Events
    MediaLibrariesChanged: EventEmitter<any> = new EventEmitter();
    MediaLibrariesChangedHtml: EventEmitter<any> = new EventEmitter();
    MediaLibrariesRemoved: EventEmitter<any> = new EventEmitter();
    MediaLibrariesAdded: EventEmitter<any> = new EventEmitter();



    constructor() {


        // setInterval(() => {
        //     this.setTimesxxxx();
        // }, 1000);


        this.mediaLibrariesList = [];
        this.RunAtArray = [];


        // Event  handlers

        this.MediaLibrariesChanged.subscribe((args) => {
            console.log("MediaLibrariesChanged fired")
            console.dir(args)
        });
        this.MediaLibrariesChangedHtml.subscribe((args) => {
            console.log("MediaLibrariesChangedHtml fired")
            console.dir(args)
        });
        this.MediaLibrariesRemoved.subscribe((args) => {
            console.log("MediaLibrariesRemoved fired")
            console.dir(args)
        });
        this.MediaLibrariesAdded.subscribe((args) => {
            console.log("MediaLibrariesAdded fired")
            console.dir(args)
        });


    }


    ngOnInit() {
        console.log("ngOnInit being called when component is initalized after constructor method from adProgramViewSchedule.ts");

        this.search = [];
        this.mediaLibrariesList = [];
        this.initialLoad = false;


        var day = new Date().getDay().toString();
        var hours = new Date().getHours().toString();

        // Tracker.autorun(() => {
        //     let options = {
        //         sort: { 'sortOrder': 1 }
        //     });

        let options = {
            sort: { 'sortOrder': 1 }
        };
        // let customerId = 2;
        // let channelId = 2;

        this.searchCustomerId.set(this.customerId);
        this.searchChannelId.set(this.channelId);

        var handle = Meteor.subscribe("mediaLibraries2", options, this.searchCustomerId.get(), this.searchChannelId.get(), {
            onReady: () => {
                console.log("onReady And the Items(mediaLibraries) actually Arrive");
                console.log(this.searchCustomerId.get());
                console.log(this.searchChannelId.get());


                // var ret = MediaLibraries.find({ "$and": [{ "customerId": this.customerId }, { "channelId": this.channelId }] }, options).fetch();


                // ret.forEach((medialib) => {
                //     // console.dir(medialib);
                //     var ml = new Object();
                //     ml.id = medialib._id;
                //     ml.customerId = medialib.customerId;
                //     ml.channelId = medialib.channelId;
                //     //ml._id._str = o._id._str;
                //     ml.program = medialib.program;
                //     ml.heading = medialib.heading;
                //     ml.detail = medialib.detail;
                //     ml.duration = medialib.duration;
                //     ml.sortOrder = medialib.sortOrder;
                //     ml.times = medialib.times;
                //     ml.days = medialib.days;
                //     ml.html = medialib.html;
                //     this.mediaLibrariesList.push(ml);
                //     console.log("forEach ~ " + ml.id);
                // });

                // this.initialLoad = true;
                // if (this.mediaLibrariesList.length != 0) {

                //     setTimeout(() => {
                //         this.setTimes(this.mediaLibrariesList);
                //     }, 1000);

                // }

            },
            onStop: () => {

                console.log("onError");
            }
        });



        // let handle = Meteor.subscribe('mediaLibraries2', options, this.searchCustomerId.get(), this.searchChannelId.get(), () => {



        setTimeout(() => {
            // this.setTimes(this.mediaLibrariesList);

            MediaLibraries.find({ "$and": [{ "customerId": this.customerId }, { "channelId": this.channelId }] }, options).forEach((medialib) => {
                // console.dir(medialib);

                var ml = new Object();
                ml.id = medialib._id;
                ml.customerId = medialib.customerId;
                ml.channelId = medialib.channelId;
                //ml._id._str = o._id._str;
                ml.program = medialib.program;
                ml.heading = medialib.heading;
                ml.detail = medialib.detail;
                ml.duration = medialib.duration;
                ml.sortOrder = medialib.sortOrder;
                ml.times = medialib.times;
                ml.days = medialib.days;
                ml.html = medialib.html;
                this.mediaLibrariesList.push(ml);
                console.log("forEach ~ " + ml.id);
            });

            this.initialLoad = true;
            if (this.mediaLibrariesList.length != 0) {
                this.setTimes(this.mediaLibrariesList);


            }

        }, 1000);


        // }, true);

        // Tracker.autorun(() => {
        //     const isReady = handle.ready();
        //     console.log(`Handle is ${isReady ? 'ready' : 'not ready'}`);
        // });



    }

    ngAfterViewInit() {
        console.log("ngAfterViewInit being called when component is initalized after constructor method from adProgramViewSchedule.ts");
    }

    setTimes(mediaLibrariesList) {

        console.log("setting time")

        var timeNow = new Date();
        var programmeCount = 0;
        var totalMillsAccum = 0;
        var totalMillsAccumDownload = 0;
        var totalMillsDelayDownload = 4;
        var totalprogrammeCount = mediaLibrariesList.length;
        var runAtRet = 0;

        this.RunAtArray = [];
        var iframe = 'iframeMain1';
        var url = "";
        var logMe = true;

        // Run 1st program now
        var item = mediaLibrariesList[0];

        var UpdateTime = new Date(timeNow.getTime() + totalMillsAccum);
        var func = "PlayMedia('" + item.program + "' , '" + item.id + "', " + item.customerId + ", " + item.duration + ", '" + iframe + "')";
        runAtRet = this.RunAt(UpdateTime, func, false, this);
        this.RunAtArray.push(runAtRet);
        console.dir(this.RunAtArray)


        totalMillsAccum = totalMillsAccum + (item.duration * 1000);

        UpdateTime = new Date(timeNow.getTime() + totalMillsAccum);
        func = "StopMedia('" + item.program + "' , '" + item.id + "', " + item.customerId + ", '" + iframe + "')";
        runAtRet = this.RunAt(UpdateTime, func, false, this);
        this.RunAtArray.push(runAtRet);


    }

    /////////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////////
    /// RunAt(DateTimeToRun, func, info)
    /// A helper method that takes the hard work out of running a process at a
    /// specified time.
    /// Parameters:-
    /// A valid date in the future, eg. new Date(2004, 10 , 13 , 10, 32 , 30).
    /// Dates that have passed will cause the function to execute immediately.
    /// Info switch. Set to true for debuging. Will give out time the process will fire.
    /// The method to run in the form of a string, e.g. DoTimedProcess().
    /// Returns:
    /// A timout ID, which can be held in an array for later cancelling if required.
    /// Copywright KJB Systems 2004
    RunAt(DateTimeToRun, func, info, me) {
        var timeNow = new Date();
        var elapsedStart = (DateTimeToRun.getTime() - timeNow.getTime());
        var theDateAsDate = new Date(timeNow.getTime() + elapsedStart);


        // var iTimeout = new this.setTimoutObject(setTimeout(() => { eval(func) }, elapsedStart), DateTimeToRun);
        var iTimeout = new this.setTimoutObject(window.setTimeout(function () { eval(func) }, elapsedStart), DateTimeToRun);
        if (info) {
            var r = new Object();

            r.StartTime = timeNow;
            r.EndTime = timeNow;
            r.AdmirChannelId = "-999";
            r.NetworkNodeId = "-999";

            r.Comments = "In RunAt: runs at:" + iTimeout.ProgramTime + " / " + func;
            // jr = JSON.stringify(r);
            alert(r.Comments)

            //logThis(jr);
        }
        return iTimeout;

        function PlayMedia(program, mediaLibraryId, customerId, duration, targetIFrame) {
            me.PlayMedia(program, mediaLibraryId, customerId, duration, targetIFrame);
        }

        function StopMedia(program, mediaLibraryId, customerId, targetIFrame) {
            me.StopMedia(program, mediaLibraryId, customerId, targetIFrame);

        }
    }

    setTimoutObject(ID, ProgramTime) {
        this.ID = ID.data.handleId;
        this.ProgramTime = ProgramTime;

    }

    PlayMedia(program, mediaLibraryId, customerId, duration, targetIFrame) {

        console.log("PlayMedia - program; " + program);

        this.playingId = this.mediaLibrariesList[0].id;



    }
    StopMedia(program, mediaLibraryId, customerId, targetIFrame) {
        console.log("StopMedia - program; " + program);


        var vmShifted = this.mediaLibrariesList.shift()
        var vmPushed = this.mediaLibrariesList.push(vmShifted);


        console.log("StopMedia:this.mediaLibrariesList.length: " + this.mediaLibrariesList.length);
        this.setTimes(this.mediaLibrariesList);




    }
    DownloadMedia(program, mediaLibraryId, customerId, duration, targetIFrame) {
    }
}

