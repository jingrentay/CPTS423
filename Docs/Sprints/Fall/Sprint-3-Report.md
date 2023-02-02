# Sprint 3 Report (11/9/22 - 12/9/22)

## What's New (User Facing)
We have added various features and components that have brought us closer to the desired web app.

* Ability to add and delete tasks through a popup when creating a project.
* Added aggressive duration and predicted time fields into project completion form.
* Connected Fever Chart to data loaded from database and showed it only for "in progress" projects.
* The separation of "in progress" and "in planning" tabs.

## Work Summary (Developer Facing)
The new code changes added include: 

* Ability to edit projects in the database from the "in planning" tab.
* Test cases to check get and post requests.
* Calculation of aggressive time duration for individual tasks.
* API functionality to get projects from the database according to their project stage.

## Unfinished Work

The issues we worked on but did not finish include adding user roles and authentication. We also did not implement the ability to create user accounts, add functionality to prioritize tasks, or implement functionality to calculate work hours, aggressive duration, or predicted completion. 

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/18
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/28
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/37
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/39
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/42
 
 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:

* We did not get to this issue because it first requires some calculation functions to be completed: https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/44.
* We ran into a complication and were not able to complete the issue for this sprint. It will be handled in the next sprint: https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/19.

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:

 * [ProjectFormPage.js](https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/blob/main/VPMApp/client/src/pages/Projects/ProjectFormPage.js)
 * [project.js](https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/blob/main/VPMApp/server/controllers/project.js)
 * [projectSlice.js](https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/blob/main/VPMApp/client/src/features/projectSlice.js)

## Retrospective Summary

Here's what went well:
 * Implemented and ran test code.
 * Implemented the proper functionality for the "view" and "edit" pages for projects.
 * Completed all necessary deliverables for writing assignments and sprints. 

Here's what we'd like to improve:
 * Schedule meetings to solve software issues/bugs together so that we are on the same page.
 * Increased progress each week to show our client in weekly client meetings.
 * Improve ability to multitask and better communication amongst team members.

Here are changes we plan to implement in the next sprint:
 * Task priority list.
 * Display single fever chart for each individual project.
 * Pipeline for creating and starting a project to archive.
 * Proper calculations for project and task hours.

