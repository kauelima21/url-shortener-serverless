import { DocumentClient } from "aws-sdk/clients/dynamodb";
import { Url } from './../model/Url';
import { IUrlRepository } from "./IUrlRepository";

export class UrlRepository implements IUrlRepository {
  private dynamoDb: DocumentClient;
  private tableName: string;

  constructor() {
    this.dynamoDb = new DocumentClient();
    this.tableName = 'Url';
  }

  async findById(id: string): Promise<Url | null> {
    const result = await this.dynamoDb.get({
      TableName: this.tableName,
      Key: { id },
    }).promise();

    if (!result.Item) return null;

    const url = new Url({
      originalUrl: result.Item.originalUrl,
      views: result.Item.views
    }, result.Item.id);

    return url;
  }

  async save(url: Url): Promise<boolean> {
    await this.dynamoDb.put({
      TableName: this.tableName,
      Item: {
        id: url.id,
        originalUrl: url.originalUrl,
        views: url.views,
      },
    }).promise();

    return true;
  }

  async update(id: string, views: number): Promise<boolean> {
    await this.dynamoDb.update({
      TableName: this.tableName,
      Key: { id },
      UpdateExpression: 'set #v = :v',
      ExpressionAttributeValues: {
        ':v': views,
      },
      ExpressionAttributeNames: {
        '#v': 'views'
      },
      ReturnValues: 'ALL_NEW',
    }).promise();

    return true;
  }
}
