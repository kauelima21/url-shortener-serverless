import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { UrlRepository } from "src/repositories/UrlRepository";
import { CreateShortenedUrl } from "src/usecases/create-shortened-url";

const createUrl = async (event) => {
  const urlRepository = new UrlRepository();
  const createShortenedUrl = new CreateShortenedUrl(urlRepository);

  const originalUrl = event.body.originalUrl;

  if (!originalUrl) {
    throw new Error();
  }

  const urlShortened = await createShortenedUrl.execute({ originalUrl });

  return formatJSONResponse({
    urlShortened: `http://localhost:3000/${urlShortened.id}`
  });
}

export const main = middyfy(createUrl);
