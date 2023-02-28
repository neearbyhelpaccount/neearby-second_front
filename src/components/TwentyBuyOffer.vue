<template>
    <div class="wrapper">
        <div class="offer_inner">
            <div class="offer_cont">
                <div class="offer_l">
                    <img src="../assets/TwentyOffer/offerImg.svg" alt="">
                    <div class="tovar_title">Супер товар</div>
                    <div class="tovar_sup">Показать полное описание товара</div>
                    <div class="pricec_info">
                        <div class="f_pr">
                            Обычная цена товара: <span>
                                <span>10 000 руб.</span>
                            </span>
                        </div>
                        <div class="s_pr">
                            Цена со скидкой сейчас: <span>
                                <span>5000 руб.</span>
                            </span>
                        </div>
                        <div class="t_pr">
                            Цена повысится через: <span>
                                23:54
                            </span>
                            <img src="../assets/TwentyOffer/clock.svg" alt="">
                        </div>
                    </div>
                    <div class="social_info">
                        <div class="social_info_btns">
                            <div class="like">
                                <img src="../assets/TwentyOffer/icon_like.svg" alt="">
                            </div>
                            <div class="comment">
                                <img src="../assets/TwentyOffer/icon_comment.svg" alt="">
                            </div>
                            <div class="repost">
                                <img src="../assets/TwentyOffer/icon_rep.svg" alt="">
                            </div>
                            <div class="zakladki">
                                <img src="../assets/TwentyOffer/icon_zakladki.svg" alt="">
                            </div>
                        </div>
                        <div class="views_info">
                            <img src="../assets/TwentyOffer/ic_views.svg" alt="">1
                        </div>
                    </div>
                </div>
                <div class="offer_r">
                    <div class="offer_r_title">Заполните ниже Ваши данные</div>
                    <div class="offer_r_inputs">
                        <input type="text" placeholder="Введите Ваше имя и фамилию">
                        <input type="text" placeholder="Введите Ваш email">
                        <input type="text" placeholder="Введите номер Вашего мобильного телефона">
                    </div>
                    <div class="oplata_offer">
                        <div class="oplata_offer_title">Способы оплаты:</div>
                        <div class="oplata_offer_var">
                            <img src="../assets/TwentyOffer/check.svg" alt="">
                            <span>Оплата банковской картой или QIWI кошельком</span>
                        </div>
                        <div class="busc_btn">Добавить в корзину</div>
                        <div class="predoplata">
                            <div class="predoplata_title">Предоплата</div>
                            <div class="pred_blocks_l">
                                <div class="pred_block">500 руб.</div>
                                <div class="pred_block">1000 руб.</div>
                                <div class="pred_block">2000 руб.</div>
                            </div>
                            <div class="pred_blocks_l">
                                <div class="pred_block">3000 руб.</div>
                                <div class="pred_block">4000 руб.</div>
                                <div class="pred_block">4500 руб.</div>
                            </div>
                        </div>
                        <div class="user_sog">Нажимая на кнопку, Вы даёте согласие на<br>
                            <span>документацию Neearby.com</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>


export default {
    name: "TwentyBuyOffer",
    components: {
        
    },
    data() {
        
    },
    methods: {
    },
}
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

.wrapper {
    position: relative;
    top: 41px;
    margin-bottom: 66px;
    padding-top: 2rem;
    margin-right: auto;
    margin-left: auto;
    width: 100%;
    height: 100%;
    background-color: white;
    font-family: 'Inter', sans-serif !important;
}

.offer_inner {
    width: 1110px;
    height: 828px;
    margin-right: auto;
    margin-left: auto;
    border-radius: 15px;
    background-color: white;
}

.offer_cont {
    padding: 1.5rem 0;
    width: 920px;
    margin-right: auto;
    margin-left: auto;
    display: flex;
}

.tovar_title {
    font-size: 24px;
    font-weight: 600;
    color: black;
    margin-bottom: 1rem;
}

.tovar_sup {
    font-size: 14px;
    font-weight: 400;
    color: #7A7777;
}

.offer_l {
    width: 335px;
}


.f_pr span {
    background: #FFF500;
    border-radius: 5px;
    width: 118px;
    height: 28px;
    font-size: 19px;
    font-weight: 500 !important;
    text-decoration: line-through;
    color: black;
    text-decoration-thickness: 2px;
    padding: 0.15rem;
}

.pricec_info {
    font-size: 16px;
    font-weight: 500;
    color: black;
    margin-top: 2rem;
    text-align: left;
}

.s_pr {
    margin-top: 1rem;
}

.s_pr span {
    background: #00FF00;
    border-radius: 5px;
    width: 118px;
    height: 28px;
    font-size: 24px;
    font-weight: 500 !important;
    color: black;
    padding: 0.15rem;
}

.t_pr {
    display: flex;
    align-items: center;
    margin-top: 1rem;
}

.t_pr span {
    width: 65px;
    height: 27px;
    background: #FE6637;
    border-radius: 5px;
    color: white;
    font-weight: 300 !important;
    font-size: 16px;
    margin-left: 0.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}

.t_pr img {
    margin-left: 0.5rem;
}

.social_info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 2rem;
    width: 95%;
}

.social_info_btns {
    display: flex;
    align-items: center;
}

.social_info_btns div {
    background: #F0F2F5;
    border-radius: 10px;
    width: 43px;
    height: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 0.4rem;
}

.social_info_btns div:first-child {
    margin-left: 0;
}

.views_info img {
    margin-right: 0.2rem;
}

.views_info {
    color: rgba(42, 88, 133, 0.6);
}

.offer_r {
    width: 585px;
}

.offer_r_inputs {
    display: flex;
    flex-direction: column;
}

.offer_r_title {
    text-transform: uppercase;
    font-weight: 600;
    font-size: 24px;
    text-align: center;
    color: #FE6637;
}

.offer_r_inputs input:first-child {
    margin-top: 2rem;
}

.offer_r_inputs input {
    width: 500px;
    height: 40px;
    background: #EDEEF0;
    border-radius: 10px;
    color: #7A7777;
    font-size: 16px !important;
    font-weight: 600 !important;
    margin-right: auto;
    margin-left: auto;
    margin-top: 1rem;
    border: 0;
    outline: 0;
    padding-left: 1rem;
}

.offer_r_inputs input::placeholder {
    color: rgba(122, 119, 119, 0.7);
}

.oplata_offer {
    width: 500px;
    text-align-last: left;
    margin-right: auto;
    margin-left: 4.5rem;
    margin-top: 2rem;
}

.oplata_offer_title {
    font-size: 24px;
    font-weight: 500;
    text-transform: uppercase;
    color: black;
    margin-bottom: 2rem;
}

.oplata_offer_var {
    width: 500px;
    height: 65px;
    background: #EDEEF0;
    border-radius: 10px;
    padding-left: 2rem;
    display: flex;
    align-items: center;
}

.oplata_offer_var span {
    font-size: 16px;
    font-weight: 600;
    margin-left: 1rem;
    color: black;
}

.busc_btn {
    width: 435px;
    height: 70px;
    background: #FE6637;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    text-transform: uppercase;
    font-size: 24px;
    font-weight: 600;
    margin-top: 4rem;
    margin-left: 3rem;
}

.predoplata_title {
    font-size: 22px;
    font-weight: 600;
    color: black;
    margin-top: 4rem;
    text-transform: uppercase;
    margin-bottom: 1rem;
}


.pred_blocks_l {
    width: 422px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 0.5rem;
}

.pred_block {
    width: 137px;
    height: 44px;
    background: #FE6637;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 20px;
    font-weight: 500;
}

.user_sog {
    padding-top: 1rem;
    color: #7A7777;
    font-size: 16px;
}

.user_sog span {
    color: #2A5885;
    border-bottom: 1px solid #2A5885;
}
</style>