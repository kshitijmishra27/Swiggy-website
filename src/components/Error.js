import { useRouteError } from "react-router-dom";

const Error = () =>{

let error = useRouteError();

    return <div className="error">
        <h1>Ooops!!</h1>
        <h2>Something went wrong!!!</h2>
        <h3>{error.status} : {error.statusText}</h3>
    </div>
}

export default Error;