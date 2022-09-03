import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { UrlRepository } from "src/repositories/UrlRepository";
import { UpdateShortenedUrlViews } from "src/usecases/update-shortened-url-views";

const updateUrl = async (event) => {
  const urlRepository = new UrlRepository();
  const updateShortenedUrlViews = new UpdateShortenedUrlViews(urlRepository);

  const id = event.body.id;

  if (!id) {
    throw new Error();
  }

  await updateShortenedUrlViews.execute({ id });

  return formatJSONResponse({
    message: 'The shortened url has been updated.'
  });
}

export const main = middyfy(updateUrl);
