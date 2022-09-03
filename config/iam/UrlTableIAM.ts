export default {
  Effect: 'Allow',
  Action: [
    'dynamodb:PutItem',
    'dynamodb:GetItem',
    'dynamodb:UpdateItem',
    'dynamodb:DeleteItem',
    'dynamodb:Scan'
  ],
  Resource: [
    '${self:custom.UrlTable.arn}'
  ]
}
