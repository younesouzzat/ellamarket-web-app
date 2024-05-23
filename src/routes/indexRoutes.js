import { createRouter, createWebHistory } from "vue-router";

// Store
import { store } from "../store/indexStore";

// Pages
import Home from "../pages/Home.vue";
import ProductsCategory from "../pages/ProductsCategory.vue";
import DetailProduct from "../pages/DetailProduct.vue";
import Cart from "../pages/Cart.vue";
import Checkout from "../pages/Checkout.vue";
import Notfound from "../components/Notfound.vue";

// Layout
import HomeLayout from '@/layout/HomeLayout.vue';
import GuestLayout from "../layout/GuestLayout.vue";
import DashboardLayout from "../layout/DashboardLayout.vue";

// Auth
import Login from "../pages/auth/Login.vue";
import Register from "../pages/auth/Register.vue";
import ResetPassword from "../pages/auth/ResetPassword.vue";
import RequestPassword from "../pages/auth/RequestPassword.vue";

// Dashboard
import Dashboard from "../pages/Dashboard.vue";
import Categories from "../pages/categories/indexCategories.vue";

// Products
import Products from "../pages/products/indexProducts.vue";
import editProduct from "../pages/products/editProd.vue";
import createProduct from "../pages/products/createProd.vue";

// Orders
import Orders from "../pages/orders/indexOrders.vue";
import detailOrder from "../pages/orders/detailOrder.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        meta:{ 
            title: 'Accueil',
        }
    },
    {
        path: "/produits",
        name: "products_all",
        component: ProductsCategory,
        meta:{ 
            title: 'Produits',
        }
    },
    {
        path: "/produits/:category",
        name: "products_category",
        component: ProductsCategory,
        meta:{ 
            title: 'Produits',
        }
    },
    {
        path: "/produits/:promotion",
        name: "products_promotion",
        component: ProductsCategory,
        meta:{ 
            title: 'Promotion',
        }
    },
    {
        path: "/detail-produit/:id",
        name: "detail_product",
        component: DetailProduct,
        meta:{ 
            title: 'Détail de produit',
        }
    },
    {
        path: "/panier",
        name: "panier",
        component: Cart,
        meta:{ 
            title: 'Panier',
        }
    },
    {
        path: "/checkout",
        name: "checkout",
        component: Checkout,
        meta:{ 
            title: 'Passer la commande',
        }
    },
    {
        path: "/connecter",
        name: "login",
        component: Login,
        meta:{ 
            requiresGuest: true ,
            title: 'Authentification',
        }
    },
    {
        path: "/inscription",
        name: "register",
        component: Register,
        meta:{ 
            requiresGuest: true ,
            title: 'Inscription',
        }
    },
    {
        path: "/request-password",
        name: "request.password",
        component: RequestPassword,
        meta:{ 
            requiresGuest: true ,
            title: 'Demande réinitialiser mot de passe',
        }
    },
    {
        path: "/reset-password",
        name: "reset.password",
        component: ResetPassword,
        meta:{ 
            requiresGuest: true ,
            title: 'Réinitialiser mot de passe',
        }
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: Notfound,
        meta:{ 
            requiresGuest: true ,
            title: '404 Page introuvable',
        }
    },
    {
        path: "/app",
        name: "app",
        redirect: "/app/dashboard",
        component: DashboardLayout,
        meta: { requiresAuth: true },
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                component: Dashboard,
                meta: {
                    title: 'Table de board',
                }
            },
            {
                path: "/categories",
                name: "categories",
                component: Categories,
                meta: {
                    title: 'Gestion de categories',
                }
            },
            {
                path: "/products",
                name: "products",
                component: Products,
                meta: {
                    title: 'Gestion de produits',
                }
            },
            {
                path: "/create-products",
                name: "create.products",
                component: createProduct,
                meta: {
                    title: 'Ajouter un produit',
                }
            },
            {
                path: "/product/:id",
                name: "get.product",
                component: editProduct,
                meta: {
                    title: 'Détail de produit',
                }
            },
            {
                path: "/orders",
                name: "orders",
                component: Orders,
                meta: {
                    title: 'Gestion de commandes',
                }
            },
            {
                path: "/order/:id",
                name: "get.order",
                component: detailOrder,
                meta: {
                    title: 'Détail de commande',
                }
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    window.document.title = to.meta && to.meta.title ? to.meta.title : 'Accueil';

    if (to.meta.requiresAuth && !store.getters.isLoggedIn) {
        next({ name: "login" });
    } else if (to.meta.requiresGuest && store.getters.isLoggedIn) {
        next({ name: "dashboard" });
    } else {
        next();
    }
    
    // if (to.meta.requiresAuth && !store.state.authModule.user.token) {
    //     next({ name: "login" });
    // } else if (to.meta.requiresGuest && store.state.authModule.user.token) {
    //     next({ name: "dashboard" });
    // } else {
    //     next();
    // }
});

export default router;
