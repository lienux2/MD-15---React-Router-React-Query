import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom"

type PostDetail = {
    id: number,
    theme: string;
    madeBy: string;
    description: string;
};

export const Id: React.FC = () => {
    const navigate = useNavigate();
    const [postDetails, setPostDetails] = useState<PostDetail>();
    const { id } = useParams();

    const postsCreateQuery = useQuery({
        queryKey: ["posts", id],
        queryFn: () => fetchPostsById(),
    });

const fetchPostsById = () => {
        axios.get('http://localhost:3001/' + id)
            .then(response => {
                const fetchedPostDetails: PostDetail = response.data.post[0];
                setPostDetails(fetchedPostDetails);
            })
            .catch(error => {
                if (error.response && error.response.status === 404) {
                    console.log('Post not found');
                } else {
                    console.error('Error fetching post details:', error);
                }
            });
        }

        if (postsCreateQuery.isLoading) {
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
            <div className="container">
                <div className="row">
                    <div className="col">
                        <button onClick={() => navigate(-1)}>&lt;&lt; Back</button>
                    </div>
                </div>
            </div>

            <div className="show-info container my-3 ">
                <div className="row justify-content-center align-items-center">
                    {postDetails ? (
                        <>
                            <div className="col-4 d-flex justify-content-center">
                                <img src={`https://picsum.photos/300/300?random=${postDetails.id}`} alt="" />
                            </div>
                            <div className="col-8">
                                <h2>Title for this art is: {postDetails.theme}.</h2>
                                <h4>You can say thank you for this art piece to {postDetails.madeBy}.</h4>
                                <p>What author has to say about this? <br></br>Read below: </p>
                                <p>{postDetails.description}</p>
                            </div>
                        </>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
            </div>
        </>
    )
}