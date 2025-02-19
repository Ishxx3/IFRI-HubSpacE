import React, { useState } from 'react';
import { Users, MessageSquare, ThumbsUp, Share2, Image, Send, Search, UserPlus, Hash, UserCheck, UserX } from 'lucide-react';

interface Post {
  id: number;
  author: string;
  formation: string;
  content: string;
  likes: number;
  comments: Comment[];
  time: string;
  isAssociation?: boolean;
  associationName?: string;
  image?: string;
}

interface Comment {
  id: number;
  author: string;
  content: string;
  time: string;
}

interface Community {
  id: number;
  name: string;
  description: string;
  members: number;
  isJoined: boolean;
}

interface Friend {
  id: number;
  name: string;
  formation: string;
  status: 'friend' | 'pending' | 'none';
  avatar?: string;
}

const SAMPLE_FRIENDS: Friend[] = [
  {
    id: 1,
    name: "Alice Martin",
    formation: "Internet et Multimedia",
    status: "friend"
  },
  {
    id: 2,
    name: "John Doe",
    formation: "Génie Logiciel",
    status: "friend"
  },
  {
    id: 3,
    name: "Marie Claire",
    formation: "Sécurité Informatique",
    status: "pending"
  }
];

const SAMPLE_COMMUNITIES: Community[] = [
  {
    id: 1,
    name: "Club Informatique IFRI",
    description: "Le club officiel d'informatique de l'IFRI",
    members: 120,
    isJoined: true
  },
  {
    id: 2,
    name: "IFRI Entrepreneurs",
    description: "Communauté des entrepreneurs de l'IFRI",
    members: 85,
    isJoined: false
  },
  {
    id: 3,
    name: "Cybersecurity Club",
    description: "Passionnés de cybersécurité",
    members: 95,
    isJoined: false
  }
];

const SAMPLE_POSTS: Post[] = [
  {
    id: 1,
    author: 'Alice Martin',
    formation: 'Internet et Multimedia',
    content: 'Qui serait intéressé par une session de révision pour le cours de React ce weekend?',
    likes: 15,
    comments: [
      {
        id: 1,
        author: 'John Doe',
        content: 'Je suis partant !',
        time: '1h'
      }
    ],
    time: '2h'
  },
  {
    id: 2,
    author: 'Club Informatique IFRI',
    formation: '',
    content: 'Rejoignez-nous pour notre prochain hackathon ! Inscriptions ouvertes.',
    likes: 32,
    comments: [],
    time: '5h',
    isAssociation: true,
    associationName: 'Club Informatique',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3'
  }
];

export function Community() {
  const [posts, setPosts] = useState<Post[]>(SAMPLE_POSTS);
  const [communities, setCommunities] = useState<Community[]>(SAMPLE_COMMUNITIES);
  const [friends, setFriends] = useState<Friend[]>(SAMPLE_FRIENDS);
  const [newPost, setNewPost] = useState('');
  const [showComments, setShowComments] = useState<number | null>(null);
  const [newComment, setNewComment] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'feed' | 'communities' | 'friends' | 'search'>('feed');

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const handleAddComment = (postId: number) => {
    if (!newComment.trim()) return;

    setPosts(posts.map(post => 
      post.id === postId ? {
        ...post,
        comments: [...post.comments, {
          id: Date.now(),
          author: 'Vous',
          content: newComment,
          time: 'à l\'instant'
        }]
      } : post
    ));
    setNewComment('');
  };

  const handleNewPost = () => {
    if (!newPost.trim()) return;

    const newPostObj: Post = {
      id: Date.now(),
      author: 'Vous',
      formation: 'Étudiant',
      content: newPost,
      likes: 0,
      comments: [],
      time: 'à l\'instant'
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  const handleJoinCommunity = (communityId: number) => {
    setCommunities(communities.map(community =>
      community.id === communityId
        ? { ...community, isJoined: !community.isJoined, members: community.isJoined ? community.members - 1 : community.members + 1 }
        : community
    ));
  };

  const handleFriendAction = (friendId: number, action: 'accept' | 'remove') => {
    setFriends(friends.map(friend =>
      friend.id === friendId
        ? { ...friend, status: action === 'accept' ? 'friend' : 'none' }
        : friend
    ));
  };

  const filteredCommunities = communities.filter(community =>
    community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    community.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredFriends = friends.filter(friend =>
    friend.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    friend.formation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex flex-wrap gap-4 mb-6">
        <button
          onClick={() => setActiveTab('feed')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'feed'
              ? 'bg-[#1a237e] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Fil d'actualité
        </button>
        <button
          onClick={() => setActiveTab('communities')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'communities'
              ? 'bg-[#1a237e] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Communautés
        </button>
        <button
          onClick={() => setActiveTab('friends')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'friends'
              ? 'bg-[#1a237e] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Amis
        </button>
        <button
          onClick={() => setActiveTab('search')}
          className={`px-4 py-2 rounded-lg font-medium ${
            activeTab === 'search'
              ? 'bg-[#1a237e] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-50'
          }`}
        >
          Recherche
        </button>
      </div>

      {/* Search Bar - Always visible */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={
            activeTab === 'communities' ? "Rechercher des communautés..." :
            activeTab === 'friends' ? "Rechercher des amis..." :
            "Rechercher..."
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#1a237e] focus:border-transparent"
        />
      </div>

      {activeTab === 'feed' && (
        <div className="space-y-6">
          {/* New Post Form */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              placeholder="Partagez quelque chose avec la communauté..."
              className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-[#1a237e] focus:border-transparent"
              rows={3}
            />
            <div className="flex justify-between items-center mt-3">
              <button className="flex items-center text-gray-600 hover:text-[#1a237e]">
                <Image className="h-5 w-5 mr-2" />
                Ajouter une image
              </button>
              <button
                onClick={handleNewPost}
                className="bg-[#1a237e] text-white px-4 py-2 rounded-lg hover:bg-primary-hover transition-colors"
              >
                Publier
              </button>
            </div>
          </div>

          {/* Posts List */}
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start space-x-4">
                <div className="h-12 w-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center">
                  <Users className="h-6 w-6 text-[#1a237e]" />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {post.isAssociation ? post.associationName : post.author}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {post.formation && `${post.formation} • `}{post.time}
                      </p>
                    </div>
                  </div>
                  
                  <p className="mt-3 text-gray-600">{post.content}</p>
                  
                  {post.image && (
                    <img 
                      src={post.image} 
                      alt="Post" 
                      className="mt-3 rounded-lg w-full h-48 object-cover"
                    />
                  )}
                  
                  <div className="mt-4 flex items-center space-x-6">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-[#1a237e]"
                    >
                      <ThumbsUp className="h-5 w-5" />
                      <span>{post.likes}</span>
                    </button>
                    <button
                      onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-[#1a237e]"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>{post.comments.length}</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-500 hover:text-[#1a237e]">
                      <Share2 className="h-5 w-5" />
                      <span>Partager</span>
                    </button>
                  </div>

                  {/* Comments Section */}
                  {showComments === post.id && (
                    <div className="mt-4 space-y-4">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between">
                            <span className="font-medium">{comment.author}</span>
                            <span className="text-sm text-gray-500">{comment.time}</span>
                          </div>
                          <p className="text-gray-600 mt-1">{comment.content}</p>
                        </div>
                      ))}
                      
                      {/* New Comment Form */}
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          placeholder="Ajouter un commentaire..."
                          className="flex-1 rounded-lg border-gray-300 focus:ring-[#1a237e] focus:border-[#1a237e]"
                        />
                        <button
                          onClick={() => handleAddComment(post.id)}
                          className="bg-[#1a237e] text-white p-2 rounded-lg hover:bg-primary-hover"
                        >
                          <Send className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'communities' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommunities.map(community => (
            <div key={community.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-12 w-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center">
                    <Hash className="h-6 w-6 text-[#1a237e]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{community.name}</h3>
                    <p className="text-sm text-gray-500">{community.members} membres</p>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4">{community.description}</p>
              
              <button
                onClick={() => handleJoinCommunity(community.id)}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  community.isJoined
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : 'bg-[#1a237e] text-white hover:bg-primary-hover'
                }`}
              >
                <UserPlus className="h-5 w-5" />
                <span>{community.isJoined ? 'Quitter' : 'Rejoindre'}</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'friends' && (
        <div className="space-y-4">
          {filteredFriends.map(friend => (
            <div key={friend.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-12 w-12 rounded-full bg-[#1a237e]/10 flex items-center justify-center">
                    <Users className="h-6 w-6 text-[#1a237e]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{friend.name}</h3>
                    <p className="text-sm text-gray-500">{friend.formation}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {friend.status === 'pending' ? (
                    <>
                      <button
                        onClick={() => handleFriendAction(friend.id, 'accept')}
                        className="bg-[#1a237e] text-white px-3 py-1 rounded-lg hover:bg-primary-hover transition-colors"
                      >
                        <UserCheck className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleFriendAction(friend.id, 'remove')}
                        className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg hover:bg-gray-200 transition-colors"
                      >
                        <UserX className="h-5 w-5" />
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleFriendAction(friend.id, 'remove')}
                      className="text-gray-500 hover:text-red-500 transition-colors"
                    >
                      <UserX className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'search' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Search Results - Communities */}
            {filteredCommunities.length > 0 && (
              <div className="col-span-full">
                <h3 className="text-lg font-semibold mb-4">Communautés</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredCommunities.map(community => (
                    <div key={community.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-center space-x-3 mb-2">
                        <Hash className="h-5 w-5 text-[#1a237e]" />
                        <h4 className="font-medium">{community.name}</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{community.description}</p>
                      <button
                        onClick={() => handleJoinCommunity(community.id)}
                        className={`w-full flex items-center justify-center space-x-2 px-3 py-1 rounded-lg text-sm transition-colors ${
                          community.isJoined
                            ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            : 'bg-[#1a237e] text-white hover:bg-primary-hover'
                        }`}
                      >
                        <UserPlus className="h-4 w-4" />
                        <span>{community.isJoined ? 'Quitter' : 'Rejoindre'}</span>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Search Results - Friends */}
            {filteredFriends.length > 0 && (
              <div className="col-span-full">
                <h3 className="text-lg font-semibold mb-4">Étudiants</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredFriends.map(friend => (
                    <div key={friend.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Users className="h-5 w-5 text-[#1a237e]" />
                          <div>
                            <h4 className="font-medium">{friend.name}</h4>
                            <p className="text-sm text-gray-500">{friend.formation}</p>
                          </div>
                        </div>
                        {friend.status === 'none' && (
                          <button
                            onClick={() => handleFriendAction(friend.id, 'accept')}
                            className="bg-[#1a237e] text-white px-3 py-1 rounded-lg text-sm hover:bg-primary-hover transition-colors"
                          >
                            <UserPlus className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {filteredCommunities.length === 0 && filteredFriends.length === 0 && (
              <div className="col-span-full text-center py-8 text-gray-500">
                Aucun résultat trouvé pour "{searchTerm}"
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}