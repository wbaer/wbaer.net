---
title: 'Azure Machine Learning and Apple Silicon 101'
date: Sun, 24 Jan 2021 15:44:00 +0000
chapter: true
draft: false
tags: ['Apple Silicon', 'AzureML', 'Python']
---

## Getting Started

This will be the first part of multi-part series on setting up an Azure Machine Learning environment on Apple Silicon.  In this series we'll evaluate webmentions using Python and Jupyter.  I purposely chose this arrangement as it's something I've been working on over the past several weeks at https://wbaer.net.  At each part of this series, I'll explain what we're doing, why we're doing it, and what we hope to accomplish.

What prompted me to write this series was the lack of documentation, guidance, or otherwise, that doesn't assume one has a deep level of experience with any of the aforementioned.  

In this first part of the series, we'll prepare our local environment, document what we're doing, and provide background on the software/services we'll be using.

## Installing Python

The first thing we'll need to do is install Python.  Since we're working with Apple Silicon, we'll need a version specific to it - which is currently 3.9.1 at the time of writing this.  To download 3.9.1 navigate to https://www.python.org/downloads/mac-osx/ and select macOS 64-bit universal2 installer, or otherwise click https://www.python.org/ftp/python/3.9.1/python-3.9.1-macos11.0.pkg if you're in a hurry.

![Python install dialog](/images/azureml-series/py_install_screen.png#thumbnail)

As mentioned, the intent here is to provide a 100 level overview of what we're doing.  With that said, you may be asking, what is Python?  Python is a high-level, general purpose programming language.  Python is often compared to other interpreted languages such as Java, JavaScript, Perl, Tcl, or Smalltalk.

If you want to learn more, there's a great set of tutorials at https://wiki.python.org/moin/BeginnersGuide/NonProgrammers.

Now that we've successfully installed Python on our M1 we'll need to install a few certificates to wrap up.  The reason behind this is that since Python 3.6 Python no longer relies on macOS' openSSL anymore, rather it comes with its own openSSL bundled and doesn't have access on macOS' root certificates.

To complete this step and install the necessary certificates, open Terminal and enter:

<kbd>cd /Applications/Python\ 3.9</kbd>

At the prompt that follows enter:

<kbd>./Install\ Certificates.command</kbd>

The result of this operation should appear as illustrated below:

![macOS Terminal dialog](/images/azureml-series/py_certificates.png#thumbnail)

The above steps are needed to allow for Python to verify the identity of secure network connections (using its SSL root certificates).

Now that we have Python more or less installed and ready to go we need to upgrade pip (if this is a clean installation as this article assumes). You can confirm the installation by entering <kbd>python3 --version</kbd> in the Terminal.

So, what is pip? pip is a package manager for Python. That means it's a tool that allows you to install and manage additional libraries and dependencies that are not distributed as part of the standard library.  Python 3.9.1 installs pip version 20.2.3, but at the time of this writing, the current version is 21.0.

To upgrade pip, open Terminal, change directories to your Python 3.9.1 directory, and paste the following:

<samp>python3.9 -m pip install --upgrade pip</samp>

A successful upgrade should appear as follows:

![macOS Terminal dialog](/images/azureml-series/pip_upgrade.png#thumbnail)

Now when we run <kbd>python --version</kbd> in Terminal, we may see something like the following:

<samp>Python 2.7.16</samp>

and when running <kbd>python</kbd>:

<samp>
WARNING: Python 2.7 is not recommended. 
This version is included in macOS for compatibility with legacy software. 
Future versions of macOS will not include Python 2.7. 
Instead, it is recommended that you transition to using 'python3' from within Terminal.
</samp>

This is expected as earlier versions of Python where included in macOS.  To verify you have successfully installed Python 3.9.1 you can simply run <kbd>python3 --version</kbd> in Terminal.  Similarly, we'll need to run pip3 as opposed to pip.

## Installing Jupyter

OK, so we've downloaded and installed Python 3.9.1 universal.  Now we need a few more components to satisfy the intent of this tutorial, namely Jupyter.  OK, so what's Jupyter?

*“The Jupyter Notebook is an open-source web application that allows you to create and share documents that contain live code, equations, visualizations and explanatory text. Uses include: data cleaning and transformation, numerical simulation, statistical modeling, machine learning and much more.”*

*–description from Project Jupyter*

Think of a Jupyter Notebook as a document that can weave together computational information (code, data, statistics) with narrative, multimedia, and graphs. 

In the previous step we installed Python, so now we can easily install Jupyter from Python using the following:

<kbd>pip3 install jupyterlab</kbd>

![Jupyter installation dialog](/images/azureml-series/jupyter_install_screen.png#thumbnail)

If installing using <kbd>pip3 install --user</kbd>, you will need to add the user-level bin directory to your PATH environment variable in order to launch jupyter lab. For most basic installations, this won't be necessary.

If the installation is successful, you can now run <kbd>python3 -m note</kbd> in Terminal.  After running this command Jupyter will open in a new browser window at http://localhost:8888/tree which is your local notebook server.

Now to get started with Jupyter Notebooks we need to run another install.  In this scenario, we'll use miniconda which is available here for macOS https://repo.anaconda.com/miniconda/Miniconda3-latest-MacOSX-x86_64.sh. So what's miniconda and why do we need it if we have Jupyter installed?

NOTE You may be prompted to install some additional Xcode components when running the shell script above.

Miniconda is a free minimal installer for conda. Conda is an open source package management system and environment management system that runs on Windows, macOS and Linux. It is a small, bootstrap version of Anaconda that includes only conda, Python, the packages they depend on, and a small number of other useful packages, including pip, zlib and a few others which is all we need here. Think homebrew and the like.

Simply put, Anaconda is package manager. Jupyter is a presentation layer.

Now that we've hopefully have the prerequisites installed, we need to get Azure Machine Learning connected to complete our baseline and this part of the series.

To get started, we'll do a default installation of Azure Machine Learning SDK for Python, so in this case we'll install the azureml-core package using the following:

<kbd>pip3 install azureml-core</kbd>

As suggested in the name, this package contains core packages, modules, and classes for Azure Machine Learning.  The main areas include managing compute targets, creating/managing workspaces and experiments, and submitting/accessing model runs and run output/logging.

You can learn more here https://docs.microsoft.com/en-us/python/api/overview/azure/ml/install?view=azure-ml-py.

That's it for this first part of the series.  If all went well you should have your local development environment set up successfully on your M1.  In the next part of this series, we'll wire up our Azure Machine Learning connection, parse some remote JSON with Python, and work our way into evaluating relationships and more with webmention data.