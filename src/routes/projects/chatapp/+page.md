---
title: Chatapp
subtitle: Super simple Chatapp, example to host on AWS
githublnk: https://github.com/Megakuul/chatapp
published: "27.01.2023"
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
        icon: logos:aws-rds,
        name: RDS MySQL
    },
    {
        icon: logos:terraform-icon,
        name: Terraform
    },
    {
        icon: logos:kubernetes,
        name: Kubernetes
    },
    {
        icon: logos:aws,
        name: AWS
    }
]
---

The Chatapp is a simple example to deploy on AWS with Terraform.

## Table of Contents

## Purpose

The goal was to create an example application that can be deployed on AWS with Infrastructur as Code.

## Implementation

I implemented this project by creating a easy to use **ExpressJS** REST API with **NodeJS**.

The **Node API** accesses the **RDS MySQL** database, where it just works with to simple tables, one for the chatrooms and one for the messages.
The messages are always tight to a chatroom, that can be accessed through a code.

The frontend is as simple as the API, I wrote it with **Dart** and the **Flutter** Framework. I chose this, simply because I am able to complete the task quickly with it.

For deploying the application, I've created a **Terraform** script with a friend of mine. The **Terraform** script creates a **EKS** cluster alogn with a **RDS** database. To deploy the application on **EKS** I also created some **Kubernetes** manifests.

## Lessons Learned

I gained a lot of knowledge about **AWS** services, especially about the **EKS** service and **Kubernetes** itself.

I'd prefer a key-value database for such straightforward endeavors, as it's both less-complex and costly.
