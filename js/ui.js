function createParagraph(text, ...classNames) {
    var element = document.createElement("P");
    var node = document.createTextNode(text);
    element.appendChild(node);

    classNames.forEach(function (className) { //get classname from the rest parameters array
        element.classList.add(className); //add each classname into classList
    })
    return element;
}

function create3Dletter(text, letter, ...classNames) {
    var element = document.createElement("SPAN");
    var node = document.createTextNode(text);
    element.appendChild(node);
    element.setAttribute("data-letter", letter); //used for css style

    classNames.forEach(function (className) {
        element.classList.add(className);
    })
    return element;
}

function createHeading1(text, ...classNames) {
    var element = document.createElement("H1");
    var node = document.createTextNode(text);
    element.appendChild(node);

    classNames.forEach(function (className) {
        element.classList.add(className);
    })
    return element;
}

function createDIV(...classNames) {
    var element = document.createElement("DIV");

    classNames.forEach(function (className) {
        element.classList.add(className);
    })
    return element;
}

function createSpan(text) {
    var element = document.createElement("SPAN");
    var node = document.createTextNode(text);
    element.appendChild(node);
    return element;
}

function createImage(url, alt, ...classNames) {
    var element = document.createElement("IMG");
    element.setAttribute("src", url);
    element.setAttribute("alt", alt);

    classNames.forEach(function (className) {
        element.classList.add(className);
    })
    return element;
}
