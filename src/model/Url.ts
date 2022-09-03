import { generate } from 'short-uuid';

type UrlProps = {
  originalUrl: string;
  views: number;
}

export class Url {
  private _id: string;
  private props: UrlProps;

  constructor(props: UrlProps, id?: string) {
    this.props = props;
    this._id = id ?? generate();
  }

  get id(): string {
    return this._id;
  }

  get originalUrl(): string {
    return this.props.originalUrl;
  }

  get views(): number {
    return this.props.views;
  }
}

