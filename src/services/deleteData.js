import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import { PATH_PREFIX } from 'Utils/AppVariables';




export const deleteData = async (data, url, re_render) => {
    let token = await localStorage.getItem("token");
    await Swal.fire({
        title: "Ma'lumotni o'chirmoqchimisiz ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: "Ma'lumotni o'chirish",
        cancelButtonText:"Yopish"
    }).then((result) => {
        if (result.isConfirmed) {
            axios({
                url: PATH_PREFIX + url,
                method: "POST",
                params: {
                    'token': token
                },
                data: data
            }).then((response) => {
                if (response?.data?.status === 1) {
                    re_render()
                    Swal.fire({
                        icon: 'success',
                        title: response?.data?.message,
                        showConfirmButton: false,
                        timer: 1500
                    })

                }
                if (response.data.status === 0) {
                    Swal.fire({
                        icon: 'warning',
                        title: response.data.message,
                        showConfirmButton: true
                    })
                }
            }).catch((error) => {
                // if(error.response.status === 401){
                //     localStorage.clear();
                // }
            })

        }
    })
}
