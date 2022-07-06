# QuickMAL
A simple tool in your browser to make changes to your [MyAnimeList](https://myanimelist.net/) entries faster, developed in [VueJS](https://vuejs.org/). This app is not meant for commercial use for now or possibly ever, and this repo mainly serves as a proof-of-concept, and is something that I can improve and add features to in the future.

# Steps to Build and Reproduce
1. Clone, install necessary packages (e.g., vue bundler) and build:
```bash
  # Use '--recurse' after the remote repo URL and before the '&&' if you'd like to clone the backend server code as well.

  git clone https://github.com/DanielSGH/QuickMAL.git && cd ./QuickMAL && npm i && npm run build
```

2. Open **Firefox**
3. Enter `about:debugging` in the URL search
4. Click the `Load temporary Add-on...` button
5. Navigate to the clone's `dist` folder and click open `manifest.json`
