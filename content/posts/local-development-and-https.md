---
title: 'Installing mkcert on Apple Silicon using brew'
date: Thu, 26 Jan 2021 23:08:03 +0000
draft: false
tags: ['SSL', 'Go', 'Apple Silicon', 'Development']
---

On occassion you'll want or need to run your local development environment/site with HTTPS.  For example, if your production site uses HTTPS, you may want your local development site to behave like an HTTPS site.  I for one, like to aggressively diagnose any issues early in the development process before committing changes to production.

Simply put, if you would like to use HTTPS with your local development site and access https://localhost or https://somedomain.com, you'll need a TLS certificate.  While as simple as it may sound, most browsers won't consider just any certificate valid -  your certificate needs to be signed by an entity that is trusted by your browser, called a trusted certificate authority (CA).

In order to mitigate this issue, what we'll need to do is to create a certificate and sign it with a CA that is trusted locally by your device and browser. [mkcert](https://github.com/FiloSottile/mkcert) is the perfect solution that helps you do this in a few commands. 

In this scenario, we'll install mkcert via brew on Apple Silicon.  While no different than installing on an Intel machine, you'll likely encounter an issue where [brew](https://brew.sh) fails at bottle installation.  In the event you encounter this issue, it's not a big deal as brew will subsequently revert to building from source - the caveat being that it will be built from a beta version of the Go compiler for Apple Silicon.

The first step in getting mkcert setup is to install it.  To install mkcert using brew we can simply run the following in Terminal on macOS:

    brew install mkcert

As mentioned above, you'll like see a bottle installation warning that can be safely ignored as it will just build from source in the event this issue is encountered.

Once installed, the next step is generate some certificates.  For example, in my use case, we'll run the following:

    mkcert wbaer.net "*.wbaer.net" localhost 127.0.0.1 ::1

It's important to note that while the certificates will be created for the domains specified, the local CA is not installed in the system trust store.  To install the local CA on the system trust store we need to run more one command in Terminal for certificates to be trusted automatically:

    mkcert -install

Now that we've created our certificates, what happens next:

- When opening your local, development environment (e.g. when running hugo server or netlify dev), your browser will check the certificate of your local development server.
- Once it sees that the certificate has been signed by the mkcert-generated certificate authority, the browser checks whether it's registered as a trusted certificate authority.  
- mkcert is listed as a trusted authority, so your browser trusts the certificate and creates an HTTPS connection.

The benefits of mkcert include:

- mkcert is specialized in creating certificates that are compliant with what browsers consider valid certificates. It stays updated to match requirements and best practices. This is why you won't have to run mkcert commands with complex configurations or arguments to generate the right certificates!
- mkcert is a cross-platform tool. 

While a brief walkthrough, that's all that's needed to get up and running with HTTPS in your local development environment.