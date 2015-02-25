=====================================================================================
--- Basic Set Up
1. Install Git (download from http://git-scm.com/downloads)
2. Install nodejs (download from http://nodejs.org/download)
3. if needed, set proxy (see below)
4. npm install -g gulp
5. npm install -g bower

=====================================================================================
--- Configuration

--- git, %USERPROFILE%\.gitconfig (edit manually or execute the following commands)
git config --global http.proxy http://user:pw@proxy:8080
git config --global url."https://".insteadOf git://

--- npm, %USERPROFILE%\.npmrc (edit manually or execute the following commands)
npm config set proxy http://user:pw@proxy:8080
npm config set https-proxy http://user:pw@proxy:8080

--- bower, %USERPROFILE%\.bowerrc (edit manually, file is in json format)
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
2. bower install

--- Run
1. gulp dev
2. go to http://localhost:8080

--- Test
open the report from karma_html/<browser-name>/index.html
