---
title: "Cooking Lock"
description: "You need an simple, unfair and time-released lock that doesn't require an atomic swap? Use the cooking lock."
published: "06.01.2025"
mainimage: "cooking-lock.webp"
---


# Let the lock cook

To avoid confusion among the audience, I will henceforth use the term "chef" when I mean "process".


You need a simple, unfair and time-released lock that doesn't require an atomic swap? Use the cooking lock.
The cooking lock is a concept that builds a synchronisation lock with just one ingredient: An atomic `set-and-get` operation. 

Now, you might ask, "Am I an idiot sandwich chef?" Yes. But let's see how the lock works. To craft the lock, you must just own one single field holding a string:

```
/COOKING = ""
```

This lock can now be locked by simply inserting a unix timestamp of `now() + 5seconds`. This will give your chef (referred to as "chef A") 5 seconds to do cook.

```
/COOKING = "<in5seconds>"
```

If another chef (referred to as "chef B") contests the cooking lock after you already entered your cooking time, the other chef updates the lock to its own time, but will respectfully let you cook, waiting until their own defined cooking time is over. Unfortunately, this kitchen schedule has a flaw: if chef A cooks from `8:00-9:00` and chef B enters his cooking time from `8:30-9:30`, there is an infinite delay... If chef A is done with his cooking at 9:00, he checks the plan and schedules his next cooking from `9:00-10:00` because both chefs are respectful and both understand that at 9:00 one of them is cooking; they don't cook both.

To solve this problem, every chef is required to "peek" the kitchen schedule before entering their cooking time. Peeking the schedule must not be atomic; it is only there to avoid a chef entering his cooking time inside the range of another one's cooking time. Because the operation is not atomic, chefs can still overlap their cooking time in a timespan between the "peek" and "committing the cooking time"; however, they won't end up in the infinite loop as in the next iteration every chef will again only start committing AFTER the cooking time of the current chef (due to the peek).

The infinite loop only occurs because chefs commit their time WHILE someone is cooking which is not allowed. By starting to commit just AFTER the cooking, at least ONE chef will take the kitchen for himself (which is just the fastest chef).

<center>
  <img alt="cooking lock explanation" src="/images/cooking-lock-kitchen.png">
</center>

This algorithm is not fair, simply because after peeking, all chefs know the exact same time to commit; the only thing that matters is therefore which chef commits the fastest. So be cautious and only use the cooking lock if it doesn't matter which and how often a chef cooks.

Also note that this lock is not for general purpose (it's totally overengineered for that) but rather for a specific use case: in cluster scenarios where anything can fail at any time, the cooking lock provides a way to ensure every X timespan a service from the cluster does a certain job. It ensures that A) only 1 service does the job at a time and B) that if this service fails, the maximum downtime of the job is X.