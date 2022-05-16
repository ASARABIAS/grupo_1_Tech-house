function addNewDivDiscripction() {
    let div = document.getElementById('characteristics-main-context-down');

    const nombreInputSub = "InputSub" + Math.floor(Math.random() * 30);
    const nombreInputDes = "InputDes" + Math.floor(Math.random() * 30);

    const labelCarContextSub = document.createElement("label");
    const labelCarContextDes = document.createElement("label");
    const inputCarContextSub = document.createElement("input");
    const inputCarContextDes = document.createElement("input");


    inputCarContextSub.setAttribute("type", "text");
    inputCarContextSub.setAttribute("type", "text");
    inputCarContextDes.setAttribute("name", nombreInputDes);
    inputCarContextSub.setAttribute("name", nombreInputSub);
    inputCarContextDes.setAttribute("id", nombreInputDes);
    inputCarContextSub.setAttribute("id", nombreInputSub);
    inputCarContextDes.setAttribute("placeholder", "Subtitulo");
    inputCarContextSub.setAttribute("placeholder", "Descripcion");
    labelCarContextSub.innerHTML = "Subtitulo:";
    labelCarContextDes.innerHTML = "Descripcion:";
    labelCarContextSub.setAttribute("for", nombreInputSub);
    labelCarContextDes.setAttribute("for", nombreInputDes);

    div.appendChild(labelCarContextSub);
    div.appendChild(inputCarContextSub);
    div.appendChild(labelCarContextDes);
    div.appendChild(inputCarContextDes);
}