import React from "react";
import {useState} from "react";
import { useParams } from 'react-router-dom';


const Form = ({API_URL, fetchError, setFetchError}) =>{

    const [validationError, setValidationError] = useState([]);// Array which will hold errors if a input field is invalid
    const { id } = useParams();// Variable holding the id of the post

    const handleSubmit = (event) =>{
        event.preventDefault();

        const formData = new FormData(event.target); 

        /* Clear form values to simulate page reaload */
        event.target.title.value="";
        event.target.userId.value="";
        event.target.body.value="";

        /* Form Validation */
        setValidationError([]);
        if(formData.get("title").length < 5 || formData.length > 100){
            const titleError = "Invalid: Title must be between 5 and 100 characters long";
            setValidationError([titleError]);
            return;
        }
        if(!formData.get("userId")){
            const userIdError = "Invalid: Post must contain a User ID";
            setValidationError([userIdError]);
            return;
        }
        if(!formData.get("body")){
            const bodyError = "Invalid: Post must contain a Body";
            setValidationError([bodyError]);
            return;
        }

        /* Connect to api and send data to url & its endpoints */
        const jsonObj = JSON.stringify(formData);

        /* Determine if it is a PUT or POST request */
        if(id!=="-1"){
            console.log(id);
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    id: id,
                    title: formData.title,
                    body: formData.body,
                    userId: formData.userId,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) => response.json())
                .then((json) => console.log(json));
        }
        else{
            fetch( API_URL , {
                method: 'POST',
                body: jsonObj,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                })
                .then((response) =>{
                    if(!response.ok){
                        throw new Error("Error: Failed to create Post");
                    }
                    setFetchError(null);
                    return response.json();
                })
                .then((json) => console.log(json)) //Response object contaning key value pair of the succesfull newly created post
                .catch((error) => {
                    setFetchError(error.message)
                });
        }
        
    }

    return(
        <div>        
            <form onSubmit={handleSubmit}>
                <label htmlFor="title"> Title </label><br />
                <input type="text" id="title" name="title" placeholder="Enter Title"/><br /><br />

                <label htmlFor="userId"> User Id </label><br />
                <input type="text" id="userId" name="userId" placeholder="Enter User ID"/><br /><br />

                <label htmlFor="body"> Body </label><br />
                <input type="textarea" id="body" name="body" placeholder="Enter Body" /><br />
                <button type="submit"className="btn btn-secondary">Submit</button><br /><br />

                {validationError && <p className="error">{validationError}</p>}
                {fetchError && <p className="error">{fetchError}</p>}
            </form>
        </div>
    );

    
}

export default Form;