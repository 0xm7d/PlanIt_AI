export function Modal(){
    const modal = document.getElementById("ai-modal")
    const openBtn = document.getElementById("open-settings")
    if(!modal || !openBtn) return
    const closeBtn = document.getElementById('close-modal')
    const saveBtn = document.getElementById('save-key')
    const input = document.getElementById('api-key')
    openBtn.addEventListener("click",() => {
        modal.classList.remove("hidden")
    })
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden')
    })
    saveBtn.addEventListener('click', () => {
        const key = input.value.trim()
        if(!key){
            alert("Entrez votre cle API")
            return
        }
        sessionStorage.setItem("api_key",key)
        modal.classList.add('hidden')
    })
}
export function render(tasks){
    const to_do = document.getElementById("todo")
    const in_progress = document.getElementById("progress")
    const done = document.getElementById("done")
    to_do.innerHTML = ""
    in_progress.innerHTML = ""
    done.innerHTML = ""
    for(let task of tasks){
        const card = document.createElement('article')
        card.innerHTML = `
            <div class="flex items-center justify-between m-3">
            <span class="text-xs text-[#756A6A]">${task.id}</span>
            <span class="bg-[#F4EEE6] text-[#B65E54] text-xs font-semibold px-3 py-1 rounded">${task.priority}</span>
            </div>
            <h3 class="font-bold text-[#372B30] mb-3">${task.title}</h3>
            <div class="flex items-center justify-between border-t border-[#D9CBC3] pt-3">
                <span class="text-xs text-[#756A6A]">Size : ${task.size}</span>
                <span class="text-xs text-[#756A6A]">${task.estimatedTime}h</span>
            </div>
            <p class="text-xs text-[#756A6A] mt-3">Deadline : ${task.deadline}</p>
        `
        if(task.status == "To Do")
            to_do.appendChild(card)
    }
}
export function DemoBtn(demo){
    const btn = document.querySelector('#demo-btn')

    if(!btn)
        return
    btn.addEventListener('click',demo)
}
export function getData(){
    const name = document.getElementById("project-name").value.trim()
    const description = document.getElementById("project-description").value.trim()
    const brief = document.getElementById("project-brief").value.trim()
    const duration = Number(document.getElementById("project-duration").value.trim())
    const developers = Number(document.getElementById("project-developers").value.trim())
    const technologies = document.getElementById("project-technologies").value.trim()
    const difficulty = document.getElementById("project-difficulty").value.trim()
    const projet = {
        name,
        description,
        brief,
        duration,
        developers,
        technologies,
        difficulty,
    }
    return projet
}
export function LinkForm(Submit){
    const form = document.getElementById('project-form')
    if(!form)
        return
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        Submit()
    })
}
export function Render(projects){
    const display_projects = document.getElementById('projects')
    display_projects.innerHTML = ''
    projects.forEach(project => {
        const article = document.createElement('article')
        const tasks = Array.isArray(project.tasks) ? project.tasks : [];
        const total = tasks.length
        const complet = tasks.filter(task => task.status == "Done").length
        const porcentage = total === 0 ? 0 : Math.round((complet/total) * 100)
        article.className = "bg-[#FFFCF7] border border-[#D9CBC3] p-6"
        article.innerHTML = `
                    <div class="flex items-start justify-between gap-4">
                        <div><p class="text-xs text-[#B65E54] font-bold mb-2">PROJET 01</p>
                            <h3 class="text-xl font-bold">${project.name}</h3>
                        </div>
                        <button type="button" class="text-sm text-[#A23939] hover:underline">
                            Supprimer
                        </button>
                    </div>
                    <p class="text-sm text-[#756A6A] mt-3">${project.description || "Aucune description"}</p>
                    <div class="border-t border-[#D9CBC3] mt-6 pt-5">
                        <div class="grid grid-cols-3 gap-3">
                            <div>
                                <p class="text-2xl font-bold">${total}</p>
                                <p class="text-xs text-[#756A6A] mt-1">Total</p>
                            </div>
                            <div>
                                <p class="text-2xl font-bold">${complet}</p>
                                <p class="text-xs text-[#756A6A] mt-1">Terminées</p>
                            </div>
                            <div>
                                <p class="text-2xl font-bold">${total - complet}</p>
                                <p class="text-xs text-[#756A6A] mt-1">Restantes</p>
                            </div>
                        </div>
                        <div class="flex items-center justify-between mt-6 mb-2 text-sm">
                            <span class="text-[#756A6A]">Progression</span>
                            <span class="font-bold">${porcentage}%</span>
                        </div>
                        <div class="w-full h-2 bg-[#E8DCD5]">
                            <div class="h-2 bg-[#B65E54]" style="width: ${porcentage}%"></div>
                        </div>
                        <div class="flex items-center justify-between mt-6">
                            <span class="text-xs text-[#756A6A]">${complet} tâches sur ${total}</span>
                            <a href="project.html?id=${project.id}" class="text-sm font-bold text-[#542B35] hover:underline">Ouvrir le projet</a>
                        </div>
                    </div>`
                display_projects.appendChild(article)
    });
}

export function RenderProjectInfo(project){
    const project_title = document.getElementById('project-title')
    const project_summary = document.getElementById('project-summary')
    project_title.textContent = `${project.name}`
    const tasks = Array.isArray(project.tasks) ? project.tasks : []
    const TasksLength = tasks.length
    const total = tasks.reduce((sum,task) => {
        return sum + task.estimatedTime
    },0)
    project_summary.textContent = `${totalTasks} tâches · ${totalHours} heures`;
} 