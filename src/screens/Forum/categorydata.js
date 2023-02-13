export const categoryDate = [
  {
    title: "howto",
    description:
      "Tutorial topics that describe how to set up, configure, or install Discourse using a specific platform or environment. Topics in this category may only be created by trust level 2 and up.",
    options: [
      { name: "faq", color: "#D0232B" },
      { name: "admins", color: "#F15D22" },
      { name: "sysadmin", color: "#E9DD00" },
      { name: "developers", color: "#00A94F" },
      { name: "tips & tricks", color: "#00AEEF" },
      { name: "training", color: "#92278F" },
    ],
    week: "1/week",
    borderColor: "#00A94F",
    times: "x3",
  },
  {
    title: "bug",
    description:
      "A bug report means something is broken, preventing normal/typical use of Discourse. Do be sure to search prior to submitting bugs. Include repro steps, and only describe one bug per topic please. Bugs in plugins should be reported in the plugin topic, or the plugin tag.",
    options: [],
    week: "11/week",
    borderColor: "#e9dd00",
    times: "x3986",
  },
  {
    title: "feature",
    description:
      "Discussion about existing Discourse features, how they can be improved or enhanced, and how proposed new features could work.",
    options: [{ name: "announcements", color: "#ED207B" }],
    week: "13/week",
    borderColor: "#e9dd00",
    times: "x 5757",
  },
  {
    title: "ux",
    description:
      "Discussion about the user interface of Discourse, how features are presented to the user in the client, including language and UI elements.",
    options: [],
    week: "7/week",
    borderColor: "#5F497A",
    times: "x 1872",
  },
  {
    title: "community",
    description:
      "A great platform doesn’t guarantee success. Community building is a science. This category is for discussions about launching, building, growing and managing a thriving community.",
    options: [],
    week: "1/week",
    borderColor: "#12A89D",
    times: "x 660",
  },
  {
    title: "dev",
    description:
      "Anything related to hacking on Discourse: submitting pull requests, configuring development environments, coding conventions, and so forth.",
    options: [
      { name: "sso", color: "#d47711" },
      { name: "translations", color: "#808281" },
    ],
    week: "7/week",
    borderColor: "#292929",
    times: "x 2240",
  },
  {
    title: "Site Feedback",
    description:
      "Discussion about meta.discourse.org itself, the organization of this forum about Discourse, how it works, and how we can improve this site.",
    options: ["blog"],
    week: "1/week",
    borderColor: "#aaa",
    times: "x 325",
  },
  {
    title: "support",
    description:
      "Support on configuring and using Discourse after it is up and running. For installation questions, use the install category. Basic HTML and CSS questions are not in scope for support here.",
    options: ["wordpress"],
    week: "41/week",
    borderColor: "#CEA9A9",
    times: "x 14034",
  },
  {
    title: "hosting",
    description:
      "Topics about hosting Discourse, either on your own servers, in the cloud, or with specific hosting services.",
    options: [],
    week: "456",
    borderColor: "#00AEEF",
    times: "x 456",
  },
  {
    title: "Uncategorized",
    description:
      "Topics that don't need a category, or don't fit into any other existing category.",
    options: [],
    week: "3/week",
    borderColor: "#AB9364",
    times: "x 116",
  },
  {
    title: "marketplace",
    description:
      "About commercial Discourse related stuff: jobs or paid gigs, plugins, themes, hosting, etc. All soliciting must be in this public category, private solicitations are not permitted here.",
    options: [],
    week: "2/week",
    borderColor: "#8C6238",
    times: "x 908",
  },
  {
    title: "plugin",
    description:
      "Plugin directory. To post here, use the Request Access button on the group page with a link to your plugin.",
    options: [
      { name: "extras", color: "#25AAE2" },
      { name: "broken-plugin", color: "#231F20" },
    ],
    week: "1/week",
    borderColor: "#F7941D",
    times: "x 222",
  },
  {
    title: "releases",
    description:
      "Outlining each official release of Discourse, and plans for future releases.",
    options: [],
    week: "21",
    borderColor: "#BF1E2E",
    times: "x 21",
  },
  {
    title: "installation",
    description:
      "Getting Discourse up and running for the first time, and anything you need for installation.",
    options: [],
    week: "1/week",
    borderColor: "#997E7E",
    times: "x 1337",
  },
  {
    title: "praise",
    description: "Got something nice to say about Discourse?",
    options: ["comparison"],
    week: "253",
    borderColor: "#9EB83B",
    times: "x 244",
  },
  {
    title: "theme",
    description:
      "Themes are reusable CSS/HTML blocks you can use on your site.",
    options: ["broken-theme"],
    week: "2/week",
    borderColor: "#E43D30",
    times: "x 241",
  },
  {
    title: "migration",
    description:
      "Migrating your community from one platform to Discourse may seem like a daunting prospect, but it doesn’t have to be. Topics here will make it easier for you.",
    options: [],
    week: "7",
    borderColor: "#652D90",
    times: "x 8",
  },
];

export const Tags = [
  { tag: "unsupported-install" },
  { tag: "faq-material" },
  { tag: "pr-welcome" },
  { tag: "theme-component" },
  { tag: "api" },
  { tag: "solved" },
  { tag: "data-explorer" },
  { tag: "voting" },
  { tag: "email" },
  { tag: "release-notes" },
  { tag: "docker" },
  { tag: "advertising" },
  { tag: "css" },
  { tag: "chat-integration" },
  { tag: "migration" },
  { tag: "official" },
  { tag: "rfc" },
  { tag: "sso" },
  { tag: "markdown-it-review" },
  { tag: "discourseconnect" },
  { tag: "theme-full" },
  { tag: "wordpress" },
  { tag: "plugins" },
  { tag: "tagging" },
  { tag: "accessibility" },
  { tag: "badge" },
  { tag: "patreon" },
  { tag: "spec" },
  { tag: "themes" },
  { tag: "assign" },
];
