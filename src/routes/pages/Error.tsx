import { Link } from "react-router-dom"

export const Error = () => {
    return (
        <div className="conteiner">
            <div className="row">
                <div className="col">
                    <h1>You are not where you are suppose to be!</h1>
                    <p>Please click on navigation below to redirect:</p>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="posts">Posts</Link>
                        </li>
                        <li>
                            <Link to="about">About</Link>
                        </li>
                        <li>
                            <Link to="create">Create</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}