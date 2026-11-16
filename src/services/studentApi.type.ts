export interface IResponse {
  data: IData[];
  errors: string[];
  statusCode: number;
}

export interface IData {
  id: number;
  isCompleted: boolean;
  images: IImage[];
  name: string;
  description: string;
}

export interface IImage {
  id: number;
  imageName: string;
}