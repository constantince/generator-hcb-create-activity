const template = {
    success : `<div class="tips">
        <header class="J-close">X</header>
        <div class="bg-container">
            <p class="title">厉害了，我的哥</p>
            <p>恭喜你抽到了<span class="J-reward-name"></span></p>
        </div>
        <footer>
            <a class="J-gain">点击领取</a>
        </footer>
    </div>`,

    sorry : `<div class="tips">
        <header class="J-close">X</header>
        <div class="bg-container">
            <p class="title">没关系，别气馁喔 </p>
            <p>明天再来试一下</p>
            <p class="bottom-tips">温馨提示：每天分享一则公告，即能获得一次抽奖机会哦</p>
        </div>
        <footer></footer>
    </div>`,

    failed: `<div class="tips">
    <header class="J-close">X</header>
    <div class="bg-container">
        <p class="title">小伙伴，你今天已经抽过奖了喔 明天再来呀</p>
        <p class="bottom-tips">温馨提示：每天分享一则公告，即能获得一次抽奖机会哦</p>
    </div>
    <footer></footer>
</div>`
};

export default template;