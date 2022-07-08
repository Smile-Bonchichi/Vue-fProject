export default {
    message(html) {
        M.toast({html})
    },

    error(html) {
        M.toast({html: `[Ошибка]: ${html}`})
    }
}
