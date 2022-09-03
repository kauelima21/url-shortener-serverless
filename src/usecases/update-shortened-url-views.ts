import { IUrlRepository } from "src/repositories/IUrlRepository";

type UrlRequest = {
  id: string;
}

export class UpdateShortenedUrlViews {
  constructor(private urlRepository: IUrlRepository) { }

  async execute({ id }: UrlRequest) {
    const url = await this.urlRepository.findById(id);
    await this.urlRepository.update(id, url.views + 1);

    return true;
  }
}
