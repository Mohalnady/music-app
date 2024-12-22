<template>
    <div class="player-container">
        <audio
            :src="song.songSrc"
            preload="auto"
            ref="audioPlayer"
            autoplay
        ></audio>
        <header>
            <font-awesome-icon
                class="back-icon"
                icon="fa-solid fa-arrow-left"
                @click="toBack"
            />
            <div class="logo">Alnady music</div>
        </header>
        <img :src="song.src" :key="song.id" alt="" />
        <p class="year">{{ song.year }}</p>
        <p class="name">{{ song.name }}</p>
        <p class="artist-name">{{ song.artistName }} & {{ song.albumName }}</p>
        <div @mousedown="startDrag" ref="progressBar" class="progress-bar">
            <div :style="{ width: progress + '%' }" class="progressed"></div>
        </div>
        <div class="controlls">
            <div @click="back" class="previous">
                <font-awesome-icon icon="fa-solid fa-backward" />
            </div>
            <div v-if="isPlaying" @click="playPause" class="play-pause">
                <font-awesome-icon icon="fa-solid fa-pause" />
            </div>
            <div v-else @click="playPause" class="play-pause">
                <font-awesome-icon icon="fa-solid fa-play" />
            </div>
            <div @click="next" class="next">
                <font-awesome-icon icon="fa-solid fa-forward" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SongPlayer',

    data() {
        return {
            isPlaying: true,
            duration: 0,
            currentTime: 0,
            isDragging: false,
        };
    },
    props: {
        song: {
            id: Number,
            name: String,
            artistName: String,
            albumName: String,
            year: Number,
            src: String,
            songSrc: String,
        },
    },
    emits: ['toBack', 'next', 'back'],
    methods: {
        toBack() {
            this.$emit('toBack');
        },
        next() {
            this.$emit('next');
        },
        back() {
            this.$emit('back');
        },
        playPause() {
            if (this.isPlaying) {
                this.$refs.audioPlayer.pause();
            } else {
                this.$refs.audioPlayer.play();
            }
            this.isPlaying = !this.isPlaying;
        },
        startDrag(event) {
            this.isDragging = true;
            this.updateProgress(event);

            window.addEventListener('mousemove', this.dragging);
            window.addEventListener('mouseup', this.stopDrag);
        },
        dragging(event) {
            if (this.isDragging) {
                this.updateProgress(event);
            }
        },
        stopDrag() {
            this.isDragging = false;
            this.$refs.audioPlayer.currentTime = this.currentTime;

            window.removeEventListener('mousemove', this.dragging);
            window.removeEventListener('mouseup', this.stopDrag);
        },
        updateProgress(event) {
            const progressBar = this.$refs.progressBar;
            const rect = progressBar.getBoundingClientRect();
            const offsetX = event.clientX - rect.left;
            const width = rect.width;

            const newTime = (offsetX / width) * this.duration;
            this.currentTime = Math.min(this.duration, Math.max(0, newTime));
        },
        setDuration() {
            if (this.$refs.audioPlayer) {
                this.duration = this.$refs.audioPlayer.duration || 0;
            }
        },

        updateTime() {
            if (!this.isDragging && this.$refs.audioPlayer) {
                this.currentTime = this.$refs.audioPlayer.currentTime;
            }
        },
    },

    mounted() {
        if (this.$refs.audioPlayer) {
            this.$refs.audioPlayer.addEventListener(
                'loadedmetadata',
                this.setDuration
            );
            this.$refs.audioPlayer.addEventListener(
                'timeupdate',
                this.updateTime
            );
        }
    },

    beforeUnmount() {
        if (this.$refs.audioPlayer) {
            this.$refs.audioPlayer.removeEventListener(
                'loadedmetadata',
                this.setDuration
            );
            this.$refs.audioPlayer.removeEventListener(
                'timeupdate',
                this.updateTime
            );
        }
    },
    computed: {
        progress() {
            return this.duration ? (this.currentTime / this.duration) * 100 : 0;
        },
    },
};
</script>

<style scoped lang="scss">
@import '../scss/variables/colors';
@import '../scss/helpers/mixin';
.player-container {
    position: relative;
    margin: auto;
    width: 350px;
    height: 720px;
    background-color: $playerBack;
    color: $txtColor;
    font-weight: 400;
    header {
        position: sticky;
        top: 0;
        background-color: $blueColor;
        color: $listBack;
        height: 3.4rem;
        @include space-between;
        padding: 1rem 0.5rem;
        button {
            .back-icon {
                cursor: pointer;
                margin-right: 1rem;
            }
        }
    }
    img {
        border-radius: 4px;
        max-width: 320px;
        margin: 1rem auto 0;
    }
    p {
        padding: 0;
        margin: 0 0 0.2rem 0;
    }
    .year {
        color: #777;
        margin-top: 1rem;
    }
    .progress-bar {
        position: absolute;
        bottom: 140px;
        width: 100%;
        height: 1rem;
        background-color: #bbb;
        cursor: pointer;

        .progressed {
            position: relative;
            height: 100%;
            background-color: $blueColor;
            &::after {
                content: '';
                position: absolute;
                right: 0;
                top: 0;
                bottom: 0;
                width: 0.4rem;
                height: 1.4rem;
                margin: auto 0;
                background: $txtColor;
            }
        }
    }
    .controlls {
        position: absolute;
        bottom: 0;
        background-color: #ffffff0a;
        padding: 0 2rem;
        height: 140px;
        @include space-between;
        .play-pause {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background-color: $blueColor;
            @include centering;
            font-size: 1.6rem;
            padding-left: 0.2rem;
        }
        .previous,
        .next {
            width: 100px;
            font-size: 1.6rem;
        }
    }
}
</style>
