<template>
    <loading-wrapper :wait-for="awaitedData">
        <div class="main-container">
            <div class="main-info-block">
            <div class="info-fields">
                <h1>{{personalInfo.fName}} {{personalInfo.lName}}</h1>
                <span class="field">
                    <div class="field__key">Date of Birth</div>
                    <div class="field__val">{{personalInfo.dateOfBirth}} ({{age}})</div>
                </span>
                <span class="field">
                    <div class="field__key">Gender</div>
                    <div class="field__val">{{personalInfo.gender}}</div>
                </span>

            </div>
            <div v-if="personalInfo.img" class="profile-img" :style="'background-image: url('+ personalInfo.img +')'"></div>
        </div>

            <div v-for="({key, value}) in additionalInfo" :key="key" class="list-element">
                <div class="list-field">
                    <div>
                        <div class="list-item__prime">{{ key }}</div>
                        <div class="list-item__secondary">{{ value }}</div>
                    </div>
                </div>
            </div>

        </div>
    </loading-wrapper>

</template>

<script lang="ts">
    import { defineComponent, ref, computed, watch } from 'vue'
    import { getStore } from "../store/main.store"
    import LoadingWrapper from '../components/LoadingWrapper.vue'

    import { PersonalInfo } from "../models/UserInfo";
    import calculateAge from "../composables/calculateAge";

    export default defineComponent({
        name: "Home",
        components: {LoadingWrapper},
        setup() {

            const store = getStore()


            const age = computed(() => {
                return calculateAge(store.state.userInfo.info?.personal.dateOfBirth ?? '')
            })


            const personalInfo = computed<PersonalInfo>(() => {
                return store.state.userInfo.info?.personal ?? {fName: '', lName: '', gender: '', dateOfBirth: ''}
            })

            const additionalInfo = computed(() => {
                return store.state.userInfo.info?.additional ??  []
            })

            return {
                additionalInfo, personalInfo, age,

                awaitedData: computed(() => store.state.userInfo.info) }
        }
    })
</script>

<style lang="scss" scoped>
.main-info-block {
    display: flex;
}
    .field {
        display: flex;
        margin: 0.5rem;
        box-shadow: 0 0 5px #4d4d4d;
        padding: 1rem;
        font-size: 1.2rem;
        &__key {
            flex: 0.3;
        }
        &__val {
            flex: 0.7;
        }
    }

    .info-fields {
        flex: 0.95;
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .profile-img {
        width: 200px;
        height: 200px;
        position: relative;
        overflow: hidden;
        border-radius: 50%;
        background: #eee no-repeat center;
        background-size: cover;
        margin: 2rem;
    }



    .list-field {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding: 0.5rem 16px;
        overflow: hidden;
        &:hover {
            background-color: #f4f4f4;
        }
    }
    .list-item {
        &__text {
            align-self: flex-start;
        }
        &__edit {
            margin-left: auto;
            margin-right: 0;

        }

        &__secondary {
            font-size: 20px;

        }

        &__prime {
            margin-left: 0.5rem;
            color: gray;
        }
    }
</style>