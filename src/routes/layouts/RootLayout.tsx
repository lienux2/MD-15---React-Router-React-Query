import { NavLink, Outlet } from "react-router-dom"

export const RootLayout = () => {
    return (
        <>
            <div>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div className="container">
                        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <NavLink to="/" className="nav-link">Home</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="posts" className="nav-link">Posts</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="about" className="nav-link">About</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="create" className="nav-link">Create</NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <main>
                    <Outlet />
                </main>
            </div>
        </>
    )
}