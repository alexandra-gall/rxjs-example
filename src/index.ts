import { catchError, EMPTY, fromEvent } from 'rxjs';
import { map, debounceTime, distinctUntilChanged, switchMap, mergeMap, tap, filter } from 'rxjs/operators';
import { ajax } from 'rxjs/ajax';

import { HTMLInputEvent, GitDTO } from './models';

const URL = 'https://api.github.com/search/users?q='

const input = document.getElementById('search');
const result = document.getElementById('result');

const stream$ = fromEvent(input, 'input')
  .pipe(
    map( (e: HTMLInputEvent) => e.target.value),
    debounceTime(1000),
    distinctUntilChanged(),
    tap(() => result.innerHTML = ''),
    filter(v => !!v.trim()),
    switchMap(v => ajax.getJSON(URL + v).pipe(
      catchError(() => EMPTY)
    )),
    map((response: GitDTO) => response.items),
    mergeMap(items => items)
  );

stream$.subscribe(user => {
  const html = `
    <div class="card">
      <div class="card-image">
        <img src="${user.avatar_url}" alt="Avatar" />
        <span class="card-title">${user.login}</span>
      </div>
      <div class="card-action">
        <a href="${user.html_url}" target="_blank">Открыть github</a>
      </div>
    </div>
  `
  result.insertAdjacentHTML('beforeend', html)
})
