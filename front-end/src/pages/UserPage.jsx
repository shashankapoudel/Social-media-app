
import React, { useEffect, useState } from 'react';
import UserHeader from '../components/UserHeader';
import { useParams } from 'react-router-dom';
import useShowToast from '../hooks/useShowToast';
import { Flex, Spinner } from '@chakra-ui/react';
import Post from '../components/Post';
import { useRecoilState } from 'recoil';
import postsAtom from '../atoms/postsAtom'
// import useGetUserProfile from "../hooks/useGetUserProfile";

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useRecoilState(postsAtom);
  const [fetchingPosts, setFetchingPosts] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/users/profile/${username}`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        if (!res.ok) {
          const error = await res.text();
          throw new Error(error);
        }
        const data = await res.json();
        if (data.error) {
          showToast('error', data.error, 'Error');
          return;
        }
        setUser(data.data);
      } catch (error) {
        showToast('error', 'Error while loading user profile');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, [username, showToast]);
  console.log(user)

  useEffect(() => {
    if (!user) return;

    const getPosts = async () => {
      // console.log();
      setFetchingPosts(true);
      try {
        const res = await fetch(`http://localhost:3000/api/posts/user/${username}`, {
          method: 'GET',
        });
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        showToast('error', error.message, 'Error');
        setPosts([]);
      } finally {
        setFetchingPosts(false);
      }
    };

    getPosts();
  }, [user, username, showToast]);
  console.log(posts)

  if (loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    );
  }

  if (!user && !loading) {
    return <h1>User not found</h1>;
  }
  console.log(user);

  return (
    <div>
      <UserHeader user={user} />
      {!fetchingPosts && posts.length === 0 && <h1>User has no posts.</h1>}
      {fetchingPosts && (
        <Flex justifyContent={'center'} my={12}>
          <Spinner size={'xl'} />
        </Flex>
      )}
      {!fetchingPosts && posts.data.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </div>
  );
};

export default UserPage;







