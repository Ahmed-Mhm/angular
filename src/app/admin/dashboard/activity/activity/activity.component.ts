import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {ConfirmationService, MessageService} from 'primeng/api';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.sass'],
  providers: [ConfirmationService, MessageService]
})

export class ActivityComponent implements OnInit {

  items: MenuItem[];
  display: boolean = false;

  constructor(private confirmationService: ConfirmationService) {}

  confirm() {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to perform this action?',
        accept: () => {
            //Actual logic to perform a confirmation
        }
    });
  }

  ngOnInit() {

    this.items = [
      {label: 'Edit', icon: 'pi pi-pencil', command: () => {
      }},
      {label: 'Delete', icon: 'pi pi-times', command: () => {
      }}
    ];
  }

  showDialog() {
    this.display = true;
  }

}
