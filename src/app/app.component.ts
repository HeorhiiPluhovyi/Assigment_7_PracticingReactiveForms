import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ValidatorsService } from './validators.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectStatus = ['Stable', 'Critical', 'Finished'];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cv: ValidatorsService) { }

  ngOnInit() {
    this.form = this.fb.group({
      projectName: [
        null,
        [
          Validators.required,
          Validators.minLength(4),
          this.cv.isForbiddenName.bind(this.cv)
        ],
        []
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.email
        ],
        [
          this.cv.asyncIsForbiddenEmails.bind(this.cv)
        ]
      ],
      projectStatus: [this.projectStatus[1], [Validators.required]]
    });
  }

  onSubmit() {
    console.log(this.form.value);

    this.form.reset();
    this.form.patchValue({
      projectStatus: this.projectStatus[1]
    });
  }
}
