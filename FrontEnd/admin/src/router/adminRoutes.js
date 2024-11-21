import HomePage from "@/views/HomePage.vue";
import Product from "@/views/ProductPage.vue";
import Publisher from "@/views/PublisherPage.vue";
import UpdateProduct from "@/views/UpdateProduct.vue";
import ProductDetail from "@/views/ProductDetail.vue";
import UpdatePublisher from "@/views/UpdatePublisher.vue";
import Employee from "@/views/EmployeePage.vue";
import UpdateEmployee from "@/views/UpdateEmployee.vue";
import Reader from "@/views/ReaderPage.vue";
import UpdateReader from "@/views/UpdateReader.vue";

const routes = [
    {
        path: "/",
        redirect: "/admin",
    },
    {
        path: "/admin",
        meta: {
            requiresAuth: true,
            role: "admin",
        },
        props: true,
        children: [
            {
                path: "",
                component: HomePage,
                name: "adminPage",
            },
            {
                path: "products",
                props: true,
                children: [
                    {
                        path: "",
                        component: Product,
                        name: "productPage",
                    },
                    {
                        path: ":id",
                        name: "productDetailPage",
                        component: ProductDetail,
                    },
                    {
                        path: "add-product",
                        component: UpdateProduct,
                        name: "addProductPage",
                        props: true,
                    },
                    {
                        path: "update-product/:id",
                        component: UpdateProduct,
                        name: "updateProductPage",
                    },
                ]
            },
            {
                path: "publishers",
                children: [
                    {
                        path: "",
                        component: Publisher,
                        name: "publisherPage",
                    },
                    {
                        path: "update-publisher/:id",
                        component: UpdatePublisher,
                        name: "updatePublisherPage",
                    },
                    {
                        path: "add-publisher",
                        component: UpdatePublisher,
                        name: "addPublisherPage",
                    },
                ]
            },
            {
                path: "employees",
                children: [
                    {
                        path: "",
                        component: Employee,
                        name: "employeePage",
                    },
                    {
                        path: "update-employee/:id",
                        component: UpdateEmployee,
                        name: "updateEmployeePage",
                    },
                    {
                        path: "add-employee",
                        component: UpdateEmployee,
                        name: "addEmployeePage",
                    },
                ]
            },
            {
                path: "readers",
                children: [
                    {
                        path: "",
                        component: Reader,
                        name: "readerPage",
                    },
                    {
                        path: "update-reader/:id",
                        component: UpdateReader,
                        name: "updateReaderPage",
                    },
                    {
                        path: "add-reader",
                        component: UpdateReader,
                        name: "addReaderPage",
                    },
                ]
            },
            // {
            //     path: "orders",
            //     children: [
            //         {
            //             path: "",
            //             component: Order,
            //             name: "orderPage",
            //         },
            //         {
            //             path: ":id",
            //             component: OrderDatail,
            //             name: "orderDetailPage",
            //         },
            //     ],
            // },
        ],
    }
]

export default routes;