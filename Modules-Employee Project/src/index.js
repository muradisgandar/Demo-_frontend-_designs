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
    form.addEventListener("submit",addEmployee);
    employeesList.addEventListener("click",updateOrDelete);
}

function getAllEmployees(){

    request.get()
    .then(employees => {
        ui.addAllEmployeesToUI(employees);
    })
    .catch(err => console.log(err));

}

function addEmployee(e){

    const employeeName = nameInput.value.trim();
    const employeeDepartment = departmentInput.value.trim();
    const employeeSalary = salaryInput.value.trim();

    if(employeeName === "" || employeeDepartment === "" || employeeSalary === ""){
        alert("Please fill in inputs!");
    }
    else{
        request.post({name:employeeName,department:employeeDepartment,salary:Number(employeeSalary)})
        .then(employee => {
            ui.addEmployeeToUI(employee);
        })
        .catch(err => console.log(err));  
    }


    ui.clearInputs();

    e.preventDefault();
}


function updateOrDelete(e){

    if(e.target.id === "delete-employee"){
        deleteEmployee(e.target);
    }
    else if(e.target.id === "update-employee"){
        updateEmployeeController(e.target.parentElement.parentElement);
    }
}

function deleteEmployee(targetEmployee){
    const id = targetEmployee.parentElement.previousElementSibling.previousElementSibling.textContent;
    request.delete(id)
    .then(message => {
        ui.deleteEmployeeFromUI(targetEmployee.parentElement.parentElement);
        alert("Item is successfully deleted!");
    })
    .catch(err => console.log(err));
}

function updateEmployeeController(targetEmployee){
    ui.toggleUpdateButton(targetEmployee);
}


// request.put(1,{name:"Famil Agayev",department:"Finanice",salary:1000})
// .then(response => console.log(response))
// .catch(err => console.log(err));

// request.delete(3)
// .then(response => console.log(response))
// .catch(err => console.log(err));