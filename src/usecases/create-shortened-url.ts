import { Url } from "src/model/Url";
import { IUrlRepository } from "src/repositories/IUrlRepository";

type UrlRequest = {
  originalUrl: string;
}

export class CreateShortenedUrl {
  constructor(private urlRepository: IUrlRepository) {}

  async execute({ originalUrl }: UrlRequest) {
    const url = new Url({
      originalUrl,
      views: 0,
    });

    await this.urlRepository.save(url);

    return url;
  }
}
