import { Outlet } from "react-router-dom"

export const PostsLayout = () => {
    return (
        <div>
            <br></br>
            <main>
                <Outlet />
            </main>
        </div>
    )
}