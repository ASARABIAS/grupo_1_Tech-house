function CreateStrucureCharacteristics() {

    let subTitles = document.getElementsByName('characteristicsContextSubtitle');
    let description = document.getElementsByName('characteristicsContextDescription');

    identifyCharacteristicsMain(subTitles);
    identifyCharacteristicsMain(description);
}

function identifyCharacteristicsMain(main) {
    for (let index = 0; index < main.length; index++) {
        const element = main[index];
        element.value += '_' + element.placeholder;
    }
}