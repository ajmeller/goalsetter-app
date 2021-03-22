import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-goal-dialog',
  templateUrl: './goal-dialog.component.html',
  styleUrls: ['./goal-dialog.component.css'],
})
export class GoalDialogComponent implements OnInit {
  form: FormGroup = new FormGroup({
    goal: new FormControl(''),
  });
  goal: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<GoalDialogComponent>
  ) {}

  saveGoal() {
    this.dialogRef.close(this.form.value);
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      goal: [this.goal, []],
    });
  }
}
