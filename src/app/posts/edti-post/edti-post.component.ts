import { updatePost } from './../state/post.action';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { getPostById } from './../state/post.selector';
import { AppState } from './../../store/app.state';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edti-post',
  templateUrl: './edti-post.component.html',
  styleUrls: ['./edti-post.component.scss']
})
export class EdtiPostComponent implements OnInit, OnDestroy {
  post: any;
  updateForm!: FormGroup;
  postSubscription!: Subscription;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.createForm();
    this.postSubscription = this.store.select(getPostById)
    .subscribe((post) => {
      this.post = post;
      this.updateForm.patchValue({
        title: post?.title,
        description: post?.description,
      })
    })
    //? Good Solution
    /* this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      this.postSubscription = this.store.select(getPostById({id}))
      .subscribe((data: any) => {
        this.post = data;
        this.createForm();
      });
    }); */
  }

  createForm() {
    this.updateForm = new FormGroup({
      // this.post?.title
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      // this.post?.description
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    });
  }

  onUpdatePost() {
    if(!this.updateForm.valid) {
      return;
    }
    const title = this.updateForm.value.title;
    const description = this.updateForm.value.description;
    const post: Post = {
      id: this.post.id,
      title,
      description,
    }
    this.store.dispatch(updatePost({post}));
    this.router.navigate(['posts']);
  }

  //! Factory Function for showErros
  showErrors(Name: string, min?: number): string | undefined {
    const NameForm = this.updateForm.get(Name);
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

  ngOnDestroy(): void {
    if(this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

}



/* ngOnInit(): void {
  this.route.paramMap.subscribe((params) => {
    const id = params.get('id');
    this.postSubscription = this.store.select(getPostById, {id}).subscribe(data => {
      this.post = data;
      this.createForm();
    });
  });
} */
