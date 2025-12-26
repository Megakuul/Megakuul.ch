---
title: "Unit Tests 4 President"
description: "As professional unit test hater I radically changed my mind."
published: "06.01.2025"
mainimage: "cooking-lock.webp"
---


# The holy grail

For several years I was very critical with unit tests, when writing them myself it literally drained my development speed, often they had almost no use and especially for software that is not banking-level critical it just felt superior to do some tactical small e2e tests (if at all).

In the last weeks I however radically changed my opinion about this. The reason beeing work on a large bulky go codebase where every function drilled down several huge structs, interfaces and contexts. The complexity to refactor or update this madness is literally equal to the development of a nuclear reactor or a AngularJS->Angular2 Migration (to be fair it wasn't thaaat bad in reality). We ended up building it ultimately from scratch and I used unit test AND I FEEL GREAT. 

The reason why I suddenly changed my mind about unit tests is not because I see their necessity as tests, to me I still feel as TESTS they are overengineered for most tasks and are only useful in very specific scenarios. BUT what they are absolutely is preventing this drilldown mess in a shared codebase, unit tests make your code automatically more modular and following best practices just by preventing someone to write functions that accept 500 different drilldowned inputs because when writing the unit test they do not know how to even get the data for it...