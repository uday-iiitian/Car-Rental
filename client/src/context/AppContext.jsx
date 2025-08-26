import { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import axios from "axios";
import {toast} from 'react-hot-toast';
// import { user } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL 

export const AppContext = createContext();

export const AppProvider = ({children}) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [pickupDate, setPickupDate] = useState('');
    const [returnDate, setReturnDate] = useState('');

    const [cars, setCars] = useState([]);

    
    // function to check if user is logged in
    const fetchUser = async() => {
        try {
            const data = await axios.get('/api/user/data')
            if(data.success){
                setUser(data.user);
                setIsOwner(data.user.isOwner === 'owner');
            }else{
                navigate('/'); 
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    // function to fetch all cars
    const fetchCars = async() => {
        try {
            const {data} = await axios.get('/api/user/cars');
            if(data.success){
                setCars(data.cars);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }
    
    // useEffect to retrieve token from localstorage
    useEffect(()=>{
        const token = localStorage.getItem('token');
        setToken(token);
        fetchCars();
    }, []);
    
    // function to logout user
    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common['Authorization'] = '';
        navigate('/');
        toast.success("Logged out successfully");
    }
    
    // useEffect to fetch user data when token token is available
    useEffect(() => {
        if(token){
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            fetchUser();
        }
        else{
            setUser(null);
            setIsOwner(false);
        }
    }, [token]);
    
    const value = {
        navigate, currency, axios, toast, user, setUser, token, setToken, isOwner, setIsOwner, showLogin, setShowLogin, pickupDate, setPickupDate, returnDate, setReturnDate, cars, setCars, fetchCars, fetchUser, logout 
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}
export const useAppContext = () => {
    return useContext(AppContext);
}