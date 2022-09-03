export default {
  UrlTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: 'Url',
      BillingMode: 'PAY_PER_REQUEST',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S'
        }
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH'
        }
      ]
    }
  }
}
