import {Request} from "./request";
import {UI} from "./ui";

const form = document.getElementById("employee-form");
const nameInput = document.getElementById("name");
const departmentInput = document.getElementById("department");
const salaryInput = document.getElementById("salary");
const employeesList = document.getElementById("employees");
const updateEmployeeButton = document.getElementById("update");

const request = new Request("http://localhost:3000/employees");
const ui = new UI();

eventListeners();

function eventListeners(){
    document.addEventListener("DOMContentLoaded",getAllEmployees);
}

function getAllEmployees(){

    request.get()
    .then(employees => {
        ui.addAllEmployeesToUI(employees);
    })
    .catch(err => console.log(err));

}


// request.get()
// .then(employees => console.log(employees))
// .catch(err => console.log(err));

// request.post({name:"Serhat",department:"Finanice",salary:2000})
// .then(response => console.log(response))
// .catch(err => console.log(err));

// request.put(1,{name:"Famil Agayev",department:"Finanice",salary:1000})
// .then(response => console.log(response))
// .catch(err => console.log(err));

// request.delete(3)
// .then(response => console.log(response))
// .catch(err => console.log(err));