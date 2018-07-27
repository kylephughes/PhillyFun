import { HappyHourCreateModalComponent } from './happy-hour-create-modal/happy-hour-create-modal.component';
import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-happyhour',
  templateUrl: './happyhour.component.html',
  styleUrls: ['./happyhour.component.scss']
})
export class HappyhourComponent implements OnInit {
  //don't display the modal yet
 // private hhModalForm = false;
  //@ViewChild('hhModalView')
  //private hhModalView: ElementRef;
  closeResult: string;
  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }
  
  toggleFormModal(content) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
