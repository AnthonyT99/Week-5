class Car {
    constructor(model, color) {
        this.model = model;
        this.color = color;
    }

    describe() {
        return `${this.model} ${this.color}.`;
    }
}

class Make {
    constructor(model) {
        this.model = model;
        this.cars = [];
    }

    addCar(car) {
        if (car instanceof Car) {
            this.cars.push(car);
        } else {
        throw new Error(`You can only add an instance of Car. Argument is not a car: ${car}`)
        }
    }
    describe() {
        return `${this.model} has ${this.cars.length} cars`;
    }
}
  
class Menu {
    constructor() {
    this.makes = [];
    this.selectedMake = null;
    }

    start() {
        let selection = this.showMainMenuOptions();
        while (selection != 0) {
            switch (selection) {
                case '1':
                    this.createMake();
                    break;
                 case '2':
                     this.viewMake();
                     break;
                case '3':
                    this.deleteMake();
                    break;
                case '4':
                    this.displayMakes();
                    break;
                    default:
                        selection = 0;
                    
                    
            }
            selection = this.showMainMenuOptions();
        }
        alert('Bye');
    }

    showMainMenuOptions() {
        return prompt(`
        0) exit
        1) create new make
        2) view make
        3) delete make
        4) display all makes
        `);
    }

    showMakeMenuOptions(makeInfo) {
        return prompt(`
        0) back
        1) create Car
        2) delete Car
        -------------------
        ${makeInfo}
        `);
    }

    displayMakes() {
        let makeString = '';
        for (let i = 0; i < this.makes.length; i++) {
            makeString += i + ') ' + this.makes[i].model + '\n';
        }
        alert(makeString);
    }

    createMake() {
        let model = prompt('Enter name for new make of car');
        this.makes.push(new Make(model));
    }

    viewMake() {
        let index = prompt('Enter the index of the car you wish to view:');
        if (index > -1 && index < this.makes.length) {
            this.selectedMake = this.makes[index];
            let description = 'Car make: ' + this.selectedMake.model + '\n';

            for (let i = 0; i < this.selectedMake.cars.length; i++) {
                description += i + ') ' + this.selectedMake.cars[i].model
                + ' - ' + this.selectedMake.cars[i].color + '\n';
            }

            let selection = this.showMakeMenuOptions(description);
            switch (selection) {
                case '1':
                    this.createCar();
                break;
                case '2':
                    this.deleteCar();
            }
        }
    }  

    deleteMake() {
        let index = prompt('Enter index of car you wish to delete:');
        if (index > -1 && this.makes.length) {
            this.makes.splice(index, 1);
        }
    }

    createCar() {
        let model = prompt('Enter model name for new make:');
        let color = prompt('Enter color for new car:');
        this.selectedMake.cars.push(new Car(model, color));
    }

    deleteCar() {
        let index = prompt('Enter the index of the car you want to delete:');
        if (index > -1 && index < this.selectedMake.cars.length) {
            this.selectedMake.cars.splice(index, 1);
        }
    }
}

let menu = new Menu();
menu.start();
