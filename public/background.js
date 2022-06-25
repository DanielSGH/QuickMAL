browser.runtime.onInstalled.addListener(async () => {
  const code_challenge = generateRandom(128);

  // get token details from API, set token details in localStorage
  const redirect = await launchAuth(client_id, code_challenge);
  const authcode = redirect.substring(redirect.indexOf('code=') + 5);
  const params = {
    'client_id': client_id,
    'code': authcode,
    'code_verifier': code_challenge,
    'grant_type': 'authorization_code',
  }

  fetchToken(params);
})

function generateRandom(length) {
  const allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~";
  let txt = '';
  for (let i = 0; i < length; i++)
    txt += allowed.charAt(Math.floor((Math.random() * allowed.length) + 1));
  return txt;
}

async function launchAuth(client_id, code_challenge) {
  return await browser.identity.launchWebAuthFlow({
    url: `https://myanimelist.net/v1/oauth2/authorize?response_type=code&client_id=${client_id}&code_challenge=${code_challenge}`,
    interactive: true
  });
}

function fetchToken(params) {
  fetch(proxy + 'https://myanimelist.net/v1/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams(params)
  })
  .then(response => response.json())
  .then(access => {
    const authresponse = {
      access_token: access.access_token,
      expires_in: access.expires_in * 1000 + Date.now(),
      refresh_token: access.refresh_token,
      token_type: access.token_type
    }

    localStorage.setItem('authresponse', JSON.stringify(authresponse));
  })
  .catch(error => console.log(error));
}