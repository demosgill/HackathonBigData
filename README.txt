=====================================================================================
--- Basic Set Up
1. Install nodejs, set proxy (see below)
2. npm install -g bower
3. npm install -g grunt-cli
4. npm install -g gulp

=====================================================================================
--- Configuration

--- git, %USERPROFILE%\.gitconfig
git config --global http.proxy http://user:pw@proxy:8080
git config --global url."https://".insteadOf git://

--- npm, %USERPROFILE%\.npmrc
npm config set proxy http://user:pw@proxy:8080
npm config set https-proxy http://user:pw@proxy:8080

--- bower, %USERPROFILE%\.bowerrc
{
	"proxy":"http://user:pw@proxy:8080",
	"https-proxy":"http://user:pw@proxy:8080"
}

--- global proxy config (in case the above config doesn't help, depends on the tooling versions)
set http_proxy=http://user:pw@proxy:8080
set https_proxy=http://user:pw@proxy:8080
set HTTP_PROXY=http://user:pw@proxy:8080
set HTTPS_PROXY=http://user:pw@proxy:8080

=====================================================================================
--- Build
1. npm install
2. bower installnpm

--- Run
1. gulp dev
2. go to http://localhost:8080

--- Test
open the report from karma_html/<browser-name>/index.html
