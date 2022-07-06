export interface IGame {
  Id: number;
  Categories: Array<string>;
  Name: string;
  Summary: string;
  ReleaseDate: Date;
  Likes: number;
  Cover: string;
  Screenshots: Array<string>;
  Price: number;
}
