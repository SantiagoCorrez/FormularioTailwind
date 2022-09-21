import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Form } from 'src/app/interface/form.model';

@Component({
  selector: 'app-exito',
  templateUrl: './exito.component.html',
  styleUrls: ['./exito.component.scss']
})
export class ExitoComponent implements OnInit {
  info!:Form;
  constructor(@Inject(MAT_DIALOG_DATA) data:Form) { 
    this.info = data
  }

  ngOnInit(): void {
    
  }

}
