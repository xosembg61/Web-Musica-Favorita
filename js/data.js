export const albums = [
  {
    id: "la-leyenda",
    title: "La Leyenda de La Mancha",
    year: 1998,
    decade: "1990",
    trackCount: 13,
    catalogNote: "Créditos del álbum: 1997; edición catalogada: 2002",
    description: "Una aventura de rock inspirada en Don Quijote. Incluye «Molinos de viento» y «Ancha es Castilla».",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music211/v4/d0/8e/3b/d08e3b88-c720-37e3-87c7-6ab80a235127/885686045596.jpg/600x600bb.jpg",
    appleUrl: "https://music.apple.com/us/album/la-leyenda-de-la-mancha/368688241?uo=4",
    tracks: [
      ["En Un Lugar", 104699], ["El Santo Grial", 310010], ["La Leyenda De Mancha", 259320], ["Noche Toledana", 72632],
      ["Molinos De Viento", 251681], ["Dime Con Quien Andas", 333671], ["Maritornes", 260319], ["El Bálsamo De Fierabras", 220148],
      ["El Pacto", 343655], ["La Insula De Barataria", 178701], ["El Templo Del Adiós", 289692], ["Réquiem", 490823], ["Ancha Es Castilla", 223893]
    ].map(([title, durationMs], index) => ({ title, durationMs, disc: 1, number: index + 1 }))
  },
  {
    id: "finisterra",
    title: "Finisterra",
    year: 2000,
    decade: "2000",
    trackCount: 20,
    description: "Un doble álbum conceptual de metal y folk, con canciones como «Fiesta pagana» y «Hasta que el cuerpo aguante».",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music4/v4/12/aa/20/12aa20ae-82e3-a9da-f2cb-b1f82596c393/dj.ntqvyjfr.jpg/600x600bb.jpg",
    appleUrl: "https://music.apple.com/us/album/finisterra/368703341?uo=4",
    tracks: [
      ["Prologo", 119699], ["Satania", 494028], ["La Cruz de Santiago", 319112], ["La Danza del Fuego", 313098],
      ["Hasta Que El Cuerpo Aguante", 272533], ["El Senor de los Gramillos", 299119], ["Polla Dura No Cree en Dios", 270629],
      ["Maite Zaitut", 200249], ["Duerme", 269375], ["Es Horta de Marchar", 303253], ["Fiesta Pagana", 296751],
      ["El Que Quiera Entender Que Entienda", 447495], ["Los Renglones Torcidos de Dios", 392046],
      ["La Dama del Amanecer (Kelpie)", 290644], ["Tres Tristes Tigres", 163886], ["A Costa da Morte", 214947],
      ["La Santa Compana", 334367], ["Conxuro", 225744], ["Astaroth", 391651], ["Finisterra", 916886]
    ].map(([title, durationMs], index) => ({ title, durationMs, disc: index < 10 ? 1 : 2, number: (index % 10) + 1 }))
  },
  {
    id: "gaia",
    title: "Gaia",
    year: 2003,
    decade: "2000",
    trackCount: 12,
    description: "El primer álbum de la trilogía Gaia: una historia conceptual con una marcada raíz folk.",
    artwork: "https://is1-ssl.mzstatic.com/image/thumb/Music125/v4/d3/cb/86/d3cb868c-a61c-0eba-2b15-75565af87e10/dj.wzmxjnhh.jpg/600x600bb.jpg",
    appleUrl: "https://music.apple.com/us/album/gaia/369875050?uo=4",
    tracks: [
      ["Obertura Mdxx", 235241], ["Gaia", 663185], ["La Conquista", 307502], ["Alma", 399058],
      ["La Costa del Silencio", 280869], ["El Arbol de la Noche Triste", 288670], ["La Rosa de los Vientos", 256070],
      ["La Leyenda de la Llorona", 261642], ["Van a Rodar Cabezas", 391581], ["El Atrapasuenos", 256952],
      ["Si Te Vas", 358028], ["La Venganza de Gaia", 663487]
    ].map(([title, durationMs], index) => ({ title, durationMs, disc: 1, number: index + 1 }))
  }
];

export const moods = [
  { id: "epica", label: "Épica", tracks: ["finisterra-2-9", "finisterra-2-3", "gaia-1-12", "la-leyenda-1-2"] },
  { id: "rebelde", label: "Rebelde", tracks: ["finisterra-2-1", "finisterra-1-5", "la-leyenda-1-13"] },
  { id: "nostalgica", label: "Nostálgica", tracks: ["finisterra-1-9", "gaia-1-7", "la-leyenda-1-1"] },
  { id: "celta", label: "Celta", tracks: ["la-leyenda-1-5", "finisterra-1-4", "gaia-1-10"] },
  { id: "directo", label: "Para cantar en directo", tracks: ["finisterra-2-1", "la-leyenda-1-5", "gaia-1-5"] }
];

export const timeline = [
  { year: 1988, period: "1980", title: "Nace Mägo de Oz", album: "Madrid", detail: "Txus di Fellatio funda el grupo en Madrid. El proyecto irá incorporando influencias de heavy metal, folk y música celta.", source: "https://es.wikipedia.org/wiki/M%C3%A4go_de_Oz" },
  { year: 1994, period: "1990", title: "Primer álbum de estudio", album: "Mägo de Oz", detail: "La banda publica su primer álbum homónimo y empieza a construir su propio camino dentro del rock español.", source: "https://es.wikipedia.org/wiki/M%C3%A4go_de_Oz" },
  { year: 1998, period: "1990", title: "La Mancha se vuelve canción", album: "La Leyenda de La Mancha", detail: "El disco conceptual inspirado en Don Quijote amplía la audiencia del grupo e incluye «Molinos de viento».", source: "https://music.apple.com/us/album/la-leyenda-de-la-mancha/368688241?uo=4" },
  { year: 2000, period: "2000", title: "Un viaje llamado Finisterra", album: "Finisterra", detail: "Llega el doble álbum Finisterra, una obra ambiciosa que incluye «Fiesta pagana».", source: "https://music.apple.com/us/album/finisterra/368703341?uo=4" },
  { year: 2003, period: "2000", title: "Comienza la saga Gaia", album: "Gaia", detail: "El primero de los álbumes Gaia inaugura una trilogía conceptual y profundiza en los arreglos folk.", source: "https://music.apple.com/us/album/gaia/369875050?uo=4" },
  { year: 2010, period: "2010", title: "Cierra la trilogía", album: "Gaia III: Atlantia", detail: "Gaia III: Atlantia completa la historia musical que había comenzado siete años antes.", source: "https://es.wikipedia.org/wiki/M%C3%A4go_de_Oz" },
  { year: 2021, period: "2020", title: "Rumbo a Bandera Negra", album: "Bandera Negra", detail: "El grupo publica un nuevo álbum de estudio y emprende una etapa de directo con nuevo repertorio.", source: "https://magodeozoficial.com/" }
];

export const concerts = [
  { date: "2026-11-07", city: "Guadalajara", venue: "Arena Guadalajara" },
  { date: "2026-11-12", city: "Torreón", venue: "Centro Poliforum Torreón" },
  { date: "2026-11-13", city: "Monterrey", venue: "Arena Monterrey" },
  { date: "2026-11-15", city: "Ciudad de México", venue: "Arena Ciudad de México" },
  { date: "2026-11-18", city: "Oaxaca", venue: "Centro de Convenciones" },
  { date: "2026-11-20", city: "Puebla", venue: "Auditorio Metropolitano" },
  { date: "2026-11-25", city: "Hermosillo", venue: "Parque La Ruina" }
];

export const sources = {
  catalog: "https://music.apple.com/us/artist/m%C3%A4go-de-oz/165478235",
  official: "https://magodeozoficial.com/",
  concerts: "https://magodeozoficial.com/conciertos/",
  history: "https://es.wikipedia.org/wiki/M%C3%A4go_de_Oz",
  bandPhoto: "https://commons.wikimedia.org/wiki/File:Txus_di_Fellatio_and_Zeta_in_concert_in_2013.jpg",
  castlePhoto: "https://commons.wikimedia.org/wiki/File:Neuschwanstein_Castle_2.jpg"
};