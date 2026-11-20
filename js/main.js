import { DemoBtn, render, LinkForm, Modal,getData, Render, RenderProjectInfo } from "./ui.js"
import { Prompt } from "./prompt.js";
import { Get , addProject} from "./storage.js";
import { Demo } from "./api.js";
Modal()
if(window.location.pathname.endsWith("/index.html")){
    const projects = Get()
    Render(projects)
}
console.log(Get())
LinkForm(() => {
    const projet = getData()
    const prompt = Prompt(projet)
    console.log(prompt)
})
console.log("kolchi khdam !!");
if(window.location.pathname === '/' || window.location.pathname.endsWith("/project.html")){
    const params = new URLSearchParams(window.location.search)
    const id = params.get('id')
    const projects = Get()
    const project = projects.find(p => p.id === id)
    if(project){
        RenderProjectInfo(project)
        render(Array.isArray(project.tasks) ? project.tasks : [])
    }
    else{
        const title = document.getElementById('project-title')
        if(title)
            title.textContent = "Projet introuvable"
    }
}
DemoBtn(Demo)