import {proxy, auth_handler} from './api.js';

class MAL {
  constructor(){
    this.hasResponse = false;
    const response = localStorage.getItem('authresponse');
    const authresponse = JSON.parse(response);
    
    if (response && authresponse.access_token) {
      this.hasResponse = true;

      this.access_token = authresponse.access_token;
      this.expires_in = authresponse.expires_in;
      this.refresh_token = authresponse.refresh_token;
    }
  }

  checkForAccessToken(){
    return this.hasResponse;
  }  

  async getUser() {
    if (!this.hasResponse) return;

    const response = await fetch(proxy + "https://api.myanimelist.net/v2/users/@me", {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.access_token}`
      }
    })
    const userdata = await response.json();
    return userdata || false;
  }

  async getAnimeList(limit = 1000) {
    if (!this.hasResponse) return;

    const args = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.access_token}`
      }
    }

    try {
      // getting extra information I might need to display in the future
      const response = await fetch(proxy + `https://api.myanimelist.net/v2/users/@me/animelist?fields=id,title,alternative_titles,start_date,end_date,mean,nsfw,media_type,status,my_list_status,num_episodes,rating,pictures,recommendations,statistics&limit=${limit}`, args)
      const animelist = await response.json();
      return animelist.data;
    } catch (error) {
      return error;
    }
  }

  isTokenExpired(){
    if (Date.now() < this.expires_in)
      return false;

    return true;
  }

  async refreshTokenIfNeeded(){
    if (!this.hasResponse) 
      return false;

    if (!this.isTokenExpired())
      return false;

    console.log('QUICKMAL: ##### REFRESHING TOKEN IS REQUIRED! #####');

    const response = await fetch(auth_handler + `/mal/oauth?token=${this.refresh_token}`, { method: 'GET' });
    const authresponse = await response.json();
    localStorage.setItem('authresponse', response.ok && authresponse.success ? JSON.stringify(authresponse.data) : false);
  }

  async updateAnimeList(node){
    // {"status":"watching","score":0,"num_episodes_watched":"17","is_rewatching":false,"updated_at":"2022-06-22T13:28:40+00:00","start_date":"2022-06-09"}
    if (!this.hasResponse) return;

    const status = node.my_list_status;

    const params = {
      'status': status.status,
      'score': status.score,
      'num_watched_episodes': status.num_episodes_watched,
    }

    const args = {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${this.access_token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(params),
    }


    await fetch(proxy + `https://api.myanimelist.net/v2/anime/${node.id}/my_list_status`, args)
      .catch(e => console.log(e));
  }

  async deleteEntry(id){
    if (!this.hasResponse) return;

    await fetch(proxy + `https://api.myanimelist.net/v2/anime/${id}/my_list_status`, {
      headers: {
        Authorization: `Bearer ${this.access_token}`
      },
      method: "DELETE"
    })
    .catch(e => console.log(e));
  }

  getStatusOptions(){
    return [
      {id: 'completed', name: 'Completed'},
      {id: 'watching', name: 'Watching'},
      {id: 'on_hold', name: 'On Hold'},
      {id: 'dropped', name: 'Dropped'},
      {id: 'plan_to_watch', name: 'Plan to Watch'},
    ]
  }
}

export default new MAL();