export const journeyStages = [
  {
    id: 1,
    title: "Voter Registration",
    icon: "how_to_reg",
    description: "The foundation of any democratic election begins with voter registration. During this phase, eligible citizens are recorded onto the official electoral roll.",
    simpleDescription: "Get your name on the list so you can vote in the election.",
    content: [
      { title: "Eligibility", text: "Verify your age, citizenship, and residency requirements.", simple: "Check if you are allowed to vote." },
      { title: "Registration", text: "Submit your details to be included in the official Electoral Register.", simple: "Give your details to the election office." },
      { title: "Deadlines", text: "Ensure you register before the cutoff date for the upcoming election.", simple: "Do it before the last date." }
    ],
    estimatedTime: "5 min"
  },
  {
    id: 2,
    title: "Candidate Nomination",
    icon: "person_add",
    description: "In this stage, individuals who wish to run for office must formally submit their candidacy and fulfill legal requirements.",
    simpleDescription: "People who want to be leaders sign up and get approved.",
    content: [
      { title: "Filing Papers", text: "Candidates submit formal nomination forms and required deposits.", simple: "Leaders fill out forms to join." },
      { title: "Scrutiny", text: "Election officials verify the eligibility and documents of all candidates.", simple: "Officers check if leaders are okay." },
      { title: "Symbol Allotment", text: "Unique symbols are assigned to candidates for identification on ballots.", simple: "Each leader gets a special picture." }
    ],
    estimatedTime: "8 min"
  },
  {
    id: 3,
    title: "Campaigning",
    icon: "campaign",
    description: "Candidates and political parties reach out to voters to share their platforms and promises.",
    simpleDescription: "Leaders talk to people and promise to help them.",
    content: [
      { title: "Manifestos", text: "Parties release documents detailing their plans and policy promises.", simple: "Read what leaders plan to do." },
      { title: "Public Outreach", text: "Speeches, rallies, and door-to-door canvassing to connect with voters.", simple: "Leaders meet and talk to you." },
      { title: "Ethics", text: "Adherence to the Model Code of Conduct to ensure fair competition.", simple: "Everyone must follow fair rules." }
    ],
    estimatedTime: "10 min"
  },
  {
    id: 4,
    title: "Voting Day",
    icon: "how_to_vote",
    description: "The climax of the election process where registered voters go to polling booths to cast their ballots.",
    simpleDescription: "The day you go and pick your favorite leader.",
    content: [
      { title: "Polling Stations", text: "Visit your assigned booth during the specified voting hours.", simple: "Go to your voting place." },
      { title: "ID Verification", text: "Present your voter ID or approved alternatives to officials.", simple: "Show your ID card to the officer." },
      { title: "Secret Ballot", text: "Cast your vote privately to ensure independence and security.", simple: "Vote alone in a private box." }
    ],
    estimatedTime: "15 min"
  },
  {
    id: 5,
    title: "Vote Counting",
    icon: "analytics",
    description: "After the polls close, all ballots are collected and counted under strict supervision.",
    simpleDescription: "Officers count the votes to see who won.",
    content: [
      { title: "Security", text: "Secure transport and storage of ballot boxes or electronic machines.", simple: "Votes are kept very safe." },
      { title: "Transparency", text: "Counting occurs in the presence of candidate representatives.", simple: "Everyone watches the counting." },
      { title: "Tabulation", text: "Exact calculation of every valid vote cast in the election.", simple: "Total marks are added up." }
    ],
    estimatedTime: "12 min"
  },
  {
    id: 6,
    title: "Results",
    icon: "workspace_premium",
    description: "The final stage where the winners are officially announced and certified.",
    simpleDescription: "The winners are announced and start their work.",
    content: [
      { title: "Declaration", text: "Official announcement of the winning candidates and parties.", simple: "The winner is announced." },
      { title: "Certification", text: "Issuance of formal election certificates to the winners.", simple: "Winner gets a certificate." },
      { title: "Governance", text: "The transition period before the formation of the new government.", simple: "New leaders start helping people." }
    ],
    estimatedTime: "5 min"
  }
];
