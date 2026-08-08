import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle2, User, Send } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import API from '../api/axios';

export const ReviewSection = ({ packageId, reviews = [], onReviewAdded }) => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      showError('Please sign in to write a review');
      return;
    }

    if (!title.trim() || !comment.trim()) {
      showError('Please fill out review title and comment');
      return;
    }

    setLoading(true);
    try {
      const { data } = await API.post('/reviews', {
        packageId,
        rating,
        title,
        comment,
      });

      if (data.success) {
        showSuccess('Review submitted successfully!');
        setTitle('');
        setComment('');
        if (onReviewAdded) onReviewAdded();
      }
    } catch (err) {
      showError(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setLoading(false);
    }
  };

  const avgRating = reviews.length > 0
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : 4.8;

  return (
    <div className="space-y-8 font-sans">
      {/* Review Header & Summary */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <span className="text-4xl font-black text-slate-900">{avgRating}</span>
            <div className="flex items-center gap-0.5 text-amber-400 justify-center mt-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star key={s} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mt-1">
              {reviews.length} Verified Reviews
            </span>
          </div>

          <div className="border-l border-slate-200 pl-4 space-y-1 text-xs text-slate-600">
            <p className="font-bold text-slate-800">Verified Travel Ratings</p>
            <p className="text-[11px] text-slate-500">Only travelers who have completed this tour can submit reviews.</p>
          </div>
        </div>
      </div>

      {/* Submit Review Form */}
      {user && (
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <h4 className="text-sm font-extrabold text-slate-900 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" /> Write a Review
          </h4>

          {/* Rating selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700">Your Rating:</span>
            <div className="flex items-center gap-1 cursor-pointer">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  onClick={() => setRating(star)}
                  className={`w-5 h-5 transition-colors ${
                    star <= rating ? 'text-amber-400 fill-current' : 'text-slate-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Review title (e.g. Unforgettable Rajasthan experience!)"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:border-emerald-500"
          />

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Share your trip story, hotel comfort, guide quality, and activities..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-800 focus:outline-none focus:border-emerald-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2"
          >
            <Send className="w-3.5 h-3.5" />
            {loading ? 'Submitting...' : 'Submit Review'}
          </button>
        </form>
      )}

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r._id} className="p-5 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={r.userAvatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80'}
                  alt={r.userName}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    {r.userName}
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 inline" title="Verified Buyer" />
                  </p>
                  <p className="text-[10px] text-slate-400">{new Date(r.createdAt).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-amber-400">
                {[...Array(r.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
            </div>

            <h5 className="text-xs font-bold text-slate-900">{r.title}</h5>
            <p className="text-xs text-slate-600 leading-relaxed">{r.comment}</p>
          </div>
        ))}

        {reviews.length === 0 && (
          <div className="text-center py-8 text-xs font-medium text-slate-400">
            No reviews submitted yet for this package. Be the first to share your experience!
          </div>
        )}
      </div>
    </div>
  );
};
