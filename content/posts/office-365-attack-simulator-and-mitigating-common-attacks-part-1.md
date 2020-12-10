---
title: 'Office 365 Attack Simulator and Mitigating Common Attacks (Part 1)'
date: Mon, 26 Mar 2018 19:10:58 +0000
draft: false
tags: ['Attacks', 'Brute-Force', 'Office 365 Attack Simulator', 'Passwords', 'Phishing', 'Security', 'Security and Compliance']
---

When it comes to security your best line of defense is one that is reactive versus one that is proactive; however, how do you know how you’ll respond to a security incident if one hasn’t yet to occur…that’s where Attack Simulator in Office 365 shines, it’s what sets the security solutions we provide apart from other cloud services. Attack Simulator is designed to put you ahead of curve and keep you in front of the proverbial 8 ball.  With Attack Simulator you can run realistic attack scenarios in your organization. This can help you identify and find vulnerable users before a real attack impacts your bottom line. In brief, Attack Simulator as a component of Office 365 Security and Compliance is designed to help you identify issues _before_ they become an issue.  It allows you to determine how end users behave in the event of an attack, and update policies to ensure that appropriate security tools are in place to protect your organization from threats.

Getting Started
===============

Attack Simulator is available as Preview in Office 365 E5 Plans.  The Preview version of Attack Simulator allows you to simulate:

*   Display name spear-phishing attacks
*   Password-spray attacks
*   Brute-force password attacks

To skip ahead and learn how to get started with Attack Simulator visit [https://support.office.com/en-us/article/attack-simulator-office-365-da5845db-c578-4a41-b2cb-5a09689a551b](https://support.office.com/en-us/article/attack-simulator-office-365-da5845db-c578-4a41-b2cb-5a09689a551b).

Display Name Spear-Phishing Attacks
===================================

Spear-phishing attacks are designed to play on the trust of a user or users.  The most common spear-phishing attacks involve some level of sophistication, such as understanding influencers within an organization that generate trust amongst potential recipients of email from that individual. Using Attack Simulator you can simulate this type of attack by creating messages that appear to have originated from such individuals by changing the display name and source address. The most common objective by bad actors when implementing spear-phishing attacks are to gain access to users' credentials. In addition to leveraging the email sender (display name) and body, attackers will also use document phishing to lure users into passing their credentials such as sending spam emails to many harvested email addresses. These spam emails may contain content that tries to lure the user into clicking on the provided link or opening the provided attachment. As the victim of a phishing attack, the user may be directed to a legitimate-looking website that masquerades as an online bank or corporate mail service to steal user credentials. These credentials may then be captured on the masquerading web server.

Protect Users from Phishing/Spear Phishing with Office 365 Advanced Threat Protection
-------------------------------------------------------------------------------------

Office 365 Advanced Threat Protection allows you to configure anti-phishing policies to protect your users. The anti-phishing capabilities with ATP applies a set of machine learning models together with impersonation detection algorithms to incoming email messages that provides protection for both spear and commodity phishing attacks. All messages are subject to an extensive set of machine learning models trained to detect phishing messages, together with a set of advanced algorithms used to protect against various user and domain impersonation attacks. Learn more on using ATP to prevent phishing attacks at [https://support.office.com/en-us/article/atp-anti-phishing-capabilities-in-office-365-5076d0f6-7a59-4d6c-bd07-ba95033f0682?ui=en-US&rs=en-US&ad=US](https://support.office.com/en-us/article/atp-anti-phishing-capabilities-in-office-365-5076d0f6-7a59-4d6c-bd07-ba95033f0682?ui=en-US&rs=en-US&ad=US). ATP capabilities such as Spoof Intelligence and Safe Links/Safe Attachments can also be used to further protect users from impersonation, malicious hyperlinks in a message, and malware and viruses. For a complete list of protected scenarios refer to the ATP service description at [https://technet.microsoft.com/en-us/library/exchange-online-advanced-threat-protection-service-description.aspx](https://technet.microsoft.com/en-us/library/exchange-online-advanced-threat-protection-service-description.aspx). In addition, consider adding DKIM (DomainKeys Identified Mail) signatures to your domains so recipients know that email messages came from users in your organization and weren't modified after they were sent to help protect both senders and recipients from forged and phishing email. Learn more about DKIM at [https://technet.microsoft.com/en-US/library/ms.exch.eac.DKIMDisabled(EXCHG.150).aspx?v=15.20.609.10&l=1&s=BPOS\_S\_E15\_0](https://technet.microsoft.com/en-US/library/ms.exch.eac.DKIMDisabled(EXCHG.150).aspx?v=15.20.609.10&l=1&s=BPOS_S_E15_0).

Password-Spray Attacks
----------------------

Password-spraying is a method of attempting to login with only one password across all domain accounts.  It's an alternative to brute-force password attacks that is designed to mitigate account lockouts where a lockout threshold is in place. This allows an attacker to attempt many more authentication attempts without locking out users. For example, if I were to attempt to login to every account with the password ‘pass@word1’ it is very likely (hopefully not ;-)) that someone at the target organization used that password and I will now have access to their account. Simplified, password-spraying is essentially a reverse brute-force attack in that as opposed to attempting many password attempts against a single known user, it involves a single, strategic password, used across many known users. In the Microsoft cloud we handle billions of sign-ins each day and our security detection algorithms allow us to both detect and subsequently block attacks such as these in real-time. Some of these capabilities include:

### Smart Lockout

Azure Active Directory (Azure AD) protects against password attacks with Smart Lockout.  Smart Lockout differentiates between sign-in attempts that look like they’re from a valid user and sign-ins from what may be an attacker. Smart Lockout ensures potential attackers are locked out without impacting a valid user which helps to prevent denial of service on the user and stops password spray attacks.

### IP Lockout

IP lockout works by analyzing sign-ins to assess the quality of traffic from each IP address hitting Microsoft systems, using that data, IP lockout finds IP addresses acting maliciously and blocks those sign-ins in real-time.

Password-Spray Attack Prevention
--------------------------------

A password is the key to accessing an account, but in a successful password spray attack, the attacker has guessed the correct password.  The best solution to mitigating password spray attacks is using something more than just a password to distinguish between the account owner and the attacker. For example:

### Implement Multi-Factor Authentication

Azure AD Identity Protection uses sign-in data and adds on advanced machine learning and algorithmic detection to risk score every sign-in that comes in to the system. This enables you to create policies in Identity Protection that prompt a user to authenticate with a second factor if and only if there’s risk detected for the user or for the session. Learn more about Azure AD Identity Protection at [https://docs.microsoft.com/en-us/azure/active-directory/active-directory-identityprotection](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-identityprotection). For an additional layer of security, you can use Azure MFA to require multi-factor authentication for your users all the time, both in cloud authentication and ADFS. Learn more about Azure Multi-Factor Authentication at [https://docs.microsoft.com/en-us/azure/multi-factor-authentication/multi-factor-authentication](https://docs.microsoft.com/en-us/azure/multi-factor-authentication/multi-factor-authentication), and how to configure Azure MFA for AD FS at [https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/configure-ad-fs-and-azure-mfa](https://docs.microsoft.com/en-us/windows-server/identity/ad-fs/operations/configure-ad-fs-and-azure-mfa).

### Azure MFA as primary authentication

In AD FS 2016, you have the ability use Azure MFA as the primary authentication means for passwordless authentication which helps to protect against password-spray and theft attacks.  Using Azure MFA as primary authentication bypasses the need for a password which means there is no password for an attacker to guess.  With Azure MFA you can also use a password as the second factor only after your OTP has been validated with Azure MFA. Learn more about using password as the second factor at [https://github.com/Microsoft/adfsAuthAdapters](https://github.com/Microsoft/adfsAuthAdapters).

Brute-Force Password Attack
---------------------------

Perhaps one of the more archaic attacks, brute-force attacks consist of an attacker trying many passwords or passphrases with the hope of eventually guessing correctly. The attacker systematically checks all possible passwords and passphrases until the correct one is found.

### Brute-Force Password Attack Prevention

Like password-spray attacks you can take advantage of the same recommendations (above) in addition to detection and handling through capabilities such as Cloud App Security. Cloud App Security is a comprehensive solution that can help you as you move to take advantage of cloud applications, but keep you in control, through improved visibility into activity and increase the protection of critical data across cloud applications.  Cloud App Security provides tools that help uncover shadow IT, assess risk, enforce policies, investigate activities, and stop threats, to help you more safely move to the cloud while maintaining control of critical data. Through Office 365 Cloud App Security you can, for example, use the **Multiple failed user log on attempts to an app** policy template to be alerted when a single user attempts to log on to a single app, and fails more than _n_ times within a defined number of minutes. Learn more about Cloud App Security at [https://docs.microsoft.com/en-us/cloud-app-security/what-is-cloud-app-security](https://docs.microsoft.com/en-us/cloud-app-security/what-is-cloud-app-security). Lastly, enforcing strong passwords and account lockout policies can help to mitigate brute-force attacks.  For more information see also [https://docs.microsoft.com/en-us/azure/active-directory/active-directory-passwords-policy](https://docs.microsoft.com/en-us/azure/active-directory/active-directory-passwords-policy).

Conclusion
==========

Your security is only as good as what you put into it.  Using Attack Simulator you can better understand how your users will react and then implement the best set of solutions to ensuring both your organizations', as well as your users' security.  While this article is not intended to provide a comprehensive view of all of the security options available in Office 365, it helps map those capabilities to the simulations available in Attack SimulatorTo learn more about Attack Simulator visit [https://support.office.com/en-us/article/attack-simulator-office-365-da5845db-c578-4a41-b2cb-5a09689a551b?ui=en-US&rs=en-US&ad=US](https://support.office.com/en-us/article/attack-simulator-office-365-da5845db-c578-4a41-b2cb-5a09689a551b?ui=en-US&rs=en-US&ad=US). Office 365 to include SharePoint Online and OneDrive for Business provide a broad set of control to help keep your data safe no matter where users are when they access or share data, what device they’re working on, and how secure their network connection is. Through these controls you can customize the level of access granted to users while making sure the resulting constraints meet your organizational security requirements. For additional information on protecting yourself against threats in Office 365 refer to [https://support.office.com/en-us/article/protect-against-threats-in-office-365-b10023f6-f30f-45d3-b3ad-b71aa4aa0d58](https://support.office.com/en-us/article/protect-against-threats-in-office-365-b10023f6-f30f-45d3-b3ad-b71aa4aa0d58).  This article will help you protect your organization against a variety of threats, including spoofing, malware, spam, phishing attempts, and unauthorized access to data. Next up, Part 2 Using Attack Simulation and Configuring Security Options...