class Services {
    constructor () {}

    mayusc (string) {
        return string[0].toUpperCase () + string.slice (1)
    }
    validation (input) {
        let errors = {}
    
        if (input.name.length === 0 || input.name.length > 10) {
            errors.name = 'Put a name no longer than ten letters'
        }
        if (input.health <= 0 || input.health > 150) {
            errors.health = 'Use a value between 1 and 150'
        }
        if (input.attack <= 0 || input.attack > 105) {
            errors.attack = 'Use a value between 1 and 105'
        }
        if (input.defense <= 0 || input.defense > 115) {
            errors.defense = 'Use a value between 1 and 115'
        }
        if (input.speed <= 0 || input.speed > 115) {
            errors.speed = 'Use a value between 1 and 115'
        }
        if (input.height <= 0 || input.height > 40) {
            errors.height = 'Use a value between 1 and 40'
        }
        if (input.weight <= 0 || input.weight > 1000) {
            errors.weight = 'Use a value between 1 and 1000'
        }
    
        const regExpImg = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png|svg)/g
        if (!regExpImg.test (input.img)) {
            errors.img = 'Type a valid URL'
        }
        return errors
    }
}

export default Services
