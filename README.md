# Open Translators to Things Console
Allows developers to interact with the Open Translators to Things repository. See http://www.opentranslatorstothings.org.

Developers can use the console app on Windows 10, Mac OSX or Android as a runtime to communicate with and onboard actual Things. The console app hosts the node.js process and serves simple UX to onboard (set up, auth, pair, etc) the Thing. Once a Thing has been onboarded, its schema and translator are downloaded. The Thing is then exposed through the AllJoyn bus as an AllJoyn device supporting the schema it has been translated to.

This README will help get you started developing in this repo.

## Install Tools

Get your dev environment set up (PC or Mac):
* [Install Git](http://git-scm.com/downloads)
* [Install Node](https://nodejs.org/en/download/)
* Choose your favorite IDE, e.g. [Visual Studio Code](https://code.visualstudio.com/).

Install the Ionic Framework and Cordova using npm. Note that we are using ionic 2, which is currently in beta.

```bash
$ npm install -g ionic@2.0.0-beta.32
$ npm install -g cordova@6.2.0
```

## Get the Source

Next, clone this repo to your local machine to get started. Navigate to the directory where you want to clone the repo
to locally, then run:

```bash
git clone https://github.com/openT2T/console.git
```

## Install Dependencies

You will need to install various dependencies to populate your local repo. The development process
is driven by node, and the following command installs the dev dependencies (e.g. the typescript compiler,
a test server, etc) as well as the dependencies used by the actual app (e.g. angular2 and ionic2):

```bash
$ npm install
```

Ionic provides an easy way to install the various cordova plugins used in the project. Run:

```bash
$ ionic state restore
```
Note: if running in Windows, and the command is not recognized, you may need to add npm to your PATH. 
The following should work: "%USERPROFILE%\AppData\Roaming\npm".

## Start Developing

Congratulations, you are now set up for the basic development workflow! Just run:

```bash
$ ionic serve
```

If you're feeling fancy, you can also try the [Ionic Lab](http://blog.ionic.io/ionic-lab/) which will show you how your
app will look in different devices:

```bash
$ ionic serve --lab
```

The browser will launch, with the app hosted locally. As you make changes to the source, the app will live-reload 
in the browser to reflect your changes. This is great for doing UX-only updates, where you are not using any
native components.

You can also run the following to emulate on a local android simulator (note: this requires the Android SDK on PC or Mac):

```bash
$ ionic emulate android --livereload
```

Finally, run the following to install and run on a local Windows simulator (note: this requires the Windows 10 SDK on a PC):

```bash
$ ionic run windows --archs=x64
```

? Note: At this time the --livereload option is not working on Windows, however you can try it for other platforms.

There is another way to build and run the Cordova app on Windows, which some might find easier. Specifically:

```bash
$ ionic build windows --archs=x64
```

Once you have a successful build, open the CordovaApp.sln file under platforms\windows in Visual Studio 2015, set the 
CordovaApp.Windows10 project as startup, and then just run from within Visual Studio. This is helpful for debugging.

? Note: If you get a build break in Visual Studio 2015, make sure all the different projects are set to build the same way,
e.g. make sure all the different projects in the solution are building for Debug | x64.

## Service Configuration

This app requires some API secrets from external services. If you will be using any of these services, follow the instructions in this section to configure them.

> This section is optional. If you are not using any of these external services, you can safely ignore it.

### 1. Create Config File
Create a `config.ts` file under the "app" folder with the following contents. This file is listed in `.gitignore` to help avoid accidental check-in of secrets.

```ts
    export class Config {

        public static Wink: any = {
            "API_ENDPOINT" : "https://api.wink.com",
            "CLIENT_ID" : "",
            "CLIENT_SECRET" : ""
        };

        public static Auth0: any = {
            "DOMAIN" : "",
            "CLIENT_ID" : "",
            "CLIENT_SECRET" : ""
        };
    }
```

### 2. Populate Config File with Configuration Values
Next, populate the configuration values per service in the following manner:

1. Wink: Get a Client ID and Client Secret from Wink / Quirky as documented on their site, and paste into your `config.ts`.
2. Auth0: Get a Client ID and Client Secret from auth0 with the following process. If you get stuck, please refer to [this page](https://auth0.com/docs/what-to-do-once-the-user-is-logged-in/calling-an-external-idp-api) which has some more information and screenshots.
    1. Go to http://auth0.com and sign up
    2. Create a client, making sure you select client type `Regular Web Applications`. You can give the client
       whatever name you prefer.
    3. After the client is created, ignore the `Quick Start` section and go to the `Settings` tab.
    4. Copy the `Client ID` and `Client Secret`, as well as the `Domain`, from the `Settings` tab and paste into your config.ts.
    5. Under `Allowed Callback URLs` in the `Settings` tab, enter `https://YOUR_DOMAIN/mobile`
    6. Under `Allowed Origins (CORS)` in the `Settings` tab, enter `http://localhost:8100` and `file://\*`, then save changes
    7. Next, go to the APIs section of the Auth0 dashboard and select the Auth0 Management API.
        > NOTE: If you do not see the APIs option in the left menu, you must enable it. Go to Account Settings > Advanced and select Enable APIs Section.
    8. Select the Non Interactive Clients tab and authorize the app you just created.
    9. From the list of available scopes, select `read:user_idp_tokens` and click Update.

## Common Development Workflows

Here are some workflows you might find useful during development:

1. ionic serve : runs the dev web server (with live reload)
1. ionic emulate [platform] --live reload: starts an emulator session (with live reload) for the specified platform
2. ionic build [platform]: builds the app for the specified platform.
3. gulp tslint: Runs the linter to find static analysis issues with your code.

For general developer tips, check out [this article](http://ionicframework.com/docs/v2/resources/developer-tips/).

## Debugging Cordova plugin (Windows Platform)
If you start Cordova from the CLI rather than from Visual Studio, but want to debug it, attach to the WWAHost.exe process.

## Create a Pull Request
Made any changes we should consider? Send us a pull request! Check out [this article](https://help.github.com/articles/creating-a-pull-request/)
on how to get started.

## Code of Conduct
This project has adopted the [Microsoft Open Source Code of Conduct](https://opensource.microsoft.com/codeofconduct/). For more information see the [Code of Conduct FAQ](https://opensource.microsoft.com/codeofconduct/faq/) or contact [opencode@microsoft.com](mailto:opencode@microsoft.com) with any additional questions or comments.
