function consoleOutput(obj) {

    if (obj.elements && obj.elements.length > 0) {
        const count = obj.elements.length;
        const ob = {}

        for (let i = 0; i < count; i++) {
            if (obj.elements[i] && obj.elements[i].value)
                ob[obj.elements[i].id] = obj.elements[i].value
        }

        console.log(ob)
    }

}