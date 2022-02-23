import React from "react";
import "./Notification.css"
import { CheckIcon , XIcon } from "@heroicons/react/outline";


export default function Notification({type,message,close}){

    return(
        <div id="toast" className="notification flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800 fixed bottom-5 right-10" role="alert">
            {
                type!=="error"
                ?
                    <div className=" inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <CheckIcon />
                    </div>
                        :
                    <div className=" inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                        <XIcon />
                    </div>
            }
            <div className="ml-3 text-sm font-normal">
                {message}
            </div>
            <button onClick = {() => close()} type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-collapse-toggle="toast-success" aria-label="Close">
                <span className="sr-only">Close</span>
                <XIcon />
            </button>
        </div>
    )
}

