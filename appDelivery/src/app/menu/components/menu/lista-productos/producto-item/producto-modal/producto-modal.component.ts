import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbModal, NgbConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-producto-modal',
  templateUrl: './producto-modal.component.html',
  styleUrls: ['./producto-modal.component.css'],
})
export class ProductoModalComponent implements OnInit {
  @Input() productos;
  public modalsNumber = 0;
  public timeLeft: number = 60;
  interval;

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 0.3);
  }

  constructor(
    public activeModal: NgbActiveModal,
    private modalService: NgbModal
  ) {
    this.modalService.activeInstances.subscribe((list) => {
      this.modalsNumber = list.length;
    });
  }
  ngOnInit(): void {
    this.startTimer();
  }
}
