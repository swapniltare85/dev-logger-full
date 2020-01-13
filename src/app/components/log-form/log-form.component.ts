import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/Log';
import { LogService } from '../../services/log.service'
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;
  isNew: boolean = true;
  constructor(private logService: LogService) { }

  ngOnInit() {
    //Subscribe to the selectedLog Ob
    this.logService.selectedLog.subscribe(log => {
      if (log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
      // console.log(log);
    });
  }
  onSubmit() {
    //check if new log
    if (this.isNew) {
      // create new log
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }
      // Add log
      this.logService.addLog(newLog);
    }
    else {
      //create log to be updated
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      // updated log
      this.logService.updateLog(updLog);
    }
    //Clear state
    this.clearState();
  }
  clearState(){
    this.isNew=true;
    this.id='';
    this.text='';
    this.date=null; 
    this.logService.clearState(); 
  }
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
