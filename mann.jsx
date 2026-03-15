import { useState, useRef, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,wght@0,300;0,400;1,300;1,400&family=Outfit:wght@300;400;500&display=swap');`;

const EMOJI_REACTIONS = ["🫂", "💙", "💫", "🥺", "🤝"];

const ANON_NAMES = [
  "a quiet soul", "someone at 2am", "a tired third year",
  "a hostel window", "an empty chai cup", "a dog-eared notebook",
  "the last bench", "a missed call", "a Sunday feeling",
  "a half-written text", "a window seat", "a crumpled page",
  "an unread message", "a rainy tuesday", "a fading bookmark"
];

// 100 neutral, warm, consoling sentences — truly random, no fixed pattern
const ALL_REFLECTIONS = [
  "What you're feeling is real, and you're not carrying it alone.",
  "Thank you for saying this out loud — that takes courage.",
  "Someone out there reads this and thinks: me too.",
  "You matter more than you know right now.",
  "This feeling is real. You are seen here.",
  "It takes strength to say the thing you haven't said anywhere else.",
  "You are allowed to feel exactly what you're feeling.",
  "The fact that you're still here, still trying — that means something.",
  "Whatever you're going through, you don't have to go through it silently.",
  "Feelings this heavy deserve to be put down somewhere. Glad you put it here.",
  "You are more than the hardest days you're living through.",
  "There is no wrong way to feel what you're feeling.",
  "The world keeps moving and sometimes that's the loneliest thing about it.",
  "You are not too much. You are not too little. You are enough.",
  "Some things don't need to be fixed — they just need to be heard.",
  "Whatever brought you here tonight — you're not alone in it.",
  "Your pain doesn't need a reason to be valid.",
  "The version of you that is struggling right now still deserves kindness.",
  "You've made it through every hard day so far. That's not nothing.",
  "Saying this out loud — even anonymously — is braver than it sounds.",
  "There are more people feeling exactly what you wrote than you'll ever know.",
  "You are not a burden. You are a person having a hard time.",
  "It's okay to not have answers right now. Feeling is enough.",
  "Whatever today was — you survived it. That counts.",
  "This moment will pass. You will still be here.",
  "You are allowed to take up space, even when it doesn't feel that way.",
  "Hard days are not proof that you're failing. They're proof you're human.",
  "The quiet weight you carry — someone out there knows that exact feeling.",
  "You deserve to feel better. That's not too much to want.",
  "Not everything needs to be explained. Sometimes it just hurts.",
  "The courage it takes to admit something hurts is underrated.",
  "You are not alone in this room, even if it feels that way.",
  "Whatever version of okay you can manage today — that's enough.",
  "Something about the way you said this is staying with me.",
  "You put words to something a lot of people can't even name. That matters.",
  "The fact that you feel so much means you care so much. That's not weakness.",
  "Sitting with this feeling instead of running from it is its own kind of brave.",
  "There's someone out there who would understand every word you just wrote.",
  "You are worthy of gentleness, especially from yourself.",
  "Even in the hardest moments, you are still you — and that's worth something.",
  "The things we don't say out loud get heavy. Thank you for setting this one down.",
  "You are not what your worst days say you are.",
  "Feelings aren't facts — but they are real. Yours especially.",
  "What you wrote needed to be written. I'm glad it was.",
  "Being honest about how you feel — even here — is its own kind of healing.",
  "You don't have to have it figured out. You just have to keep going.",
  "The dark doesn't last. Even when it feels like it will.",
  "You are not broken. You are in the middle of something hard.",
  "This too will shift. Not disappear — but shift. And that's enough.",
  "You are not behind. You are on your own path, in your own time.",
  "Whatever you're comparing yourself to — stop. You don't know the full story.",
  "Your feelings deserve more than being suppressed. They deserve space.",
  "The thing you're going through right now will not always feel this big.",
  "You reached out. Even anonymously, that's a step toward feeling less alone.",
  "There is no shame in struggling. There is no shame at all.",
  "You are doing better than you think, even on the days it doesn't feel that way.",
  "The world is harder than it looks from the outside. You're not imagining it.",
  "Your pace is your pace. No one else's timeline applies to you.",
  "You are seen. Not by everyone — but by the people who matter, and by this space.",
  "Some feelings don't need a fix. They just need a witness.",
  "I hope tomorrow feels even one percent lighter than today.",
  "You are not the only one pretending. But you don't have to, not here.",
  "Something you wrote just now will stay with someone who reads it.",
  "You are still standing. That is quietly remarkable.",
  "It's okay to rest. You don't have to earn it.",
  "The weight you're describing — others have felt it too. You're in company.",
  "Whatever you're going through, you don't have to perform being fine here.",
  "The most honest thing you can do is admit when something hurts. You just did.",
  "You are not alone in the 2am feeling. Not even close.",
  "Growth is not linear. Neither is healing. Be patient with yourself.",
  "There is no version of this where you don't matter.",
  "Your story isn't over. This is just a hard chapter.",
  "Even the heaviest things get lighter with time. Hold on.",
  "You are not too sensitive. The world is just sometimes too much.",
  "There is something quietly strong about the person who keeps going anyway.",
  "You showed up today. Even if that's all you did — it counts.",
  "Some days asking for nothing is the bravest thing you can do.",
  "What you feel is not an overreaction. It is a response to something real.",
  "You deserve someone to listen without trying to fix everything. Consider this that.",
  "There's more kindness in the world for you than today is showing.",
  "The hard parts of your life are not the whole of your life.",
  "Whatever broke your heart — it means your heart was open. That's beautiful.",
  "You are more resilient than you're giving yourself credit for right now.",
  "No one has it all together. Not the way it looks from the outside.",
  "You are not defined by your lowest moments.",
  "The version of you that survives this will be proud of how you held on.",
  "Something about what you shared is deeply human. Thank you for sharing it.",
  "You are not invisible here. This space sees you.",
  "The silence after saying something hard is not emptiness — it's relief.",
  "Everyone is carrying something. Yours is no less valid.",
  "You are not alone in feeling like you're the only one who feels this way.",
  "Small steps still move you forward. Even on the hardest days.",
  "Whatever today took from you — you are still here. Still whole.",
  "You are allowed to have a bad day without it meaning something bigger.",
  "The things that keep you up at night are real. So is your strength to face them.",
  "You've survived 100% of your hardest days so far.",
  "Your feelings are valid. Full stop. No justification needed.",
  "There is someone somewhere who would understand every word you just wrote.",
  "This moment does not define you. But your courage to say it out loud — that might.",
];

// Truly random — no keyword matching, just shuffle
function getReflection() {
  return ALL_REFLECTIONS[Math.floor(Math.random() * ALL_REFLECTIONS.length)];
}

function formatTimestamp(ts) {
  const d = new Date(ts);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }) +
    " · " + d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
}

function getCountdown(ts) {
  const msLeft = (ts + 24 * 60 * 60 * 1000) - Date.now();
  if (msLeft <= 0) return null;
  const h = Math.floor(msLeft / (1000 * 60 * 60));
  const m = Math.floor((msLeft % (1000 * 60 * 60)) / (1000 * 60));
  if (h > 0) return `${h}h ${m}m left`;
  return `${m}m left`;
}

const NOW = Date.now();
const H = 60 * 60 * 1000;

const SAMPLE_POSTS = [
  {
    id: 1, college: "Amity Mumbai", year: "2nd Year", course: "BBA",
    text: "I smile and laugh in college every day. No one knows I cry in the bathroom between lectures. I don't even know why anymore.",
    reactions: { "🫂": 4, "💙": 2, "💫": 1, "🥺": 6, "🤝": 1 },
    solidarity: 11, ts: NOW - 1.2 * H, anonName: "a quiet soul"
  },
  {
    id: 2, college: "IIT Bombay", year: "3rd Year", course: "B.Tech CSE",
    text: "Called home today just to hear my mom's voice. Didn't say anything was wrong. She knew anyway. I hate that she knew.",
    reactions: { "🫂": 7, "💙": 3, "💫": 0, "🥺": 9, "🤝": 2 },
    solidarity: 14, ts: NOW - 2.5 * H, anonName: "a missed call"
  },
  {
    id: 3, college: "BITS Pilani", year: "1st Year", course: "B.E.",
    text: "Everyone here seems to already have a friend group. I eat alone and pretend I'm busy on my phone. It's been 4 months.",
    reactions: { "🫂": 9, "💙": 5, "💫": 2, "🥺": 11, "🤝": 3 },
    solidarity: 23, ts: NOW - 3.8 * H, anonName: "the last bench"
  },
  {
    id: 4, college: "DU North Campus", year: "2nd Year", course: "B.Com",
    text: "Parents think I'm thriving. Rank drop se itna dar lag raha hai that I haven't opened my results yet. It's been 3 days.",
    reactions: { "🫂": 5, "💙": 3, "💫": 4, "🥺": 7, "🤝": 1 },
    solidarity: 17, ts: NOW - 4.2 * H, anonName: "a half-written text"
  },
  {
    id: 5, college: "Fergusson Pune", year: "3rd Year", course: "B.Sc Psychology",
    text: "I've started lying to my therapist because I'm scared of what she'll say if I tell the truth. I don't know what to do with that.",
    reactions: { "🫂": 6, "💙": 4, "💫": 0, "🥺": 8, "🤝": 2 },
    solidarity: 19, ts: NOW - 5 * H, anonName: "a crumpled page"
  },
  {
    id: 6, college: "Christ Bangalore", year: "1st Year", course: "BMS",
    text: "First time living away from home. My roommates have each other. I just lie in bed listening to them laugh and feel like glass.",
    reactions: { "🫂": 8, "💙": 6, "💫": 1, "🥺": 10, "🤝": 0 },
    solidarity: 21, ts: NOW - 5.7 * H, anonName: "a window seat"
  },
  {
    id: 7, college: "Jadavpur University", year: "2nd Year", course: "B.E. ECE",
    text: "I got 3 hours of sleep and still failed to understand a single thing in today's lecture. I'm not okay but I said I am seven times today.",
    reactions: { "🫂": 3, "💙": 2, "💫": 1, "🥺": 5, "🤝": 2 },
    solidarity: 9, ts: NOW - 6.3 * H, anonName: "an empty chai cup"
  },
  {
    id: 8, college: "Manipal University", year: "4th Year", course: "MBBS",
    text: "Four years in and I still don't know if I chose this for me or for them. I'm too deep in to say that out loud to anyone I know.",
    reactions: { "🫂": 7, "💙": 5, "💫": 2, "🥺": 6, "🤝": 3 },
    solidarity: 16, ts: NOW - 7 * H, anonName: "a dog-eared notebook"
  },
  {
    id: 9, college: "Miranda House", year: "2nd Year", course: "B.A. English",
    text: "Got asked if I was okay today. First instinct was to lie. Second instinct was to cry. I did the first one. Miss the old me who could do the second.",
    reactions: { "🫂": 5, "💙": 4, "💫": 0, "🥺": 9, "🤝": 1 },
    solidarity: 13, ts: NOW - 8.1 * H, anonName: "a rainy tuesday"
  },
  {
    id: 10, college: "SRM Chennai", year: "3rd Year", course: "B.Tech IT",
    text: "I keep starting sentences with 'when things get better' and I don't even know what better looks like anymore.",
    reactions: { "🫂": 4, "💙": 3, "💫": 1, "🥺": 7, "🤝": 2 },
    solidarity: 12, ts: NOW - 9 * H, anonName: "a fading bookmark"
  },
  {
    id: 11, college: "Presidency Kolkata", year: "1st Year", course: "B.Sc Chemistry",
    text: "Everyone in my family sacrificed something for me to be here. That thought alone makes it impossible to admit I'm struggling.",
    reactions: { "🫂": 8, "💙": 6, "💫": 2, "🥺": 10, "🤝": 4 },
    solidarity: 22, ts: NOW - 10 * H, anonName: "an unread message"
  },
  {
    id: 12, college: "Symbiosis Pune", year: "2nd Year", course: "BBA",
    text: "My confidence was intact when I left home. Six months here and I second-guess everything I say before I say it.",
    reactions: { "🫂": 3, "💙": 2, "💫": 1, "🥺": 4, "🤝": 1 },
    solidarity: 8, ts: NOW - 11 * H, anonName: "a quiet soul"
  },
  {
    id: 13, college: "VIT Vellore", year: "3rd Year", course: "B.Tech Mech",
    text: "I laughed at a meme about not sleeping for 48 hours and then realized that was just my life this week and it wasn't funny.",
    reactions: { "🫂": 2, "💙": 3, "💫": 2, "🥺": 3, "🤝": 1 },
    solidarity: 7, ts: NOW - 12 * H, anonName: "someone at 2am"
  },
  {
    id: 14, college: "TISS Mumbai", year: "PG 1st Year", course: "MSW",
    text: "Studying social work because I wanted to help people. Didn't expect it to also mean sitting with so much pain every single day.",
    reactions: { "🫂": 5, "💙": 4, "💫": 1, "🥺": 6, "🤝": 2 },
    solidarity: 15, ts: NOW - 13 * H, anonName: "a Sunday feeling"
  },
  {
    id: 15, college: "Ashoka University", year: "2nd Year", course: "B.Sc Economics",
    text: "Everyone here seems so sure of themselves. I feel like I snuck in and they'll figure it out eventually.",
    reactions: { "🫂": 4, "💙": 3, "💫": 0, "🥺": 5, "🤝": 2 },
    solidarity: 10, ts: NOW - 14 * H, anonName: "a half-written text"
  },
];

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
.header{padding:52px 24px 0;position:sticky;top:0;z-index:50;background:linear-gradient(to bottom,var(--bg) 85%,transparent);padding-bottom:20px;}
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
.post-meta{margin-bottom:10px;}
.post-meta-top{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:4px;}
.post-who{font-size:11px;color:var(--soft);letter-spacing:.3px;line-height:1.7;}
.post-who strong{color:var(--amber);font-weight:400;}
.post-who .course-tag{color:var(--softer);font-size:10px;}
.post-meta-bottom{display:flex;justify-content:space-between;align-items:center;}
.post-timestamp{font-size:10px;color:var(--softer);}
.post-countdown{font-size:10px;color:var(--softer);letter-spacing:.3px;}
.post-countdown.urgent{color:#B85C5C;}
.post-text{font-family:'Fraunces',serif;font-weight:300;font-size:17px;line-height:1.6;color:var(--ink);margin-bottom:16px;}
.reflection{background:var(--surface2);border-left:2px solid var(--amber);padding:12px 14px;margin-bottom:16px;animation:fadeIn .5s ease both;}
@keyframes fadeIn{from{opacity:0}to{opacity:1}}
.reflection-label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--amber);margin-bottom:6px;}
.reflection-text{font-size:13px;color:var(--soft);line-height:1.6;font-style:italic;}
.post-actions{display:flex;align-items:center;justify-content:space-between;}
.solidarity-btn{display:flex;align-items:center;gap:8px;background:transparent;border:1px solid var(--border);padding:8px 12px;cursor:pointer;font-family:'Outfit',sans-serif;font-size:11px;color:var(--soft);transition:all .2s;}
.solidarity-btn:hover{border-color:var(--green);color:#5ABF80;}
.solidarity-btn.pressed{border-color:var(--green);background:rgba(58,138,90,.1);color:#5ABF80;}
.solidarity-btn.pressed .s-icon{animation:heartPop .4s cubic-bezier(.175,.885,.32,1.275);}
@keyframes heartPop{0%{transform:scale(1)}50%{transform:scale(1.5)}100%{transform:scale(1)}}
.s-icon{font-size:13px;display:inline-block;}
.s-count{font-size:11px;}
.emoji-row{display:flex;gap:4px;}
.emoji-btn{background:transparent;border:1px solid var(--border);width:32px;height:32px;cursor:pointer;font-size:13px;display:flex;align-items:center;justify-content:center;transition:all .2s;position:relative;flex-direction:column;}
.emoji-btn:hover{border-color:var(--softer);transform:translateY(-2px);}
.emoji-btn.reacted{border-color:var(--amber);background:var(--amber-dim);animation:pop .3s cubic-bezier(.175,.885,.32,1.275);}
@keyframes pop{0%{transform:scale(1)}50%{transform:scale(1.25)}100%{transform:scale(1)}}
.e-count{font-size:7px;color:var(--softer);line-height:1;}
.reflect-btn{background:none;border:none;cursor:pointer;font-size:11px;color:var(--softer);letter-spacing:1px;text-transform:uppercase;margin-bottom:14px;padding:0;display:block;transition:color .2s;}
.reflect-btn:hover{color:var(--amber);}
.listening{font-size:13px;color:var(--softer);font-style:italic;margin-bottom:14px;animation:pulse 1.2s ease-in-out infinite;}
@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}
.overlay{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:flex-end;animation:fadeIn .2s ease;}
.sheet{width:100%;max-width:430px;margin:0 auto;background:var(--surface);border-top:1px solid var(--border);padding:28px 24px 48px;animation:sheetUp .3s cubic-bezier(.25,.8,.25,1) both;max-height:90vh;overflow-y:auto;}
@keyframes sheetUp{from{transform:translateY(100%)}to{transform:translateY(0)}}
.sheet-title{font-family:'Fraunces',serif;font-weight:300;font-size:22px;color:var(--ink);margin-bottom:4px;}
.sheet-sub{font-size:12px;color:var(--soft);margin-bottom:24px;line-height:1.5;}
.field-label{font-size:10px;letter-spacing:1.5px;text-transform:uppercase;color:var(--softer);margin-bottom:6px;display:block;}
.optional-tag{font-size:10px;color:var(--softer);margin-left:4px;font-style:italic;letter-spacing:0;}
.field-row{display:flex;gap:8px;margin-bottom:0;}
.text-input{width:100%;background:var(--surface2);border:1px solid var(--border);border-bottom:2px solid var(--border);padding:11px 12px;font-family:'Outfit',sans-serif;font-size:14px;color:var(--ink);outline:none;transition:border-color .2s;margin-bottom:12px;}
.text-input::placeholder{color:var(--softer);}
.text-input:focus{border-bottom-color:var(--amber);}
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
`;

export default function Mann() {
  const [posts, setPosts] = useState(SAMPLE_POSTS);
  const [filter, setFilter] = useState("All");
  const [composing, setComposing] = useState(false);
  const [text, setText] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");
  const [course, setCourse] = useState("");
  const [myReactions, setMyReactions] = useState({});
  const [mySolidarity, setMySolidarity] = useState({});
  const [toast, setToast] = useState(null);
  const [posting, setPosting] = useState(false);
  const [reflections, setReflections] = useState({});
  const [, setTick] = useState(0);
  const toastRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTick(t => t + 1);
      setPosts(prev => prev.filter(p => (p.ts + 24 * 60 * 60 * 1000) > Date.now()));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

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

  function triggerReflection(postId) {
    if (reflections[postId]) return;
    setReflections(prev => ({ ...prev, [postId]: "loading" }));
    setTimeout(() => {
      setReflections(prev => ({ ...prev, [postId]: getReflection() }));
    }, 900);
  }

  function submitPost() {
    if (!text.trim() || text.length > 280) return;
    setPosting(true);
    const anonName = ANON_NAMES[Math.floor(Math.random() * ANON_NAMES.length)];
    const newPost = {
      id: Date.now(),
      college: college.trim() || "Anonymous College",
      year: year.trim() || "",
      course: course.trim() || "",
      text: text.trim(),
      reactions: { "🫂": 0, "💙": 0, "💫": 0, "🥺": 0, "🤝": 0 },
      solidarity: 0,
      ts: Date.now(),
      anonName,
    };
    setPosts(prev => [newPost, ...prev]);
    setText(""); setCollege(""); setYear(""); setCourse("");
    setComposing(false);
    setPosting(false);
    showToast("Posted. You're heard. 🤍");
    setTimeout(() => triggerReflection(newPost.id), 1000);
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
          {filtered.map((post, i) => {
            const countdown = getCountdown(post.ts);
            const hoursLeft = Math.floor(((post.ts + 24 * 60 * 60 * 1000) - Date.now()) / (1000 * 60 * 60));
            const urgent = hoursLeft < 3;
            return (
              <div key={post.id} className="post" style={{ animationDelay: `${i * .05}s` }}>
                <div className="post-meta">
                  <div className="post-meta-top">
                    <div className="post-who">
                      <strong>{post.college}</strong>
                      {post.year && <span> · {post.year}</span>}
                      {post.course && <span className="course-tag"> · {post.course}</span>}
                      <span> · {post.anonName}</span>
                    </div>
                  </div>
                  <div className="post-meta-bottom">
                    <div className="post-timestamp">{formatTimestamp(post.ts)}</div>
                    {countdown && (
                      <div className={`post-countdown ${urgent ? "urgent" : ""}`}>◷ {countdown}</div>
                    )}
                  </div>
                </div>

                <div className="post-text">"{post.text}"</div>

                {!reflections[post.id] && (
                  <button className="reflect-btn" onClick={() => triggerReflection(post.id)}>◎ reflect</button>
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
                  <button className={`solidarity-btn ${mySolidarity[post.id] ? "pressed" : ""}`} onClick={() => toggleSolidarity(post.id)}>
                    <span className="s-icon">{mySolidarity[post.id] ? "💙" : "🫂"}</span>
                    <span className="s-count">I feel this too · {post.solidarity}</span>
                  </button>
                  <div className="emoji-row">
                    {EMOJI_REACTIONS.map(e => {
                      const key = `${post.id}-${e}`;
                      const count = post.reactions[e] || 0;
                      return (
                        <button key={e} className={`emoji-btn ${myReactions[key] ? "reacted" : ""}`} onClick={() => toggleEmoji(post.id, e)}>
                          <span>{e}</span>
                          {count > 0 && <span className="e-count">{count > 99 ? "99+" : count}</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="bottom-glow" />

        {composing && (
          <div className="overlay" onClick={e => { if (e.target.className === "overlay") setComposing(false); }}>
            <div className="sheet">
              <div className="sheet-title">Say it <em>anonymously.</em></div>
              <div className="sheet-sub">No name. No photo. No judgment. Disappears in 24 hours.</div>

              <label className="field-label">College <span className="optional-tag">optional</span></label>
              <input className="text-input" placeholder="e.g. Amity Mumbai, IIT Bombay..." value={college} onChange={e => setCollege(e.target.value)} maxLength={60} />

              <div className="field-row">
                <div style={{ flex: 1 }}>
                  <label className="field-label">Year <span className="optional-tag">optional</span></label>
                  <input className="text-input" placeholder="e.g. 2nd Year" value={year} onChange={e => setYear(e.target.value)} maxLength={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <label className="field-label">Course <span className="optional-tag">optional</span></label>
                  <input className="text-input" placeholder="e.g. B.Sc Psych" value={course} onChange={e => setCourse(e.target.value)} maxLength={30} />
                </div>
              </div>

              <label className="field-label" style={{ marginTop: 4 }}>What's on your mind</label>
              <textarea className="compose-area" placeholder="This is your space. Write freely..." value={text} onChange={e => setText(e.target.value)} maxLength={300} autoFocus />
              <div className={`char-count ${text.length > 240 ? "warn" : ""}`}>{text.length}/280</div>

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
