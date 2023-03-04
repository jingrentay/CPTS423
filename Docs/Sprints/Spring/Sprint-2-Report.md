# Sprint 2 Report (3/2/23)

## What's New (User Facing)

* Feature 1: Task Priority List - Tasks can now be shown in order of their priorities on the in progress tab
* Feature 2: Task Duplication - A task can get duplicated so that it have same tasks and time durations
* Bug fix : Accepting decimal values-Time durations now accept decimal values

## Work Summary (Developer Facing)

In Sprint 2, we were able to establish a database for basic account details such as emails, passwords, organizations and were able to achieve some level of authentication, but more will be desirable to be made for the upcoming sprint. We did some fine-tuning on the project in general by adding more small features combined to make the user experience to be more complete in general. For example, now users are able to edit tasks and see the tasks info together with color coded features to ensure the user understands where their project is at. Warnings, task priority lists were also added as the client requested us to add them in order to complete the necessary features in VPM. In the next sprint, we will be focusing more on user authentication and creating a more robust database together with website hosting so that the actual project can be published on an actual website and be used in the future.

## Unfinished Work

We have not yet completed the unique IDs for tasks, projects, and users. We also have not yet completed user authentication with tokens preventing unauthorized users from accessing information and pages if they are not authorized. The next step after this will be to allow users to create organizations and assign user roles. Users should only be able to access features they are authorized to use based on their role. 

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/70
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/64
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/63
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/71
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/67
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/80
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/68
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/69
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/83
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/74
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/86
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/73
 
## Incomplete Issues/User Stories
Here are links to issues we worked on but did not complete in this sprint:

* We did not get to this issue because we focused on warnings and login: https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/90
* We ran into an unexpected complication regarding authorization: https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/87
* We did not get to this issue because it will first require authentication and more research to implement: https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/88

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:

 * [accountSlice.js](https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/blob/main/VPMApp/client/src/features/accountSlice.js)
 * [account.js](https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/blob/main/VPMApp/server/controllers/account.js)
 * [ProjectFormPage.js](https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/blob/main/VPMApp/client/src/pages/Projects/ProjectFormPage.js)

## Retrospective Summary

Here's what went well:

* Began work on user accounts and authentication
* Finished work on duplication and warnings
* Color-coded archives, tasks and task priorities implemented

Here's what we'd like to improve:

* Testing and figuring out unit test cases
* Figure out user authentications, roles and organizations
* Figure out hosting plans

 Here are changes we plan to implement in the next sprint:
 
* More coding sessions as a team
* Calculation of work hours
* Established level of user functionalities based on level of roles
