
export const RequestLogger = (req,res,next) =>{
    // Guarda o tempo de início da requisição
    const StartTime = process.hrtime();
    // Guarda o método e a URL da requisição
    const { method, url } = req;

    // Adiciona um listener para o evento "finish" da resposta, que é acionado quando a resposta é enviada
    res.on("finish", () => {
        // Calcula a duração da requisição em milissegundos
        const diff = process.hrtime(StartTime);
        const DurationMs = (diff[0] * 1e3 + diff[1]) * 1e6.toFixed(2);

        // Define a cor do log com base no status code (verde para 2xx, amarelo para 4xx e vermelho para 5xx)
        let color = "\x1b[32m";
        if (res.statusCode >= 400 && res.statusCode < 500) color = "\x1b[33m";
        else if (res.statusCode >= 500) color = "\x1b[31m";
        const ResetColor = "\x1b[0m";

        // Imprime o log formatado no console
        console.log(
            `[LOG] ${new Date().toISOString()}
            | ${color}${method} ${ResetColor} ${url} 
            | Status: ${color}${statusCode} ${ResetColor}
            | Tempo: ${DurationMs}ms${ResetColor}`
        );
    });
    // Chama o próximo middleware ou rota para continuar o processamento da requisição
    next();
}