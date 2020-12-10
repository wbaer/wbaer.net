---
title: 'A primer in machine reading comprehension'
date: Thu, 05 Dec 2019 21:33:59 +0000
draft: false
tags: ['AI', 'Microsoft Search', 'MRC', 'Semantic Search']
---

If you’ve been following the various news and announcements from Microsoft on Microsoft Search at events like Build and Microsoft Ignite, you’ve probably come across a demo or two on Machine Reading Comprehension (MRC). For example, a search for “Can I bring my dog to work?” in Microsoft Search in Bing.

Let’s explore what MRC is…

In brief, MRC is the ability to read and understand unstructured text and then answer questions about it or effectively algorithms that can learn to answer questions about new documents with limited amounts of training data, incorporate common sense, and leverage external knowledge about the world. Our primary goal is questioning-answering in the real world: we envision an experience where getting the answers you need to complex questions about your documents is simple, effective, and intuitive.

In 2018 [we shared an article](https://blogs.microsoft.com/ai/microsoft-creates-ai-can-read-document-answer-questions-well-person/) describing how Microsoft researchers have created technology that uses artificial intelligence to read a document and answer questions about it about as well as a human.

It’s a major milestone in the push to have search engines such as Bing and intelligent assistants such as Cortana interact with people and provide information in more natural ways, much like people communicate with each other.

For example, today, you can ask Bing a question such as “how long does coca-cola last?”, and get an answer most appropriate to the question asked… but it’s more than that…

A key, additive component of most MRC models is semantic understanding. For example, using the question above, using semantic understanding, search retrieves documents on “soda”. Traditional search experiences would conversely do keyword matching and simply attempt to find one or more documents or articles that have “coca-cola” in them. However, using deep learning, search engines such as Bing, understand that Coca-Cola is a soda, and retrieves related documents and articles (even though it doesn’t have word “Coca-Cola” in it) that satisfies the user’s intent.

![Semantic Search Quick Shot.2019-12-04 11_46_27](https://wbaer.files.wordpress.com/2019/12/semantic-search-quick-shot.2019-12-04-11_46_27.gif)

_Above, Machine reading comprehension and semantic understanding in Microsoft Search_

To summarize, in search applications, machine comprehension will give a precise answer rather than a URL that contains the answer somewhere within a lengthy web page. Moreover, machine comprehension models can understand specific knowledge embedded in articles that usually cover narrow and specific domains, where the search data that algorithms depend upon is sparse.

To learn more about deep learning and MRC refer to the articles below:

[Machine Reading Comprehension](https://www.microsoft.com/en-us/research/project/machine-reading-comprehension/)

[Microsoft creates AI that can read a document and answer questions about it as well as a person](https://blogs.microsoft.com/ai/microsoft-creates-ai-can-read-document-answer-questions-well-person/)

[Deep learning and machine reading comprehension](https://www.microsoft.com/en-us/research/project/deep-learning-machine-reading-comprehension/)