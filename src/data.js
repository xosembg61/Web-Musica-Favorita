import heroImage from './assets/images/mago-en-directo.jpg'
import leyendaImage from './assets/images/leyenda-de-la-mancha.jpg'
import finisterraImage from './assets/images/finisterra.jpg'
import gaiaImage from './assets/images/gaia.jpg'
import gaiaDosImage from './assets/images/gaia-ii.jpg'

export { heroImage }
export const links = {
  official: 'https://magodeozoficial.com/',
  biography: 'https://magodeozoficial.com/press-kit/',
  concerts: 'https://magodeozoficial.com/conciertos/',
  officialVideos: 'https://magodeozoficial.com/video/',
  spotify: 'https://open.spotify.com/artist/5ZNxiPcbKgaNcBrERMpqeu',
  youtube: 'https://www.youtube.com/channel/UC6nMOIbArzvza6npl0irIWw',
  instagram: 'https://www.instagram.com/magodeozoficial/',
}
const spotifySearch = (title) =>
  `https://open.spotify.com/search/${encodeURIComponent(`${title} Mägo de Oz`)}`

// Selección editorial, no discografía completa. Fechas: biografía oficial.
export const albums = [
  {
    id: 'leyenda',
    title: 'La leyenda de La Mancha',
    year: 1998,
    image: leyendaImage,
    description: 'Don Quijote entra en el universo del folk metal.',
    spotify: spotifySearch('La leyenda de La Mancha'),
  },
  {
    id: 'finisterra',
    title: 'Finisterra',
    year: 2000,
    image: finisterraImage,
    description: 'Un viaje conceptual que convirtió sus canciones en himnos.',
    spotify: spotifySearch('Finisterra'),
  },
  {
    id: 'gaia',
    title: 'Gaia',
    year: 2003,
    image: gaiaImage,
    description: 'El comienzo de una trilogía de historias y grandes melodías.',
    spotify: spotifySearch('Gaia'),
  },
  {
    id: 'gaia-ii',
    title: 'Gaia II: La voz dormida',
    year: 2005,
    image: gaiaDosImage,
    description: 'La segunda entrega de la trilogía explora un sonido más sinfónico.',
    spotify: spotifySearch('Gaia II La voz dormida'),
  },
]
export const songs = [
  { id: 'fiesta-pagana', title: 'Fiesta pagana', albumId: 'finisterra' },
  { id: 'molinos-de-viento', title: 'Molinos de viento', albumId: 'leyenda' },
  { id: 'la-costa-del-silencio', title: 'La costa del silencio', albumId: 'gaia' },
  { id: 'la-rosa-de-los-vientos', title: 'La rosa de los vientos', albumId: 'gaia' },
  { id: 'la-danza-del-fuego', title: 'La danza del fuego', albumId: 'finisterra' },
  {
    id: 'hasta-que-el-cuerpo-aguante',
    title: 'Hasta que el cuerpo aguante',
    albumId: 'finisterra',
  },
].map((song) => ({ ...song, spotify: spotifySearch(song.title) }))
export const milestones = [
  {
    year: 1988,
    title: 'Todo empieza en Madrid',
    description: 'Txus di Fellatio comienza a formar la banda en el barrio de Begoña.',
  },
  {
    year: 1998,
    title: 'La leyenda de La Mancha',
    description: 'La literatura de Cervantes inspira uno de sus discos conceptuales.',
  },
  {
    year: 2000,
    title: 'El salto de Finisterra',
    description: 'El álbum les da su primer disco de platino.',
  },
  {
    year: 2003,
    title: 'Se abre el universo Gaia',
    description: 'Comienza una trilogía con una puesta en escena cada vez más ambiciosa.',
  },
]
// Enlazados desde la sección oficial de vídeos. Fiesta pagana 2.0 es posterior a Finisterra.
export const videos = [
  {
    id: 'xvVLWSsKjkI',
    title: 'Fiesta pagana 2.0',
    version: 'Videoclip · Versión 2.0',
    albumId: 'finisterra',
  },
  {
    id: 'mEZOnudn-NM',
    title: 'La costa del silencio',
    version: 'Videoclip oficial',
    albumId: 'gaia',
  },
  {
    id: 'NbrGRuDIfGw',
    title: 'La danza del fuego',
    version: 'Videoclip oficial',
    albumId: 'finisterra',
  },
]
