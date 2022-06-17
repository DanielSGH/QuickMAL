browser.runtime.onInstalled.addListener(async () => {
  const client_id = VUE_APP_CLIENT_ID;
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

  // save token here, then get user details
  let access_details = '';
  await browser.storage.local.get('authresponse').then(res => access_details = res.authresponse)
  if (access_details === '')
    return console.log('something went wrong with getting the details from storage');
  
  // get the user's details from MAL
  makeLocalAnimeList(access_details.access_token);
  fetchUserData(access_details.access_token);
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
      expires_in: access.expires_in + Date.now(),
      refresh_token: access.refresh_token,
      token_type: access.token_type
    }

    browser.storage.local.set({ authresponse });
  })
  .catch(error => console.log(error));
}

function makeLocalAnimeList(bearer) {
  fetch(proxy + 'https://api.myanimelist.net/v2/users/@me/animelist?fields=id,title,main_picture,alternative_titles,start_date,end_date,synopsis,mean,rank,popularity,num_list_users,num_scoring_users,nsfw,created_at,updated_at,media_type,status,genres,my_list_status,num_episodes,start_season,broadcast,source,average_episode_duration,rating,pictures,background,related_anime,related_manga,recommendations,studios,statistics&limit=1000', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
  .then(res => res.json())
  .then(animelist => {
    browser.storage.local.set({ animelist });
  })
  .catch(e => {
    // should display the error message on screen
    console.log(e);
  })
}

function fetchUserData(bearer){
  fetch(proxy + 'https://api.myanimelist.net/v2/users/@me', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  })
  .then(res => res.json())
  .then(userdata => {
    browser.storage.local.set({ userdata });
  })
  .catch(e => {
    // should display the error message on screen
    console.log(e);
  })
}