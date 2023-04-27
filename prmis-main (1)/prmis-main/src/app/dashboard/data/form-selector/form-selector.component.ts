import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'form-selector',
  templateUrl: './form-selector.component.html',
  styleUrls: ['./form-selector.component.scss'],
})
export class FormSelectorComponent {
  @Output() formSelected = new EventEmitter<string>();

  selected: string = 'a';

  ngOnInit(): void {}

  changeSelected(form: string) {
    if (this.selected == form) return;
    const allForms = document.querySelectorAll('.form-item');
    allForms.forEach((form) => form.classList.remove('selected'));
    const selected = document.getElementById(form);
    selected?.classList.add('selected');
    this.selected = form;
    this.formSelected.emit(form);
  }
}
