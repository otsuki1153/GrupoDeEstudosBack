export function buildReturn(text){
    const msg = `{"Original":"${text}", "Tamanho":${text.length}, "Upper":"${text.toUpperCase()}"}`
    const JsonMsg = JSON.parse(msg);
    return JsonMsg;
}