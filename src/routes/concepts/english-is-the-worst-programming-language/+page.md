## Vibecoding is not the future

I want to make this clear: "vibe coding", "agentic coding", "<replace with whatever marketing term comes next>" does not solve the fundamental problem we solve with coding.

So let's define what "coding" means. I define coding as a process that forms from two questions:
- **WHY**: Why do I need the end result?
- **WHAT**: What is the end result?

Usually this process starts with an imprecise **WHAT** (an idea), gets a **WHY** definition, and finally ends up in a **WHAT** different from the original idea.

To answer those questions we need to express them somehow. In modern systems this is often done like this:
- **WHY**: Documentation (e.g. situation analysis, business case, ... depending on the project management system)
- **WHAT**: Code (e.g. Go, C++, Rust, JavaScript, ...)

(Looking closely at the code, you can also notice that you can further split *good* comments (WHY) from code (WHAT))

Now if we convert this into a "vibecoded" application, this would change:
- **WHY**: Documentation (e.g. situation analysis, business case, ... depending on the project management system)
- **WHAT**: Intent description for the LLM (aka prompt)

Many LinkedIn gangsters try to sell you this as a normal jump in how we describe the **WHAT**, similar to how it already happened when we went from writing raw assembler code to C, or when we went from C to Go...

This conclusion is wrong: unlike the previous abstractions we created, **Intent** -> **Programming Language** is not deterministic and not **falsifiable**. Two people, two LLMs, two aliens could look at the same **Intent** description and would eventually NOT generate the same result.

And now I have an important question for you: **What do you believe is the hard part in coding?**

It is not writing code, it is writing code in a way other people can still understand!

I would even go so far as to say that writing *good code* takes over 10x the time compared to just slamming it out as fast as possible.

To get back to the AI topic: imagine multiple people have to build the **WHAT** together... they need to understand each other's top level language. However, the top level language is now **Intent**, and if you have ever worked with humans you have probably noticed that most of them are notoriously bad at communicating EXACTLY what they mean via the English language (which is now our top level language).

So while it seems very cool to write the **WHAT** in our native language without further technical knowledge, I believe it will be a mess for any engineer who needs to understand what you meant with your English intent 5 years ago.

There are already suggestions for this problem as well: for example, you could just argue that the **WHAT** / top level language stays the actual code and the LLM merely helps you write it. Now, while I cannot prove it, I'd argue that going down this path means that in the future people won't actually learn the underlying concepts (I mean, what is the appeal? They can just ask the LLM about any problem). As soon as people stop learning "underlying concepts", the "code" slowly starts to turn into binary artifacts (similar to what happened with assembly output from compilers).

At this point people will go back to intent-based **WHAT** (e.g. by asking the LLM what the existing code does), which comes with the mentioned co-work ambiguity problem.

**So what is the better alternative?**

I don't want to be a grumpy old "back in my day we programmed like real men" guy, so what do I believe would be a better alternative?

Well, I'm not against abstraction as long as it is deterministic and falsifiable, so a good evolution in my eyes would be higher level languages that solve specific problems and come with batteries included to avoid confusion about external dependencies.

A workflow-based system is also an alternative, where people simply connect work steps (like Scratch) instead.
