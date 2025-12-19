import { useMutation } from "@tanstack/react-query";
import { createPost } from "../posts/postsApi";

export const useCreatePostMutation = () => useMutation({
    mutationKey: ["createPost"],
    mutationFn: async (data) => {
        return await createPost(data);
    }     
       
});