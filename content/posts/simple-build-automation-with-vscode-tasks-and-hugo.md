---
title: 'Simple build automation with Visual Studio Code and Hugo'
date: Tue, 12 Jan 2021 01:59:52 +0000
draft: false
tags: ['Hugo', 'Go', 'Visual Studio Code', 'VSCode']
---
Over the past month or so I've been working more and more with Hugo as I rebuild and consolidate my old dynamic sites (see https://wbaer.net/2020/12/going-static/).  At the onset I had initially elected Nova App as my preferred editor of choice, but most recently have started using Visual Studio Code.  With Nova I had a shell script I would run in Terminal (macOS) when developing my site, but now that I'm using Visual Studio Code I decided to use tasks.  While I could simply call my original shell script from a task, I wanted to keep everything in one place - at the end of the day as opposed to running something separately via the command line, I wanted to automate jobs inside the inner software development loop (edit, compile, test, and debug).  While not complicated by any means, I thought I would share the custom task I use with Hugo in the event someone out there finds it helpful.  It's not perfect by any means, but serves its intended purpose.  In the script below I have 3 core tasks, cleaning the results (output) of previous builds, compiling my Saas, and lastly generating my site.

Clean Build simply forces recursive deletion of the default Hugo output folder, public, that was generated as a result of previous builds.

Compile Saas as suggested, compiles my Saas.  I've broken it down into two arguments in the event I decide in the future to change input/output directories or add addtional arguments to the command; otherwise, I could have passed the command and related argumements within the command itself.

Build Site generates my site by calling the hugo command with the following arguments: server to insitate a new instance of the hugo server, disables Fast Render which means the site is always rebuilt on change, and lastly disables HTTP cache so I'm always presented with a relatively "fresh" copy of my site on rebuild.

        {
            "version": "2.0.0",
            "tasks": [
                {
                    "label": "Clean Build",
                    "type": "shell",
                    "command": "rm -rf public",
                    "isBackground": true,
                    "problemMatcher": []
                },
                {
                    "label": "Compile Saas",
                    "type": "shell",
                    "command": "sass",
                    "args": [
                        "assets/css/style.scss",
                        "assets/css/style.css"
                    ],
                    "isBackground": true,
                    "problemMatcher": []
                },
                {
                    "label": "Build Site",
                    "type": "shell",
                    "command": "hugo",
                    "args": [
                        "serve",
                        "--disableFastRender",
                        "--noHTTPCache"
                    ],
                    "isBackground": true,
                    "problemMatcher": []
                },
                {
                    "label": "Build",
                    "type": "shell",
                    "dependsOrder": "sequence",
                    "dependsOn": ["Clean Build", "Compile Saas", "Build Site"],
                    "group": {
                        "kind": "build",
                        "isDefault": true
                    },
                    "isBackground": true,
                }
            ]
        }

So why Visual Studio Code over Nova App?  Don't get me wrong, Nova is an awesome, powerful editor and I use other Panic apps like Transmit and Prompt, and I'd highly recommend it.  Its UX is clean and intuitive and it has a array of useful features, extensive library of extensions, and just feels "natural" on the Mac, but like my decision to move to static from dynamic - more was there than what I was using.  The simplicity of Visual Studio Code provides everything I need at the moment and I actively use it for unrelated projects so it's become more or less part of my goal to consolidate where I can; otherwise, if you're on a Mac and looking for a great editor I'd highly recommend Nova.  Check it out at https://nova.app.

Now onto Tasks in Visual Studio Code...  This is probably old hat for many, but for those who are new here's a brief explainer...

Coming back to my earlier objective, I wanted to be able to automate jobs inside of my loop - mitigating the need to maintain separate processes and context switching... so enter tasks.  Tasks in Visual Studio Code can be configured to run scripts and start processes so that many of these existing tools can be used without having to enter a command line or write new code. In my case the specific task is configured from the tasks.json file in the .vscode folder for my workspace.

Basically I have the 3 tasks previously mentioned, set to run in the background.  While I've ordered and grouped the tasks chronologically as I expect them to execute - this isn't handled automatically - the last set of instructions is designed to do that (dependsOrder).

"dependsOrder": "sequence" specifies that task dependencies are executed in the order they are listed in dependsOn. Any background/watch tasks used in dependsOn with "dependsOrder": "sequence" needs to have a problem matcher that tracks when they are "done" (as specified in the above). The above task runs task 1, task 2, and then task 3, albeit I could've ordered them differently and the sequenced them in the order I want them to run, e.g. ordered as Build, Cleanup, and Compile, but run as Cleanup, Compile, and then Build.

This is a super simple example of tasks and you can learn more here https://code.visualstudio.com/docs/editor/tasks.  As with all posts here, you can click the code icon at the top of the page and suggest an edit via GitHub.