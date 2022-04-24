import { useEffect } from "react"
import toast from "react-hot-toast"

export default function Notification({message}) {
    return toast(message)  
};
