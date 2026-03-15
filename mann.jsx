import { useState, useRef } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');`;

const COLLEGES = [
  "Amity Mumbai", "IIT Bombay", "BITS Pilani", "DU North Campus",
  "Fergusson Pune", "Christ Bangalore", "Presidency Kolkata", "Other"
];

const EMOJI_REACTIONS = ["🫂", "💙", "💫", "🥺", "🤝"];

const ANON_NAMES = [
  "a quiet soul", "someone at 2am", "a tired third year",
  "a hostel window", "an empty chai cup", "a dog-eared notebook",
  "the last bench", "a missed call", "a Sunday feeling",
  "a half-written text"
];

const SAMPLE_POSTS = [
  {
    id: 1, college: "Amity Mumbai", batch: "2nd Year",
    text: "I smile and laugh in college every day. No one knows I cry in the bathroom between lectures. I don't even know why anymore.",
    reactions: { "🫂": 34, "💙": 21, "💫": 18, "🥺": 45, "🤝": 7 },
    solidarity: 89, time: "2h ago", anonName: "a quiet soul"
  },
  {
    id: 2, college: "IIT Bombay", batch: "3rd Year",
    text: "Called home today just to hear my mom's voice. Didn't say anything was wrong. She knew anyway. I hate that she knew.",
    reactions: { "🫂": 67, "💙": 43, "💫": 12, "🥺": 98, "🤝": 3 },
    solidarity: 203, time: "4h ago", anonName: "a missed call"
  },
  {
    id: 3, college: "BITS Pilani", batch: "1st Year",
    text: "Everyone here seems to already have a friend group. I eat alone and pretend I'm busy on my phone. It's been 4 months.",
    reactions: { "🫂": 112, "💙": 89, "💫": 34, "🥺": 156, "🤝": 22 },
    solidarity: 413, time: "6h ago", anonName: "the last bench"
  },
  {
    id: 4, college: "DU North Campus", batch: "2nd Year",
    text: "Parents think I'm thriving. Rank drop se itna dar lag raha hai that I haven't opened my results yet. It's been 3 days.",
    reactions: { "🫂": 78, "💙": 45, "💫": 56, "🥺": 89, "🤝": 12 },
    solidarity: 280, time: "8h ago", anonName: "a half-written text"
  },
];

const REFLECTION_MAP = [
  { keys: ["smile","laugh","pretend","nobody knows","mask","fake","fine"], msgs: [
    "The weight of holding it together is real — you don't always have to.",
    "Smiling through it takes more strength than anyone around you knows.",
    "You don't owe anyone a performance of being okay."
  ]},
  { keys: ["alone","no one","lonely","eat alone","nobody","isolated","left out","friend group"], msgs: [
    "Feeling unseen in a crowded room is one of the loneliest feelings there is.",
    "The silence around you doesn't mean you don't matter.",
    "You are not the only one eating alone and pretending to be busy."
  ]},
  { keys: ["mom","dad","parents","home","family","homesick","miss","called home"], msgs: [
    "Missing home isn't weakness — it means you came from somewhere full of love.",
    "The distance between you and home is real, and so is the ache.",
    "They love you even across the distance — and you, them."
  ]},
  { keys: ["marks","result","cgpa","rank","exam","fail","grade","score"], msgs: [
    "Your worth was never a number on a paper.",
    "One result doesn't write your whole story — not even close.",
    "The pressure you're carrying right now is heavy, and it's okay to feel that."
  ]},
  { keys: ["tired","exhausted","cry","numb","empty","can't"], msgs: [
    "Being this tired means you've been carrying a lot for a long time.",
    "It's okay to not be okay — you don't have to explain it.",
    "Some days just surviving is enough. Today counts."
  ]},
  { keys: ["scared","anxious","nervous","worried","fear","panic","stress","overthink","dar"], msgs: [
    "That feeling in your chest is real — it makes sense given what you're going through.",
    "Worry makes everything feel bigger at night. You are not alone in this.",
    "You are not overreacting. What you feel is valid."
  ]},
];

const DEFAULTS = [
  "What you're feeling is real, and you're not carrying it alone.",
  "Thank you for saying this out loud — that takes courage.",
  "Someone out there reads this and thinks: me too.",
  "You matter more than you know right now.",
  "This feeling is real. You are seen here.",
  "It takes strength to say the thing you haven't said anywhere else.",
];

function getSmartReflection(text) {
  const t = text.toLowerCase();
  for (const { keys, msgs } of REFLECTION_MAP) {
    if (keys.some(k => t.includes(k))) {
      return msgs[Math.floor(Math.random() * msgs.length)];
    }
  }
  return DEFAULTS[Math.floor(Math.random() * DEFAULTS.length)];
}

const css = `
${FONTS}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --bg:#0F0E0C;
  --surface:#181714;
  --surface2:#201E1A;
  --border:#2A2723;
  --ink:#F0EDE8;
  --soft:#8A8480;
  --softer:#4A4744;
  --amber:#D4863A;
  --amber-dim:#3D2710;
  --green:#3A8A5A;
}
html,body{background:var(--bg);font-family:'Outfit',sans-serif;color:var(--ink);}
.app{max-width:430px;margin:0 auto;min-height:100vh;background:var(--bg);display:flex;flex-direction:column;}
.header{padding:52px 24px 0;position:sticky;top:0;z-index:50;background:linear-gradient(to bottom,var(--bg) 80%,transparent);padding-bottom:20px;}
.header-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px;}
.logo{font-family:'Fraunces',serif;font-weight:300;font-size:32px;color:var(--ink);letter-spacing:-0.5px;}
.logo span{font-style:italic;color:var(--amber);}
.tagline{font-size:12px;color:var(--soft);letter-spacing:.5px;line-height:1.5;}
.post-btn{background:var(--amber);color:#0F0E0C;border:none;padding:10px 18px;font-family:'Outfit',sans-serif;font-size:11px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;cursor:pointer;flex-shrink:0;transition:opacity .2s,transform .15s;}
.post-btn:hover{opacity:.85;}
.post-btn:active{transform:scale(.97);}
.filter-row{display:flex;gap:8px;padding:16px 24px 0;overflow-x:auto;scrollbar-width:none;}
.filter-row::-webkit-scrollbar{display:none;}
.filter-chip{flex-shrink:0;background:transparent;border:1px solid var(--border);padding:7px 14px;cursor:pointer;font-family:'Outfit',sans-serif;font-size:11px;color:var(--soft);letter-spacing:.5px;transition:all .2s;white-space:nowrap;}
.filter-chip.on{border-color:var(--amber);color:var(--amber);background:var(--amber-dim);}
.filter-chip:hover:not(.on){border-color:var(--softer);color:var(--ink);}
.feed{padding:20px 24px 120px;display:flex;flex-direction:column;gap:2px;}
.post{background:var(--surface);border:1px solid var(--border);padding:20px;margin-bottom:12px;animation:slideUp .4s cubic-bezier(.25,.8,.25,1) both;position:relative;overflow:hidden;}
.post::before{content:'';position:absolute;top:0;left:0;width:3px;height:100%;background:var(--amber);opacity:0;transition:opacity .2s;}
.post:hover::before{opacity:.4;}
@keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.post-meta{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
.post-who{font-size:11px;color:var(--soft);letter-spacing:.3px;}
.post-who strong{color:var(--amber);font-weight:400;}
.post-time{font-size:10px;color:var(--softer);}
.post-text{font-family:'Fraunces',serif;font-weight:300;font-size:17px;line-height:1.6;color:var(--ink);margin-bottom:16px;}
.reflection{background:var(--surface2);border-left:2px solid var(--amber);padding:12px 14px;margin-bottom:16px;animation:fadeIn .5s ease both;}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.reflection-label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--amber);margin-bottom:6px;}
.reflection-text{font-size:13px;color:var(--soft);line-height:1.6;font-style:italic;}
.post-actions{display:flex;align-items:center;justify-content:space-between;}
.solidarity-btn{display:flex;align-items:center;gap:8px;background:transparent;border:1px solid var(--border);padding:8px 14px;cursor:pointer;font-family:'Outfit',sans-serif;font-size:12px;color:var(--soft);transition:all .2s;}
.solidarity-btn:hover{border-color:var(--green);color:#5ABF80;}
.solidarity-btn.pressed{border-color:var(--green);background:rgba(58,138,90,.1);color:#5ABF80;}
.solidarity-btn.pressed .s-icon{animation:heartPop .4s cubic-bezier(.175,.885,.32,1.275);}
@keyframes heartPop{0%{transform:scale(1)}50%{transform:scale(1.5)}100%{transform:scale(1)}}
.s-icon{font-size:14px;display:inline-block;}
.s-count{font-size:12px;}
.emoji-row{display:flex;gap:4px;}
.emoji-btn{background:transparent;border:1px solid var(--border);width:34px;height:34px;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:all .2s;position:relative;flex-direction:column;}
.emoji-btn:hover{border-color:var(--softer);transform:translateY(-2px);}
.emoji-btn.reacted{border-color:var(--amber);background:var(--amber-dim);animation:pop .3s cubic-bezier(.175,.885,.32,1.275);}
@keyframes pop{0%{transform:scale(1)}50%{transform:scale(1.25)}100%{transform:scale(1)}}
.e-count{font-size:8px;color:var(--softer);line-height:1;}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.7);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:flex-end;animation:fadeIn .2s ease;}
.sheet{width:100%;max-width:430px;margin:0 auto;background:var(--surface);border-top:1px solid var(--border);padding:28px 24px 48px;animation:sheetUp .3s cubic-bezier(.25,.8,.25,1) both;}
@keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
.sheet-title{font-family:'Fraunces',serif;font-weight:300;font-size:22px;color:var(--ink);margin-bottom:4px;}
.sheet-sub{font-size:12px;color:var(--soft);margin-bottom:24px;line-height:1.5;}
.select{width:100%;background:var(--surface2);border:1px solid var(--border);padding:12px 14px;font-family:'Outfit',sans-serif;font-size:14px;color:var(--ink);outline:none;margin-bottom:12px;appearance:none;cursor:pointer;}
.select option{background:var(--surface2);}
.compose-area{width:100%;background:var(--surface2);border:1px solid var(--border);border-bottom:2px solid var(--border);padding:14px;outline:none;resize:none;font-family:'Fraunces',serif;font-weight:300;font-size:17px;color:var(--ink);line-height:1.6;min-height:140px;transition:border-color .2s;margin-bottom:8px;}
.compose-area::placeholder{color:var(--softer);font-style:italic;}
.compose-area:focus{border-bottom-color:var(--amber);}
.char-count{font-size:11px;color:var(--softer);text-align:right;margin-bottom:20px;}
.char-count.warn{color:var(--amber);}
.sheet-actions{display:flex;gap:10px;}
.btn-cancel{flex:1;background:transparent;border:1px solid var(--border);padding:14px;font-family:'Outfit',sans-serif;font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--soft);cursor:pointer;transition:all .2s;}
.btn-cancel:hover{border-color:var(--softer);color:var(--ink);}
.btn-post{flex:2;background:var(--amber);border:none;padding:14px;font-family:'Outfit',sans-serif;font-size:12px;font-weight:500;letter-spacing:1.5px;text-transform:uppercase;color:#0F0E0C;cursor:pointer;transition:opacity .2s,transform .15s;}
.btn-post:hover{opacity:.85;}
.btn-post:active{transform:scale(.98);}
.btn-post:disabled{opacity:.3;cursor:not-allowed;transform:none;}
.empty{text-align:center;padding:60px 24px;color:var(--softer);}
.empty-icon{font-size:40px;margin-bottom:16px;}
.empty-text{font-family:'Fraunces',serif;font-style:italic;font-size:18px;color:var(--soft);}
.toast{position:fixed;bottom:32px;left:50%;transform:translateX(-50%);background:var(--surface2);border:1px solid var(--border);padding:12px 20px;font-size:13px;color:var(--ink);white-space:nowrap;z-index:200;animation:toastIn .3s ease both;}
@keyframes toastIn{from{opacity:0;transform:translate(-50%,10px)}to{opacity:1;transform:translate(-50%,0)}}
.bottom-glow{position:fixed;bottom:0;left:50%;transform:translateX(-50%);width:100%;max-width:430px;height:80px;background:linear-gradient(to top,var(--bg),transparent);pointer-events:none;z-index:40;}
.reflect-btn{background:none;border:none;cursor:pointer;font-size:11px;color:var(--softer);letter-spacing:1px;text-transform:uppercase;margin-bottom:14px;padding:0;display:block;transition:color .2s;}
.reflect-btn:hover{color:var(--amber);}
.listening{font-size:13px;color:var(--softer);font-style:italic;margin-bottom:14px;animation:pulse 1.2s ease-in-out infinite;}
@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}
`;

export default function Mann() {
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [filter, setFilter] = useState("All");
  const [composing, setComposing] = useState(false);
  const [text, setText] = useState("");
  const [college, setCollege] = useState("");
  const [batch, setBatch] = useState("");
  const [myReactions, setMyReactions] = useState({});
  const [mySolidarity, setMySolidarity] = useState({});
  const [toast, setToast] = useState(null);
  const [posting, setPosting] = useState(false);
  const [reflections, setReflections] = useState({});
  const toastRef = useRef(null);

  function showToast(msg) {
    setToast(msg);
    clearTimeout(toastRef.current);
    toastRef.current = setTimeout(() => setToast(null), 2500);
  }

  function toggleSolidarity(id) {
    setMySolidarity(prev => {
      const on = !prev[id];
      setPosts(ps => ps.map(p => p.id === id ? { ...p, solidarity: p.solidarity + (on ? 1 : -1) } : p));
      if (on) showToast("They know they're not alone 💙");
      return { ...prev, [id]: on };
    });
  }

  function toggleEmoji(postId, emoji) {
    const key = `${postId}-${emoji}`;
    setMyReactions(prev => {
      const on = !prev[key];
      setPosts(ps => ps.map(p => {
        if (p.id !== postId) return p;
        return { ...p, reactions: { ...p.reactions, [emoji]: (p.reactions[emoji] || 0) + (on ? 1 : -1) } };
      }));
      return { ...prev, [key]: on };
    });
  }

  function triggerReflection(postId, postText) {
    if (reflections[postId]) return;
    setReflections(prev => ({ ...prev, [postId]: "loading" }));
    setTimeout(() => {
      const msg = getSmartReflection(postText);
      setReflections(prev => ({ ...prev, [postId]: msg }));
    }, 900);
  }

  function submitPost() {
    if (!text.trim() || text.length > 280) return;
    setPosting(true);
    const anonName = ANON_NAMES[Math.floor(Math.random() * ANON_NAMES.length)];
    const newPost = {
      id: Date.now(),
      college: college || "Anonymous College",
      batch: batch || "Student",
      text: text.trim(),
      reactions: { "🫂": 0, "💙": 0, "💫": 0, "🥺": 0, "🤝": 0 },
      solidarity: 0,
      time: "just now",
      anonName,
    };
    setPosts(prev => [newPost, ...prev]);
    setText(""); setCollege(""); setBatch("");
    setComposing(false);
    setPosting(false);
    showToast("Posted. You're heard. 🤍");
    setTimeout(() => triggerReflection(newPost.id, newPost.text), 1000);
  }

  const filtered = filter === "All" ? posts : posts.filter(p => p.college === filter);
  const colleges = ["All", ...new Set(posts.map(p => p.college))];

  return (
    <>
      <style>{css}</style>
      <div className="app">

        <div className="header">
          <div className="header-top">
            <div>
              <div className="logo">ma<span>nn</span></div>
              <div className="tagline">say what you can't say anywhere else</div>
            </div>
            <button className="post-btn" onClick={() => setComposing(true)}>+ Vent</button>
          </div>
        </div>

        <div className="filter-row">
          {colleges.map(c => (
            <button key={c} className={`filter-chip ${filter === c ? "on" : ""}`} onClick={() => setFilter(c)}>
              {c}
            </button>
          ))}
        </div>

        <div className="feed">
          {filtered.length === 0 && (
            <div className="empty">
              <div className="empty-icon">🤫</div>
              <div className="empty-text">Nothing yet. Be the first to speak.</div>
            </div>
          )}
          {filtered.map((post, i) => (
            <div key={post.id} className="post" style={{ animationDelay: `${i * .06}s` }}>
              <div className="post-meta">
                <div className="post-who">
                  <strong>{post.college}</strong> · {post.batch} · {post.anonName}
                </div>
                <div className="post-time">{post.time}</div>
              </div>

              <div className="post-text">"{post.text}"</div>

              {!reflections[post.id] && (
                <button className="reflect-btn" onClick={() => triggerReflection(post.id, post.text)}>
                  ◎ reflect
                </button>
              )}
              {reflections[post.id] === "loading" && (
                <div className="listening">listening...</div>
              )}
              {reflections[post.id] && reflections[post.id] !== "loading" && (
                <div className="reflection">
                  <div className="reflection-label">◎ reflection</div>
                  <div className="reflection-text">{reflections[post.id]}</div>
                </div>
              )}

              <div className="post-actions">
                <button
                  className={`solidarity-btn ${mySolidarity[post.id] ? "pressed" : ""}`}
                  onClick={() => toggleSolidarity(post.id)}
                >
                  <span className="s-icon">{mySolidarity[post.id] ? "💙" : "🫂"}</span>
                  <span className="s-count">I feel this too · {post.solidarity}</span>
                </button>
                <div className="emoji-row">
                  {EMOJI_REACTIONS.map(e => {
                    const key = `${post.id}-${e}`;
                    const count = post.reactions[e] || 0;
                    return (
                      <button
                        key={e}
                        className={`emoji-btn ${myReactions[key] ? "reacted" : ""}`}
                        onClick={() => toggleEmoji(post.id, e)}
                      >
                        <span>{e}</span>
                        {count > 0 && <span className="e-count">{count > 99 ? "99+" : count}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bottom-glow" />

        {composing && (
          <div className="overlay" onClick={e => { if (e.target.className === "overlay") setComposing(false); }}>
            <div className="sheet">
              <div className="sheet-title">Say it <em>anonymously.</em></div>
              <div className="sheet-sub">No name. No photo. No judgment. Just your words.</div>
              <select className="select" value={college} onChange={e => setCollege(e.target.value)}>
                <option value="">Select your college (optional)</option>
                {COLLEGES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <select className="select" value={batch} onChange={e => setBatch(e.target.value)}>
                <option value="">Select your year (optional)</option>
                {["1st Year", "2nd Year", "3rd Year", "4th Year", "PG"].map(b => <option key={b} value={b}>{b}</option>)}
              </select>
              <textarea
                className="compose-area"
                placeholder="What's on your mind? This is your space..."
                value={text}
                onChange={e => setText(e.target.value)}
                maxLength={300}
                autoFocus
              />
              <div className={`char-count ${text.length > 240 ? "warn" : ""}`}>
                {text.length}/280
              </div>
              <div className="sheet-actions">
                <button className="btn-cancel" onClick={() => setComposing(false)}>Cancel</button>
                <button className="btn-post" onClick={submitPost} disabled={!text.trim() || text.length > 280 || posting}>
                  {posting ? "Posting..." : "Post Anonymously"}
                </button>
              </div>
            </div>
          </div>
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}
