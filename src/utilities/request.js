import axios from "axios";
import * as AllApi from './apis'

export const Apis  = AllApi;

export const baseUrl = 'http://dyonical.ir:8000/api/v1';

export const HttpService = axios.create({
    baseURL: baseUrl,
    headers: {
        'Authorization': localStorage.getItem('token') !== null
            ? `JWT ${localStorage.getItem('token')}`
            : '',
        'Content-Type': 'application/json',
    },
});

HttpService.interceptors.response.use((response) => {
    return response;
}, function (error) {
    // Handle NetWork Errors
    if (error.response !== undefined) {
        if (error.response.status === 308) {
            return Promise.resolve();
        }
        if (error.response.status === 401) {
            const local_token = localStorage.getItem("token");
            const local_userData = localStorage.getItem("token");
            if (local_token || (local_userData && local_userData.mobile !== '')) {
                HttpService.post("unauthorized", {
                    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
                    userData: localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : null,
                    pathname: window.location.pathname,
                    apiURL: error.response.config.url,
                }).then(response => {
                    if (response.data.status === "success") {
                        localStorage.removeItem('token');
                        localStorage.removeItem('userData');
                        window.location.reload(true);
                    }
                })
            } else {
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                window.location.reload(true);
            }
        }
        if (error.response.status === 502) {
            //console.log(error);
            alert('مشکلی ارتباطی، کمی دیگر تلاش کنید');
        }
        if (error.response.status === 500) {
            const lastError = localStorage.getItem("500");
            const t = new Date().getTime();
            if (lastError) {
                if (t - Number(lastError) > 60000) {
                    localStorage.setItem("500", t.toString());
                    alert('لطفا کمی دیگر تلاش کنید');
                }
            } else {
                localStorage.setItem("500", t.toString());
                alert('لطفا کمی دیگر تلاش کنید');
            }


        }
        if (error.response.status === 422) {
            if (!Object.keys(error.response.data).length > 0) {
                const d = error.response.data.errors;
                error.response.discount = false;
                error.response.address = false;
                Object.keys(d).map(errorKey => {
                    if (errorKey === 'discount') {
                        error.response.discount = true;
                    }
                    if (errorKey === 'address') {
                        error.response.address = true;
                    }
                    alert(d[errorKey]);
                    return true;
                });
            }
            return Promise.reject(error.response);
        }
        if (error.response.status === 403) {
            if (window.location.pathname === "/login") {
                if (error.response.data) {
                    let msg = null;
                    if (error.response.data.hasOwnProperty("data")) {
                        if (error.response.data.data.hasOwnProperty("message")) {
                            msg = error.response.data.data.message;
                        }
                    }
                    return Promise.reject(msg);
                } else {
                    const d = error.response.data.errors;
                    Object.keys(d).map(errorKey => alert(d[errorKey]));
                    return Promise.reject();
                }
            } else if (!Object.keys(error.response.data.hasOwnProperty).length > 0) {
                if (error.response.data.hasOwnProperty("message")) {
                    alert(error.response.data.message);
                    return Promise.reject();
                } else {
                    const d = error.response.data.errors;
                    Object.keys(d).map(errorKey => alert(d[errorKey]));
                    return Promise.reject();
                }
            }
        }
        if (error.response.status === 400 || error.response.status === 424) {
            if (window.location.pathname === "/") {
                if (error.response.data) {
                    if (error.response.data.hasOwnProperty("data")) {
                        if (error.response.data.data.hasOwnProperty("message")) {
                            alert(error.response.data.data.message)
                        }
                    }
                    return Promise.reject();
                } else {
                    const d = error.response.data.errors;
                    Object.keys(d).map(errorKey => alert(d[errorKey]));
                    return Promise.reject();
                }
            } else if (!Object.keys(error.response.data.hasOwnProperty).length > 0) {
                if (error.response.data.hasOwnProperty("data")) {
                    if (error.response.data.data.hasOwnProperty("message")) {
                        alert(error.response.data.data.message);
                        return Promise.reject();
                    }
                } else {
                    const d = error.response.data.errors;
                    Object.keys(d).map(errorKey => alert(d[errorKey]));
                    return Promise.reject();
                }
            }
        }
        if (error.response.status === 429){
            alert('به علت درخواست زیاد، تا یک ساعت دیگر تلاش کنی')
        }
    } else {
        const lastError = localStorage.getItem("500");
        const t = new Date().getTime();
        if (lastError) {
            if (t - Number(lastError) > 60000) {
                localStorage.setItem("500", t.toString());
                alert('خطا در شبکه');
            }
        } else {
            localStorage.setItem("500", t.toString());
            alert('خطا در شبکه');
        }
        return Promise.reject();
    }

    return Promise.resolve(error.response);
});
