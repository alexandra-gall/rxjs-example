export interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

type User = {
  login: string,
  id: number,
  avatar_url: string,
  html_url: string,
}

export type GitDTO = {
  total_count: number,
  incomplete_results: boolean,
  items: User[],
}
