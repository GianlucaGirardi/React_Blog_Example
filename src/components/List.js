import React from "react";
import {useEffect} from "react";
import { handleRead, handleDelete } from "./handlers/list";

const List = ({API_URL, fetchError, setFetchError, post, setPost, Link}) =>{

    /* Method that will get all the posts & store it in the post array */
    useEffect(() =>{
        handleRead({API_URL, setPost, setFetchError});
    },[API_URL, setFetchError, setPost]);// Run when these values change

    const tableRow = (post) => {
        if(post){ 
            return(
                <tbody>
                    {
                        post.map((postObj, index) => {
                            return(
                            <tr key={index}>
                                <td>{postObj.id}</td>
                                <td>{postObj.userId}</td>
                                <td>{postObj.title}</td>
                                <td><Link to={`/Form/${index}`}><button type="button">Update</button></Link></td>
                                <td><button  type="button" onClick={() => handleDelete(postObj.id)}>Delete</button></td>
                            </tr>
                            )
                        })
                    }
                </tbody>
            );
        }
        else{
           return ( <tbody>
                <tr>
                    <td colSpan={4}>There are no Posts!</td>
                </tr>
           </tbody>)
        }
    };

    return(
        
        <div className="container">
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>UserID</th>
                        <th>Title</th>
                    </tr>
                </thead>
                {tableRow(post)}
            </table>
            <Link to="/Form/-1">
                <button className="btn btn-secondary"> Create Post </button>
                {fetchError && <p className="error">{fetchError}</p>}
            </Link>
        </div>
    );
}

export default List;