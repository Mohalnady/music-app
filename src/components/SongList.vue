<template>
    <main>
        <div v-if="!playerVisible && !favsVisible" class="list-container">
            <header>
                <div class="logo">music</div>
                <div class="search-cont">
                    <input
                        class="search-feld"
                        type="text"
                        v-model="search"
                        placeholder="search songs"
                    />
                    <font-awesome-icon
                        class="search-icon"
                        icon="fa-solid fa-magnifying-glass"
                    />
                </div>
                <font-awesome-icon
                    class="fav-icon"
                    icon="fa-solid fa-heart"
                    @click="showFavs()"
                />
            </header>
            <div class="song-list">
                <div
                    @click="playSong(index)"
                    class="song"
                    v-for="(song, index) in filterSongs"
                    :key="index"
                >
                    <img :src="song.src" alt="Album Cover" />
                    <div class="cont">
                        <p>{{ song.year }}</p>
                        <p>{{ song.name }} by {{ song.artistName }}</p>
                        <p>{{ song.albumName }}</p>
                    </div>
                    <font-awesome-icon
                        class="fav-icon"
                        :class="{ 'is-favorite': isFavorite(song) }"
                        icon="fa-solid fa-heart"
                        @click.stop="addToFav(song)"
                    />
                </div>
            </div>
        </div>
        <SongPlayer
            @toBack="playerVisible = !playerVisible"
            v-if="playerVisible"
            :song="list[currentSongIndex]"
            @next="next()"
            @back="back()"
        />
        <FavSongs
            v-if="favsVisible"
            :favs="favs"
            @backToList="favsVisible = false"
            @removeFav="removeFav"
        />
    </main>
</template>

<script>
import SongPlayer from './SongPlayer.vue';
import FavSongs from './FavSongs.vue';

export default {
    name: 'SongList',
    components: { SongPlayer, FavSongs },
    computed: {
        filterSongs() {
            return this.list.filter((song) => {
                return song.name
                    .toLowerCase()
                    .includes(this.search.toLowerCase());
            });
        },
    },
    methods: {
        playSong(index) {
            this.currentSongIndex = index;
            this.playerVisible = true;
        },
        next() {
            if (this.currentSongIndex < this.list.length - 1) {
                this.currentSongIndex += 1;
            } else {
                this.currentSongIndex = 0;
            }
        },
        back() {
            if (this.currentSongIndex > 0) {
                this.currentSongIndex -= 1;
            } else {
                this.currentSongIndex = this.list.length - 1;
            }
        },
        showFavs() {
            this.favsVisible = true;
        },
        addToFav(song) {
            const index = this.favs.findIndex((fav) => fav.id === song.id);
            if (index === -1) {
                this.favs.push(song);
            } else {
                this.favs.splice(index, 1);
            }
        },
        isFavorite(song) {
            return this.favs.some((fav) => fav.id === song.id);
        },
        removeFav(index) {
            this.favs.splice(index, 1);
        },
    },
    data: () => {
        return {
            search: '',
            currentSongIndex: 0,
            playerVisible: false,
            favsVisible: false,
            favs: [],
            list: [
                {
                    id: 1,
                    name: 'Shape of You',
                    artistName: 'Ed Sheeran',
                    albumName: 'Divide',
                    year: 2017,
                    src: 'https://picsum.photos/400/400?random=1',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
                },
                {
                    id: 2,
                    name: 'Lean On',
                    artistName: 'Major Lazer',
                    albumName: 'Peace Is the Mission',
                    year: 2015,
                    src: 'https://picsum.photos/400/400?random=2',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
                },
                {
                    id: 3,
                    name: 'Blinding Lights',
                    artistName: 'The Weeknd',
                    albumName: 'After Hours',
                    year: 2020,
                    src: 'https://picsum.photos/400/400?random=3',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
                },
                {
                    id: 4,
                    name: 'Rolling in the Deep',
                    artistName: 'Adele',
                    albumName: '21',
                    year: 2011,
                    src: 'https://picsum.photos/400/400?random=4',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
                },
                {
                    id: 5,
                    name: 'Uptown Funk',
                    artistName: 'Mark Ronson',
                    albumName: 'Uptown Special',
                    year: 2014,
                    src: 'https://picsum.photos/400/400?random=5',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
                },
                {
                    id: 6,
                    name: 'Lose Yourself',
                    artistName: 'Eminem',
                    albumName: '8 Mile',
                    year: 2002,
                    src: 'https://picsum.photos/400/400?random=6',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
                },
                {
                    id: 7,
                    name: 'Happy',
                    artistName: 'Pharrell Williams',
                    albumName: 'G I R L',
                    year: 2013,
                    src: 'https://picsum.photos/400/400?random=7',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
                },
                {
                    id: 8,
                    name: 'Havana',
                    artistName: 'Camila Cabello',
                    albumName: 'Camila',
                    year: 2017,
                    src: 'https://picsum.photos/400/400?random=8',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
                },
                {
                    id: 9,
                    name: 'Counting Stars',
                    artistName: 'OneRepublic',
                    albumName: 'Native',
                    year: 2013,
                    src: 'https://picsum.photos/400/400?random=9',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
                },
                {
                    id: 10,
                    name: 'Radioactive',
                    artistName: 'Imagine Dragons',
                    albumName: 'Night Visions',
                    year: 2012,
                    src: 'https://picsum.photos/400/400?random=10',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
                },
                {
                    id: 11,
                    name: 'Cheap Thrills',
                    artistName: 'Sia',
                    albumName: 'This Is Acting',
                    year: 2016,
                    src: 'https://picsum.photos/400/400?random=11',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
                },
                {
                    id: 12,
                    name: 'Chandelier',
                    artistName: 'Sia',
                    albumName: '1000 Forms of Fear',
                    year: 2014,
                    src: 'https://picsum.photos/400/400?random=12',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
                },
                {
                    id: 13,
                    name: 'Take Me to Church',
                    artistName: 'Hozier',
                    albumName: 'Hozier',
                    year: 2014,
                    src: 'https://picsum.photos/400/400?random=13',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
                },
                {
                    id: 14,
                    name: 'Thinking Out Loud',
                    artistName: 'Ed Sheeran',
                    albumName: 'x',
                    year: 2014,
                    src: 'https://picsum.photos/400/400?random=14',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
                },
                {
                    id: 15,
                    name: 'Closer',
                    artistName: 'The Chainsmokers',
                    albumName: 'Collage',
                    year: 2016,
                    src: 'https://picsum.photos/400/400?random=15',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
                },
                {
                    id: 16,
                    name: 'Dark Horse',
                    artistName: 'Katy Perry',
                    albumName: 'Prism',
                    year: 2013,
                    src: 'https://picsum.photos/400/400?random=16',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
                },
                {
                    id: 17,
                    name: 'Somebody That I Used to Know',
                    artistName: 'Gotye',
                    albumName: 'Making Mirrors',
                    year: 2011,
                    src: 'https://picsum.photos/400/400?random=17',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-17.mp3',
                },
                {
                    id: 18,
                    name: 'Royals',
                    artistName: 'Lorde',
                    albumName: 'Pure Heroine',
                    year: 2013,
                    src: 'https://picsum.photos/400/400?random=18',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-18.mp3',
                },
                {
                    id: 19,
                    name: 'Stay',
                    artistName: 'Rihanna ft. Mikky Ekko',
                    albumName: 'Unapologetic',
                    year: 2012,
                    src: 'https://picsum.photos/400/400?random=19',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-19.mp3',
                },
                {
                    id: 20,
                    name: 'Perfect',
                    artistName: 'Ed Sheeran',
                    albumName: 'Divide',
                    year: 2017,
                    src: 'https://picsum.photos/400/400?random=20',
                    songSrc:
                        'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-20.mp3',
                },
            ],
        };
    },
};
</script>

<style scoped lang="scss">
@import '../scss/variables/colors';
@import '../scss/helpers/mixin';
main {
    background-color: $playerBack;
    width: 350px;
    height: 700px;
    margin: auto;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;

    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;

    header {
        position: sticky;
        top: 0;
        background-color: $blueColor;
        color: $listBack;
        height: 3.4rem;
        @include space-between;
        padding: 1rem 0.5rem;
        .search-cont {
            background-color: $txtColor;
            padding: 0.3rem;
            border-radius: 4px;
            @include space-between;
            .search-feld {
                cursor: text;
                outline: none;
                border: none;
                background-color: transparent;
                &::placeholder {
                    font-size: 0.8rem;
                    color: #999;
                }
                &:focus {
                    outline: none;
                }
            }
            .search-icon {
                color: #999;
                cursor: pointer;
                font-size: 0.9rem;
            }
        }
    }
    .song-list {
        .song {
            display: flex;
            justify-content: start;
            align-items: center;
            border-radius: 4px;
            margin: 0.5rem;
            padding-right: 0.1rem;
            &:hover {
                background-color: #ffffff0a;
            }
            img {
                width: 50px;
                height: 50px;
                border-radius: 4px;
                margin-right: 0.5rem;
            }
            .cont {
                p {
                    font-size: 0.7rem;
                    color: $txtColor;
                    font-weight: 300;
                    padding: 0.1rem 0;
                    margin: 0;
                    text-align: left;
                    &:first-child {
                        color: #777;
                        font-size: 0.7rem;
                    }
                }
            }
            .fav-icon {
                margin-left: auto;
                cursor: pointer;
                &.is-favorite {
                    color: $txtColor;
                }
            }
        }
    }
}
</style>
