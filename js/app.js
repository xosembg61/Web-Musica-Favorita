import { albums, concerts, moods, sources, timeline } from "./data.js";

const storageKeys = {
  favorites: "oz-archivo-favorites",
  theme: "oz-archivo-theme",
  votes: "oz-archivo-votes"
};

const allTracks = albums.flatMap((album) => album.tracks.map((track) => ({
  ...track,
  id: `${album.id}-${track.disc}-${track.number}`,
  albumId: album.id,
  albumTitle: album.title,
  albumYear: album.year
})));
const tracksById = new Map(allTracks.map((track) => [track.id, track]));
const albumsById = new Map(albums.map((album) => [album.id, album]));

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  return `${Math.floor(totalSeconds / 60)}:${String(totalSeconds % 60).padStart(2, "0")}`;
}

function trackSearchUrl(track) {
  return `https://music.apple.com/us/search?term=${encodeURIComponent(`${track.title} Mägo de Oz`)}`;
}

let favorites = new Set(readStorage(storageKeys.favorites, []).filter((id) => tracksById.has(id)));
let votes = readStorage(storageKeys.votes, { counts: {}, selection: "" });
let activeMood = moods[0].id;
let showAllSongs = false;
const initialSongLimit = 8;

const albumGrid = document.querySelector("#albumGrid");
const songResults = document.querySelector("#songResults");
const albumModalElement = document.querySelector("#albumModal");
const infoModalElement = document.querySelector("#infoModal");
const albumModal = window.bootstrap?.Modal ? new window.bootstrap.Modal(albumModalElement) : null;
const infoModal = window.bootstrap?.Modal ? new window.bootstrap.Modal(infoModalElement) : null;
const toastElement = document.querySelector("#siteToast");
const toast = window.bootstrap?.Toast ? new window.bootstrap.Toast(toastElement, { delay: 2600 }) : null;

function announce(message) {
  document.querySelector("#toastMessage").textContent = message;
  if (toast) {
    toast.show();
    return;
  }
  toastElement.classList.add("show");
  window.setTimeout(() => toastElement.classList.remove("show"), 2600);
}

function saveFavorites() {
  localStorage.setItem(storageKeys.favorites, JSON.stringify([...favorites]));
  updateFavoriteCount();
  renderSongs();
  renderFavorites();
}

function updateFavoriteCount() {
  document.querySelector("#favoriteCount").textContent = favorites.size;
  document.querySelector("#favoriteCount").setAttribute("aria-label", `${favorites.size} canciones favoritas`);
}

function toggleFavorite(trackId) {
  if (!tracksById.has(trackId)) return;
  if (favorites.has(trackId)) {
    favorites.delete(trackId);
    announce("Canción eliminada de favoritos.");
  } else {
    favorites.add(trackId);
    announce("Canción guardada en favoritos.");
  }
  saveFavorites();
}

function albumArtMarkup(album) {
  return `<div class="album-art">
    <img src="${escapeHtml(album.artwork)}" alt="Portada de ${escapeHtml(album.title)}" loading="lazy" data-album-art="${escapeHtml(album.id)}">
    <div class="album-art-fallback" hidden aria-label="Portada provisional, no disponible en esta conexión">
      <small>Archivo de escucha · Portada no disponible</small>
      <strong>${escapeHtml(album.title)}</strong>
      <small>Mägo de Oz · ${album.year}</small>
    </div>
  </div>`;
}

function renderAlbums() {
  const query = document.querySelector("#albumSearch").value.trim().toLocaleLowerCase("es");
  const decade = document.querySelector("#decadeFilter").value;
  const year = document.querySelector("#yearFilter").value;
  const order = document.querySelector("#albumOrder").value;
  let visibleAlbums = albums.filter((album) => {
    const matchesQuery = `${album.title} ${album.year}`.toLocaleLowerCase("es").includes(query);
    return matchesQuery && (decade === "all" || album.decade === decade) && (year === "all" || String(album.year) === year);
  });
  visibleAlbums = visibleAlbums.sort((first, second) => order === "oldest" ? first.year - second.year : second.year - first.year);

  document.querySelector("#albumResultCount").textContent = `${visibleAlbums.length} ${visibleAlbums.length === 1 ? "álbum" : "álbumes"}`;
  if (!visibleAlbums.length) {
    albumGrid.innerHTML = `<p class="empty-state" role="status">No hay discos que coincidan. Prueba otro filtro.</p>`;
    return;
  }

  albumGrid.innerHTML = visibleAlbums.map((album, index) => `<article class="album-entry ${index === 0 ? "album-entry-featured" : ""}">
    ${albumArtMarkup(album)}
    <div class="album-entry-copy">
      <p class="album-year-line">${album.year} · ${album.trackCount} canciones</p>
      <h3>${escapeHtml(album.title)}</h3>
      <p>${escapeHtml(album.description)}</p>
      ${album.catalogNote ? `<p class="catalog-note">${escapeHtml(album.catalogNote)}</p>` : ""}
      <div class="album-entry-actions">
        <button class="text-action" type="button" data-action="album-details" data-id="${album.id}">Ficha y canciones</button>
        <a class="text-action" href="${escapeHtml(album.appleUrl)}" target="_blank" rel="noopener noreferrer">Abrir en Apple Music <span class="visually-hidden">: ${escapeHtml(album.title)}</span></a>
      </div>
    </div>
  </article>`).join("");

  albumGrid.querySelectorAll("[data-album-art]").forEach((image) => {
    image.addEventListener("error", () => {
      image.hidden = true;
      image.nextElementSibling.hidden = false;
    }, { once: true });
  });
}

function renderSongs() {
  const query = document.querySelector("#songSearch").value.trim().toLocaleLowerCase("es");
  const albumId = document.querySelector("#songAlbumFilter").value;
  const order = document.querySelector("#songOrder").value;
  const onlyFavorites = document.querySelector("#favoritesOnly").checked;
  let visibleTracks = allTracks.filter((track) => {
    const matchesText = `${track.title} ${track.albumTitle}`.toLocaleLowerCase("es").includes(query);
    return matchesText && (albumId === "all" || track.albumId === albumId) && (!onlyFavorites || favorites.has(track.id));
  });
  if (order === "title") visibleTracks = visibleTracks.sort((a, b) => a.title.localeCompare(b.title, "es"));
  if (order === "duration") visibleTracks = visibleTracks.sort((a, b) => a.durationMs - b.durationMs);
  if (order === "album") visibleTracks = visibleTracks.sort((a, b) => a.albumYear - b.albumYear || a.disc - b.disc || a.number - b.number);

  document.querySelector("#songResultCount").textContent = `${visibleTracks.length} canciones`;
  if (!visibleTracks.length) {
    songResults.innerHTML = `<p class="empty-state" role="status">No encontramos canciones con esos filtros.</p>`;
    document.querySelector("#showAllSongs").hidden = true;
    return;
  }

  const displayTracks = showAllSongs ? visibleTracks : visibleTracks.slice(0, initialSongLimit);
  songResults.innerHTML = displayTracks.map((track, index) => `<div class="song-row">
    <span class="song-index">${String(index + 1).padStart(2, "0")}</span>
    <a class="song-name-link" href="${escapeHtml(trackSearchUrl(track))}" target="_blank" rel="noopener noreferrer">${escapeHtml(track.title)}</a>
    <span class="song-album-label">${escapeHtml(track.albumTitle)}</span>
    <span class="song-duration">${formatDuration(track.durationMs)}</span>
    <button class="favorite-toggle" type="button" data-action="toggle-favorite" data-id="${track.id}" aria-pressed="${favorites.has(track.id)}" aria-label="${favorites.has(track.id) ? "Quitar" : "Añadir"} ${escapeHtml(track.title)} ${favorites.has(track.id) ? "de" : "a"} favoritos"><i class="bi ${favorites.has(track.id) ? "bi-heart-fill" : "bi-heart"}" aria-hidden="true"></i></button>
  </div>`).join("");
  const moreButton = document.querySelector("#showAllSongs");
  moreButton.hidden = visibleTracks.length <= initialSongLimit;
  moreButton.textContent = showAllSongs ? "Mostrar menos" : `Ver todas (${visibleTracks.length})`;
  moreButton.setAttribute("aria-expanded", String(showAllSongs));
}

function renderMoodRecommendations(moodId = activeMood) {
  activeMood = moodId;
  const mood = moods.find((item) => item.id === moodId) ?? moods[0];
  document.querySelectorAll("[data-mood]").forEach((button) => {
    button.setAttribute("aria-pressed", String(button.dataset.mood === mood.id));
  });
  const suggestions = mood.tracks.map((id) => tracksById.get(id)).filter(Boolean);
  document.querySelector("#moodRecommendations").innerHTML = suggestions.map((track) => `<a class="mood-track" href="${escapeHtml(trackSearchUrl(track))}" target="_blank" rel="noopener noreferrer"><i class="bi bi-arrow-up-right" aria-hidden="true"></i><span>${escapeHtml(track.title)}<small>${escapeHtml(track.albumTitle)}</small></span></a>`).join("");
  document.querySelector("#moodResultTitle").textContent = `Una selección ${mood.label.toLocaleLowerCase("es")}`;
}

function showAlbumDetails(albumId) {
  const album = albumsById.get(albumId);
  if (!album) return;
  document.querySelector("#albumModalTitle").textContent = album.title;
  document.querySelector("#albumModalMeta").textContent = `${album.year} · ${album.trackCount} canciones`;
  document.querySelector("#albumModalDescription").textContent = album.description;
  document.querySelector("#albumModalNote").textContent = album.catalogNote ?? "";
  document.querySelector("#albumModalTracks").innerHTML = album.tracks.map((track) => `<li>${escapeHtml(track.title)} <span>${formatDuration(track.durationMs)}</span></li>`).join("");
  document.querySelector("#albumModalLink").href = album.appleUrl;
  albumModal?.show();
}

function renderComparison() {
  const first = albumsById.get(document.querySelector("#compareFirst").value) ?? albums[0];
  const second = albumsById.get(document.querySelector("#compareSecond").value) ?? albums[1];
  const columns = [first, second].map((album) => `<article class="comparison-column">
    <p class="album-year-line">${album.year}</p><h3>${escapeHtml(album.title)}</h3>
    <p class="comparison-meta">${album.trackCount} canciones verificadas</p>
    <p class="section-copy">${escapeHtml(album.description)}</p>
    <ol class="comparison-tracks">${album.tracks.map((track) => `<li>${escapeHtml(track.title)} <span>${formatDuration(track.durationMs)}</span></li>`).join("")}</ol>
    <a class="text-action" href="${escapeHtml(album.appleUrl)}" target="_blank" rel="noopener noreferrer">Escuchar en Apple Music</a>
  </article>`).join("");
  document.querySelector("#comparisonResult").innerHTML = columns;
}

function showTimelineDetails(eventIndex) {
  const event = timeline[Number(eventIndex)];
  if (!event) return;
  document.querySelector("#infoModalTitle").textContent = event.title;
  document.querySelector("#infoModalBody").innerHTML = `<p class="album-year-line">${event.year} · ${escapeHtml(event.album)}</p><p>${escapeHtml(event.detail)}</p><a class="text-action" href="${escapeHtml(event.source)}" target="_blank" rel="noopener noreferrer">Consultar fuente</a>`;
  infoModal?.show();
}

function renderTimeline() {
  const period = document.querySelector("#timelineFilter").value;
  const events = timeline.map((event, index) => ({ ...event, index })).filter((event) => period === "all" || event.period === period);
  const container = document.querySelector("#timelineTrack");
  if (!events.length) {
    container.innerHTML = `<p class="empty-state">No hay hitos verificados en ese periodo.</p>`;
    return;
  }
  container.innerHTML = events.map((event) => `<article class="timeline-item">
    <span class="timeline-dot" aria-hidden="true"></span><span class="timeline-year">${event.year}</span>
    <h3>${escapeHtml(event.title)}</h3><p>${escapeHtml(event.album)}</p>
    <button class="timeline-detail" type="button" data-action="timeline-details" data-index="${event.index}">Leer hito</button>
  </article>`).join("");
}

function renderFavorites() {
  const list = document.querySelector("#favoriteList");
  const saved = [...favorites].map((id) => tracksById.get(id)).filter(Boolean);
  document.querySelector("#favoriteEmpty").hidden = saved.length > 0;
  list.innerHTML = saved.map((track) => `<li><a href="${escapeHtml(trackSearchUrl(track))}" target="_blank" rel="noopener noreferrer">${escapeHtml(track.title)} <span>${escapeHtml(track.albumTitle)}</span></a><button type="button" data-action="toggle-favorite" data-id="${track.id}" aria-label="Quitar ${escapeHtml(track.title)} de favoritos"><i class="bi bi-x-lg" aria-hidden="true"></i></button></li>`).join("");
  document.querySelector("#favoritesOnly").disabled = saved.length === 0;
}

const pollTrackIds = ["finisterra-2-1", "la-leyenda-1-5", "gaia-1-5", "finisterra-1-5", "gaia-1-7"];

function renderPoll() {
  const counts = votes.counts ?? {};
  const total = Object.values(counts).reduce((sum, count) => sum + Number(count || 0), 0);
  const ranking = pollTrackIds.map((id) => ({ track: tracksById.get(id), count: Number(counts[id] || 0) })).filter((entry) => entry.track).sort((a, b) => b.count - a.count || a.track.title.localeCompare(b.track.title, "es"));
  document.querySelector("#pollOptions").innerHTML = pollTrackIds.map((id) => {
    const track = tracksById.get(id);
    return `<label class="poll-option"><input type="radio" name="pollTrack" value="${id}" ${votes.selection === id ? "checked" : ""}><span>${escapeHtml(track.title)}</span></label>`;
  }).join("");
  document.querySelector("#pollResults").innerHTML = ranking.map(({ track, count }) => {
    const percentage = total ? Math.round((count / total) * 100) : 0;
    return `<div class="poll-result-row"><span>${escapeHtml(track.title)}</span><strong>${count} · ${percentage}%</strong><div class="poll-bar"><span style="width:${percentage}%"></span></div></div>`;
  }).join("");
  document.querySelector("#pollTotal").textContent = `${total} ${total === 1 ? "voto local" : "votos locales"}`;
}

function renderConcerts() {
  const today = new Date().toISOString().slice(0, 10);
  const future = concerts.filter((concert) => concert.date >= today);
  const container = document.querySelector("#concertList");
  if (!future.length) {
    container.innerHTML = `<p class="empty-state">No hay fechas futuras confirmadas en este archivo. Consulta la agenda oficial para novedades.</p>`;
    return;
  }
  container.innerHTML = future.map((concert) => {
    const date = new Date(`${concert.date}T12:00:00`);
    const formatted = new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", timeZone: "UTC" }).format(date).replace(".", "");
    return `<article class="concert-row"><time class="concert-date" datetime="${concert.date}">${formatted} ${date.getUTCFullYear()}</time><div class="concert-place"><strong>${escapeHtml(concert.city)}</strong><span>${escapeHtml(concert.venue)}</span></div><a href="${sources.concerts}" target="_blank" rel="noopener noreferrer">Agenda <i class="bi bi-arrow-up-right" aria-hidden="true"></i></a></article>`;
  }).join("");
}

function setTheme(theme, announceChange = false) {
  const nextTheme = theme === "dark" ? "dark" : "light";
  document.body.dataset.theme = nextTheme;
  localStorage.setItem(storageKeys.theme, nextTheme);
  const button = document.querySelector("#themeToggle");
  button.setAttribute("aria-pressed", String(nextTheme === "dark"));
  button.setAttribute("aria-label", `Cambiar a modo ${nextTheme === "dark" ? "claro" : "oscuro"}`);
  button.querySelector("i").className = `bi ${nextTheme === "dark" ? "bi-sun" : "bi-moon-stars"}`;
  document.querySelector("#themeLabel").textContent = nextTheme === "dark" ? "Modo claro" : "Modo oscuro";
  if (announceChange) announce(`Tema ${nextTheme === "dark" ? "oscuro" : "claro"} activado.`);
}

function renderGlobalSearch() {
  const input = document.querySelector("#globalSearch");
  const popover = document.querySelector("#globalSearchResults");
  const query = input.value.trim().toLocaleLowerCase("es");
  if (query.length < 2) {
    popover.hidden = true;
    popover.innerHTML = "";
    return;
  }
  const matchingAlbums = albums.filter((album) => album.title.toLocaleLowerCase("es").includes(query)).slice(0, 3);
  const matchingTracks = allTracks.filter((track) => `${track.title} ${track.albumTitle}`.toLocaleLowerCase("es").includes(query)).slice(0, 5);
  const results = [
    ...matchingAlbums.map((album) => `<button type="button" data-action="album-details" data-id="${album.id}">${escapeHtml(album.title)}<span class="search-kind">Álbum · ${album.year}</span></button>`),
    ...matchingTracks.map((track) => `<a href="${escapeHtml(trackSearchUrl(track))}" target="_blank" rel="noopener noreferrer">${escapeHtml(track.title)}<span class="search-kind">Canción · ${escapeHtml(track.albumTitle)}</span></a>`)
  ];
  popover.innerHTML = results.length ? results.join("") : `<p class="empty-state mb-0">Sin resultados para «${escapeHtml(input.value.trim())}».</p>`;
  popover.hidden = false;
}

function initShareLink() {
  const params = new URLSearchParams(window.location.search);
  const shared = params.get("favoritos");
  if (shared) {
    favorites = new Set(shared.split(",").filter((id) => tracksById.has(id)));
    localStorage.setItem(storageKeys.favorites, JSON.stringify([...favorites]));
  }
}

function bindEvents() {
  ["#albumSearch", "#decadeFilter", "#yearFilter", "#albumOrder"].forEach((selector) => {
    document.querySelector(selector).addEventListener("input", renderAlbums);
    document.querySelector(selector).addEventListener("change", renderAlbums);
  });
  ["#songSearch", "#songAlbumFilter", "#songOrder", "#favoritesOnly"].forEach((selector) => {
    const element = document.querySelector(selector);
    const refresh = () => {
      showAllSongs = false;
      renderSongs();
    };
    element.addEventListener("input", refresh);
    element.addEventListener("change", refresh);
  });
  document.querySelector("#showAllSongs").addEventListener("click", () => {
    showAllSongs = !showAllSongs;
    renderSongs();
  });

  document.querySelectorAll("[data-mood]").forEach((button) => button.addEventListener("click", () => renderMoodRecommendations(button.dataset.mood)));
  document.querySelector("#timelineFilter").addEventListener("change", renderTimeline);
  document.querySelector("#compareFirst").addEventListener("change", renderComparison);
  document.querySelector("#compareSecond").addEventListener("change", renderComparison);

  document.addEventListener("click", (event) => {
    if (!event.target.closest("#globalSearchWrap")) document.querySelector("#globalSearchResults").hidden = true;
    const action = event.target.closest("[data-action]");
    if (!action) return;
    if (action.dataset.action === "album-details") showAlbumDetails(action.dataset.id);
    if (action.dataset.action === "toggle-favorite") toggleFavorite(action.dataset.id);
    if (action.dataset.action === "timeline-details") showTimelineDetails(action.dataset.index);
  });

  document.querySelector("#globalSearch").addEventListener("input", renderGlobalSearch);
  document.querySelector("#globalSearch").addEventListener("keydown", (event) => {
    if (event.key === "Escape") document.querySelector("#globalSearchResults").hidden = true;
    if (event.key === "Enter") {
      document.querySelector("#songSearch").value = event.currentTarget.value;
      renderSongs();
      document.querySelector("#canciones").scrollIntoView({ behavior: "smooth" });
      document.querySelector("#globalSearchResults").hidden = true;
    }
  });

  document.querySelector("#themeToggle").addEventListener("click", () => setTheme(document.body.dataset.theme === "dark" ? "light" : "dark", true));

  document.querySelector("#voteForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const selected = new FormData(event.currentTarget).get("pollTrack");
    if (!selected || !tracksById.has(selected)) {
      announce("Elige una canción antes de votar.");
      return;
    }
    votes.counts ??= {};
    if (votes.selection === selected) {
      announce("Tu voto local ya está contado.");
      return;
    }
    if (votes.selection) votes.counts[votes.selection] = Math.max(0, Number(votes.counts[votes.selection] || 0) - 1);
    votes.counts[selected] = Number(votes.counts[selected] || 0) + 1;
    votes.selection = selected;
    localStorage.setItem(storageKeys.votes, JSON.stringify(votes));
    renderPoll();
    announce("Voto guardado en este navegador.");
  });

  document.querySelector("#shareFavorites").addEventListener("click", async () => {
    if (!favorites.size) {
      announce("Guarda alguna canción antes de compartir tu selección.");
      return;
    }
    const url = new URL(window.location.href);
    url.searchParams.set("favoritos", [...favorites].join(","));
    const field = document.querySelector("#shareUrl");
    field.value = url.href;
    field.hidden = false;
    field.select();
    try {
      await navigator.clipboard.writeText(url.href);
      announce("Enlace copiado. Al abrirlo se cargarán tus favoritos.");
    } catch {
      announce("Enlace listo para copiar desde el campo.");
    }
  });

  document.querySelector("#backToTop").addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  window.addEventListener("scroll", () => document.querySelector("#backToTop").classList.toggle("is-visible", window.scrollY > 500), { passive: true });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") document.querySelector("#globalSearchResults").hidden = true;
  });
}

function initReveals() {
  const items = document.querySelectorAll(".reveal");
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  items.forEach((item) => observer.observe(item));
}

function init() {
  initShareLink();
  const years = [...new Set(albums.map((album) => album.year))].sort((a, b) => a - b);
  document.querySelector("#yearFilter").insertAdjacentHTML("beforeend", years.map((year) => `<option value="${year}">${year}</option>`).join(""));
  document.querySelectorAll("#songAlbumFilter, #compareFirst, #compareSecond").forEach((select) => {
    select.insertAdjacentHTML("beforeend", albums.map((album) => `<option value="${album.id}">${escapeHtml(album.title)}</option>`).join(""));
  });
  document.querySelector("#compareFirst").value = "finisterra";
  document.querySelector("#compareSecond").value = "gaia";
  setTheme(readStorage(storageKeys.theme, "light"));
  bindEvents();
  renderAlbums();
  renderSongs();
  renderMoodRecommendations();
  renderComparison();
  renderTimeline();
  renderFavorites();
  updateFavoriteCount();
  renderPoll();
  renderConcerts();
  initReveals();
}

init();