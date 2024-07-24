import {createBrowserRouter, Navigate} from "react-router-dom";
import Login from "./views/Login.jsx";
import Signup from "./views/Signup.jsx";
import Categories from "./views/Categories.jsx";
import DefaultLayout from "./components/DefaultLayout.jsx";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard.jsx";
import AddCategory from "./views/AddCategory.jsx";
import EditCategory from "./views/EditCategory.jsx";
import Products from "./views/Products.jsx";
import AddProduct from "./views/AddProduct.jsx";
import EditProduct from "./views/EditProduct.jsx";
import Contacts from "./views/Contacts.jsx";
import AddContact from "./views/AddContact.jsx";
import AddType from "./views/AddType.jsx";
import EditContact from "./views/EditContact.jsx";
import Banners from "./views/Banners.jsx";
import AddBanner from "./views/AddBanner.jsx";
import EditBanner from "./views/EditBanner.jsx";
import Messages from "./views/Messages.jsx";
import References from "./views/References.jsx";
import AddReference from "./views/AddReference.jsx";
import EditReference from "./views/EditReference.jsx";
import AddResume from "./views/AddResume.jsx";
import Resume from "./views/Resume.jsx";
import EditResume from "./views/EditResume.jsx";

const router = createBrowserRouter([
    {
        path : '/',
        element : <DefaultLayout />,
        children : [
            {
                path : '/',
                element : <Navigate to='/dashboard' />
            },
            {
                path : '/categories',
                element : <Categories />
            },
            {
                path : '/dashboard',
                element : <Dashboard />
            },
            {
                path: '/add-category',
                element: <AddCategory />
            },
            {
                path: '/category/:id',
                element: <EditCategory />
            },
            {
                path: '/products',
                element: <Products />
            },
            {
                path: '/add-product',
                element: <AddProduct />
            },
            {
                path: '/product/:id',
                element: <EditProduct />
            },
            {
                path : '/contacts',
                element: <Contacts />
            },
            {
                path: '/add-type',
                element: <AddType />
            },
            {
                path: '/add-contact',
                element: <AddContact />
            },
            {
                path: '/contacts/:id',
                element: <EditContact />
            },
            {
                path: '/banners',
                element: <Banners />
            },
            {
                path: '/add-banner',
                element: <AddBanner />
            },
            {
                path: '/banners/:id',
                element: <EditBanner />
            },
            {
                path : '/messages',
                element: <Messages />
            },
            {
                path: '/references',
                element: <References />
            },
            {
                path: '/add-reference',
                element: <AddReference />
            },
            {
                path: '/references/:id',
                element: <EditReference />
            },
            {
                path: '/add-resume',
                element: <AddResume />
            },
            {
                path: '/resume',
                element: <Resume />
            },
            {
                path: '/resumes/:id',
                element: <EditResume />
            }
        ]
    },
    {
        path : '/',
        element : <GuestLayout />,
        children : [
            {
                path : '/login',
                element : <Login />
            }
        ]
    },
])

export default router