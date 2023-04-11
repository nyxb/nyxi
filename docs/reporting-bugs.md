# Reporting Bugs

One of the most valuable roles in open source is taking the time to report bugs helpfully.

Try as we might, we will never completely eliminate bugs.

Even if you can't fix the underlying code, reporting a bug well can enable someone else with a bit more familiarity with the codebase to spot a pattern or make a quick fix.

Here are a few key steps.

## Is It Really a Bug?

Consider if you're looking to get help with something, or whether you think there's a bug with @tyck itself. If it's the former, we'd love to help you - but the best way to do that is through [asking for help](/docs/getting-help.md) rather than reporting a bug.

## Search the Issues

Search through the [open issues](https://github.com/nyxb/nyxi/issues) and [discussions](#) first. If you find anything that seems like the same bug, it's much better to comment on an existing thread than create a duplicate.

## Create a Minimal Reproduction

It's important to be able to reproduce the bug reliably - in a minimal way and apart from the rest of your project. This narrows down what could be causing the issue and makes it possible for someone not only to find the cause, but also to test a potential solution.

Start with the node.js and add the **minimum** amount of code necessary to reproduce the bug you're experiencing.

**@nyxb/nyxi**:

[@nyxb/nyxi on StackBlitz](https://node.new/)

[@nyxb/nyxi on CodeSandbox](https://codesandbox.io/p/sandbox/fervent-lehmann-vnx6nj?file=README.md)

Once you've reproduced the issue, remove as much code from your reproduction as you can (while still recreating the bug). The time spent making the reproduction as minimal as possible will make a huge difference to whoever sets out to fix the issue.

## Figure Out What the Cause Might Be

With a @tyck project, there are lots of moving pieces - from [other JavaScript libraries](https://www.npmjs.com/). It's important to figure out what the cause of the bug might be.
