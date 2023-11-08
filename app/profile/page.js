"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Profile from "@components/Profile"

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();

    const [posts, setPosts] = useState([]);

    const handLeEdit = (post) => {
        router.push(`update-prompt?id=${post._id}`)
    }
    const handLeDelete = async (post) => {
        const hasConfirmed = confirm("Are you sure you want to delete this prompt?");
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: 'DELETE'
                });

                const filterdePosts = posts.filter((p) => p._id !== p._id)

                setPosts(filterdePosts);
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        const fetchposts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`);
            const data = await response.json();
            setPosts(data);
        }
        
        if (session?.user.id) fetchposts();
    }, [])

    return (
        <Profile
            name="My"
            desc="welcome to your personalized profile page"
            data={posts}
            handLeEdit={handLeEdit}
            handLeDelete={handLeDelete}
        />
    )
}

export default MyProfile