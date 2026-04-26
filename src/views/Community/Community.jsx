import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Community.css";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";

const initialMembers = [
  { id: 1, name: "Priya Sharma",  branch: "CSE", year: "3rd Year", avatar: "PS", badge: "🏆 Top Contributor", online: true,  skills: "React, Node.js",  connections: 42 },
  { id: 2, name: "Rahul Mehta",   branch: "ECE", year: "4th Year", avatar: "RM", badge: "🚀 Placed @ TCS",   online: true,  skills: "C++, DSA",       connections: 38 },
  { id: 3, name: "Sneha Patel",   branch: "IT",  year: "3rd Year", avatar: "SP", badge: "⭐ Active",         online: false, skills: "Python, ML",     connections: 29 },
  { id: 4, name: "Arjun Nair",    branch: "CSE", year: "2nd Year", avatar: "AN", badge: "🌱 New Member",     online: true,  skills: "Java, DBMS",     connections: 11 },
  { id: 5, name: "Divya Reddy",   branch: "MBA", year: "2nd Year", avatar: "DR", badge: "💡 Mentor",         online: false, skills: "HR, Management", connections: 55 },
  { id: 6, name: "Karan Singh",   branch: "CSE", year: "4th Year", avatar: "KS", badge: "🔥 Consistent",    online: true,  skills: "Go, Kubernetes", connections: 33 },
];

const mockPosts = [
  { id: 1, author: "Priya Sharma",  branch: "CSE · 3rd Year", avatar: "PS", time: "2h ago",  likes: 24, comments: 8,  tag: "Interview Tip",  text: "Just cracked my TCS interview! Key tip: focus on aptitude and communication. Practice 20 aptitude questions daily 🎯" },
  { id: 2, author: "Rahul Mehta",   branch: "ECE · 4th Year", avatar: "RM", time: "5h ago",  likes: 18, comments: 5,  tag: "Resource",       text: "Sharing my DSA roadmap that helped me get into Infosys. Arrays → LinkedList → Trees → Graphs. Consistency is key! 📚" },
  { id: 3, author: "Sneha Patel",   branch: "IT · 3rd Year",  avatar: "SP", time: "1d ago",  likes: 41, comments: 12, tag: "Success Story",  text: "Got placed at Wipro! 6 months of prep, 3 mock interviews, and never giving up. You can do it too 🚀" },
  { id: 4, author: "Arjun Nair",    branch: "CSE · 2nd Year", avatar: "AN", time: "1d ago",  likes: 9,  comments: 3,  tag: "Question",       text: "Anyone have resources for system design basics for campus placements? Looking for beginner-friendly material." },
  { id: 5, author: "Divya Reddy",   branch: "MBA · 2nd Year", avatar: "DR", time: "2d ago",  likes: 33, comments: 7,  tag: "Interview Tip",  text: "HR round tips: Research the company, prepare STAR format answers, and always ask thoughtful questions at the end! 💼" },
];

const tagColors = {
  "Interview Tip": { bg: "#ede9fe", color: "#7c3aed" },
  "Resource":      { bg: "#dbeafe", color: "#1d4ed8" },
  "Success Story": { bg: "#dcfce7", color: "#15803d" },
  "Question":      { bg: "#fef9c3", color: "#a16207" },
};

const avatarColors = [
  "linear-gradient(135deg,#8b5cf6,#ec4899)",
  "linear-gradient(135deg,#3b82f6,#06b6d4)",
  "linear-gradient(135deg,#10b981,#84cc16)",
  "linear-gradient(135deg,#f59e0b,#ef4444)",
  "linear-gradient(135deg,#6366f1,#8b5cf6)",
  "linear-gradient(135deg,#ec4899,#f97316)",
];

const Community = ({ form, onLogout }) => {
  const navigate = useNavigate();

  const [posts, setPosts]         = useState(mockPosts);
  const [newPost, setNewPost]     = useState("");
  const [liked, setLiked]         = useState({});
  const [activeTab, setTab]       = useState("feed");
  const [connected, setConnected] = useState({});   // memberId → true/false
  const [msgModal, setMsgModal]   = useState(null);  // member object
  const [msgText, setMsgText]     = useState("");
  const [messages, setMessages]   = useState({});    // memberId → [msgs]
  const [sentToast, setSentToast] = useState("");

  const initials = form.name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts([{
      id: Date.now(), author: form.name,
      branch: `${form.branch} · ${form.year}`,
      avatar: initials, time: "Just now",
      likes: 0, comments: 0, tag: "Question", text: newPost.trim(),
    }, ...posts]);
    setNewPost("");
  };

  const toggleLike = (id) => {
    setLiked((p) => ({ ...p, [id]: !p[id] }));
    setPosts((p) => p.map((post) =>
      post.id === id ? { ...post, likes: post.likes + (liked[id] ? -1 : 1) } : post
    ));
  };

  const handleConnect = (member) => {
    if (connected[member.id]) return;
    setConnected((p) => ({ ...p, [member.id]: true }));
    setSentToast(`✅ Connected with ${member.name}!`);
    setTimeout(() => setSentToast(""), 2500);
  };

  const openMsg = (member) => {
    if (!connected[member.id]) {
      handleConnect(member);
      return;
    }
    setMsgModal(member);
    setMsgText("");
  };

  const sendMsg = () => {
    if (!msgText.trim() || !msgModal) return;
    setMessages((p) => ({
      ...p,
      [msgModal.id]: [...(p[msgModal.id] || []), { from: "me", text: msgText.trim() }],
    }));
    setMsgText("");
    // Simulate reply after 1s
    setTimeout(() => {
      setMessages((p) => ({
        ...p,
        [msgModal.id]: [...(p[msgModal.id] || []),
          { from: msgModal.name, text: "Thanks for reaching out! Let's connect and discuss placement prep 🚀" }
        ],
      }));
    }, 1000);
  };

  return (
    <div className="cm-page">
      <Navbar form={form} onLogout={onLogout} onProfileClick={() => navigate("/profile")} />

      {/* Toast */}
      {sentToast && <div className="cm-toast">{sentToast}</div>}

      {/* Message Modal */}
      {msgModal && (
        <div className="cm-modal-overlay" onClick={() => setMsgModal(null)}>
          <div className="cm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="cm-modal-header">
              <div className="cm-modal-avatar" style={{ background: avatarColors[msgModal.id % avatarColors.length] }}>
                {msgModal.avatar}
              </div>
              <div>
                <p className="cm-modal-name">{msgModal.name}</p>
                <p className="cm-modal-status">
                  <span className={`cm-dot ${msgModal.online ? "cm-dot-on" : "cm-dot-off"}`} />
                  {msgModal.online ? "Online" : "Offline"}
                </p>
              </div>
              <button className="cm-modal-close" onClick={() => setMsgModal(null)}>✕</button>
            </div>

            <div className="cm-modal-messages">
              {(messages[msgModal.id] || []).length === 0 && (
                <p className="cm-modal-empty">Say hi to {msgModal.name.split(" ")[0]}! 👋</p>
              )}
              {(messages[msgModal.id] || []).map((m, i) => (
                <div key={i} className={`cm-msg ${m.from === "me" ? "cm-msg-me" : "cm-msg-them"}`}>
                  {m.text}
                </div>
              ))}
            </div>

            <div className="cm-modal-input-row">
              <input
                className="cm-modal-input"
                placeholder="Type a message..."
                value={msgText}
                onChange={(e) => setMsgText(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMsg()}
                autoFocus
              />
              <button className="cm-modal-send" onClick={sendMsg} disabled={!msgText.trim()}>
                Send →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Banner */}
      <div className="cm-banner">
        <div className="cm-banner-content">
          <h1>👨🎓 Student Community</h1>
          <p>Connect · Share · Grow together with fellow placement aspirants</p>
          <div className="cm-banner-stats">
            <span>👥 {initialMembers.length}+ Members</span>
            <span>💬 {posts.length} Discussions</span>
            <span>🟢 {initialMembers.filter(m => m.online).length} Online Now</span>
          </div>
        </div>
      </div>

      <div className="cm-body">
        {/* Tabs */}
        <div className="cm-tabs">
          {["feed", "members"].map((t) => (
            <button key={t} className={`cm-tab ${activeTab === t ? "cm-tab-active" : ""}`} onClick={() => setTab(t)}>
              {t === "feed" ? "💬 Discussion Feed" : `👥 Members (${initialMembers.length})`}
            </button>
          ))}
        </div>

        {activeTab === "feed" ? (
          <div className="cm-feed-layout">
            {/* Feed */}
            <div className="cm-feed">
              {/* Composer */}
              <div className="cm-composer">
                <div className="cm-composer-avatar">{initials}</div>
                <div className="cm-composer-right">
                  <textarea
                    className="cm-composer-input"
                    placeholder={`Share something, ${form.name.split(" ")[0]}...`}
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    rows={3}
                  />
                  <div className="cm-composer-footer">
                    <span className="cm-composer-hint">💡 Share tips, ask questions, celebrate wins!</span>
                    <button className="cm-post-btn" onClick={handlePost} disabled={!newPost.trim()}>Post</button>
                  </div>
                </div>
              </div>

              {/* Posts */}
              {posts.map((p) => {
                const tc = tagColors[p.tag] || { bg: "#f3f4f6", color: "#374151" };
                return (
                  <div key={p.id} className="cm-post">
                    <div className="cm-post-header">
                      <div className="cm-post-avatar">{p.avatar}</div>
                      <div className="cm-post-meta">
                        <span className="cm-post-author">{p.author}</span>
                        <span className="cm-post-branch">{p.branch} · {p.time}</span>
                      </div>
                      <span className="cm-post-tag" style={{ background: tc.bg, color: tc.color }}>{p.tag}</span>
                    </div>
                    <p className="cm-post-text">{p.text}</p>
                    <div className="cm-post-actions">
                      <button className={`cm-action-btn ${liked[p.id] ? "cm-liked" : ""}`} onClick={() => toggleLike(p.id)}>
                        {liked[p.id] ? "❤️" : "🤍"} {p.likes}
                      </button>
                      <button className="cm-action-btn">💬 {p.comments}</button>
                      <button className="cm-action-btn">🔗 Share</button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sidebar */}
            <div className="cm-sidebar">
              <div className="cm-sidebar-card">
                <h3 className="cm-sidebar-title">🔥 Trending Tags</h3>
                {Object.keys(tagColors).map((tag) => (
                  <span key={tag} className="cm-sidebar-tag" style={{ background: tagColors[tag].bg, color: tagColors[tag].color }}>
                    {tag}
                  </span>
                ))}
              </div>
              <div className="cm-sidebar-card">
                <h3 className="cm-sidebar-title">🟢 Online Now</h3>
                {initialMembers.filter(m => m.online).map((m) => (
                  <div key={m.id} className="cm-sidebar-member">
                    <div className="cm-sm-avatar-wrap">
                      <div className="cm-sm-avatar" style={{ background: avatarColors[m.id % avatarColors.length] }}>{m.avatar}</div>
                      <span className="cm-sm-online-dot" />
                    </div>
                    <div className="cm-sm-info">
                      <p className="cm-sm-name">{m.name}</p>
                      <p className="cm-sm-badge">{m.badge}</p>
                    </div>
                    <button className="cm-sm-msg-btn" onClick={() => openMsg(m)}>
                      {connected[m.id] ? "💬" : "➕"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* Members Tab */
          <div className="cm-members-grid">
            {initialMembers.map((m) => (
              <div key={m.id} className="cm-member-card">
                <div className="cm-mc-avatar-wrap">
                  <div className="cm-mc-avatar" style={{ background: avatarColors[m.id % avatarColors.length] }}>
                    {m.avatar}
                  </div>
                  <span className={`cm-mc-online ${m.online ? "cm-mc-online-on" : "cm-mc-online-off"}`} />
                </div>
                <h3 className="cm-mc-name">{m.name}</h3>
                <p className="cm-mc-branch">{m.branch} · {m.year}</p>
                <p className="cm-mc-skills">{m.skills}</p>
                <span className="cm-mc-badge">{m.badge}</span>
                <p className="cm-mc-connections">{m.connections} connections</p>

                <div className="cm-mc-actions">
                  <button
                    className={`cm-mc-btn-connect ${connected[m.id] ? "cm-mc-btn-connected" : ""}`}
                    onClick={() => handleConnect(m)}
                    disabled={connected[m.id]}
                  >
                    {connected[m.id] ? "✅ Connected" : "➕ Connect"}
                  </button>
                  <button
                    className="cm-mc-btn-msg"
                    onClick={() => openMsg(m)}
                  >
                    💬 Message
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Community;
