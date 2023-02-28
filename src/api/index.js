const local = false;
const axios = require('axios');
let services = {
    serviceUser: 'http://45.11.27.143:3000',
    serviceStorage: 'http://45.11.27.143:3002',
    serviceAuthor: 'http://45.11.27.143:3003',
    websocket: 'http://45.11.27.143:3000'
};

if(local) {
    services.serviceUser = 'http://localhost:3000';
    services.serviceAuthor = 'http://localhost:3003';
    services.websocket = 'http://localhost:3000'
}


const {useToast, POSITION, TYPE} = require('vue-toastification');
const store = require('../store');
const {useState} = require('vuex');
const {a} = require("vue-the-mask/src/tokens");


class ApiWrapper {


    async readNotification({notificationId, status}){
        let result = await this.sendRequest({
            route: 'api/user/readNotification',
            serviceHost: services.serviceUser,
            body: {
                notification_id: notificationId,
                status
            },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async getModerationCover(){
        let result = await this.sendRequest({
            route: 'api/user/get-moderation-cover',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }

   async getModerationProducts(){
       let result = await this.sendRequest({
           route: 'api/product/searchModerationProducts',
           serviceHost: services.serviceAuthor,
           body: {},
           method: 'POST'
       });
       result.data = ApiWrapper.pathProcessor(result.data);
       return {
           success: result.success,
           data: result.data
       };
   }

   async acceptProduct(data){
       let result = await this.sendRequest({
           route: 'api/product/accept-product',
           serviceHost: services.serviceAuthor,
           body: data,
           method: 'POST'
       });
       return {
           success: result.success,
           data: result.data
       };
   }



    async getModerationAvatarByUser(data){
        let result = await this.sendRequest({
            route: 'api/user/select-avatar-moder',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }


    async getModerationCoverByUser(data){
        let result = await this.sendRequest({
            route: 'api/user/select-cover-moder',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }


    async deleteAvatarByUser(data){
        let result = await this.sendRequest({
            route: 'api/user/delete-avatar-moder',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }


    async deleteCoverByUser(data){
        let result = await this.sendRequest({
            route: 'api/user/delete-cover-moder',
            serviceHost: services.serviceUser,
            body: data,
            method: 'POST'
        });
        return {
            success: result.success,
            data: result.data
        };
    }











    async cancelProduct(data){
       let result = await this.sendRequest({
           route: 'api/product/cancel-product',
           serviceHost: services.serviceAuthor,
           body: data,
           method: 'POST'
       });
       result.data = ApiWrapper.pathProcessor(result.data, true);
       return {
           success: result.success,
           data: result.data
       };
   }


    async getProductById(data){
        let result = await this.sendRequest({
            route: 'api/product/get-product-by-id',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data);
        return   {
            success: result.success,
            data: result.data
        };
    }

    async getModerationAvatar(){
        let result = await this.sendRequest({
            route: 'api/user/get-moderation-avatar',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });
        result.data = ApiWrapper.pathProcessor(result.data, true);
        return {
            success: result.success,
            data: result.data
        };
    }

    async closeNotifications({notificationId}){
        let result = await this.sendRequest({
            route: 'api/user/closeNotification',
            serviceHost: services.serviceUser,
            body: {
                notification_id: notificationId
            },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async getUnreadNotification(){
        let result = await this.sendRequest({
            route: 'api/user/getUnreadNotifications',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }
    async getNotifications(){
        let result = await this.sendRequest({
            route: 'api/user/getNotifications',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async findUnread(){
        let result = await this.sendRequest({
            route: 'api/message/notReadChats',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async getProduct(data){
        let result = await this.sendRequest({
            route: 'api/product/searchProductsByIds',
            serviceHost: services.serviceAuthor,
            body: data,
            method: 'POST'
        })
        result.data = ApiWrapper.pathProcessor(result.data);
        return {
            success: result.success,
            data: result.data
        };
    }

    async readMessage({chatId, messageId}){
        let result = await this.sendRequest({
            route: 'api/message/readMessage',
            serviceHost: services.serviceUser,
            body: {
                chatId,
                messageId
            },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async sendMessage({chatId, message}){
        let result = await this.sendRequest({
            route: 'api/message/sendMessage',
            serviceHost: services.serviceUser,
            body: {
                chatId,
                text: message
            },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async getChatMessages({chatId}){
        let result = await this.sendRequest({
            route: 'api/message/chat',
            serviceHost: services.serviceUser,
            body: { chatId },
            method: 'POST'
        });

        //result.data = ApiWrapper.pathProcessor(result.data);

        for(let message of result.data){
            message.user = ApiWrapper.pathProcessor(message.user);
        }

        return {
            success: result.success,
            data: result.data
        };
    }
    async getAllChats(){
        let result = await this.sendRequest({
            route: 'api/message/chats',
            serviceHost: services.serviceUser,
            method: 'GET'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async setSubdomain({subdomain}){
        let result = await this.sendRequest({
            route: 'api/user/updateSubdomain',
            serviceHost: services.serviceUser,
            body: { login: subdomain },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }
    
    async becomeAuthor({login}) {
        let result = await this.sendRequest({
            route: 'api/user/becomeAuthor',
            serviceHost: services.serviceUser,
            body: {login},
            method: 'POST'
        })
        return {
            success: result.success,
            data: result.data  
        };
    }

    async getYourOrders({period}) {
        let result = await this.sendRequest({
            route: 'api/order/getOrders',
            serviceHost: services.serviceUser,
            body: { period },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async confirmRegistration(data){
        let result = await this.sendRequest({
            route: 'api/user/confirmRegistration',
            serviceHost: services.serviceUser,
            body: data ,
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async recoverPassword({email}){
        let result = await this.sendRequest({
            route: 'api/user/passwordRecovery',
            serviceHost: services.serviceUser,
            body: { email },
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }
    async registerUser({name, email, phone}){
        let result = await this.sendRequest({
            route: 'api/user/registration',
            serviceHost: services.serviceUser,
            body: {name, email, phone},
            method: 'POST'
        });

        return {
            success: result.success,
            data: result.data
        };
    }

    async getOrders({period, orderType}){
        let result = await this.sendRequest({
            route: 'api/order/getOrders',
            serviceHost: services.serviceUser,
            body: {period, orderType},
            method: 'POST'
        });


        return {
            success: result.success,
            data: result.data
        };
    }
    async writeComment({comment, postId}){
        let result = await this.sendRequest({
            route: 'api/post/addCommentWithPost',
            serviceHost: services.serviceAuthor,
            body: {comment, postId},
            method: 'POST'
        });


        return {
            success: result.success,
            data: result.data
        };
    }
    async updateSubscription({subscription}){

        let result = await this.sendRequest({
            route: 'api/subscription/updateSubscription',
            serviceHost: services.serviceAuthor,
            body: subscription,
            method: 'POST'
        });


        return {
            success: result.success,
            data: result.data
        };
    }

    async searchSubscriptions({authorId, subscriptionId}){
        let searchObject = {};

        if(authorId){
            searchObject.author_id = authorId;
        }
        if(subscriptionId){
            searchObject.id = subscriptionId;
        }

        let result = await this.sendRequest({
            route: 'api/subscription/searchSubscriptions',
            serviceHost: services.serviceAuthor,
            body: searchObject,
            method: 'POST'
        });

        result.data = ApiWrapper.pathProcessor(result.data);

        return {
            success: result.success,
            data: result.data
        };
    }
    async placeLike({postId}){
        let result = await this.sendRequest({
            route: 'api/post/likePost',
            serviceHost: services.serviceAuthor,
            body: {
                postId
            },
            method: 'POST'
        });


        return {
            success: result.success,
            data: result.data
        };
    }

    async getPosts({authorId, postId}){

        let searchObject = {};

        if(authorId){
            searchObject.authorId = authorId;
        }
        if(postId){
            searchObject.id = postId;
        }

        let result = await this.sendRequest({
            route: 'api/post/searchPosts',
            serviceHost: services.serviceAuthor,
            body: searchObject,
            method: 'POST'
        });


        return {
            success: result.data.success,
            data: result.data
        };
    }

    async createOrder(type, targetId){
        let result = await this.sendRequest({
            route: 'api/order/createOrder',
            serviceHost: services.serviceUser,
            body: {
                type, targetId
            },
            method: 'POST'
        });


        return {
            success: result.data.success,
            data: result.data
        };
    }

    async createProduct(product){
        const toast = useToast();
        let result;
        await axios.post(`${services.serviceAuthor}/api/product/createProduct`, product, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }

        }).then(answer => {
            toast('Товар успешно добавлен', {position: POSITION.BOTTOM_RIGHT, type: TYPE.SUCCESS})
            result = answer.data;

        })
            .catch(err => {
                toast('Не все данные введены корректно', {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR})
                console.log(err);
            })
        return {
            success: true,
            data: result
        };
    }



    async updateProduct(product){


        let result = await axios.post(`${services.serviceAuthor}/api/product/updateProduct`,product, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });




        return {
            success: result.success,
            data: result.data
        };
    }
    async updateAvatar(body){
        await axios.post(`${services.serviceUser}/api/user/update-profile-avatar`, body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        // let result = await this.sendRequest({
        //     route: 'api/user/update-profile-avatar',
        //     serviceHost: services.serviceUser,
        //     body: body,
        //     method: 'POST',
        //     type: true,
        // });
    }

    async deleteAvatar(){
        let result = await this.sendRequest({
            route: 'api/user/delete-avatar',
            serviceHost: services.serviceUser,
            method: 'DELETE'
        });
    }
    async updateCover(body){
        await axios.post(`${services.serviceUser}/api/user/update-profile-cover`, body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });

    }
    async getModerCover(body){
        //get-all-moderation-cover
        let result = await this.sendRequest({
            route: 'api/user/get-all-moderation-cover',
            serviceHost: services.serviceUser,
            body: body,
            method: 'POST'
        });


        return {
            success: result.data.success,
            data: result.data
        };
    }

    async cancelCover(body){
        await axios.post(`${services.serviceUser}/api/user/cancel-profile-cover`, body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });

    }

    async requestUpdateCover(body){
        let result = await axios.post(`${services.serviceUser}/api/user/request-moderation-profile-cover`, body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        // let result = await this.sendRequest({
        //     route: 'api/user/update-profile-avatar',
        //     serviceHost: services.serviceUser,
        //     body: body,
        //     method: 'POST',
        //     type: true,
        // });
        return {
            success: true,
            data: result.data.data

        }
    }

    async getModerAvatar(body){
        //get-all-moderation-cover
        let result = await this.sendRequest({
            route: 'api/user/get-all-moderation-avatar',
            serviceHost: services.serviceUser,
            body: body,
            method: 'POST'
        });


        return {
            success: result.data.success,
            data: result.data
        };
    }

    async cancelAvatar(body){
        await axios.post(`${services.serviceUser}/api/user/cancel-profile-avatar`, body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });

    }

    async requestUpdateAvatar(body){
        let result = await axios.post(`${services.serviceUser}/api/user/request-moderation-profile-avatar`, body, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            }
        });
        // let result = await this.sendRequest({
        //     route: 'api/user/update-profile-avatar',
        //     serviceHost: services.serviceUser,
        //     body: body,
        //     method: 'POST',
        //     type: true,
        // });
        return {
            success: true,
            data: result.data.data

        }
    }

    async deleteCover(){
        let result = await this.sendRequest({
            route: 'api/user/delete-cover',
            serviceHost: services.serviceUser,
            method: 'DELETE'
        });
    }


    async uploadFile(file){
        let data = new FormData();
        data.append('files', file, file.name);

        let response = await fetch(`${services.serviceStorage}/api/storage/upload`, {
            body: data,
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            method: 'POST'
        });

        let body = await response.json();

        return {
            success: body.success,
            data: body.data
        }
    }

    async getProducts({authorId, productId}) {

        let searchObject = {};

        if(authorId){
            searchObject.author_id = authorId;
        }
        if(productId){
            searchObject.id = productId;
        }

        let result = await this.sendRequest({
            route: 'api/product/searchProducts',
            serviceHost: services.serviceAuthor,
            body: searchObject,
            method: 'POST'
        });

        result.data = ApiWrapper.pathProcessor(result.data);


        return {
            success: result.data.success,
            data: result.data
        };
    }

    async getProfile({login, id}) {

        let result = await this.sendRequest({
            route: 'api/user/getProfile',
            serviceHost: services.serviceUser,
            body: {
                login: login,
                id: id
            },
            method: 'POST'
        });

        let data = ApiWrapper.pathProcessor(result.data);


        return {
            success: data.success,
            data: data
        };
    }


    async login(email, password) {
        let result = await this.sendRequest({
            route: 'api/user/auth',
            serviceHost: services.serviceUser,
            body: {
                email,
                password
            },
            method: 'POST'
        });

        localStorage.setItem('token', result.data);

        return result;
    }


    async whoami() {
        let result = await this.sendRequest({
            route: 'api/user/whoami',
            serviceHost: services.serviceUser,
            body: {},
            method: 'POST',
            authorize: true
        });

        if (result.success === false) {
            store.default.commit('setAuthorized', false);
        }

        result.data = ApiWrapper.pathProcessor(result.data);

        store.default.commit('setAuthorizedProfile', result.data);
        return result;
    }

    async sendRequest(object) {
        let {route, body, authorize = false, serviceHost, method, type = false} = object;

        let response = await fetch(`${serviceHost}/${route}`, {
            body: type ? body : JSON.stringify(body),
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-type': 'application/json'
            },
            method: method
        });


        let data = await response.json();

        if (!response.ok) {
            if(response.status !== 401 && response.status !== 400){
                const toast = useToast();
                toast(data.error.name, {position: POSITION.BOTTOM_RIGHT, type: TYPE.ERROR});
            }
            return {
                success: false,
                data: data
            }
        }

        return {
            success: true,
            data: data.data
        }


    }

    async updateProfilePictureMiniature(body){
        let result = await this.sendRequest({
            route: 'api/user/updateProfilePictureMiniature',
            serviceHost: services.serviceUser,
            body: body,
            method: 'POST',
            authorize: true
        });

        return result;
    }

    async updateCoverPictureMiniature(body){
        let result = await this.sendRequest({
            route: 'api/user/updateCoverMiniature',
            serviceHost: services.serviceUser,
            body: body,
            method: 'POST',
            authorize: true
        });

        return result;
    }

    // TODO: переписать
    static pathProcessor(data, type = false) {
        if (Array.isArray(data)) {
            for (let element of data) {
                for (let key in element) {
                    if (key.includes('_path') && element[key]) {
                        if (!element[key].includes('://')) {
                            //Перепишем
                            //element[key] = `${services.serviceStorage}/api/storage/getFile/${element[key]}`;
                            type ? element[key] = `${services.serviceUser}/${element[key]}` :  element[key] = `${services.serviceAuthor}/${element[key]}` ;

                        }
                    }
                }
            }

        } else {
            for (let key in data) {
                if (key.includes('_path') && data[key]) {
                    if (!data[key].includes('://')) {
                        //Перепишем
                        //data[key] = `${services.serviceStorage}/api/storage/getFile/${data[key]}`;
                        data[key] = `${services.serviceUser}/${data[key]}`;

                    }
                }
            }
        }

        return data;


    }

    OrderTypes = {
        Product: 1,
        Subscription: 2,
        PostPurchase: 3,
    };

    services = services;

}

module.exports = new ApiWrapper();