'use strict';

module.exports.basicAuthorizer = async (event, context, cb) => {
  try {
    const token = event.headers.Authorization
    if (token === undefined) {
      cb('Unauthorized')
    } 
    const tokenString = token.split(' ')[1] 
    const buff = Buffer.from(token.split(' ')[1], 'base64');
    const text = buff.toString('ascii');
    const [login, password] = text.split(':')

    const storedUserPassword = process.env[login]
    const effect = storedUserPassword !== password ? 'Deny' : 'Allow'

    const policy = generatePolicy(tokenString, event.methodArn, effect)
    
    cb(null, policy)

  } catch (err) {
    cb(`Unauthorized: ${err.message}`)
  }
};

const generatePolicy = (principalId, resource, effect) => {
  var authResponse = {};
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = '2012-10-17'; 
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = 'execute-api:Invoke'; 
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }

    return authResponse;
}