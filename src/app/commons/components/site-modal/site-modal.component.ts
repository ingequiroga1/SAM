import { Component, OnInit , ViewChild , TemplateRef, Input } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'kt-site-modal',
  templateUrl: './site-modal.component.html',
  styleUrls: ['./site-modal.component.scss']
})
export class SiteModalComponent implements OnInit {
  dialogRef;
  @ViewChild('contentTempRef',{read: TemplateRef}) contentTempRef;
  @Input() panelClass = '';
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openDialog() {
		 this.dialogRef = this.dialog.open(this.contentTempRef, {
			panelClass: this.panelClass
		});
    }

    closeDialog() {
      this.dialogRef.close();
    }
}
