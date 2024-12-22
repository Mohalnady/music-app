<template>
    <main>
        <header>
            <font-awesome-icon
                class="back-icon"
                icon="fa-solid fa-arrow-left"
                @click="$emit('backToList')"
            />
            <span>Your Favorites</span>
        </header>
        <div v-if="favs.length > 0" class="fav-list">
            <div class="fav-song" v-for="(song, index) in favs" :key="index">
                <img :src="song.src" alt="Album Cover" />
                <div class="cont">
                    <p>{{ song.year }}</p>
                    <p>{{ song.name }} by {{ song.artistName }}</p>
                    <p>{{ song.albumName }}</p>
                </div>
                <font-awesome-icon
                    class="delete-icon"
                    icon="fa-solid fa-trash"
                    @click="removeFromFav(index)"
                />
            </div>
        </div>
        <p v-else class="empty-favs">No favorite songs added yet.</p>
    </main>
</template>

<script>
export default {
    name: 'FavSongs',
    props: {
        favs: {
            type: Array,
            required: true,
        },
    },
    methods: {
        removeFromFav(index) {
            this.$emit('removeFav', index);
        },
    },
};
</script>

<style scoped lang="scss">
@import '../scss/variables/_colors.scss';
@import '../scss/helpers/_mixin.scss';
@import '../scss/helpers/_reset.scss';
main {
    width: 100%;
    height: 100%;
    background-color: #f4f4f4;
    width: 350px;
    height: 700px;
    overflow: auto;
    .back-icon {
        cursor: pointer;
        margin-right: 1rem;
    }
    header {
        position: sticky;
        top: 0;
        background-color: $blueColor;
        color: $listBack;
        height: 3.4rem;
        @include space-between;
        padding: 1rem 0.5rem;
    }
    .fav-list {
        padding: 0.5rem;
        .fav-song {
            display: flex;
            justify-content: start;
            align-items: center;
            border-radius: 4px;
            margin: 0;
            padding: 0;
            padding-right: 0.1rem;
            img {
                width: 50px;
                height: 50px;
                border-radius: 4px;
                margin-right: 0.5rem;
            }
            .cont {
                text-align: left;
                border-radius: 4px;
                margin: 0.5rem;
                padding-right: 0.1rem;
                p {
                    font-size: 0.7rem;
                    color: $txtColor;
                    font-weight: 300;
                    margin: 0;
                    text-align: left;
                    &:first-child {
                        color: #777;
                        font-size: 0.7rem;
                    }
                }
            }
        }
        .delete-icon {
            cursor: pointer;
            color: #888;
            margin-left: auto;
            &:hover {
                color: $txtColor;
            }
        }
    }
    .empty-favs {
        text-align: center;
        color: #888;
    }
}
</style>
