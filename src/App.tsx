import { useEffect, useState } from "react";
import Background from "../components/Background";
import { PlaybackState, Vinyl } from "../components/Vinyl";
import Footer from "../layout/Footer";
import st from "./App.module.css";
import componentsStyles from "./Components.module.scss";

type ThemePreference = "light" | "dark" | "auto";

const themePreferences: ThemePreference[] = ["light", "dark", "auto"];
const themeLabels: Record<ThemePreference, string> = {
  light: "Light",
  dark: "Dark",
  auto: "Auto",
};
const themeStorageKey = "manix84-theme";

const featuredProjects = [
  {
    title: "Time Pilot",
    kicker: "Playable arcade rebuild",
    description:
      "A TypeScript browser recreation of the 1982 arcade shooter, rebuilt around a reusable arcade engine and packaged as a modern web experience.",
    image: "/project-shots/time-pilot.png",
    demoUrl: "https://time-pilot.co.uk",
    repoUrl: "https://github.com/manix84/time-pilot",
    tags: ["TypeScript", "Canvas", "PWA", "Game systems"],
  },
  {
    title: "Arcade Engine",
    kicker: "Component and game tooling",
    description:
      "A Storybook-backed arcade engine with camera modes, telemetry, controls, and demo scenes for building small web games with repeatable primitives.",
    image: "/project-shots/arcade-engine.png",
    demoUrl: "https://manix84.github.io/arcade-engine/",
    repoUrl: "https://github.com/manix84/arcade-engine",
    tags: ["TypeScript", "Storybook", "3D scenes", "Engine design"],
  },
  {
    title: "Smart Shopping List",
    kicker: "Local-first utility app",
    description:
      "A privacy-minded shopping list that parses rough grocery notes, groups items by aisle, supports shared lists, and keeps everyday workflows fast.",
    image: "/project-shots/shopping-list.png",
    darkImage: "/project-shots/shopping-list-dark.png",
    demoUrl: "https://shoppinglist.website",
    repoUrl: "https://github.com/manix84/shopping-list",
    tags: ["TypeScript", "Local-first", "UX systems", "Data parsing"],
  },
  {
    title: "MagicEyeLab",
    kicker: "Browser creative tool",
    description:
      "A no-upload stereogram studio for painting depth maps, tuning repeat patterns, and generating hidden depth images directly in the browser.",
    image: "/project-shots/magiceyelab.png",
    darkImage: "/project-shots/magiceyelab-dark.png",
    demoUrl: "https://manix84.github.io/magiceyelab/",
    repoUrl: "https://github.com/manix84/magiceyelab",
    tags: ["TypeScript", "Canvas", "Image tools", "Privacy-first"],
  },
];

const compactProjects = [
  {
    title: "Little Alchemist 2 Hints",
    description:
      "A fast client-side search engine for Little Alchemist 2 combinations.",
    image: "/project-shots/little-alchemist.png",
    darkImage: "/project-shots/little-alchemist-dark.png",
    demoUrl: "https://manix84.github.io/little-alchemist-2-cheats/",
    repoUrl: "https://github.com/manix84/little-alchemist-2-cheats",
  },
  {
    title: "Discord GMod Muter",
    description:
      "A Garry's Mod addon and Discord bot pairing for muting dead TTT players, with 100+ public forks across the companion tools.",
    demoUrl: "https://github.com/manix84/discord_gmod_bot",
    repoUrl: "https://github.com/manix84/discord_gmod_addon",
  },
  {
    title: "Chrome Utility Extensions",
    description:
      "Small focused extensions for screenshots, tab recording, video popout, and picture-in-picture workflows.",
    demoUrl: "https://github.com/manix84?tab=repositories&q=chrome-ext",
    repoUrl: "https://github.com/manix84/chrome-ext-tab-full-screenshot",
  },
];

const experience = [
  {
    company: "CleeAI",
    role: "Lead Full-Stack Engineer",
    detail:
      "Lead full-stack product work across AI interfaces, insight reporting, embeddable chatbots, and research search experiences, with a strong front-end focus and transparent source-backed results.",
  },
  {
    company: "Amazon Prime Video",
    role: "Senior front-end and UI systems",
    detail:
      "Worked on the Lovefilm to Amazon Video transition and reusable component systems powering Prime Video UI across product surfaces.",
  },
  {
    company: "BBC iPlayer",
    role: "TV, radio, and channel experiences",
    detail:
      "Delivered audience-facing web experiences across iPlayer, radio, TV Guide, Children in Need, CBBC, and channel pages.",
  },
  {
    company: "Flick / Vault, Vorboss, Free Radical Design",
    role: "Product UI, portals, and games",
    detail:
      "Built customer portals, fan product experiences, and early social web games, covering both product delivery and experimental interactive work.",
  },
];

const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

const getStoredThemePreference = (): ThemePreference => {
  const storedTheme = window.localStorage.getItem(themeStorageKey);

  return storedTheme === "light" || storedTheme === "dark"
    ? storedTheme
    : "auto";
};

const ThemeSwitcher = ({
  themePreference,
  onThemeChange,
}: {
  themePreference: ThemePreference;
  onThemeChange: (theme: ThemePreference) => void;
}) => (
  <div className={st.themeSwitcher} aria-label="Theme selection" role="group">
    {themePreferences.map((theme) => (
      <button
        key={theme}
        type="button"
        aria-pressed={themePreference === theme}
        className={st.themeButton}
        data-active={themePreference === theme}
        onClick={() => onThemeChange(theme)}
      >
        {themeLabels[theme]}
      </button>
    ))}
  </div>
);

const ProjectScreenshot = ({
  image,
  darkImage,
  alt,
  className,
}: {
  image: string;
  darkImage?: string;
  alt: string;
  className: string;
}) => (
  <>
    <img
      src={image}
      alt={alt}
      className={`${className} ${darkImage ? st.lightProjectImage : ""}`}
    />
    {darkImage ? (
      <img
        src={darkImage}
        alt={alt}
        className={`${className} ${st.darkProjectImage}`}
      />
    ) : null}
  </>
);

const Home = () => {
  useEffect(() => {
    document.title = "Rob Taylor | Lead Full-Stack Engineer";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        "Lead full-stack engineer portfolio for Rob Taylor, showing professional experience, front-end depth, and selected personal projects.",
      );
  }, []);

  return (
    <main className={st.page}>
      <section className={st.hero}>
        <div className={st.heroCopy}>
          <p className={st.eyebrow}>Rob Taylor / manix84</p>
          <h1>Lead full-stack engineer with deep front-end focus.</h1>
          <p className={st.lede}>
            I have spent 25+ years building for the web, growing from hands-on
            front-end specialist into lead and head-level full-stack roles
            across BBC iPlayer, Prime Video UI systems, AI products,
            privacy-first tools, browser games, and small utilities that solve
            real problems.
          </p>
          <div className={st.actions}>
            <a href="#projects" className={st.primaryAction}>
              View projects
            </a>
            <a
              href="https://github.com/manix84"
              className={st.secondaryAction}
              target="_blank"
              rel="noreferrer"
            >
              GitHub profile
            </a>
          </div>
        </div>

        <div className={st.heroPanel} aria-label="Portfolio highlights">
          <div className={st.metric}>
            <span>25+</span>
            <p>years building web products and interfaces</p>
          </div>
          <div className={st.metric}>
            <span>9</span>
            <p>years on Prime Video UI systems</p>
          </div>
          <div className={st.metric}>
            <span>3.75</span>
            <p>years across BBC iPlayer and radio</p>
          </div>
          <div className={st.focusList}>
            <p>Current focus</p>
            <ul>
              <li>AI tools with transparent user value</li>
              <li>Full-stack product delivery with front-end depth</li>
              <li>Privacy-first utilities with no account friction</li>
            </ul>
          </div>
        </div>
      </section>

      <section className={st.section} id="projects">
        <div className={st.sectionHeader}>
          <p className={st.eyebrow}>Selected work</p>
          <h2>Personal projects that show the same product instincts.</h2>
          <p>
            These are public, off-hours projects chosen because they show usable
            interfaces, engineering taste, and the habit of finishing the
            details.
          </p>
        </div>

        <div className={st.projectGrid}>
          {featuredProjects.map((project) => (
            <article className={st.projectCard} key={project.title}>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className={st.projectImageLink}
                aria-label={`${project.title} live demo`}
              >
                <ProjectScreenshot
                  image={project.image}
                  darkImage={project.darkImage}
                  alt={`${project.title} screenshot`}
                  className={st.projectImage}
                />
              </a>
              <div className={st.projectBody}>
                <p className={st.projectKicker}>{project.kicker}</p>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className={st.tagList}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div className={st.projectLinks}>
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    Live demo
                  </a>
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={st.section}>
        <div className={st.sectionHeader}>
          <p className={st.eyebrow}>More examples</p>
          <h2>Small tools, experiments, and community projects.</h2>
        </div>
        <div className={st.compactGrid}>
          {compactProjects.map((project) => (
            <article className={st.compactCard} key={project.title}>
              {project.image ? (
                <ProjectScreenshot
                  image={project.image}
                  darkImage={project.darkImage}
                  alt={`${project.title} screenshot`}
                  className={st.compactImage}
                />
              ) : (
                <div className={st.codePreview} aria-hidden="true">
                  <span>repo</span>
                  <strong>{project.title}</strong>
                  <small>public source and implementation notes</small>
                </div>
              )}
              <div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className={st.projectLinks}>
                  <a href={project.demoUrl} target="_blank" rel="noreferrer">
                    Open
                  </a>
                  <a href={project.repoUrl} target="_blank" rel="noreferrer">
                    Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={st.section}>
        <div className={st.sectionHeader}>
          <p className={st.eyebrow}>Professional experience</p>
          <h2>Technical leadership, product teams, and public-facing scale.</h2>
          <p>
            The project work sits alongside long-running professional experience
            leading and building across entertainment, AI products, service
            portals, full-stack systems, and front-end component libraries.
          </p>
        </div>

        <div className={st.experienceGrid}>
          {experience.map((item) => (
            <article className={st.experienceCard} key={item.company}>
              <p>{item.role}</p>
              <h3>{item.company}</h3>
              <span>{item.detail}</span>
            </article>
          ))}
        </div>
      </section>

      <section className={st.contactBand}>
        <div>
          <p className={st.eyebrow}>Available context</p>
          <h2>Want the deeper version?</h2>
          <p>
            The GitHub profile README keeps the long-form professional history,
            while the repositories show the public project trail.
          </p>
        </div>
        <div className={st.actions}>
          <a
            href="https://github.com/manix84/manix84/blob/main/README.md"
            className={st.primaryAction}
            target="_blank"
            rel="noreferrer"
          >
            Read experience
          </a>
          <a
            href="https://github.com/manix84?tab=repositories"
            className={st.secondaryAction}
            target="_blank"
            rel="noreferrer"
          >
            Browse repos
          </a>
        </div>
      </section>
    </main>
  );
};

const playbackStates: PlaybackState[] = ["idle", "playing", "paused", "ended"];

const playbackLabels: Record<PlaybackState, string> = {
  idle: "Ready",
  playing: "Playing",
  paused: "Paused",
  ended: "Needle returned",
};

const Components = () => {
  const [playbackState, setPlaybackState] = useState<PlaybackState>("idle");

  useEffect(() => {
    document.title = "Components | Rob Taylor";
  }, []);

  return (
    <main className={componentsStyles.components}>
      <section className={componentsStyles.showcase}>
        <header className={componentsStyles.header}>
          <div>
            <p className={componentsStyles.eyebrow}>CSS component archive</p>
            <h1>Vinyl Record Player</h1>
          </div>
          <p className={componentsStyles.intro}>
            A refreshed demo surface for an older record-player component,
            showing the plinth, record, arm, and control states as a complete
            interactive piece.
          </p>
        </header>

        <div className={componentsStyles.demoGrid}>
          <div className={componentsStyles.playerStage}>
            <Vinyl
              src="/examples/vinyl/cover.jpeg"
              state={playbackState}
              onStateChange={setPlaybackState}
            />
          </div>

          <aside
            className={componentsStyles.panel}
            aria-label="Playback state"
          >
            <div className={componentsStyles.statusRow}>
              <span>Status</span>
              <strong>{playbackLabels[playbackState]}</strong>
            </div>

            <div className={componentsStyles.stateGrid}>
              {playbackStates.map((state) => (
                <button
                  key={state}
                  type="button"
                  aria-pressed={playbackState === state}
                  data-active={playbackState === state}
                  className={componentsStyles.stateButton}
                  onClick={() => setPlaybackState(state)}
                >
                  {playbackLabels[state]}
                </button>
              ))}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
};

const getRoute = () => {
  const path = window.location.pathname.replace(/\/$/, "");
  return path.endsWith("/components") ? "components" : "home";
};

const App = () => (
  <ThemedApp />
);

const ThemedApp = () => {
  const [themePreference, setThemePreference] = useState<ThemePreference>(() =>
    getStoredThemePreference(),
  );

  useEffect(() => {
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");

    const applyTheme = () => {
      const resolvedTheme =
        themePreference === "auto" ? getSystemTheme() : themePreference;

      document.documentElement.dataset.theme = resolvedTheme;
      document.documentElement.dataset.themePreference = themePreference;
      document
        .querySelector('meta[name="theme-color"]')
        ?.setAttribute(
          "content",
          resolvedTheme === "dark" ? "#10252b" : "#8cb095",
        );
    };

    applyTheme();
    systemTheme.addEventListener("change", applyTheme);

    return () => {
      systemTheme.removeEventListener("change", applyTheme);
    };
  }, [themePreference]);

  const handleThemeChange = (nextTheme: ThemePreference) => {
    setThemePreference(nextTheme);

    if (nextTheme === "auto") {
      window.localStorage.removeItem(themeStorageKey);
    } else {
      window.localStorage.setItem(themeStorageKey, nextTheme);
    }
  };

  return (
    <>
      <Background />
      <ThemeSwitcher
        themePreference={themePreference}
        onThemeChange={handleThemeChange}
      />
      {getRoute() === "components" ? <Components /> : <Home />}
      <Footer />
    </>
  );
};

export default App;
