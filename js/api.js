export async function Demo() {
    await fetch("./demo.json")
    .then((response) => {
        if(!response.ok)
            throw new Error(`Http Error ${response.status}`)
        return response.json()
    })
    .then((data) => {
        localStorage.setItem('data',JSON.stringify(data))
        console.log(data)
        window.location.href = "./project.html"
    })
    .catch((error) => {
        console.error(error.message)
    })
}
export async function GenerateAi(prompt){
    const apiKey = sessionStorage.getItem('api_key')
    if(!apiKey)
        throw new Error("Veuillez configurer votre clé API")
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", 
        {
        method : "POST",
        headers : {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
                model: "openai/gpt-oss-20b",
                messages: [
                    { role: "user", content: prompt }
                ],
                max_tokens: 8000
        })
    })
    if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error?.message || `Erreur API : ${response.status}`);
}
    const data = await response.json()
    return data.choices[0].message.content;
}