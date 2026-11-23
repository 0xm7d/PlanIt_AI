export function Get(){
    const projects = JSON.parse(localStorage.getItem("projects")) || []
    return projects
}

export function Save(projects){
    localStorage.setItem("projects", JSON.stringify(projects))
}
export function addProject(project){
    const projects = Get()
    project.id = crypto.randomUUID()
    projects.push(project)
    Save(projects)
    return project
}