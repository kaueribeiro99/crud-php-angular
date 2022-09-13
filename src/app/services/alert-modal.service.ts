import { Injectable } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {AlertModalComponent} from '../shared/alert-modal/alert-modal.component';
import {ConfirmModalComponent} from '../shared/confirm-modal/confirm-modal.component';

export enum AlertTypes {
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(public modalService: BsModalService) { }

  private showAlert(message: string, type: AlertTypes, dismissTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }

  }

  showAlertDanger(message: string){
    this.showAlert(message, AlertTypes.DANGER, 3000);
  }
  showAlertSucess(message: string){
    this.showAlert(message, AlertTypes.SUCCESS, 3000);
  }
  showAlertWarning(message: string){
    this.showAlert(message, AlertTypes.WARNING, 3000)
  }

  showConfirm(title: string, msg: string, okTxt?: string, cancelTxt?: string) {
    const bsModalRef: BsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if (okTxt) {
      bsModalRef.content.okTxt = okTxt;
    }

    if (cancelTxt) {
      bsModalRef.content.cancelTxt = cancelTxt;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
