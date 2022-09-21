import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Form } from 'src/app/interface/form.model';
import { ExampleService } from 'src/app/Services/example.service';
import { ExitoComponent } from '../exito/exito.component';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.scss']
})
export class ExampleComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  constructor(private service: ExampleService, private fb: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
      apellido: new FormControl('', [Validators.minLength(3)]),
      documento: new FormControl('', [Validators.required, Validators.minLength(10)]),
      correo: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      genero: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.min(0), Validators.max(100)]),
      pasatiempo: new FormControl('', [Validators.required])
    })
  }
  submit() {
    if (this.form.invalid)
      this.form.markAllAsTouched()
    let info: Form = this.form.value
    this.service.theItem = JSON.stringify(info)
    this.service.itemValue.subscribe({
      next: data => {
        console.log(data)
        this.form.reset()
        Object.keys(this.form.controls).forEach((key) => {
          const control = this.form.controls[key];
          control.markAsPristine();
          control.markAsUntouched();
        });
        Object.keys(this.form.controls).forEach((key) => {
          const control = this.form.controls[key];
          control.setErrors(null);
        });
        this.dialog.open(ExitoComponent, {
          data: info
        })
      },
      error: err => {
        console.log(err)
      },
    })
  }
}
