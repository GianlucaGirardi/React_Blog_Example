/* Method that will connect to the rest API to get the data */

export const handleRead = ({API_URL, setPost, setFetchError}) =>{
    fetch(API_URL)
            .then(response => {
                if(!response.ok){
                    throw new Error("Error: Failed the retrieve List Data")
                }
                setFetchError(null);
                return response.json();
            })
            .then((jsonObj) => { 
                setPost(jsonObj); // Place the obtained data in the post array
            }) 
            .catch((error) => {
                setFetchError(error.message);
            })
}