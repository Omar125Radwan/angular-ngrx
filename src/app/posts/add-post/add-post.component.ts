import { addPost } from './../state/post.action';
import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { Post } from './../../models/post.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm!: FormGroup;
  constructor(
    private store: Store<AppState>,
    ) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    })
  }

  //! Factory Function for showErros
  showErrors(Name: string, min?: number): string | undefined {
    const NameForm = this.postForm.get(Name);
    if(NameForm?.touched && !NameForm.valid) {
      if(NameForm.errors?.['required']) {
        return `${Name} is required`;
      }
      if(NameForm.errors?.['minlength']) {
        return `${Name} Should be of minimum ${min} chars length`;
      }
    }
    return undefined;
  }

  onAddPost(): void {
    if(!this.postForm.valid) {
      return;
    }
    const post: Post = {
      title: this.postForm.value.title,
      description: this.postForm.value.description,
    };
    this.store.dispatch(addPost({post}));
  }
}







/* showDescriptionErrors(): string | undefined {
  const descriptionForm = this.postForm.get('description');
  if(descriptionForm?.touched && !descriptionForm.valid) {
    if(descriptionForm.errors?.['required']) {
      return 'Description is required';
    }
    if(descriptionForm.errors?.['minlength']) {
      return 'Description should be of minimum 10 chars length';
    }
  }
  return undefined;
} */
