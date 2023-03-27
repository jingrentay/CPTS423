import moment from 'moment';

// Sorting and filtering for task priority list and sorted projects

export const sortProjects = async(projects) => {
    // black #404040
    // red #E34129
    // green #56AB2B

    const sortedByDate = projects.sort((a, b) => {
        let aDate = moment(a.predictedCompletion)
        let bDate = moment(b.predictedCompletion)
        let diff = aDate.diff(bDate, 'minutes', true)
        if (diff > 1) { return 1; } 
        if (diff < 1) { return -1;} 
        return 0;
    })

    const sortedByColor = sortedByDate.sort((a, b) => {
        if (a.projectStatus === '#404040' && b.projectStatus === '#E34129') { return -1; } 
        if (a.projectStatus === '#404040' && b.projectStatus === '#56AB2B') { return -1; }
        if (a.projectStatus === '#E34129' && b.projectStatus === '#56AB2B') { return -1; } 
        if (a.projectStatus === '#56AB2B' && b.projectStatus === '#404040') { return 1;} 
        if (a.projectStatus === '#E34129' && b.projectStatus === '#404040') { return 1; }
        return 0;
    })

    return sortedByColor
}

export const filterTasks = async(projects) => {
    const taskList = []
    projects.forEach(project => {
        project.tasks.forEach(task => {
            taskList.push({
                ...task, 
                projectID: project.projectID, 
                status: project.projectStatus,
                projectName: project.projectName,
                _id: project._id,
            })
        })
    });
    return taskList
}

const sortTaskPriorityList = async() => {

}
