//variable para identificar el cuerpo de la caracteristicacion
let index = 0;

function addNewCharacteristics() {
    if (validationInputs()) {
        index++;
        console.log("entro index: " + index);

        let div = document.getElementById('characteristics-main');

        const divCharacteristicsSection = document.createElement('div');
        const divCharacteristicsMainTitle = document.createElement('div');
        const labelCharacteristicsTitle = document.createElement("label");
        const inputCharacteristicsTitle = document.createElement("input");
        const divCharacteristicsMainContext = document.createElement('div');
        const divCharacteristicsMainContextTop = document.createElement('div');
        const characteristicsMainContextDown = document.createElement('div');

        divCharacteristicsSection.setAttribute("class", "characteristics-section");
        divCharacteristicsMainTitle.setAttribute("class", "characteristics-main-title");
        divCharacteristicsMainContext.setAttribute("class", "characteristics-main-context");
        divCharacteristicsMainContextTop.setAttribute("class", "characteristics-main-context-top");

        const nameCharacteristicsTitle = "characteristics-title_" + index;

        labelCharacteristicsTitle.innerText = "Titulo de la Caracteristicas:";
        labelCharacteristicsTitle.setAttribute("for", nameCharacteristicsTitle);

        inputCharacteristicsTitle.setAttribute("type", "text");
        inputCharacteristicsTitle.setAttribute("name", nameCharacteristicsTitle);
        inputCharacteristicsTitle.setAttribute("id", nameCharacteristicsTitle);
        inputCharacteristicsTitle.setAttribute("placeholder", "Titulo");

        divCharacteristicsMainContextTop.innerHTML = '<h5>Cuerpo de la Caracteristicas</h5> <i class="fa-solid fa-circle-plus" onclick="addNewcharacteristicsDiscripction(' + index + ');"></i>';

        characteristicsMainContextDown.setAttribute("class", "characteristics-main-context-down");
        characteristicsMainContextDown.setAttribute("id", "characteristics-main-context-down_" + index)
        auxAddNewcharacteristicsDiscripction(characteristicsMainContextDown);

        divCharacteristicsMainTitle.appendChild(labelCharacteristicsTitle);
        divCharacteristicsMainTitle.appendChild(inputCharacteristicsTitle);

        divCharacteristicsMainContext.appendChild(divCharacteristicsMainContextTop);
        divCharacteristicsMainContext.appendChild(characteristicsMainContextDown)

        divCharacteristicsSection.appendChild(divCharacteristicsMainTitle);
        divCharacteristicsSection.appendChild(divCharacteristicsMainContext);

        div.appendChild(divCharacteristicsSection);
    }
}

function addNewcharacteristicsDiscripction(i) {

    if (validationInputs()) {
        index = i;
        let div = document.getElementById('characteristics-main-context-down_' + index);
        auxAddNewcharacteristicsDiscripction(div);
    }
}

function auxAddNewcharacteristicsDiscripction(div) {

    const divCarContext = document.createElement('div');
    const labelCarContextSub = document.createElement("label");
    const inputCarContextSub = document.createElement("input");
    const labelCarContextDes = document.createElement("label");
    const inputCarContextDes = document.createElement("input");

    divCarContext.setAttribute("class", "characteristics-section")

    const nombreInputSub = "characteristics-context-subtitle_" + index;
    const nombreInputDes = "characteristics-context-description_" + index;

    labelCarContextSub.innerText = "Subtitulo:";
    labelCarContextSub.setAttribute("for", nombreInputSub);

    inputCarContextSub.setAttribute("type", "text");
    inputCarContextSub.setAttribute("name", nombreInputSub);
    inputCarContextSub.setAttribute("id", nombreInputSub);
    inputCarContextSub.setAttribute("placeholder", "Descripcion");

    labelCarContextDes.innerHTML = "Descripcion:";
    labelCarContextDes.setAttribute("for", nombreInputDes);

    inputCarContextSub.setAttribute("type", "text");
    inputCarContextDes.setAttribute("name", nombreInputDes);
    inputCarContextDes.setAttribute("id", nombreInputDes);
    inputCarContextDes.setAttribute("placeholder", "Subtitulo");

    divCarContext.appendChild(labelCarContextSub);
    divCarContext.appendChild(inputCarContextSub);
    divCarContext.appendChild(labelCarContextDes);
    divCarContext.appendChild(inputCarContextDes);

    div.appendChild(divCarContext);
}

function validationInputs() {
    let result = true;

    result = document.getElementById('characteristics-title_' + index).value.length > 0;

    if (!result) {
        confirm('Ingrese primero una caracteristica');
        return result;
    }

    let validationInputCharacteristicsSubtitle = document.querySelectorAll('#characteristics-context-subtitle_' + index);
    let validationInputCharacteristicsDescription = document.querySelectorAll('#characteristics-context-description_' + index);

    result = validationInputCharacteristics(validationInputCharacteristicsSubtitle);

    if (!result) {
        confirm('Ingrese el subtitulo de la caracteristica');
        return result;
    }

    result = validationInputCharacteristics(validationInputCharacteristicsDescription);

    if (!result) {
        confirm('Ingrese el Descripcion de la caracteristica');
        return result;
    }

    return result;
}

function validationInputCharacteristics(array) {
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        if (element.value.length == 0) {
            return false;
        }
    }
    return true;
}