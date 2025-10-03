import "./FormStyle.css"
import Modal from "./Modal";
import { useState } from "react";

export default function LoanForm() {
    const [errorMessage, setErrorMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formInputs, setFormInputs] = useState({
        name: "",
        phoneNumber: "",
        age: "",
        isEmployee: false,
        salaryRange: "",
    })

    function handleFormSubmit(e) {
        e.preventDefault();
        setErrorMessage(null)
        const { age, phoneNumber } = formInputs;
        if(age < 18 || age > 100) {
            setErrorMessage("The Age Is Not Allowed")
        } else if (phoneNumber.length != 11) {
            setErrorMessage("The Phone Number Is Incorrect")
        }
        setShowModal(true)
    }
    const btnIsDisabled =
            formInputs.name === "" ||
            formInputs.age === "" ||
            formInputs.phoneNumber === "";

    function handleDivClick() {
        if(showModal) {
            setShowModal(false)
        }
    }
    return (
        <div onClick={handleDivClick}>
            <form>
                <h2>Requesting a Loan</h2>
                <hr/>

                <label>Name:</label>
                <input 
                    type="text" value={formInputs.name}
                    onChange={(e) => {
                        setFormInputs({...formInputs, name: e.target.value})
                    }}/>

                <label>Phone Number:</label>
                <input 
                    type="text" value={formInputs.phoneNumber}
                    onChange={(e) => {
                        setFormInputs({...formInputs, phoneNumber: e.target.value})
                    }}/>

                <label>Age:</label>
                <input 
                    type="text" value={formInputs.age} 
                    onChange={(e) => {
                        setFormInputs({...formInputs, age: e.target.value})
                    }}/>

                <label>Are You an employee?</label>
                <input 
                    type="checkbox" checked={formInputs.isEmployee}
                    onChange={(e) => {
                        setFormInputs({...formInputs, isEmployee: e.target.checked})
                    }}/>

                <label>Salary</label>
                <select
                    value={formInputs.salaryRange}
                    onChange={(e) => {
                        setFormInputs({...formInputs, salaryRange: e.target.value})
                    }}>
                    <option>less than 500$</option>
                    <option>between 500$ and 2000</option>
                    <option>above 2000</option>
                </select>

                <button
                    className={btnIsDisabled ? "disabled" : ""}
                    onClick={handleFormSubmit}
                    disabled={btnIsDisabled}
                >
                    Submit
                </button>
            </form>
            <Modal errorMessage={errorMessage} isVisible={showModal} />
        </div>
    )
}