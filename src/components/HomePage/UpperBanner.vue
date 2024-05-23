<template>
    <div class="banner px-0 py-0">
        <div class="parent-banner">
            <img
                class="banner-img"
                src="@/assets/images//banner-bg.jpg"
                alt=""
            />
            <div class="cont w-100">
                <h3>
                    <span>Bienvenu Chez ElloMart</span>
                </h3>
                <p class="hint">Exclusive produits chez nous !!!</p>
                <v-btn
                    variant="outlined"
                    class="py-3 px-10 btn-banner"
                    density="combact"
                    style="
                        color: white;
                        border-radius: 10px;
                        text-transform: none;
                    "
                    @click="navigateToShop"
                >
                    Achetez Maintenant
                </v-btn>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    methods: {
        navigateToShop() {
            this.$router.push({ name: 'products_all' })
        }
    }
}
</script>

<style lang="css">
.parent-banner {
    position: relative;
}

.banner .parent-banner {
    height: 400px;
}

.banner-img {
    height: 100%;
    width: 100%;
    object-fit: cover;
}

.cont {
    color: white;
    position: absolute;
    top: 40px;
    left: 20px;
    width: 600px;
    padding: 40px 0 0 100px;
}

.cont h3 {
    font-size: 45px;
    font-weight: 600;
}

.cont .hint {
    margin: 20px 0;
    font-weight: 400;
}

@media (max-width: 900px) {
    .banner .parent-banner {
        height: 330px;
    }

    .banner .cont {
        padding-top: 50px;
        padding-left: 10px;
        width: 100%;
        left: 0;
        top: 0;
    }

    .banner .cont h3 {
        font-size: 28px;
    }

    .hint {
        font-size: 14px;
    }

    .btn-banner {
        align-content: center;
        height: 30px !important;
        width: 150px !important;
        font-size: 12px !important;
    }
}

@media (max-width: 767px) {
    .banner .parent-banner {
        height: 330px;
    }

    .banner .cont {
        padding-top: 50px;
        padding-left: 10px;
        width: 100%;
        left: 0;
        top: 0;
    }

    .banner .cont h3 {
        font-size: 28px;
    }

    .hint {
        font-size: 14px;
    }

    .btn-banner {
        align-content: center;
        height: 30px !important;
        width: 150px !important;
        font-size: 12px !important;
    }
}

@media (max-width: 580px) {
    .banner .parent-banner {
        height: 330px;
    }

    .banner .cont {
        padding-top: 50px;
        padding-left: 10px;
        width: 100%;
        left: 0;
        top: 0;
    }

    .banner .cont h3 {
        font-size: 28px;
    }

    .hint {
        font-size: 14px;
    }

    .btn-banner {
        align-content: center;
        height: 30px !important;
        width: 150px !important;
        font-size: 12px !important;
    }
}
</style>
