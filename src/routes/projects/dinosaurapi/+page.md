---
title: Dinosaur API
subtitle: Example API meant to be hosted on Googles Cloud Platform
githublnk: https://github.com/Megakuul/dinosaur-api-example
published: "03.12.2022"
mainimage: "noimage.svg"
techstack: [
    {
        icon: devicon:dart,
        name: Dart
    },
    {
        icon: logos:flutter,
        name: Flutter
    },
    {
        icon: logos:nodejs-icon-alt,
        name: NodeJS
    },
    {
        icon: skill-icons:expressjs-light,
        name: ExpressJS
    },
    {
        icon: devicon:prisma,
        name: Prisma
    },
    {
        icon: devicon:mysql-wordmark,
        name: Cloud SQL (MySQL)
    },
    {
        icon: devicon:googlecloud,
        name: Google Cloud
    },
]
---

Dinosaur API is a project made just as an example for a cloud application on Google Cloud.

## Purpose

We had to create a presentation about an IT topic in our english classes.

The topic I chose was Cloud Computing, so I wanted to create an application for example purposes.

## Implementation

For the project, I used **Dart** along with **Flutter** for the frontend. 

To implement the backend, I used **ExpressJS** on **Nodejs**. I've created a basic RESTful API that can be accessed from the frontend.

The API was connected via the **Prisma ORM**. I used **Prisma** because it's used in many well-known projects so far and it seems really easy to use.

The only thing that the API does is read and write dinosaur records to the database, they are then displayed in a column on the frontend.

For the deployment I used the **Cloud Run** service along with a database connector that connects the **Cloud SQL** storage to the service.

## Lessons Learned

In this project I have the first points of contact with APIs and general full stack applications. 

I also learned some fundamental things about cloud computing specifically in **Google Cloud**.