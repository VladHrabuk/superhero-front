export interface ISuperhero {
  id: number;
  nickname: string;
  realName: string;
  originDespription: string;
  superpowers: string;
  catchPhrase: string;
  images: IImage[];
  createdAt: string;
  updatedAt: string;
}

export interface ISuperheroCreate {
  nickname: string;
  realName: string;
  originDescription: string;
  superpowers: string;
  catchPhrase: string;
  images: File[];
}

export interface IImage {
  id: number;
  superheroId: number;
  url: string;
  createdAt: string;
}
