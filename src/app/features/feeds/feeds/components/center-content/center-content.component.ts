import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { PostsService } from '../../../../../shared/services/posts/posts.service';
import { Iposts } from '../../../../../core/models/iposts.interface';

@Component({
  selector: 'app-center-content',
  imports: [],
  templateUrl: './center-content.component.html',
  styleUrl: './center-content.component.css',
})
export class CenterContentComponent implements OnInit {
  private readonly postsService =inject(PostsService)
  allPosts:WritableSignal<Iposts[]>=signal([])
  ngOnInit(): void {
this.getAllPosts()
  }
getAllPosts(){
  this.postsService.getAllPosts().subscribe({
    next:(res)=>{
      console.log(res.data.posts);
      this.allPosts.set(res.data.posts)

    },
    error:(err)=>{
      console.log(err);

    }

  })
}

}
