import { Button, Spinner } from 'flowbite-react';
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import CallToAction from '../components/CallToAction.jsx';
import CommentSection from '../components/CommentSection.jsx';
import PostCard from '../components/PostCard.jsx';

const PostPage = () => {
const {postSlug} = useParams();
const [loading , setLoading] = useState(true)
const [error , setError] = useState(false)
const [post , setPost] = useState(null)
const [recentPosts, setRecentPosts] = useState([])
console.log(post)
useEffect(()=>{
        try {
            const fetchPost = async () => {
            setLoading(true);
            const res = await fetch(`/api/post/getposts/?slug=${postSlug}`);
            const data = await res.json();
            if(!res.ok){
                setError(null);
                setLoading(false);
                return;
            }
            if(res.ok){
                setPost(data.posts[0]);
                setError(null);
                setLoading(false);
            }
        }
        fetchPost();
     } catch (error) {
            console.log(error)
        }
    
},[postSlug])

useEffect(()=> {
    try {
        const fetchRecentPosts = async () => {
            const res = await fetch(`/api/post/getposts?limit=3`)
            const data =await res.json()
            if(res.ok){
                setRecentPosts(data.posts);
            }
        }
        fetchRecentPosts();
    } catch (error) {
        console.log(error)
    }
}, [])
if(loading) return <div className='flex justify-center items-center min-h-screen'><Spinner size='xl'/></div>
  return (
    <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
        <h1 className="text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl">{post && post.title}</h1>
        <Link to={`/search/category=${post && post.category}`} className='self-center mt-5'>
            <Button className='text-teal-500 border
            ' color='gray ' pill size='xs'>
                {post && post.category}
            </Button>
        </Link>
        <img src={post && post.image} alt=               {post && post.slug} className='mt-10 p-3 max-h-[500px] w-full'/>
        <div className='justify-between flex p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs'>
            <span>{post && new Date(post.createdAt).toLocaleDateString()}</span>
            <span className='italic'>{post && (post.content.length /1).toFixed(0)} mins read</span>
        </div>
        <div className='p-3 max-w-2xl mx-auto w-full post-content' dangerouslySetInnerHTML={{__html: post && post.content}}>
        </div>
        <div className=""><CallToAction/></div>
        <div className=""><CommentSection postId={post._id}/></div>
        <div className="flex flex-col justify-center items-center mb-5">
            <h1 className='text-xl font-semibold mt-5 '>
            Recent Articles    
            </h1> 
            <div className='flex flex-col sm:flex-row gap-5 sm:gap-2 mt-5 justify-center'>
                {recentPosts && 
                    recentPosts.map((post)=> (
                        <PostCard key={post._id} post={post}/>
                    ))}
            </div>   
        </div>        
    </main>
  )
}

export default PostPage