import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Clock, User, Calendar, Tag, ArrowLeft } from 'lucide-react';
import API from '../api/axios';

export const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      try {
        const { data } = await API.get(`/blog/${slug}`);
        if (data.success && data.data) {
          setPost(data.data);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [slug]);

  if (loading) {
    return <div className="pt-32 text-center text-xs font-bold text-slate-400">Loading travel article...</div>;
  }

  if (!post) {
    return <div className="pt-32 text-center text-xs font-bold text-slate-400">Article not found.</div>;
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-slate-50 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700">
          <ArrowLeft className="w-4 h-4" /> Back to All Articles
        </Link>

        <div className="space-y-4">
          <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-emerald-100 text-emerald-800">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">{post.title}</h1>

          <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-2 border-t border-b border-slate-200 py-3">
            <span className="flex items-center gap-1"><User className="w-4 h-4 text-emerald-600" /> {post.author || 'Dream Miles Team'}</span>
            <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-emerald-600" /> {post.readTime}</span>
            <span className="flex items-center gap-1"><Calendar className="w-4 h-4 text-emerald-600" /> {new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-lg bg-slate-900">
          <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover" />
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-slate-800 text-sm leading-relaxed whitespace-pre-line space-y-4 font-normal">
          {post.content}
        </div>
      </div>
    </div>
  );
};
