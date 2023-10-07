const auth_handler = 'https://frantic-culottes-bass.cyclic.app';

browser.runtime.onInstalled.addListener(async () => {
  const code_challenge = generateRandom(128);

  //get token details from API, set token details in localStorage
  const redirect = await launchAuth(code_challenge);
  const authcode = redirect.substring(redirect.indexOf('code=') + 5);

  fetchToken(authcode, code_challenge);
})

function generateRandom(length) {
  const allowed = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-._~";
  let txt = '';
  for (let i = 0; i < length; i++)
    txt += allowed.charAt(Math.floor((Math.random() * allowed.length) + 1));
  return txt;
}

async function launchAuth(code_challenge) {
  return await browser.identity.launchWebAuthFlow({
    url: auth_handler + `/mal/oauthwebflow?challenge=${code_challenge}`,
    interactive: true
  });
}

async function fetchToken(authcode, verifier) {
  const response = await fetch(auth_handler + `/mal/oauth?authcode=${authcode}&verifier=${verifier}`, { method: 'GET' });
  const authresponse = await response.json();
  localStorage.setItem('authresponse', response.ok && authresponse.success ? JSON.stringify(authresponse.data) : false);
}