import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

export const toastSuccess = ({ title }) => Toastify({
    text: title,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, #333, #555)",
    },
    onClick: function () { }
}).showToast()

export const toastError = ({ title }) => Toastify({
    text: title,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top",
    position: "center",
    stopOnFocus: true,
    style: {
        background: "linear-gradient(to right, #9d0707, #5c1212)",
    },
    onClick: function () { }
}).showToast()