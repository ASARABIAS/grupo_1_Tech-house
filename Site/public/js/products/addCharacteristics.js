//variable para identificar el cuerpo de la caracteristicacion
let index = 0;

function addNewCharacteristics() {
    if (validationInputs()) {
        index++;
        console.log("entro index: " + index);

        let div = document.getElementById('characteristics-main');

        const divCharacteristicsSection = document.createElement('div');
        const divCharacteristicsMainTitle = document.createElement('div');
        const divCharacteristicsMainContext = document.createElement('div');
        const divCharacteristicsMainContextTop = document.createElement('div');
        const divCharacteristicsMainContextDown = document.createElement('div');

        divCharacteristicsSection.setAttribute("class", "characteristics-section");
        divCharacteristicsMainTitle.setAttribute("class", "characteristics-main-title");
        divCharacteristicsMainContext.setAttribute("class", "characteristics-main-context");
        divCharacteristicsMainContextTop.setAttribute("class", "characteristics-main-context-top");

        divCharacteristicsMainTitle.innerHTML = '<label for="characteristics-title">Titulo de la Caracteristicas:</label><input type="text" name="characteristicsTitle" id="characteristicsTitle" placeholder="Titulo">';

        divCharacteristicsMainContextTop.innerHTML = '<h5>Cuerpo de la Caracteristicas</h5> <i class="fa-solid fa-circle-plus" onclick="addNewcharacteristicsDiscripction(' + index + ');"></i>';

        divCharacteristicsMainContextDown.setAttribute("class", "characteristics-main-context-down");
        divCharacteristicsMainContextDown.setAttribute("id", "characteristics-main-context-down_" + index)
        auxAddNewcharacteristicsDiscripction(divCharacteristicsMainContextDown);

        divCharacteristicsMainContext.appendChild(divCharacteristicsMainContextTop);
        divCharacteristicsMainContext.appendChild(divCharacteristicsMainContextDown)

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

    const nameInputSub = "characteristicsContextSubtitle_" + index;
    const nameInputDes = "characteristicsContextDescription_" + index;

    labelCarContextSub.innerText = "Subtitulo:";
    labelCarContextSub.setAttribute("for", nameInputSub);

    inputCarContextSub.setAttribute("type", "text");
    inputCarContextSub.setAttribute("name", nameInputSub);
    inputCarContextSub.setAttribute("id", nameInputSub);
    inputCarContextSub.setAttribute("placeholder", "Descripcion");

    labelCarContextDes.innerHTML = "Descripcion:";
    labelCarContextDes.setAttribute("for", nameInputDes);

    inputCarContextSub.setAttribute("type", "text");
    inputCarContextDes.setAttribute("name", nameInputDes);
    inputCarContextDes.setAttribute("id", nameInputDes);
    inputCarContextDes.setAttribute("placeholder", "Subtitulo");

    divCarContext.appendChild(labelCarContextSub);
    divCarContext.appendChild(inputCarContextSub);
    divCarContext.appendChild(labelCarContextDes);
    divCarContext.appendChild(inputCarContextDes);

    div.appendChild(divCarContext);
}

function validationInputs() {
    let result = true;

    validationInputCharacteristicsTitle = document.querySelectorAll('#characteristicsTitle');

    result = validationInputCharacteristics(validationInputCharacteristicsTitle);

    if (!result) {
        confirm('Ingrese primero una caracteristica');
        return result;
    }

    let validationInputCharacteristicsSubtitle = document.querySelectorAll('#characteristicsContextSubtitle_' + index);
    let validationInputCharacteristicsDescription = document.querySelectorAll('#characteristicsContextDescription_' + index);

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