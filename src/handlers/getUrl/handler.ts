import { formatJSONResponse } from "@libs/api-gateway";
import { middyfy } from "@libs/lambda";
import { UrlRepository } from "src/repositories/UrlRepository";

const getUrl = async (event) => {
  const urlRepository = new UrlRepository();

  const id = event.pathParameters.id;

  const url = await urlRepository.findById(id);

  return formatJSONResponse({
    url
  });
}

export const main = middyfy(getUrl);
