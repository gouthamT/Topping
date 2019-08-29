import { Subject, of } from 'rxjs';
import { concatMap, delay, tap, takeUntil } from 'rxjs/operators';
import { TYPE_OF_OBSERVABLE, TYPE_OF_FUNCTION } from '../others/constants';
import {
  getElementById
} from '../others/utils';
import '../helpers/dndTree.js';

export default class ToppingBase {

  constructor() {
    this.sub$ = new Subject();
    this.end$ = new Subject();
    this.articleSection = getElementById("toppings");
    this.sub$.pipe(
      takeUntil(this.end$),
      concatMap(obj => {
        if (!obj) { return; }
        switch (obj.type) {

          case TYPE_OF_OBSERVABLE: return obj.delegate();

          case TYPE_OF_FUNCTION: return of(obj.delegate).pipe(delay(obj.delay || 0), tap(() => obj.delegate()));

          default: break;
        }
      })
    ).subscribe();
  }

  /**
   * finishes topping
   */
  finish() {
    this.end$.next(`Finished`);
    return this;
  }

}