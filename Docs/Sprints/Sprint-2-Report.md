# Sprint 2 Report (10/9/22 - 11/9/22)

## What's New (User Facing)

There have added various features and components that have brought us closer to the desired web app.

*  We now have a fully functional database with which we are able to send and receive data between MongoDB and the React app. The "create project" page, edit page, and view pages function such that a user can create, view, and edit a project with the correct data from the database.
* A Login page and an Archive page, as well as tabs for "In Planning" and "In Progress" projects, have been added.
* A Fever Chart with hardcoded data and the correct color scheme has been added. 

## Work Summary (Developer Facing)

First, we created the “create project” form page, and then connected the form to MongoDB through our api and backend. We managed to connect them so the data from created projects is stored within the database. Our projects homepage is divided into the “In Planning”, and “In Progress” tabs. For all the projects, we created a view page and edit page. For the view page, we set the field values to be “view only” and we displayed the values from the database. For the edit page, we get the project from the database and allow users to edit the fields. In order to save the edits, we created multiple functions and used the patch operation to update the new values into the database. There are some barriers that we overcame during Sprint 2. We needed to connect the frontend with the backend and figure out how to get a single project by its ID for viewing and editing purposes. We needed to figure out now to update project values with new values in the database. We also needed to restructure our redux code to correctly set up the central state/store for using variables in the UI. 

## Unfinished Work

The issues we worked on but did not finish include deleting a project from the database and the ability to create tasks for a project. These will be handled in Sprint 3. We will continue to improve the view/edit pages to display the correct user input fields, work on the functionality to create, start, and finish a project with tasks, and display the project data on the Fever Chart. 

## Completed Issues/User Stories
Here are links to the issues that we completed in this sprint:

* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/3
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/13
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/14
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/25 
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/16
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/26
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/27
* ​​https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/31
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/33
* https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/34
 
 ## Incomplete Issues/User Stories
 Here are links to issues we worked on but did not complete in this sprint:

* We did not get to this issue because it first requires setting up some routes and schemas for the project tasks: https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/28.
* We ran into a complication and were not able to complete the issue for this sprint. It will be handled in the next sprint: https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/issues/37.

## Code Files for Review
Please review the following code files, which were actively developed during this sprint, for quality:

 * [ProjectViewPage.js](https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/blob/main/VPMApp/client/src/pages/Projects/ProjectViewPage.js)
 * [project.js](https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/blob/main/VPMApp/server/controllers/project.js)
 * [projectSlice.js](https://github.com/WSUCptSCapstone-Fall2022Spring2023/wsuetm-pmwebapp/blob/main/VPMApp/client/src/features/projectSlice.js)

## Retrospective Summary

Here's what went well:
 * We were able to establish a consistent meeting time with group members.
 * We were able to connect the database with our app utilizing redux and our api. 
 * We added UI components and some functionality, getting closer to a working prototype. 

Here's what we'd like to improve:
 * We would like to improve our use of GitHub and create descriptive issues. 
 * We would like to improve our work rate and make changes faster. 
 * We would like to improve our client demos and interactions with our client. 

Here are changes we plan to implement in the next sprint:
 * We want to generate a fever chart for the project.
 * We want to improve the view/edit functionality. 
 * We would like to have the archive page working with the correct projects shown for in planning, in progress, and archived.
