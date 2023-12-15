import axios from "axios";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

const postSchema = z.object({
  theme: z.string().min(5).max(50),
  madeBy: z.string(),
  description: z.string().min(10).max(250),
})

type posts = z.infer<typeof postSchema>

type AddPostProps = {
  onAddPost: (post: posts) => void;
};

export const Create = ({ onAddPost }: AddPostProps) => {
  const [theme, setTheme] = useState<string>("");
  const [madeBy, setMadeBy] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const queryClient = useQueryClient();

  const addPost = async () => {
    if (theme.trim() !== "" && madeBy.trim() !== "" && description.trim() !== "") {
      const newPost: posts = {
        theme: theme,
        madeBy: madeBy,
        description: description,
      };
      await axios.post('http://localhost:3001/create', newPost)
        .then(response => {
          const addedPost = response.data.post;
          onAddPost(addedPost);
        });

      setTheme("");
      setMadeBy("");
      setDescription("");
    }
  };

  const { mutateAsync: addPostMutation } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    }
  });

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-4 offset-4">
            <form>
              <div className="mb-3">
                <label htmlFor="theme" className="form-label">
                  What title would you like to create for your post?
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="theme"
                  placeholder="Enter title..."
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="madeBy">Made by: </label>
                <input
                  className="form-control"
                  type="text"
                  id="madeBy"
                  placeholder="Enter name of art maker..."
                  value={madeBy}
                  onChange={(e) => setMadeBy(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="description" className="form-label">
                  Add some description about your work:
                </label>
                <textarea
                  className="form-control"
                  id="description"
                  placeholder="Add some description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <button type="submit" onClick={async () => {

                try {
                  await addPostMutation();

                  setTheme('');
                  setMadeBy('');
                  setDescription('');
                } catch (e) {
                  console.log('this is error')
                }
              }}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );

}

