import { Component, OnInit } from '@angular/core';
import { ClrLoadingState } from '@clr/angular';
import { setTimeout } from 'timers';

import { environment } from 'src/environments/environment';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { AuthenticationService } from 'src/app/services/authentication.service';

class ProgressData {
  constructor(message: string, stage: string, percent: number) {
    this.message = message;
    this.stage = stage;
    this.percent = percent;
  }
  stage: string;
  message: string;
  percent: number;
}

@Component({
  selector: 'app-modeling',
  templateUrl: './modeling.component.html',
  styleUrls: ['./modeling.component.css']
})
export class ModelingComponent implements OnInit {
  private socketUrl;
  private stompClient;

  progressBar: number = 0;
  submitBtnState: ClrLoadingState = ClrLoadingState.DEFAULT;
  progressList: ProgressData[] = [];
  currentMessage: string;

  constructor(private authenticationService: AuthenticationService) {
    this.socketUrl = environment.serverUrl + environment.apiPath + environment.backendPath;
    this.socketUrl += "socket";
  }

  initializeSocketConnection() {
    const currentUser = this.authenticationService.currentUser;
    console.log(currentUser);
    let headers = {};
    // this.socketUrl = "http://localhost:10001/socket";

    let ws: SockJS = new SockJS(this.socketUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({"X-Authorization": "123"}, function (frame) {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/topic/loops', function (message) {
          console.log(loopEvent);
          var loopEvent = JSON.parse(message.body);
          console.log(loopEvent);
          var button = eval(loopEvent.loopId);
          if (button.state !== loopEvent.value) {
              button.state = loopEvent.value;
              if (loopEvent.value === true) {
                  button.player.restart();
              } else {
                  button.player.stop();
              }
          }
      });
  });


    // this.stompClient.connect(headers, function(frame) {
    //     that.stompClient.subscribe("/chat", (message) => {
    //       if(message.body) {
    //         console.log(message);
    //       }
    //     });
    //   },
    //   function(error) {
    //     console.log(error);
    //   }  
    // );
  }

  sendMessage(message) {
    this.stompClient.send("app/send/message", {}, message);
  }

  ngOnInit() {
    this.createStages();
    this.initializeSocketConnection();
  }

  createStages() {
    this.progressList.push(new ProgressData("Getting model servers", 'Waiting', 33));
    this.progressList.push(new ProgressData("Getting models available", 'Waiting', 66));
    this.progressList.push(new ProgressData("Updating models", 'Waiting', 100));
  }

  requestToStart() {
    console.log("requestToStart");
    this.submitBtnState = ClrLoadingState.LOADING;
    
    this.progressList.forEach(item => {
      setTimeout(() => {
        this.currentMessage = item.message;
        this.progressBar = item.percent; 
      }, 5000);
    });

    this.submitBtnState = ClrLoadingState.ERROR;
    this.request();
  }

  request() {

  }
}
