/** In-site blog posts — edit this file to add or update articles. */

export type BlogSection = {
  heading: string;
  body: string;
};

export type BlogAuthor = {
  name: string;
  role: string;
  /** Profile page or LinkedIn, when there is one. */
  url?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  /** Shorter title for search results when the headline runs past ~50 characters. */
  seoTitle?: string;
  /** The person who wrote it: the developer who worked on the project. */
  author?: BlogAuthor;
  /** Who checked it before it went live. */
  reviewedBy?: string;
  /** Pages to read next, shown after the conclusion. */
  related?: readonly { label: string; href: string }[];
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  intro: string;
  sections: readonly BlogSection[];
  conclusion: {
    heading: string;
    paragraphs: readonly string[];
  };
};

export const BLOG_POSTS: readonly BlogPost[] = [
  {
    slug: 'custom-crm-or-gohighlevel',
    title: 'Custom CRM or GoHighLevel? When to Build and When to Configure',
    seoTitle: 'Custom CRM or GoHighLevel? When to Build One',
    author: { name: 'Waris Mustafa', role: 'SEO and Web Developer' },
    reviewedBy: 'Azmat Rana',
    excerpt:
      'When to configure GoHighLevel and when to build a custom CRM, from the sales automation we set up for a US bookkeeping firm.',
    date: '2026-10-12',
    category: 'CRM',
    readTime: '5 min',
    intro:
      'If your sales run on ads, forms, calls and fast follow-ups, configure GoHighLevel instead of building a CRM. We have built sales automation in GoHighLevel that takes leads from Meta, LinkedIn and Google and answers them straight away. It also tells the ad platforms which leads turned into customers. We have also built custom CRMs, for businesses whose clients work inside the system. Here is how we decide between the two.',
    sections: [
      {
        heading: 'What GoHighLevel does well',
        body: 'Leads arrive straight from the ad platforms. Facebook and Instagram lead forms and LinkedIn Lead Gen forms land in GoHighLevel as contacts, and each submission can start a workflow the moment it arrives.\n\nWorkflows handle the follow-up. A workflow can assign the lead to a rep, open an opportunity in the pipeline and send a text or email straight away. It can stop the nurture sequence as soon as the lead replies.\n\nResults go back to the ads. The Meta Conversions API action sends events from the server, so browser restrictions and ad blockers don’t hide them. It can report pipeline stage changes, and a purchase stage can carry its value. The Add to Google Ads action sends offline conversions, matched to the original ad click. When the platforms see which leads became clients, they find more people like them.',
      },
      {
        heading: 'What we set up for a US bookkeeping firm',
        body: 'Our client is a US bookkeeping firm. HubSpot was the first option on the table, but at the tiers the firm needed, it cost too much for a business its size. GoHighLevel’s starter plan already had native connections to Meta, LinkedIn and Google, so we built on that.\n\nLeads come in from five places: Facebook and Instagram lead forms, LinkedIn Lead Gen forms, Google Ads, the website’s forms and phone calls. Every new lead starts the same workflow.\n\n1. A text and an email go out straight away, so nobody waits for a rep to notice.\n\n2. The lead is assigned to a member of the team and opens an opportunity in the pipeline.\n\n3. The nurture sequence stops as soon as the lead replies.\n\n4. The lead moves from new to qualified to booked to client. Each stage goes back to Meta through the Conversions API, and to Google Ads as an offline conversion.',
      },
      {
        heading: 'Where GoHighLevel stops fitting',
        body: 'Your clients work inside the system. On Klingit, clients, designers, managers and admins share one platform, and clients check their own project status. That needed a custom build.\n\nSupport is the product. Contakti brings email, chat, SMS and voice into one hub and routes each ticket to the right department with AI, using its own rules.\n\nYour process isn’t a sales funnel. NPTAAS schedules auditors, logs compliance points and generates final reports. Pipeline stages can’t model that.',
      },
      {
        heading: 'The middle path',
        body: 'Many businesses keep GoHighLevel for marketing and sales and build only the part it can’t do. GoHighLevel can send any contact’s data to another system with a webhook, and receive it back the same way. That keeps a custom portal or support hub in sync.',
      },
    ],
    conclusion: {
      heading: 'Common questions',
      paragraphs: [
        'Can a custom CRM sync with GoHighLevel? Yes. GoHighLevel can send a contact’s data to another system with a webhook and receive data back the same way.',
        'Who owns the data and the code? With a custom build, the client owns both.',
        'How do you move contacts and history across? We map every field, clean out duplicates and move a test batch for you to check, then move the rest.',
        'Can different roles see different things? In a custom build, yes. Klingit gives clients, designers, managers and admins their own views.',
      ],
    },
    related: [
      { label: 'CRM development', href: '/what-we-build/crm' },
      { label: 'Business process automation', href: '/what-we-build/automation' },
      { label: 'SEO and Google Ads', href: '/what-we-build/digital-marketing' },
    ],
  },
  {
    slug: 'luxe-excursions-booking-planner',
    title: 'Our Booking Planner Refused 75% of Trips. The Fix Was the Data.',
    seoTitle: 'Tour Booking System Case Study: Luxe Excursions',
    author: { name: 'Waris Mustafa', role: 'SEO and Web Developer' },
    reviewedBy: 'Azmat Rana',
    excerpt:
      'How we stopped a Tenerife tour company’s booking planner refusing 75% of trips, then automated its sale alerts, review requests and Google setup.',
    date: '2026-10-12',
    category: 'Case Study',
    readTime: '6 min',
    intro:
      'Luxe Excursions sells luxury tours, packages and rentals from a shop in Costa Adeje, Tenerife. We built its website, booking platform and staff CMS, and we run its SEO, Google Ads and Business Profile. The biggest gain didn’t come from new code. It came from checking the data the old booking planner trusted.',
    sections: [
      {
        heading: 'The planner that said no',
        body: 'The first version tried to schedule every activity at booking time, using the timetables in the CMS and the size of the van fleet. The client called it too complex, so we measured it. Across every 3-activity combination on a 3-day stay, the planner refused 75% of itineraries.\n\nAll 164 refusals came from weekday data in the CMS. None came from van capacity. When we checked the partner venues against their own websites, 3 of 4 timetables were wrong. One show was blocked on two of its three real nights.',
      },
      {
        heading: 'Pay first, schedule after',
        body: 'We changed how bookings work. Guests now choose their activities and pay, and staff assign every date and time afterwards. Only one thing can refuse a booking: an activity that never runs during the guest’s stay. Capacity clashes become notes for staff, never an error for the guest. Tickets hide times until a member of staff has approved the schedule. After the data was corrected, the refusal rate went to 0%.',
      },
      {
        heading: 'Staff hear about every sale',
        body: 'At launch, only the guest got an email when they booked. Now the team gets one for every paid booking and every trip request, with the guest set as reply-to so staff can answer straight away. Each alert goes out once per booking, so a payment retry never sends a duplicate.',
      },
      {
        heading: 'Reviews without cherry-picking',
        body: 'Reviews decide how a local business shows up on the map, so we automated the ask. Every guest gets one email at 10:00 local time the day after their last activity, within a week of the trip. Nobody gets it twice, and test or agency bookings are left out.\n\nWe ask every guest, whatever we think of how the trip went, because Google forbids asking only happy customers. Guests who book in the shop or by WhatsApp get the same message by hand, and a QR card on the counter.',
      },
      {
        heading: 'Fully booked without disappearing',
        body: 'Sometimes an item has to stop selling for a while, like the e-bike rental while its paperwork was pending. Deleting the page would throw away its search ranking. Instead, staff tick “Fully booked” in the admin. The page stays live, it can’t be bought, and Google is told it’s sold out.',
      },
      {
        heading: 'A giveaway that is fair, and works on a phone',
        body: 'The “Win a Tenerife getaway” page takes one entry per email, through the website or Instagram. The draw picks a winner and two reserves from a recorded random seed, so the draw can be re-run later and checked. We left out “share to enter”, because Meta’s rules don’t allow it.\n\nIn its first six days, 269 people entered on the website. Then the data showed that half of all attempts were failing, mostly because the Instagram username was left blank and phones gave no clear sign why. The form now jumps to the field that needs fixing. In the first two hours after the change, 14 entries went through and none failed. Instagram followers grew from 25 to 190 that week.',
      },
      {
        heading: 'Getting Google right',
        body: 'A guest followed the map to the wrong street: the Business Profile pin was about 460 m from the shop. We corrected the address and pin on Google, the website and Facebook.\n\nGoogle Analytics now tracks bookings, trip requests and WhatsApp clicks, and Google Ads learns from bookings and WhatsApp clicks. Every activity has a Book Now button on its first screen, and the payment form loads only when someone pays, so pages are faster on phones. Google’s own SEO check scores the site 100, and the main image shows in 1.3 seconds on a phone.',
      },
      {
        heading: 'What it runs on',
        body: 'The backend runs on Django and Django REST Framework, and the website on Next.js. Data lives in PostgreSQL, hosting is on AWS (ECS Fargate and Amplify), Stripe takes payments and Brevo sends email.',
      },
    ],
    conclusion: {
      heading: 'What we’d tell another tour operator',
      paragraphs: [
        '1. Check your timetable data before blaming the software. Ours was wrong at 3 of 4 venues.',
        '2. Let staff own the schedule. Take the payment first, and plan the day after.',
        '3. Automate the follow-ups people forget: sale alerts and review requests.',
        '4. Measure the forms. A field nobody notices can lose half your sign-ups.',
      ],
    },
    related: [
      { label: 'Business process automation', href: '/what-we-build/automation' },
      { label: 'SEO and Google Ads', href: '/what-we-build/digital-marketing' },
      { label: 'Visit Luxe Excursions', href: 'https://luxeexcursionstenerife.com' },
    ],
  },
  {
    slug: 'staff-augmentation-vs-outsourcing',
    title: 'Staff Augmentation vs. Outsourcing',
    excerpt:
      'Staff augmentation adds engineers to your team; outsourcing hands a partner the outcome. Here is how to tell which model fits your project, budget, and risk.',
    date: '2026-10-06',
    category: 'Delivery',
    readTime: '7 min',
    intro:
      'When a roadmap outgrows the team, most companies in the US and UK reach for one of two models: augment the team with external engineers, or outsource the project to a partner who owns delivery. Both work. Both fail when they are chosen for the wrong reasons. The difference comes down to who owns the outcome, who manages the work day to day, and how much of your product knowledge needs to stay inside the building.',
    sections: [
      {
        heading: 'What staff augmentation actually means',
        body: 'With staff augmentation, external engineers join your team and work inside your process: your backlog, your standups, your code review, your definition of done. You keep product and technical leadership, and you decide what gets built and how. The partner is responsible for finding, vetting, and supporting the right people; you are responsible for directing them. It is the closest thing to hiring without the hiring cycle, and it works best when you already have strong engineering leadership and simply need more capacity or a specific skill.',
      },
      {
        heading: 'What outsourcing actually means',
        body: 'With project outsourcing, you agree a scope, a timeline, and an outcome, and the partner owns delivery. They bring their own project management, architecture decisions, and QA, and you review progress against milestones. The partner carries more of the delivery risk, which is why scope and acceptance criteria matter so much more. Outsourcing suits well-defined builds, such as a new product, a platform migration, or an internal tool, where you want a finished result more than extra hands.',
      },
      {
        heading: 'When staff augmentation is the better fit',
        body: 'Choose augmentation when the work is ongoing rather than a single project, when it touches systems only your team understands, or when you need to move fast on a skill you do not have in-house, such as cloud infrastructure, mobile, or AI integration. It also suits teams that want knowledge to stay with them: augmented engineers work in your repositories and your documentation, so nothing is locked inside a vendor. The trade-off is management time. Someone on your side needs to plan sprints, review work, and make technical calls.',
      },
      {
        heading: 'When outsourcing is the better fit',
        body: 'Choose outsourcing when you can describe the result clearly, when you do not have the leadership bandwidth to direct more engineers, or when the work is separate enough from your core systems to be built and handed over. It is also a good option when you need a full cross-functional team at once, with design, frontend, backend, QA, and DevOps, and do not want to assemble it piece by piece. The trade-off is control: changes to scope cost more, and you need clear handover and documentation at the end.',
      },
      {
        heading: 'Cost: compare total cost, not day rates',
        body: 'Day rates are the easiest number to compare and the least useful. With augmentation, the real cost includes the management time your team spends directing the work and the speed at which new engineers become productive. With outsourcing, it includes the partner’s project management overhead, the cost of scope changes, and the handover at the end. A fair comparison asks what it costs to ship the outcome you need, including your own team’s time, rather than what an engineer costs per day.',
      },
      {
        heading: 'Risk, IP, and security',
        body: 'Whichever model you choose, settle the basics before work starts. Your contract should assign intellectual property in the code to you, define confidentiality, and set out how access to systems and data is granted and removed. For augmentation, make sure engineers work in your accounts and repositories rather than the partner’s. For outsourcing, agree how code, credentials, and documentation are handed over, and do not wait until the end of the project to receive them. UK and EU teams should also confirm how personal data is handled under GDPR.',
      },
      {
        heading: 'Hybrid models are common',
        body: 'Many teams end up in between: an outsourced pod builds a new product while augmented engineers strengthen the core team, or a dedicated team works inside your process but owns a defined area of the product. A dedicated pod, a small team that stays together and works as an extension of your organization, is often the most practical middle ground. You keep product direction, and the partner keeps the team stable and productive.',
      },
    ],
    conclusion: {
      heading: 'How to decide',
      paragraphs: [
        'Ask three questions. Who will own the outcome? Who has the time to manage the work every day? How much of this knowledge must stay in your team? If you have the leadership and need capacity, augment. If you need a result and do not have the bandwidth to direct it, outsource. If the honest answer is somewhere in between, a dedicated pod is usually the right starting point.',
        'Stack360 works in all three ways: augmenting teams with vetted engineers, delivering projects end to end, and running dedicated pods for longer-term work, with no long-term contract required to start.',
      ],
    },
  },
  {
    slug: 'how-to-choose-a-software-development-partner',
    title: 'How to Choose a Software Development Partner',
    excerpt:
      'Ten questions that separate a dependable software development partner from an expensive mistake, from who writes your code to what happens at handover.',
    date: '2026-10-06',
    category: 'Delivery',
    readTime: '8 min',
    intro:
      'Choosing a software development partner is one of the highest-stakes decisions a startup founder, operations leader, or CTO makes. Portfolios look similar, every proposal promises quality, and the real differences only appear months into the project. These ten questions are designed to surface those differences before you sign, whether you are hiring a partner in your own country or working with a distributed team across time zones.',
    sections: [
      {
        heading: '1. Who will actually work on our project?',
        body: 'Ask to meet the engineers and the lead who will be assigned, not only the sales team. Ask how long they have been with the company and whether the same people will stay on the project throughout. A strong partner can tell you who will do the work and what happens if someone leaves. A vague answer here is the most common early warning sign.',
      },
      {
        heading: '2. Have you built something like this before?',
        body: 'Look for relevant experience rather than a long client list: the same kind of system, scale, or industry. Ask for a case study you can discuss in detail, including what went wrong and how it was handled. Partners who can talk honestly about difficult moments are usually the ones who handle them well.',
      },
      {
        heading: '3. How do you turn our idea into a plan?',
        body: 'A good partner starts with discovery: understanding your goals, users, constraints, and existing systems before quoting. Be cautious of fixed quotes produced after a single call for anything complex. You should come away with a clear scope, a delivery plan with milestones, and a list of assumptions and risks.',
      },
      {
        heading: '4. How will we see progress?',
        body: 'Ask how often you will see working software, not status reports. Weekly or fortnightly demos of real, deployed features are the clearest signal that a project is on track. Agree up front where the code lives, who has access, and how decisions are recorded.',
      },
      {
        heading: '5. How do you handle changes in scope?',
        body: 'Every real project changes. Ask how changes are estimated, approved, and reflected in timelines and cost. A healthy process makes the trade-offs visible, such as adding this feature moving that one, rather than absorbing changes silently until the budget runs out.',
      },
      {
        heading: '6. How do you make sure the software works?',
        body: 'Ask about testing, code review, and release practices. Who writes automated tests? Is every change reviewed by another engineer? How are releases deployed and rolled back? Quality should be part of the process from the first sprint, not a phase at the end.',
      },
      {
        heading: '7. Who owns the code and the intellectual property?',
        body: 'Your contract should assign ownership of the code and other work product to you. Make sure the code is stored in repositories you control, and that you can take over or move to another team without asking permission. This protects you whatever happens to the relationship.',
      },
      {
        heading: '8. How do you handle security and data?',
        body: 'Ask how access to your systems is managed, how secrets are stored, and how personal data is protected. If you handle health, financial, or EU and UK personal data, ask specifically about the relevant regulations, such as HIPAA or GDPR, and what the partner has done before in that area.',
      },
      {
        heading: '9. How does communication work across time zones?',
        body: 'Distributed teams can be a strength, with work continuing while you sleep, but only with a clear rhythm. Ask about overlap hours, response times, who your main point of contact is, and how urgent issues are escalated. Agree the tools you will use from day one.',
      },
      {
        heading: '10. What happens at the end?',
        body: 'Ask about handover before you start: documentation, knowledge transfer, and support after launch. A partner confident in their work will make it easy for you to continue without them, whether that means your own team taking over or an ongoing support arrangement.',
      },
    ],
    conclusion: {
      heading: 'Choose for the hard months, not the first meeting',
      paragraphs: [
        'Most partners look good in a pitch. The right one is still communicating clearly, shipping working software, and telling you the truth in month six. Use these questions to judge how a partner will behave when the project gets difficult, because at some point it will.',
        'If you are evaluating Stack360, we are happy to answer every one of these questions on a discovery call.',
      ],
    },
  },
  {
    slug: 'mvp-development-guide',
    title: 'MVP Development: Scope, Build, and Launch',
    excerpt:
      'A practical MVP development guide for founders: scope the smallest useful product, choose what to build first, and launch in a way that teaches you something.',
    date: '2026-10-06',
    category: 'Engineering',
    readTime: '7 min',
    intro:
      'A minimum viable product is the smallest version of your product that real users can use and learn from. Its job is not to impress investors or match competitors feature for feature. Its job is to test your riskiest assumption with real people as quickly and cheaply as possible. Most MVPs that fail do so because they were too big, not too small.',
    sections: [
      {
        heading: 'Start with the riskiest assumption',
        body: 'Before writing any code, write down what must be true for your business to work: that a specific group of people has a specific problem, that they will use your solution, and that someone will pay. Pick the assumption you are least sure about. Your MVP should be designed to test that one, and everything that does not help test it can wait.',
      },
      {
        heading: 'Define one core journey',
        body: 'Describe the single journey that delivers your product’s value, from the moment a user arrives to the moment they get what they came for. A marketplace might be listing an item and completing a purchase; a SaaS tool might be connecting data and seeing a first useful report. Build that journey end to end before adding anything around it.',
      },
      {
        heading: 'Cut scope deliberately',
        body: 'Go through your feature list and ask of each item whether the core journey works without it. Admin panels, advanced settings, multiple user roles, integrations, and edge-case handling can often be manual or postponed. A feature that is done by hand behind the scenes for your first users is often the fastest way to learn whether it is worth building properly.',
      },
      {
        heading: 'Choose boring, proven technology',
        body: 'An MVP is not the place to experiment with a new framework. Choose a well-supported stack your team knows, use managed cloud services, and lean on existing tools for payments, authentication, and email. The goal is to spend engineering time on what makes your product different, and to keep the code clean enough that it can grow when the MVP succeeds.',
      },
      {
        heading: 'Build quality where it matters',
        body: 'Minimum does not mean careless. The core journey should be reliable, secure, and pleasant to use, because users judge your product on it. Put automated tests around the critical paths, protect user data properly from day one, and keep the architecture simple enough to change. Polish the parts users see; keep everything else minimal.',
      },
      {
        heading: 'Measure from the first user',
        body: 'Decide before launch what success looks like: activation, repeat use, conversion, or willingness to pay. Add analytics to the core journey and talk to your first users directly. Numbers show you what people do; conversations tell you why. Both are needed to decide what to build next.',
      },
      {
        heading: 'Plan for what comes after',
        body: 'A successful MVP creates a new problem: more users, more requests, and pressure to scale. Plan a short stabilization phase after launch to fix what users hit first, and keep a running list of the shortcuts you took so they can be revisited deliberately rather than discovered in production.',
      },
    ],
    conclusion: {
      heading: 'Small, real, and measurable',
      paragraphs: [
        'The best MVPs are small enough to build quickly, real enough that people genuinely use them, and measurable enough that you learn something either way. Start from the riskiest assumption, build one journey well, and let real usage decide what comes next.',
        'Stack360 helps founders scope and build MVPs, starting with a discovery call to agree the core journey, a delivery plan with clear milestones, and weekly demos of working software.',
      ],
    },
  },
  {
    slug: 'mastering-python-important-features',
    title: 'Mastering Python: Important Features and How to Use Them',
    excerpt:
      'Python’s feature set and simple syntax make it one of the most widely used languages — here are the crucial capabilities and how to use them well.',
    date: '2026-07-13',
    category: 'Engineering',
    readTime: '8 min',
    intro:
      'Python is one of the most widely used programming languages in the world because of its extensive feature set and simple syntax. Its many features help both novice and expert programmers alike, adding to the smooth experience it offers. I will be discussing some of Python’s most crucial features and discussing how to utilize them efficiently.',
    sections: [
      {
        heading: 'Simple Syntax',
        body: 'Python’s simple syntax is arguably its most appealing feature. Its readability enables beginners to pick up the language swiftly, facilitating comprehension. In Python, the use of English keywords instead of punctuations makes it feel natural and less like a traditional programming language.',
      },
      {
        heading: 'Dynamic Typing',
        body: 'Python uses dynamic typing which means you don’t need to state the data type of a variable when declaring it. The interpreter infers the data type, providing flexibility when coding. However, keep an eye out for unexpected behaviours if data types change unexpectedly.',
      },
      {
        heading: 'Indentation for Code Blocks',
        body: 'Instead of using brackets or specific keywords to define a block of code, Python uses indentation. Consistent use of indentation improves code readability, reducing confusion.',
      },
      {
        heading: 'Python Libraries and Frameworks',
        body: 'Python is popular for its robust libraries and frameworks which enable speedy application development. Whether you’re working on machine learning projects, web development, or data analysis, Python has a library or framework to simplify the task. Remember to explore Python’s diverse selection of libraries to expedite your project.',
      },
      {
        heading: 'Interactive Shell',
        body: 'Python provides an interactive shell for experimenting and debugging, proving advantageous for beginners to understand code behaviours. You can access Python’s interactive shell directly from your terminal by typing ‘python’.',
      },
      {
        heading: 'Cross-Platform Compatibility',
        body: 'Python is compatible with a variety of operating systems like Windows, Linux, macOS, and Unix. That’s why there is no need to modify the programming syntax when transferring between operating systems. It improves portability and makes cross-platform debugging easier.',
      },
      {
        heading: 'File Handling',
        body: 'Python comes with simple file handling methods. You can create, read, write, or append a file using in-built functions like open(), read(), write(), and close() respectively. Remember to close files after performing the operations to prevent memory leaks.',
      },
      {
        heading: 'Object-Oriented Programming',
        body: 'Python supports object-oriented programming (OOP) principles. It provides another layer of simplicity and effectiveness in programming structure. Class and Object, the two pillars of OOP in Python, streamline coding through reusability.',
      },
    ],
    conclusion: {
      heading: 'Conclusion',
      paragraphs: [
        'Using these Python features, programming tasks become relatively more comfortable. They enable a beginner-friendly approach to programming while still providing powerful tools for more advanced tasks.',
        'Experiment with these features as you become more proficient with Python and use its capabilities to deliver impressive, efficient coding projects.',
      ],
    },
  },
  {
    slug: 'designing-systems-that-survive-growth',
    title: 'Designing Systems That Survive Growth',
    excerpt:
      'Early architecture choices either absorb traffic and team growth — or force a rewrite. Here is how we decide what to harden now versus what to leave flexible.',
    date: '2026-06-28',
    category: 'Architecture',
    readTime: '6 min',
    intro:
      'Most systems do not fail because the first version was wrong. They fail because the first version assumed growth would never change the shape of the problem. At Stack360 we treat early architecture as a set of deliberate bets: what must stay stable, what can flex, and what we refuse to invent until the product proves it needs it.',
    sections: [
      {
        heading: 'Start from the load that matters',
        body: 'Before drawing boxes, name the load that would actually hurt: concurrent writes, report queries at month-end, file uploads, webhook bursts. Design for that load first. Everything else can be simpler until evidence says otherwise.',
      },
      {
        heading: 'Separate durable contracts from replaceable insides',
        body: 'APIs, event schemas, and data ownership boundaries should be boring and versioned. Internal modules, queues, and caches should stay replaceable. When those two layers blur, every refactor becomes a migration.',
      },
      {
        heading: 'Make failure visible early',
        body: 'Retries, timeouts, and dead-letter paths are not polish — they are how you learn where the system breaks. Ship observability with the first production path so growth shows up as a signal, not a surprise outage.',
      },
      {
        heading: 'Leave escape hatches, not speculative platforms',
        body: 'A thin adapter, a feature flag, or a clear seam for a future service is cheaper than a premature microservices mesh. Prefer seams you can cut later over platforms you must staff forever.',
      },
    ],
    conclusion: {
      heading: 'Conclusion',
      paragraphs: [
        'Systems that survive growth are rarely the most elaborate on day one. They are the ones with clear contracts, honest load assumptions, and room to evolve without rewriting the business.',
        'If you are planning a rebuild or a first architecture pass, start with the load and the contracts — the rest follows.',
      ],
    },
  },
  {
    slug: 'quality-as-a-release-gate',
    title: 'Quality as a Release Gate, Not a Phase',
    excerpt:
      'QA that starts after “dev is done” always loses. Treat checks as gates in the delivery path — and ship with fewer late surprises.',
    date: '2026-05-20',
    category: 'Delivery',
    readTime: '5 min',
    intro:
      'Teams still talk about “QA phase” as if quality is a station the build visits once. In practice, defects that reach that station are already expensive. We treat quality as a sequence of gates: each one must pass before the work can move closer to production.',
    sections: [
      {
        heading: 'Define done before work starts',
        body: 'Acceptance criteria, edge cases, and non-functional expectations belong in the ticket — not in a Slack thread after merge. When “done” is fuzzy, every gate becomes a negotiation.',
      },
      {
        heading: 'Automate the boring checks',
        body: 'Lint, typecheck, unit coverage on critical paths, and smoke tests on the happy path should run on every pull request. Humans should spend attention on judgment calls, not on catching typos the pipeline already knows how to find.',
      },
      {
        heading: 'Keep a human gate for risk',
        body: 'Exploratory testing, permission matrices, and migration rehearsals still need people. Gate them by risk: money movement, auth, data deletion, and irreversible ops get explicit review before release.',
      },
      {
        heading: 'Close the loop after ship',
        body: 'A release gate without post-deploy checks is incomplete. Smoke the critical flows in production, watch error budgets, and feed what broke back into the next ticket’s definition of done.',
      },
    ],
    conclusion: {
      heading: 'Conclusion',
      paragraphs: [
        'Quality as a gate means the build cannot advance until the right checks pass — automated where possible, human where the risk demands it.',
        'That discipline is what lets delivery stay fast without treating production as the first real test environment.',
      ],
    },
  },
] as const;

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getBlogSlugs(): string[] {
  return BLOG_POSTS.map((post) => post.slug);
}
