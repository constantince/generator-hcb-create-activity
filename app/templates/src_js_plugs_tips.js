class Tips {
    constructor(p) {
        this.opts = {
            duration: 3000,
            text: 'hello',
            ...p
        }

        const classes = `height: 0.6rem;
            background-color: rgba(0, 0, 0, 0.8);
            border-radius: 0.05rem;
            color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: .2rem;
            transform: translateX(-50%);
            text-align: center;
            line-height: 0.6rem;
            z-index: 999;
            display: none;
            padding: .1rem 1rem;
            max-width: 80%;`


        this.el = $(`<div style="${classes}" class="alertBox" id="alertBox" style="display:none"></div>`);


        $('body').append(this.el);
    }

    show(text, callback) {
        if(this.timer) return;
        if(!text) {
            text = this.opts.text;
        }
        this.el.html(text).show();
        this.opts.text = text;
        this.timer = setTimeout(() => {
            this.el.hide();
            clearTimeout(this.timer);
            this.timer = null;
            callback && callback();
        }, this.opts.duration);
        
    }
}

export default Tips;