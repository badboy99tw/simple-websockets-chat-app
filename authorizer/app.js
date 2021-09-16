exports.handler = async event => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  if (event.headers.Auth === "Bearer ValidToken") {
    return generateAllow('user', event.methodArn);
  } else {
    return generateDeny('user', event.methodArn);
  }
}

// Helper function to generate an IAM policy
const generatePolicy = async (principalId, effect, resource) => {
  // Required output:
  let authResponse = { principalId };
  if (effect && resource) {
    authResponse.policyDocument = {
      Version: '2012-10-17', // default version
      Statement: [{
        Action: 'execute-api:Invoke', // default action
        Effect: effect,
        Resource: resource
      }]
    }
  }
  return authResponse;
}

const generateAllow = async (principalId, resource) => {
  return generatePolicy(principalId, 'Allow', resource);
}

const generateDeny = async (principalId, resource) => {
  return generatePolicy(principalId, 'Deny', resource);
}