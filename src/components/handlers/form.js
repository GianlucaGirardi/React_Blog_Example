
export const handleCreate = ({API_URL, jsonObj, setFetchError}) =>{
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

export const handleUpdate = ({id, formData}) =>{
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