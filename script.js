const $ = (id) => document.getElementById(id);

const careers = [
  {title:"Software Developer",category:"Technology",icon:"⌘",description:"Build websites, apps, and software that solve real problems.",skills:["Logical thinking","Coding","Problem-solving"],steps:["Try a beginner programming course.","Build a small website or app project.","Practise coding and explore internships."],time:"Explore over 3–6 months"},
  {title:"Data Analyst",category:"Technology",icon:"▥",description:"Use data to spot patterns and help people make decisions.",skills:["Maths","Curiosity","Data tools"],steps:["Strengthen spreadsheet and basic maths skills.","Learn SQL and a data visualisation tool.","Analyse a small public dataset and present findings."],time:"Explore over 3–6 months"},
  {title:"Cybersecurity Analyst",category:"Technology",icon:"⬡",description:"Help protect computer systems, networks, and information.",skills:["Problem-solving","Attention to detail","Networking"],steps:["Learn computer and networking fundamentals.","Study safe, legal cybersecurity labs.","Explore recognised beginner certifications."],time:"Explore over 6–12 months"},
  {title:"UI/UX Designer",category:"Creative",icon:"✎",description:"Design digital experiences that are useful and easy to use.",skills:["Creativity","Empathy","Visual thinking"],steps:["Observe how people use everyday apps.","Learn wireframing and a design tool.","Create a small portfolio case study."],time:"Explore over 2–4 months"},
  {title:"Digital Marketer",category:"Business",icon:"↗",description:"Help organisations reach audiences through digital channels.",skills:["Communication","Creativity","Analytics"],steps:["Learn marketing and audience basics.","Explore content, SEO, and analytics.","Plan a sample campaign and measure its goals."],time:"Explore over 2–4 months"},
  {title:"Entrepreneur",category:"Business",icon:"✦",description:"Turn a useful idea into a product, service, or organisation.",skills:["Initiative","Planning","Communication"],steps:["Identify a problem people experience.","Interview potential users and test an idea.","Create a simple business model and prototype."],time:"Start with a small experiment"},
  {title:"Teacher / Educator",category:"People",icon:"▤",description:"Help learners understand ideas and develop their abilities.",skills:["Communication","Patience","Explaining ideas"],steps:["Choose a subject or age group of interest.","Try tutoring or volunteering with supervision.","Research local teaching qualifications."],time:"Explore over 1–3 months"},
  {title:"Psychology & Counselling",category:"People",icon:"♡",description:"Study human behaviour and support wellbeing through appropriate training.",skills:["Listening","Empathy","Research"],steps:["Explore introductory psychology resources.","Learn about ethics and professional boundaries.","Research accredited degrees and local requirements."],time:"Research study pathways"},
  {title:"Healthcare Professional",category:"Science",icon:"✚",description:"Support health through clinical, diagnostic, or community roles.",skills:["Science","Carefulness","Teamwork"],steps:["Explore different healthcare roles.","Check required subjects and recognised qualifications.","Speak with a qualified professional about the pathway."],time:"Requirements vary by role"},
  {title:"Environmental Scientist",category:"Science",icon:"♧",description:"Study environmental challenges and help develop evidence-based solutions.",skills:["Science","Observation","Analysis"],steps:["Learn about local environmental issues.","Explore biology, chemistry, and data skills.","Join a supervised community or research activity."],time:"Explore over 3–6 months"},
  {title:"Graphic Designer",category:"Creative",icon:"▧",description:"Communicate ideas visually through layouts, images, and typography.",skills:["Visual creativity","Attention to detail","Communication"],steps:["Practise basic design principles.","Create posters or social graphics for practice.","Build a portfolio and seek feedback."],time:"Explore over 2–4 months"},
  {title:"Skilled Trades & Technical Work",category:"Science",icon:"⚙",description:"Use practical technical skills to install, maintain, or repair systems.",skills:["Practical thinking","Precision","Problem-solving"],steps:["Explore locally recognised training programmes.","Learn safety basics from qualified instructors.","Compare apprenticeships and qualification requirements."],time:"Depends on the trade"}
];

const questions = [
  {title:"What kind of activity sounds most interesting?",hint:"Pick the option you would enjoy most.",answers:[
    {text:"Solving a puzzle or building something with technology",type:"Technology"},
    {text:"Creating a design, story, video, or visual idea",type:"Creative"},
    {text:"Planning a project or starting a business idea",type:"Business"},
    {text:"Helping someone learn or solve a personal problem",type:"People"},
    {text:"Investigating nature, health, or how things work",type:"Science"}]},
  {title:"Which strength sounds most like you?",hint:"Choose the strength you most enjoy using.",answers:[
    {text:"Logical thinking and solving tricky problems",type:"Technology"},
    {text:"Imagination and visual creativity",type:"Creative"},
    {text:"Organising, persuading, or leading a team",type:"Business"},
    {text:"Listening, explaining, and supporting others",type:"People"},
    {text:"Observing carefully and asking scientific questions",type:"Science"}]},
  {title:"What would you most like to create or contribute?",hint:"Imagine a project you would feel proud of.",answers:[
    {text:"An app, website, or useful digital tool",type:"Technology"},
    {text:"A brand, artwork, or engaging media",type:"Creative"},
    {text:"A service or product people want to use",type:"Business"},
    {text:"A learning or community support programme",type:"People"},
    {text:"A solution to a health or environmental issue",type:"Science"}]},
  {title:"Which work environment appeals to you?",hint:"There is no single best work environment.",answers:[
    {text:"Working with computers, systems, and technical challenges",type:"Technology"},
    {text:"A flexible space where I can make and test ideas",type:"Creative"},
    {text:"A fast-moving setting with goals and decisions",type:"Business"},
    {text:"Working closely with people or a community",type:"People"},
    {text:"A lab, field setting, workshop, or practical environment",type:"Science"}]},
  {title:"Which subject or topic would you choose to explore?",hint:"Choose what you are curious about right now.",answers:[
    {text:"Computers, maths, or digital systems",type:"Technology"},
    {text:"Art, design, media, or communication",type:"Creative"},
    {text:"Economics, business, or marketing",type:"Business"},
    {text:"Education, society, or human behaviour",type:"People"},
    {text:"Biology, environment, physics, or health",type:"Science"}]},
  {title:"What impact would feel most meaningful to you?",hint:"Think about the kind of difference you want to make.",answers:[
    {text:"Making technology work better for people",type:"Technology"},
    {text:"Making information or experiences more engaging",type:"Creative"},
    {text:"Building an idea that creates value or jobs",type:"Business"},
    {text:"Helping people learn, feel supported, or thrive",type:"People"},
    {text:"Improving health, safety, or the natural world",type:"Science"}]}
];

let isRegister = false;
let currentQuestion = 0;
let answers = [];
let currentUser = null;
let selectedCareer = null;
let completedSteps = JSON.parse(localStorage.getItem("cc_completed_steps") || "{}");
let toastTimer;

function showToast(message) {
  const toast = $("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2600);
}

function getUsers() {
  try { return JSON.parse(localStorage.getItem("cc_demo_users") || "{}"); }
  catch { return {}; }
}

function setAuthMode(register) {
  isRegister = register;
  $("nameField").classList.toggle("hidden", !register);
  $("fullName").required = register;
  $("authEyebrow").textContent = register ? "START YOUR JOURNEY" : "WELCOME BACK";
  $("authTitle").textContent = register ? "Create your account" : "Sign in to your account";
  $("authSubtitle").textContent = register ? "A few details, then you're ready to explore." : "Your next chapter starts here.";
  $("authSubmit").innerHTML = register ? 'Create account <span>→</span>' : 'Sign in <span>→</span>';
  $("switchText").textContent = register ? "Already have an account?" : "Don't have an account?";
  $("switchAuth").textContent = register ? "Sign in" : "Create one";
  $("password").autocomplete = register ? "new-password" : "current-password";
  $("authMessage").textContent = "";
}

$("switchAuth").addEventListener("click", () => setAuthMode(!isRegister));

$("authForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = $("email").value.trim().toLowerCase();
  const password = $("password").value;
  const users = getUsers();

  if (password.length < 6) {
    $("authMessage").textContent = "Please use at least 6 characters for this demo password.";
    return;
  }

  if (isRegister) {
    const name = $("fullName").value.trim();
    if (!name) {
      $("authMessage").textContent = "Please enter your name.";
      return;
    }
    if (users[email]) {
      $("authMessage").textContent = "An account with this email already exists. Please sign in.";
      return;
    }
    users[email] = { name, password };
    localStorage.setItem("cc_demo_users", JSON.stringify(users));
    currentUser = { name, email };
    localStorage.setItem("cc_current_user", JSON.stringify(currentUser));
    launchApp();
    showToast("Welcome! Your demo account is ready.");
  } else {
    if (!users[email] || users[email].password !== password) {
      $("authMessage").textContent = "Email or password doesn't match a demo account.";
      return;
    }
    currentUser = { name: users[email].name, email };
    localStorage.setItem("cc_current_user", JSON.stringify(currentUser));
    launchApp();
    showToast("Welcome back, " + currentUser.name.split(" ")[0] + "!");
  }
});

function launchApp() {
  $("authScreen").classList.add("hidden");
  $("appScreen").classList.remove("hidden");
  const name = currentUser?.name || "Student";
  const initial = name.charAt(0).toUpperCase();
  $("welcomeName").textContent = name.split(" ")[0];
  $("sidebarName").textContent = name;
  $("sidebarEmail").textContent = currentUser?.email || "";
  $("userAvatar").textContent = initial;
  $("topAvatar").textContent = initial;
  renderCareers();
  renderRoadmap();
  showPage("overview");
}

$("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("cc_current_user");
  currentUser = null;
  $("appScreen").classList.add("hidden");
  $("authScreen").classList.remove("hidden");
  $("authForm").reset();
  setAuthMode(false);
  showToast("You've signed out.");
});

function showPage(page) {
  document.querySelectorAll(".page-view").forEach(el => el.classList.add("hidden"));
  $(page + "Page").classList.remove("hidden");
  document.querySelectorAll(".nav-item").forEach(btn => btn.classList.toggle("active", btn.dataset.page === page));
  const labels = {overview:"Overview", assessment:"Career assessment", careers:"Explore careers", roadmap:"My roadmap"};
  $("pageLabel").textContent = labels[page] || "Overview";
  if (page === "assessment") renderQuestion();
  if (page === "roadmap") renderRoadmap();
  window.scrollTo({top:0, behavior:"smooth"});
}

document.querySelectorAll("[data-page]").forEach(btn => btn.addEventListener("click", () => showPage(btn.dataset.page)));
document.querySelectorAll("[data-go]").forEach(btn => btn.addEventListener("click", () => showPage(btn.dataset.go)));

function renderQuestion() {
  const q = questions[currentQuestion];
  $("questionCounter").textContent = `QUESTION ${currentQuestion + 1} OF ${questions.length}`;
  $("progressPercent").textContent = `${Math.round(((currentQuestion + 1) / questions.length) * 100)}%`;
  $("progressFill").style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  $("questionTitle").textContent = q.title;
  $("questionHint").textContent = q.hint;
  $("answerOptions").innerHTML = "";
  q.answers.forEach((answer, index) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "answer-option" + (answers[currentQuestion] === answer.type ? " selected" : "");
    option.innerHTML = `<span class="option-radio"></span><span class="option-text"></span>`;
    option.querySelector(".option-text").textContent = answer.text;
    option.addEventListener("click", () => {
      answers[currentQuestion] = answer.type;
      renderQuestion();
    });
    $("answerOptions").appendChild(option);
  });
  $("prevQuestion").disabled = currentQuestion === 0;
  $("nextQuestion").disabled = !answers[currentQuestion];
  $("nextQuestion").textContent = currentQuestion === questions.length - 1 ? "See my results →" : "Next question →";
  $("resultsPanel").classList.add("hidden");
}

$("prevQuestion").addEventListener("click", () => {
  if (currentQuestion > 0) { currentQuestion--; renderQuestion(); }
});
$("nextQuestion").addEventListener("click", () => {
  if (!answers[currentQuestion]) return;
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResults();
  }
});

function getTopCategories() {
  const counts = {};
  answers.forEach(type => counts[type] = (counts[type] || 0) + 1);
  return Object.entries(counts).sort((a,b) => b[1]-a[1]).map(entry => entry[0]);
}

function showResults() {
  const topCategories = getTopCategories();
  const recommended = careers.filter(c => topCategories.slice(0,2).includes(c.category)).slice(0,4);
  if (recommended[0]) selectedCareer = recommended[0].title;
  const panel = $("resultsPanel");
  panel.innerHTML = `<p class="eyebrow">YOUR INITIAL INSIGHTS</p><h2>Explore what fits you</h2><p>Your answers suggest exploring ${topCategories.slice(0,2).join(" and ").toLowerCase()}-related fields. These are ideas to investigate, not a fixed label or a professional assessment.</p><div class="result-chips">${topCategories.slice(0,3).map(c => `<span class="result-chip">${escapeHTML(c)}</span>`).join("")}</div><div class="career-grid" id="resultCareerGrid"></div><button class="primary-btn" id="resultRoadmapBtn" style="margin-top:20px">View my roadmap →</button>`;
  const grid = panel.querySelector("#resultCareerGrid");
  recommended.forEach(c => grid.appendChild(makeCareerCard(c)));
  panel.querySelector("#resultRoadmapBtn").addEventListener("click", () => {
    saveAssessment(topCategories);
    renderRoadmap();
    showPage("roadmap");
  });
  panel.classList.remove("hidden");
  panel.scrollIntoView({behavior:"smooth", block:"start"});
  saveAssessment(topCategories);
}

function saveAssessment(categories) {
  localStorage.setItem("cc_assessment_" + currentUser.email, JSON.stringify({answers, categories, selectedCareer, date:new Date().toISOString()}));
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[char]));
}

function makeCareerCard(career) {
  const card = document.createElement("article");
  card.className = "career-card";
  const icon = document.createElement("div");
  icon.className = "career-icon";
  icon.textContent = career.icon;
  const category = document.createElement("span");
  category.className = "career-category";
  category.textContent = career.category;
  const title = document.createElement("h3");
  title.textContent = career.title;
  const description = document.createElement("p");
  description.textContent = career.description;
  const button = document.createElement("button");
  button.type = "button";
  button.innerHTML = 'Build a roadmap <span>→</span>';
  button.addEventListener("click", () => {
    selectedCareer = career.title;
    renderRoadmap();
    showPage("roadmap");
    showToast("Roadmap updated for " + career.title + ".");
  });
  card.append(icon, category, title, description, button);
  return card;
}

function renderCareers() {
  const query = ($("careerSearch")?.value || "").trim().toLowerCase();
  const category = $("careerCategory")?.value || "all";
  const filtered = careers.filter(c => {
    const matchesCategory = category === "all" || c.category === category;
    const searchable = [c.title, c.category, c.description, ...c.skills].join(" ").toLowerCase();
    return matchesCategory && searchable.includes(query);
  });
  $("careerGrid").innerHTML = "";
  if (!filtered.length) {
    $("careerGrid").innerHTML = '<div class="empty-state">No careers match that search. Try another keyword.</div>';
    return;
  }
  filtered.forEach(c => $("careerGrid").appendChild(makeCareerCard(c)));
}
$("careerSearch").addEventListener("input", renderCareers);
$("careerCategory").addEventListener("change", renderCareers);

function renderRoadmap() {
  let saved = null;
  try { saved = JSON.parse(localStorage.getItem("cc_assessment_" + (currentUser?.email || "")) || "null"); } catch {}
  const career = careers.find(c => c.title === selectedCareer) || careers.find(c => c.title === saved?.selectedCareer);
  $("roadmapCareer").textContent = career ? career.title : "Explore your options";
  $("roadmapDescription").textContent = career
    ? career.description + " Use these steps as a flexible starting plan."
    : "Complete the assessment to get a starting recommendation, or choose a career from the library.";
  const steps = career ? career.steps : [
    "Reflect on your favourite subjects, activities, and strengths.",
    "Explore three career paths and compare their day-to-day work.",
    "Talk to a teacher, career counsellor, or trusted professional.",
    "Choose one small skill or project to try this month."
  ];
  $("roadmapList").innerHTML = "";
  steps.forEach((step, index) => {
    const key = (currentUser?.email || "guest") + "|" + (career?.title || "general") + "|" + index;
    const row = document.createElement("div");
    row.className = "roadmap-step" + (completedSteps[key] ? " completed" : "");
    const check = document.createElement("button");
    check.type = "button";
    check.className = "step-check";
    check.setAttribute("aria-label", completedSteps[key] ? "Mark step incomplete" : "Mark step complete");
    check.textContent = completedSteps[key] ? "✓" : "";
    check.addEventListener("click", () => {
      completedSteps[key] = !completedSteps[key];
      localStorage.setItem("cc_completed_steps", JSON.stringify(completedSteps));
      renderRoadmap();
    });
    const content = document.createElement("div");
    content.className = "step-content";
    const strong = document.createElement("strong");
    strong.textContent = `Step ${index + 1}: ${["Explore","Learn","Practise","Reflect"][index] || "Next step"}`;
    const p = document.createElement("p");
    p.textContent = step;
    content.append(strong,p);
    const time = document.createElement("span");
    time.className = "step-time";
    time.textContent = completedSteps[key] ? "Completed" : "Suggested step";
    row.append(check,content,time);
    $("roadmapList").appendChild(row);
  });
}

try {
  const existing = JSON.parse(localStorage.getItem("cc_current_user") || "null");
  const users = getUsers();
  if (existing && users[existing.email]) {
    currentUser = {name: users[existing.email].name, email: existing.email};
    const saved = JSON.parse(localStorage.getItem("cc_assessment_" + existing.email) || "null");
    if (saved) { answers = saved.answers || []; selectedCareer = saved.selectedCareer || null; }
    launchApp();
  } else {
    localStorage.removeItem("cc_current_user");
    setAuthMode(false);
  }
} catch {
  setAuthMode(false);
}
