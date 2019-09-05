import { Subject, of, fromEvent } from 'rxjs';
import { concatMap, delay, tap, takeUntil, map } from 'rxjs/operators';
import { TYPE_OF_OBSERVABLE, TYPE_OF_FUNCTION } from '../others/constants';
import $ from "jquery";
import '../helpers/dndTree.js';

export default class ToppingRelayBase {

  constructor() {
    let self = this;
    this.sub$ = new Subject();
    this.end$ = new Subject();
    this.shadowHost = document.createElement('section');
    this.shadowHost.id = `shadow-hosted-topping-app`;
    this.modalHolder = document.createElement('div');
    $(document).ready(function () {
      let shadowRoot = self.shadowHost.attachShadow({ mode: 'open' });
      let link = document.createElement('link');
      link.id = `toppings-stylesheet`;
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = './topping/toppingRelay.css';
      link.media = 'all';
      shadowRoot.appendChild(link);
      shadowRoot.appendChild(self.modalHolder);
      document.body.appendChild(shadowRoot);
    });

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

    /**Global Events */
    fromEvent(window, 'message').pipe(
      map(event => {
        if (!event || !event.data || !event.data.values) return;
        return event.data;
      }),
      tap(source => {
        if (!source) return;
        let data;
        for (var value of source.values()) {
          data = value[1];
          data && data.target && self[data.target] && self[data.target](...data.arguments);
        }
      })
    ).subscribe();
  }

}