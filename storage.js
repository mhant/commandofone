// KEYS
const SHOWN_GUIDE = "shownGuide";
const LAST_LEVEL = "last_level";
const TRUE_STRING = 'true';

function hasShownGuide(){
    return localStorage.getItem(SHOWN_GUIDE) === TRUE_STRING;
}

function setShownGuide(){
    localStorage.setItem(SHOWN_GUIDE, true);
}

function getLastLevelCode(){
    return JSON.parse(localStorage.getItem(LAST_LEVEL));
}

function setLastLevelCode(code){
    localStorage.setItem(LAST_LEVEL, JSON.stringify(code));
}
