import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import 'select2/dist/css/select2.min.css';
import 'select2/dist/js/select2';
import 'jquery/dist/jquery.min';
import $ from 'jquery';

export default function TicketForm() {

    const [cookies, setCookie] = useCookies(['token']);

    const [projects, setProjects] = useState("")

    const [subject, setSubject] = useState("");
    const [category, setCategory] = useState("");
    const [projectID, setProjectID] = useState("");
    const [description, setDescription] = useState("");

    const [inputValue, setInputValue] = useState(""); // Input value for project code
    const [filteredOptions, setFilteredOptions] = useState([]); // Filtered project options

    const [showProjectField, setShowProjectField] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);


    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:4000/project/all",
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then(function (response) {
            console.log(response.data)
            setProjects(response.data)
        }, function (error) {
            console.log("error: ", error)
        })
    }, [])

    const handleSubject = (e) => {
        setSubject(e.target.value);
    }

    const handleCategory = (e) => {
        setCategory(e.target.value);
        if (e.target.value === "Projects Inquiries") {
            setShowProjectField(true);
        } else {
            setShowProjectField(false);
        }
    }

    const handleProjectInput = (e) => {
        const value = e.target.value;
        setInputValue(value)

        const filtered = projects.filter((option) =>
            option.id.toLowerCase().includes(value.toLowerCase())
        );

        setFilteredOptions(filtered);
    }

    // Function to handle project option selection
    const handleProjectOptionSelect = (option) => {
        setInputValue(option);
        setProjectID(option); // Update selected project code
        setFilteredOptions([]); // Clear filtered options
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormSubmitted(true);

        axios({
            method: "post",
            url: "http://localhost:4000/ticket/create",
            data: {
                subject,
                category,
                projectID,
                description,

            },
            headers: {
                'Authorization': `Bearer ${cookies.token}`,
            }
        }).then(function (response) {
            console.log(response)
        }, function (error) {
            console.log("error: ", error)
        })
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={`needs-validation ${formSubmitted ? 'was-validated' : ''}`} noValidate>
                <div className="mb-3 m-2">
                    <label htmlFor="subject" className="col-form-label">Subject</label>
                    <input
                        type="text"
                        className="form-control"
                        onChange={handleSubject}
                        id="subject"
                        required
                    />
                    <div className="invalid-feedback">Please provide a subject.</div>
                </div>
                <div className="mb-3 m-2">
                    <label htmlFor="category" className="col-form-label">Category</label>
                    <select
                        className="form-select"
                        onChange={handleCategory}
                        id="category"
                        value={category}
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="Projects Inquiries">Projects Inquiries</option>
                        <option value="Technical Issue">Technical Issue</option>
                    </select>
                    <div className="invalid-feedback">Please select a category.</div>
                </div>
                {
                    showProjectField && (
                        <div className="mb-3 m-2">
                            <label htmlFor="projectCode" className="col-form-label">Project Code</label>
                            <select
                                className="form-select"
                                onChange={handleProjectInput}
                                id="projectCode"
                                value={inputValue}
                                required
                            >
                                <option value="" disabled>Select Project ID</option>
                                {
                                    filteredOptions.map((option) => {
                                        console.log(option)
                                        return (
                                            <option value={option.id}>{option.id}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                    )}
                {showProjectField && (
                    <div className="mb-3 m-2">
                        <label htmlFor="project" className="col-form-label">Project Code</label>
                        <input
                            type="text"
                            className="form-control"
                            onChange={handleProjectInput}
                            id="project"
                            required
                        />
                        <div className="invalid-feedback">Please provide a project code.</div>
                    </div>
                )}
                <div className="mb-3 m-2">
                    <label htmlFor="message-text" className="col-form-label">Message</label>
                    <textarea
                        className="form-control"
                        onChange={handleDescription}
                        id="message-text"
                        required
                    ></textarea>
                    <div className="invalid-feedback">Please provide a message.</div>
                </div>
                <div className="mb-3 m-2">
                    <button type="submit" className="btn btn-dark">Submit</button>
                </div>
            </form>
        </div>
    )
}
