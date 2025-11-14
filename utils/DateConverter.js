

export const convertDmyToStandardDate = (date = "") => {
    
    if (!date || !date.includes("/")) return "";

    const [dd, mm, yyyy] = date.split("/");

    if (!dd || !mm || !yyyy) return "";

    return `${yyyy}-${mm}-${dd}`;

}

export const convertStandardDateToDmy = (date = "") => {
    if (!date || !date.includes("-")) return "";
    
    const [yyyy, mm, dd] = date.split("-");
    
    return `${dd}/${mm}/${yyyy}`;

}

export const  switchSeparatorsToTrace = (date) => {

    return date.replaceAll("/","-");
}

export const  switchSeparatorsToBars = (date) => {

    return date.replaceAll("-","/");
}