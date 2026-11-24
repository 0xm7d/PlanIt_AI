import { DemoBtn, render, LinkForm, Modal,getData, Render, RenderProjectInfo , StartTaskModal,CloseTaskModal , RenderStats } from "./ui.js"
import { Prompt } from "./prompt.js";
import { Get , addProject , Save} from "./storage.js";
import { Demo , GenerateAi} from "./api.js";
Modal()
if(window.location.pathname === '/' || window.location.pathname.endsWith("/index.html")){
    function deleteProject(id){
        const projects = Get().filter(project => project.id !== id)
        Save(projects)
        Render(projects,deleteProject)
        RenderStats(projects);
    }
    Render(Get(),deleteProject)
    RenderStats(Get());
}
// console.log(Get())
LinkForm(async () => {
    const btn = document.getElementById("generate-btn")
    btn.disabled = true
    btn.textContent = "Generation en cours...."
    try {
        const projet = getData()
        const prompt = Prompt(projet)
        const result = await GenerateAi(prompt)
        console.log("AI RESULT:", result);
        if (!result || !result.trim()) {
                throw new Error("AI returned an empty response");
        }
        const data = JSON.parse(result)
        const project = addProject({
            name : data.projectName || projet.name,
            description : projet.description,
            totalEstimatedHours : data.totalEstimatedHours,
            tasks : data.tasks
        })
        window.location.href = `./project.html?id=${project.id}`;

    }
    catch (err){
        console.error(err)
        alert(err.message)
    }
    finally {
        btn.disabled = false
        btn.textContent = "Generer le plan de developement "
    }
})
console.log("kolchi khdam !!");
if(window.location.pathname.endsWith("/project.html")){
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    const projects = Get()
    const project = projects.find(p => p.id === id)
    if(project){
        RenderProjectInfo(project)
        const tasks = Array.isArray(project.tasks) ? project.tasks : []
        let selectedTask = null
        render(tasks,(task) => {
            selectedTask = task
        })
        StartTaskModal((newStatus) => {
            if(!selectedTask) return
            if(newStatus === "Done"){
                const dependencies = Array.isArray(selectedTask.dependencies) ? selectedTask.dependencies : []
                const blocked = dependencies.some(id => {
                    const dependency = tasks.find(task => task.id === id)
                    return !dependency || dependency.status !== "Done"
                })
                if(blocked){
                    alert("Terminez les dependances avant de valider cette tache")
                    return
                }
            }
            selectedTask.status = newStatus
            Save(projects)
            render(tasks,(task) => {
                selectedTask = task
            })
            CloseTaskModal()
        })
    }
    else{
        const title = document.getElementById('project-title')
        if(title)
            title.textContent = "Projet introuvable"
    }
}
DemoBtn(Demo)