
export const taskCalculations = async (project, task, timeDifference) => {

    var { percentComplete, bufferConsumed } = await calculatePercentages(project, task, timeDifference)

    return {
        ...project,  
        chartData: [...project.chartData, { x: percentComplete * 100.0, y: bufferConsumed * 100.0 }],
        completedTasks: [...project.completedTasks, { 
            complete: true, 
            taskDescription: task.taskDescription,
            taskName: task.taskName, 
            taskID: task.taskID,
            taskDuration: task.taskDuration,
            taskCompletion: new Date(),
            taskStatus: await findStatus(percentComplete, bufferConsumed)
        }],
        tasks: project.tasks.filter((t) => t.taskID !== task.taskID),
        lastKnownCompletion: { x: percentComplete * 100.0, y: bufferConsumed * 100.0 },
        projectStage: await isArchived(project),
        dateCompleted: new Date(),
        projectStatus: await findStatus(percentComplete, bufferConsumed)
    }
}

const isArchived = async(project) => {
    if (project.completedTasks.length + 1 === project.numTasks) return 2
    return 1
}

const findStatus = async(percentComplete, bufferConsumed) => {
    if (bufferConsumed > percentComplete) {
        if (bufferConsumed > 1) return '#404040' // return black 
        return '#E34129' // return red
    }   
    return '#56AB2B'  // return green
}

const calculatePercentages = async(project, task, timeDifference) => {

    // % time taken = diff / aggressive duration 
    var percentTimeTaken = timeDifference / project.projectDuration
    console.log('% time taken', percentTimeTaken)

    // % project complete = (add aggressive duration of tasks completed) / aggressive duration
    let sum = task.taskDuration
    project.completedTasks.forEach((t) => { sum = Number(sum) + Number(t.taskDuration)})
    console.log('sum', sum)
    var percentProjectComplete = sum / project.projectDuration
    console.log('% project complete', percentProjectComplete)

    // % buffer consumed = 2 * (% time - % project complete)
    var percentBufferConsumed = 2 * (percentTimeTaken - percentProjectComplete)
    console.log('% buffer consumed', percentBufferConsumed)

    return { percentComplete: percentProjectComplete, bufferConsumed: percentBufferConsumed }
}