export type Topic = {
  slug: string;
  name: string;
  summary: string;
  definition: string;
  how: string[];
  signs: string[];
  example: string;
  defence: string[];
};

export const topics: Topic[] = [
  {
    slug: "phishing",
    name: "Phishing",
    summary: "Fake emails that trick you into clicking links or sharing details.",
    definition:
      "Phishing is a fraudulent email that pretends to come from a trusted organisation so you click a link or hand over information.",
    how: [
      "An attacker copies the look of a college or bank email.",
      "The email creates urgency, such as an account about to be closed.",
      "The link leads to a fake page that records whatever is typed in.",
    ],
    signs: [
      "Sender address does not match the official domain",
      "Generic greeting such as 'Dear user'",
      "Threats, deadlines or prizes",
      "Link text and real link do not match",
    ],
    example:
      "Fictional example: 'Your college portal password expires in 2 hours. Click here to keep your account active.' sent from college-support@mail-verify-portal.example.",
    defence: [
      "Open the official site yourself instead of clicking the link",
      "Check the full sender address",
      "Ask the IT helpdesk before acting",
    ],
  },
  {
    slug: "smishing",
    name: "Smishing",
    summary: "Scam SMS messages with links or urgent requests.",
    definition: "Smishing is phishing carried out over SMS or messaging apps.",
    how: [
      "A short text claims a parcel, fee or scholarship needs attention.",
      "It includes a shortened link.",
      "The page asks for personal or payment details.",
    ],
    signs: ["Unknown number", "Shortened links", "Urgent money or delivery claims", "Spelling mistakes"],
    example:
      "Fictional example: 'KYC pending. Your exam fee refund of Rs 4,500 is on hold. Update here: bit.example/refund'",
    defence: ["Never tap links in unexpected texts", "Confirm with the official app or office", "Block and delete"],
  },
  {
    slug: "vishing",
    name: "Vishing",
    summary: "Phone calls from people pretending to be officials.",
    definition: "Vishing is a voice call where a caller impersonates a trusted person to pressure you into acting.",
    how: [
      "The caller claims to be from the bank, police or college office.",
      "They build panic about a blocked account or fine.",
      "They ask for an OTP, password or immediate payment.",
    ],
    signs: ["Pressure to act right now", "Requests for OTP or passwords", "Refusal to let you call back", "Caller ID spoofing"],
    example:
      "Fictional example: a caller says your hostel fee payment failed and asks you to read out the code just sent to your phone.",
    defence: ["Hang up and call the official number", "Never share an OTP with anyone", "Take your time"],
  },
  {
    slug: "pretexting",
    name: "Pretexting",
    summary: "A made-up story used to earn your trust.",
    definition: "Pretexting is inventing a believable situation and identity to collect information step by step.",
    how: [
      "The attacker researches your college, staff names and routines.",
      "They contact you with a convincing reason.",
      "They collect small details that unlock bigger access later.",
    ],
    signs: ["Unusual requests framed as routine", "Name-dropping seniors", "Questions about systems or schedules"],
    example:
      "Fictional example: someone claiming to be a new lab assistant asks for the shared projector login 'to prepare for class'.",
    defence: ["Verify identity through official channels", "Share information on a need-to-know basis", "Report odd requests"],
  },
  {
    slug: "baiting",
    name: "Baiting",
    summary: "A tempting offer or device that hides a trap.",
    definition: "Baiting uses curiosity or a free offer to make you open a file, scan a code or plug in a device.",
    how: ["An infected USB drive is left in a lab.", "A poster offers free software or a giveaway.", "Opening it installs harmful software."],
    signs: ["Free things that feel too good", "Unknown USB drives", "Random QR codes on posters"],
    example: "Fictional example: a USB labelled 'Semester Question Papers' left on a library desk.",
    defence: ["Never plug in unknown drives", "Download software only from official sources", "Hand found devices to staff"],
  },
  {
    slug: "impersonation",
    name: "Impersonation",
    summary: "Someone pretends to be a teacher, friend or official.",
    definition: "Impersonation is pretending to be a person you already trust, online or in person.",
    how: ["A fake profile copies a teacher's photo and name.", "The message starts friendly.", "A request for money or data follows."],
    signs: ["New account of a known person", "Different writing style", "Requests kept secret"],
    example: "Fictional example: a new social account using your professor's photo asks you to buy gift vouchers urgently.",
    defence: ["Confirm on a channel you already use", "Check account creation date", "Report the fake profile"],
  },
  {
    slug: "tailgating",
    name: "Tailgating",
    summary: "Following someone into a restricted area.",
    definition: "Tailgating is walking into a secure room behind an authorised person without your own access.",
    how: ["Someone carries boxes and asks you to hold the door.", "They enter a lab or server room.", "They reach systems they should not."],
    signs: ["No visible ID card", "Hands conveniently full", "Unfamiliar face in a restricted area"],
    example: "Fictional example: a stranger in a delivery jacket asks a student to badge them into the computer centre.",
    defence: ["Let each person badge in", "Politely ask for ID", "Inform security"],
  },
  {
    slug: "quid-pro-quo",
    name: "Quid Pro Quo",
    summary: "Help or a reward offered in exchange for access.",
    definition: "Quid pro quo offers a service or gift in return for your credentials or access.",
    how: ["A caller offers free tech support.", "They ask you to install a remote tool.", "They gain control of your device."],
    signs: ["Unrequested support calls", "Requests to install software", "Rewards for logging in"],
    example: "Fictional example: 'Free laptop cleanup for students, just share your screen and sign in.'",
    defence: ["Use only the official helpdesk", "Never install tools a stranger suggests", "Report the offer"],
  },
];

export type Scenario = {
  id: number;
  channel: string;
  title: string;
  body: string;
  suspicious: boolean;
  explanation: string;
  flags: string[];
};

export const scenarios: Scenario[] = [
  {
    id: 1,
    channel: "Email",
    title: "Portal password expiry",
    body: "From: it-support@college-verify.example — Your student portal password expires in 2 hours. Click the link to keep your account active.",
    suspicious: true,
    explanation: "The domain is not the college domain and the deadline is designed to rush you.",
    flags: ["Look-alike domain", "Two-hour deadline", "Link instead of official portal"],
  },
  {
    id: 2,
    channel: "Email",
    title: "Exam timetable notice",
    body: "From: exams@yourcollege.edu — The revised timetable for semester 5 is attached and also published on the notice board.",
    suspicious: false,
    explanation: "Official domain, no links asking for login, and the information is available elsewhere to verify.",
    flags: [],
  },
  {
    id: 3,
    channel: "SMS",
    title: "Scholarship refund",
    body: "Your scholarship of Rs 25,000 is approved. Share your account number and OTP to receive it today.",
    suspicious: true,
    explanation: "No genuine office asks for an OTP. OTPs only let someone else complete a transaction.",
    flags: ["OTP request", "Money pressure", "Unknown sender"],
  },
  {
    id: 4,
    channel: "Phone call",
    title: "Bank account blocked",
    body: "Caller: 'I am from your bank. Your account is blocked. Read me the code we just sent so I can unblock it.'",
    suspicious: true,
    explanation: "Banks never ask for codes. The caller wants to approve their own login.",
    flags: ["Urgency", "OTP request", "No callback allowed"],
  },
  {
    id: 5,
    channel: "Email",
    title: "Internship offer",
    body: "Congratulations! You are selected for a paid internship. Pay a refundable registration fee of Rs 2,000 within 24 hours to confirm.",
    suspicious: true,
    explanation: "Genuine internships do not charge a registration fee, and the countdown blocks clear thinking.",
    flags: ["Advance payment", "No interview", "24-hour deadline"],
  },
  {
    id: 6,
    channel: "Notice board",
    title: "Library QR poster",
    body: "Scan this QR code to get free premium study notes. Sign in with your college email and password.",
    suspicious: true,
    explanation: "Any page asking for your college password after a random QR scan is harvesting credentials.",
    flags: ["Random QR code", "Password request", "Free offer"],
  },
  {
    id: 7,
    channel: "Social media",
    title: "Message from a 'professor'",
    body: "New account with your professor's photo: 'I am in a meeting, please buy two gift vouchers and send the codes. I will repay you.'",
    suspicious: true,
    explanation: "Classic impersonation: a new account, secrecy and a request for untraceable vouchers.",
    flags: ["Duplicate account", "Gift vouchers", "Urgent secrecy"],
  },
  {
    id: 8,
    channel: "Email",
    title: "Club event reminder",
    body: "From: coding.club@yourcollege.edu — Reminder: our workshop is on Friday at 3 pm in Lab 2. No registration needed.",
    suspicious: false,
    explanation: "Known sender, no attachment, no request for information or money.",
    flags: [],
  },
  {
    id: 9,
    channel: "In person",
    title: "Door held open",
    body: "A stranger with a toolbox and no ID card asks you to badge them into the server room.",
    suspicious: true,
    explanation: "Tailgating. Authorised staff always have their own access.",
    flags: ["No ID card", "Restricted area", "Pressure to be polite"],
  },
  {
    id: 10,
    channel: "Email",
    title: "Library due reminder",
    body: "From: library@yourcollege.edu — Book 'Computer Networks' is due on 12th. Return at the counter to avoid a fine of Rs 5 per day.",
    suspicious: false,
    explanation: "Routine notice from the official address with no links or credential requests.",
    flags: [],
  },
  {
    id: 11,
    channel: "SMS",
    title: "Parcel pending",
    body: "Your parcel is held due to an unpaid fee of Rs 45. Pay here: bit.example/parcel-release",
    suspicious: true,
    explanation: "A tiny fee makes payment feel harmless, but the page steals card details.",
    flags: ["Shortened link", "Unexpected parcel", "Small payment request"],
  },
  {
    id: 12,
    channel: "Phone call",
    title: "Free laptop cleanup",
    body: "Caller offers free device cleanup for students and asks you to install a remote-access tool and sign in.",
    suspicious: true,
    explanation: "Quid pro quo. The 'free help' is really a request for control of your device.",
    flags: ["Unrequested support", "Remote access tool", "Sign-in request"],
  },
];

export type Question = {
  q: string;
  options: string[];
  answer: number;
  explain: string;
};

export const quiz: Question[] = [
  {
    q: "What is social engineering?",
    options: [
      "Tricking people into giving access or information",
      "A type of computer hardware",
      "A programming technique",
      "A social media strategy",
    ],
    answer: 0,
    explain: "Social engineering targets people rather than software.",
  },
  {
    q: "An email says your account closes in one hour unless you click a link. What is this?",
    options: ["A normal reminder", "Phishing with urgency", "A system update", "Spam filtering"],
    answer: 1,
    explain: "Artificial urgency is a classic phishing trigger.",
  },
  {
    q: "Someone calls asking for the OTP sent to your phone. You should:",
    options: ["Share it if they sound official", "Share only half of it", "Never share it", "Text it instead"],
    answer: 2,
    explain: "An OTP is never meant to be shared with anyone.",
  },
  {
    q: "Smishing happens through which channel?",
    options: ["Email", "SMS or messaging apps", "Printed letters", "Phone calls"],
    answer: 1,
    explain: "Smishing is SMS-based phishing.",
  },
  {
    q: "You find a USB drive labelled 'Question Papers' in the lab. You should:",
    options: ["Plug it into a lab computer", "Take it home and check", "Hand it to staff", "Share it with friends"],
    answer: 2,
    explain: "Unknown drives are classic baiting and can install harmful software.",
  },
  {
    q: "Which is the strongest sign of a fake sender address?",
    options: [
      "It ends with the official college domain",
      "It uses a look-alike domain with extra words",
      "It has a person's name",
      "It was sent in the morning",
    ],
    answer: 1,
    explain: "Look-alike domains are cheap to register and easy to miss.",
  },
  {
    q: "Pretexting mainly relies on:",
    options: ["A convincing invented story", "Brute-force password guessing", "Network scanning", "Virus files"],
    answer: 0,
    explain: "Pretexting builds a believable identity and situation.",
  },
  {
    q: "Tailgating is best prevented by:",
    options: ["Holding doors for everyone", "Letting each person use their own access card", "Propping the door open", "Turning off cameras"],
    answer: 1,
    explain: "Everyone entering a secure area should badge in individually.",
  },
  {
    q: "A 'free internship' asks for a Rs 2,000 registration fee. This is:",
    options: ["Standard practice", "A likely scam", "A government rule", "A refundable deposit"],
    answer: 1,
    explain: "Genuine internships do not ask candidates to pay to be selected.",
  },
  {
    q: "The safest way to open your college portal is:",
    options: ["Click the link in the email", "Type the official address yourself", "Scan any QR code", "Use a search ad"],
    answer: 1,
    explain: "Typing the address avoids look-alike pages entirely.",
  },
  {
    q: "Which password habit is safest?",
    options: ["The same password everywhere", "A long unique password per account", "Your roll number", "Your date of birth"],
    answer: 1,
    explain: "Unique long passwords limit the damage of any single leak.",
  },
  {
    q: "Two-factor authentication helps because:",
    options: ["It replaces passwords", "A stolen password alone is not enough", "It speeds up login", "It hides your email"],
    answer: 1,
    explain: "The second factor blocks attackers who only have your password.",
  },
  {
    q: "A friend's account suddenly asks you for money. You should:",
    options: ["Send it quickly", "Call them on their known number", "Reply with your bank details", "Ignore and tell nobody"],
    answer: 1,
    explain: "Verify on a channel you already trust before acting.",
  },
  {
    q: "Quid pro quo attacks offer:",
    options: ["Something helpful in return for access", "Only threats", "Physical break-ins", "Software updates"],
    answer: 0,
    explain: "The attacker trades a favour for your credentials or access.",
  },
  {
    q: "If you think you have been targeted, the first step is:",
    options: ["Do nothing", "Report it to the college IT team", "Delete your account", "Reply to the attacker"],
    answer: 1,
    explain: "Fast reporting helps protect you and everyone else.",
  },
];

export const attackTypeNames = [
  "Phishing",
  "Smishing",
  "Vishing",
  "Pretexting",
  "Baiting",
  "Impersonation",
  "Tailgating",
  "Quid pro quo",
  "Not sure",
];
