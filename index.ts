import inquirer from 'inquirer';
import { faker } from '@faker-js/faker';

// Requirement
// 1. User's data = done
// 2. ATM machine = done
// 3. ATM function

interface User {
    id: number;
    pin: number;
    name: string;
    accountNumber: number;
    balance: number;
}

const createUser = (): User[] => {
    let users: User[] = [];
    for (let i = 0; i < 5; i++) {
        let user: User = {
            id: i + 1,
            pin: 1000 + i,
            name: faker.person.fullName(),
            accountNumber: Math.floor(10000000 * Math.random() * 90000000),
            balance: 100000 * i,
        };
        users.push(user);
    }
    return users;
};

// ATM Machine
const atmMachine = async (users: User[]) => {
    const res = await inquirer.prompt({
        type: "number",
        message:"write pin code",
        name: "pin"
    });

    const user = users.find(val => val.pin == res.pin);
    if (user) {
        console.log(`welcome ${user.name}`);
        atmfunc(user)
        return;
    }
    console.log("invalid user pin");
};

// ATM Function
const atmfunc = async(user: User)=>{
    while (true) {
        const ans = await inquirer.prompt({
            type:"list",
            name:"select",
            message:"what are you doing",
            choices:["Withdraw","Check Balance","Deposit","Exit"],
        });

        if(ans.select == "Exit"){
            console.log("thank you for using ATM. Have a great Day!");
            break;
        }

        if(ans.select == "Withdraw") {
            const amount = await inquirer.prompt({
                type:"number",
                message:"enter amount.",
                name:"dollars"
            });
            if(amount.dollars > user.balance) {
                return console.log("insufficient fund")
            }
            console.log(`withdraw amount: ${amount.dollars}`);
            console.log(`balance: ${user.balance - amount.dollars}`)
        }

        if(ans.select == "Check Balance"){
            console.log(`your current balance is: ${user.balance}`)
        }

        if(ans.select == "Deposit"){
            const amount = await inquirer.prompt({
                type: "number",
                message: "enter amount.",
                name: "dollars"
            });
            console.log(`deposit amount: ${amount.dollars}`);
            console.log(`balance: ${user.balance + amount.dollars}`);
        }
    }
};

const users = createUser()

atmMachine(users)