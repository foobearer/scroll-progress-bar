import { Component, OnInit } from '@angular/core';
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'scroll-progress-bar';

  constructor() { }
  
  ngOnInit(): void {
    const scroll$ = fromEvent(document, 'scroll');
    
    const progress$ = scroll$.pipe(
      map(({ target }: any) => this.calculateScrollPercentage(target.scrollingElement)));
    
    const progressbar: any = document.querySelector('.progress-bar');
    
    progress$.subscribe(percentage => {
      progressbar.style.width = `${percentage}%`;
    });

    scroll$.subscribe(console.log);
    
  }

  private calculateScrollPercentage(element) {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = element;

    return (scrollTop / (scrollHeight - clientHeight)) * 100;
  }
}
