import 'reflect-metadata';

import { Meteor } from 'meteor/meteor';

// Angular
import {Component, EventEmitter, OnInit, OnChanges, Input, ElementRef, ViewChild, SimpleChange} from '@angular/core';
import {MeteorComponent} from 'angular2-meteor';

// Admir

@Component({
  selector: 'ad-program-view-schedule-item',
  template: `

<div id="placeholder1" [innerHTML]="thedata.html"  [ngStyle]="{width: width, height: height}" style="background-color:black; border-width:2px;border-style:solid; border-color:yellow; margin:0px; padding:0px; width:100%; height:100%; overflow:visible;">

</div>
                 


    `,
})

export class adProgramViewScheduleItem extends MeteorComponent implements OnInit, OnChanges {

  @Input() thedata;
  @Input() theId;
  @Input() theHtml;
  @Input() key;
  @Input() playing;
  @Input() playingId;
  private _element: any;
  @Input() width;
  @Input() height;



  constructor(elementRef: ElementRef) {
    super();

    this._element = elementRef.nativeElement;

  }


  ngOnInit() {

    console.log("ngOnInit being called when component is initalized after constructor method from adProgramViewScheduleItem.ts");
    console.dir(this.thedata)
    console.log(this.key)
  }

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    for (let propName in changes) {

      if (propName == 'playingId') {

        let chng = changes[propName];

        let cur = JSON.stringify(chng.currentValue);
        let prev = JSON.stringify(chng.previousValue);

        if (cur != prev) {
          console.log("propName == 'playingId changed'")
          console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);

          var placeholder1 = this._element.getElementsByTagName('div')[0]
          console.dir(placeholder1)

          var firstChild = placeholder1.firstChild;
          if (firstChild != null) {
            console.dir(firstChild)
            var type = (typeof firstChild)
            console.dir(type)

            switch (firstChild.nodeName) {
              case 'VIDEO':
                PlayVideo(firstChild);
                break;
              case 'AUDIO':
                PlayAudio(firstChild);
                break;
              case 'ADMIR':
                PlayAdmir(firstChild);
                break;
              case 'IFRAME':
                PlayIframe(firstChild);
                break;
            }
          }
        }


      }

      // if (propName == 'stop') {
      //   console.log("propName == 'stop changed'")
      //   let chng = changes[propName];

      //   let cur = JSON.stringify(chng.currentValue);
      //   let prev = JSON.stringify(chng.previousValue);
      //   console.log(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
      // }


    }
    // vid.currentTime = 0;
    // vid.load();
    //vid.autoplay = true;

    function PlayVideo(vid) {

      console.log("vid")
      console.dir(vid)
      console.log("vid")
      vid.pause();

      vid.play();
    }
    function PlayAudio(aud) {

      console.log("aud")
      console.dir(aud)
      console.log("aud")
      aud.pause();
      aud.play();
    }
    function PlayAdmir(el) {
      console.log("el")
      console.dir(el)

    }
    function PlayIframe(el) {
      console.log("el")
      console.dir(el)

    }


  }

}
