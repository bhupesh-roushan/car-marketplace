import { faker } from '@faker-js/faker';

function createRandomCarList(){
    return{
        name:faker.vehicle.vehicle(),
        fueltype:faker.vehicle.fuel(),
        model:faker.vehicle.model(),
        type:faker.vehicle.type(),
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtUiI-bmgbweOP9-qZFZjPJHed_m_e4YpACg&s",

        miles:"5632",
        gearTpe:'Automatic',
        price:faker.finance.amount({min:4000,max:25000})
    }
}

const carList=faker.helpers.multiple(createRandomCarList,{count:8})

export default {
    carList
}