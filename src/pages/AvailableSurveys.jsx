import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../lib/api';

const surveyIcons = ['📋', '📝', '📊', '🗂️', '📌', '📎'];
const surveyColors = [
  { bg: '#EEF2FF', border: '#4F46E5', icon: '#4F46E5' },
  { bg: '#F0FDF4', border: '#16A34A', icon: '#16A34A' },
  { bg: '#FFF7ED', border: '#EA580C', icon: '#EA580C' },
  { bg: '#FDF4FF', border: '#9333EA', icon: '#9333EA' },
  { bg: '#F0F9FF', border: '#0284C7', icon: '#0284C7' },
  { bg: '#FFF1F2', border: '#E11D48', icon: '#E11D48' },
];

export default function AvailableSurveys() {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    api.surveys.list().then(all => {
      setSurveys(all.filter(s => s.status === 'published'));
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-24 gap-3">
      <div className="w-10 h-10 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
      <p className="text-gray-400 text-sm">Loading surveys...</p>
    </div>
  );

  return (
    <div>
      {/* Welcome Banner */}
      <div className="rounded-2xl p-6 sm:p-8 mb-8 text-white relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%)' }}>
        <div className="relative z-10">
          <div className="text-3xl mb-3">👋</div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Welcome to SimpleSurvey</h1>
          <p className="text-indigo-200 text-sm sm:text-base">
            Choose a survey below to share your feedback. It only takes a few minutes!
          </p>
          <div className="flex items-center gap-2 mt-4">
            <div className="bg-white/20 rounded-full px-3 py-1 text-xs font-medium">
              {surveys.length} active {surveys.length === 1 ? 'survey' : 'surveys'}
            </div>
          </div>
        </div>
        {/* Decorative circles */}
        <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} />
        <div className="absolute -right-4 -bottom-8 w-24 h-24 rounded-full"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }} />
      </div>

      {surveys.length === 0 ? (
        <div className="text-center py-24">
          <div className="text-5xl mb-4">🔍</div>
          <h2 className="text-lg font-semibold text-gray-700 mb-2">No surveys available</h2>
          <p className="text-gray-400 text-sm">Check back later for new surveys.</p>
        </div>
      ) : (
        <>
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-4">
            Available surveys
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {surveys.map((s, i) => {
              const color = surveyColors[i % surveyColors.length];
              const icon = surveyIcons[i % surveyIcons.length];
              return (
                <div
                  key={s.id}
                  className="card-hover bg-white rounded-2xl overflow-hidden cursor-pointer"
                  style={{
                    border: '0.5px solid #E5E7EB',
                    borderTop: `4px solid ${color.border}`,
                  }}
                  onClick={() => navigate(`/surveys/${s.id}/take`)}>
                  <div className="p-5">
                    {/* Icon */}
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-4"
                      style={{ backgroundColor: color.bg }}>
                      {icon}
                    </div>
                    {/* Title */}
                    <h2 className="text-base font-semibold text-gray-800 mb-2">{s.title}</h2>
                    {/* Description */}
                    {s.description && (
                      <p className="text-sm text-gray-500 line-clamp-2 mb-4">{s.description}</p>
                    )}
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-3"
                      style={{ borderTop: '0.5px solid #F3F4F6' }}>
                      <span className="text-xs text-gray-400">Tap to begin</span>
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                        style={{ backgroundColor: color.border }}>
                        →
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
