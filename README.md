# Open Translators to Things Console
Allows developers to interact with the Open Translators to Things repository. See http://www.opentranslatorstothings.org.

Developers can use the console app on Windows 10, Mac OSX or Android as a runtime to communicate with and onboard actual Things. The console app hosts the node.js process and serves simple UX to onboard (set up, auth, pair, etc) the Thing. Once a Thing has been onboarded, its schema and translator are downloaded. The Thing is then exposed through the AllJoyn bus as an AllJoyn device supporting the schema it has been translated to.

This README will help get you started developing in this repo.

## Install Tools

Get your dev environment set up (PC or Mac):
* [Install Git](http://git-scm.com/downloads)
* [Install Node](https://nodejs.org/en/download/)
* Choose your favorite IDE, e.g. [Visual Studio Code](https://code.visualstudio.com/).

Install the Ionic Framework, Cordova and Typings using npm. Note that we are using ionic 2, which is currently in beta.

```bash
$ npm install -g ionic@2.0.0-beta.19 cordova@6.0.0 gulp@3.9.1 tslint@3.6.0 typescript@1.8.9
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
$ gulp build
$ ionic serve
```

If you're feeling fancy, you can also try the [Ionic Lab](http://blog.ionic.io/ionic-lab/) which will show you how your
app will look in different devices:

```bash
$ gulp build
$ ionic serve --lab
```

The browser will launch, with the app hosted locally. As you make changes to the source, the app will live-reload 
in the browser to reflect your changes. This is great for doing UX-only updates, where you are not using any
native components.

You can also run the following to emulate on a local android simulator (note: this requires the Android SDK on PC or Mac):

```bash
$ gulp build
$ ionic emulate android --livereload
```

Finally, run the following to install and run on a local Windows simulator (note: this requires the Windows 10 SDK on a PC):

```bash
$ gulp build
$ ionic run windows --archs=x64
```

? Note: At this time the --livereload option is not working on Windows.

After a successful build, you can also open the CordovaApp.sln file under platforms\windows in Visual Studio 2015, set the 
CordovaApp.Windows10 project as startup, and then just run from within Visual Studio. This is helpful for debugging.

## Service Configuration

This app requires some API secrets from external services. Configure them here, if you want to use these services:

1. Wink API: app/pages/onboarding/winkOnboardingPage/winkConfig.ts

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
