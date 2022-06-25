import {proxy, client_id} from './api.js';

class MAL {
constructor(){
    this.hasResponse = false;
    const response = localStorage.getItem('authresponse');
    
    if (response) {
      this.hasResponse = true;
      const authresponse = JSON.parse(response);

      this.access_token = authresponse.access_token;
      this.expires_in = authresponse.expires_in;
      this.refresh_token = authresponse.refresh_token;
    }
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
      const response = await fetch(proxy + `https://api.myanimelist.net/v2/users/@me/animelist?fields=id,title,alternative_titles,start_date,end_date,mean,nsfw,media_type,status,my_list_status,num_episodes,rating,pictures,recommendations,statistics&limit=${limit}`, args)
      const animelist = await response.json();
      return animelist.data;
    } catch (error) {
      return error;
    }
  }

  async refreshTokenIfNeeded(){
    if (!this.hasResponse) return;

    if (Date.now() > this.expires_in - 60000)
      return false;

    const params = {
      'client_id': client_id,
      'grant_type': 'refresh_token',
      'refresh_token': this.refresh_token,
    }

    const args = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(params)
    };

    try {
      const response = await fetch('https://myanimelist.net/v1/oauth2/token', args);
      const access = await response.json();

      const authresponse = {
        access_token: access.access_token,
        expires_in: access.expires_in + Date.now(),
        refresh_token: access.refresh_token,
        token_type: access.token_type
      }

      console.log(authresponse);

      localStorage.removeItem('authresponse');
      localStorage.setItem('authresponse', JSON.stringify(authresponse));
    } catch (error) {
      return error;
    }
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