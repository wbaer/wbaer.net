---
title: 'A Simple Guide to Setup your Mac (OSX or macOS) Development Environment for the SharePoint Framework'
date: Mon, 27 Mar 2017 15:55:50 +0000
draft: false
tags: ['Getting Started', 'SharePoint Framework', 'SPFx', 'Tutorials']
---

**Prerequisites** Before you can build and test solutions on a live SharePoint environment, you will need an active Office 365 Tenant.  Follow the instructions [https://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant](https://dev.office.com/sharepoint/docs/spfx/set-up-your-developer-tenant) to setup your Office 365 Developer Tenant.

Overview
========

The SharePoint Framework is a Page and Part model that enables fully supported client-side development, easy integration with the Microsoft Graph and support for open source tooling. This guide will help you prepare your OSX or macOS development environment for developing solutions with the SharePoint Framework.

Install Homebrew
================

[Homebrew](http://brew.sh) is a package manager for Mac. [![brew](https://msdnshared.blob.core.windows.net/media/2017/03/brew-300x200.png)](http://wbaer.files.wordpress.com/2017/03/f15cb-brew.png) Open Terminal and enter the following code to install Homebrew: `/usr/bin/ruby -e "$(curl -fsSL [https://raw.githubusercontent.com/Homebrew/install/master/install](https://raw.githubusercontent.com/Homebrew/install/master/install))"` Homebrew will also install XCode Command Line Tools. Enter the following code to verify Homebrew is up to date: `brew update` Enter the following code to ensure your system is ready to run brew: `brew doctor` Enter the following code to add Homebrew’s location to your .bash\_profile or .zshrc file: `export PATH="/usr/local/bin:$PATH"`

Install Node.js and npm
=======================

[npm](https://www.npmjs.com/) (Node Package Manager) is a package manager for Node.js that allows you to quickly and easily set up local Node environments and plugins. [![nodejs](https://msdnshared.blob.core.windows.net/media/2017/03/nodejs-300x200.png)](http://wbaer.files.wordpress.com/2017/03/1a222-nodejs.png) Enter the following code to install Node.js and npm: `brew install node` **Optional** Enter the following command to install Grunt: `npm install -g grunt-cli`

Install Visual Studio Code
==========================

Download and install Visual Studio Code at [https://code.visualstudio.com/](https://code.visualstudio.com/) and copy the package to your Applications folder. [![vscode](https://msdnshared.blob.core.windows.net/media/2017/03/vscode-300x200.png)](http://wbaer.files.wordpress.com/2017/03/81562-vscode.png)

Install Yeoman and Gulp
=======================

[Yeoman](http://yeoman.io/) helps you kick-start new projects, and prescribes best practices and tools to help you stay productive. SharePoint client-side development tools include a Yeoman generator for creating new web parts. The generator provides common build tools, common boilerplate code, and a common playground web site to host web parts for testing. [![yeoman](https://msdnshared.blob.core.windows.net/media/2017/03/yeoman-300x200.png)](http://wbaer.files.wordpress.com/2017/03/fa86f-yeoman.png) Enter the following command to install Yeoman: `npm install -global yo` [Gulp.js](http://gulpjs.com/) is a streaming build system that automatically takes care of redundant tasks for you. [![gulpjs](https://msdnshared.blob.core.windows.net/media/2017/03/gulpjs-300x200.png)](http://wbaer.files.wordpress.com/2017/03/fbb4f-gulpjs.png) Enter the following to command to install Gulp: `npm install --global gulp-cli`

Install Yeoman SharePoint generator
===================================

The Yeoman SharePoint web part generator helps you quickly create a SharePoint client-side solution project with the right toolchain and project structure. Enter the following command to install the Yeoman SharePoint generator: `npm install -g @microsoft/generator-sharepoint` That's it, you're ready to start building web parts!  Review [https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment](https://dev.office.com/sharepoint/docs/spfx/set-up-your-development-environment) to download optional tools and for additional informational. Learn more about the SharePoint Framework at [https://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview](https://dev.office.com/sharepoint/docs/spfx/sharepoint-framework-overview).