# Considerations for use of the extension when signing into multiple accounts.

## Introduction

The Tasks extension has two distinct components.

The first is the use of the Tasks API (and OAuth) to create tasks via the Chrome Omnibox or context menu.
The second is the Tasks iGoogle gadget, loaded into popup.html which is displayed when the Tasks icon is clicked on.

As a result, when using multiple Google accounts simultaneously in the same browser it is possible that these two separate components are acting upon two different accounts.

## Multilogin

When first installing the extension the user authorizes the extension to interact with the user's tasks.

When clicking the Tasks icon the iGoogle gadget loads and displays a task list. In the case of a user who is signed into multiple Google accounts this is the task list of the first logged in user. This is the username or profile that appears at the top of the screen when visiting http://www.google.com

It is therefore possible to be in a state where the tasks displayed by clicking the Tasks icon, and the tasks added via the Omnibox end up in different authenticated user's task lists.

## Future

A solution to this is to implement the iGoogle gadget via the Tasks API. Submissions to this project that do so are welcome.
