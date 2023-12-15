import { useState } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"

type Posts = {
    id: number,
    theme: string,
    madeBy: string,
    description: string,
}

export const Posts = () => {
    const postsQuery = useQuery({
        queryKey: ["posts"],
        queryFn: () => fetchPosts(),
    });

    const [postss, setPosts] = useState<Posts[]>([]);

    const fetchPosts = async () => {
        await axios.get('http://localhost:3001/posts')
            .then(response => {
                const postsData = response.data.posts;
                setPosts(postsData);
            })
            .catch(error => {
                console.error('Error fetching posts:', error);
            });
    }

    if (postsQuery.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h1>Loading...</h1>
                    </div>
                </div>
            </div>
        )
    }


    return (
        <>
            <div className="container capitalize">
                <div className="row justify-content-center align-items-center">
                    {postss?.map((post, index) => (
                        <div className={`col-4 ${index % 3 === 0 ? 'my-5' : ''}`}>
                            <Link to={post.id.toString()} key={post.id}>
                                <div className="row">
                                    <div className="col px-3">
                                        <img className="linkto" src={`https://picsum.photos/300/300?random=${post.id}`} alt="" />
                                    </div>

                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
