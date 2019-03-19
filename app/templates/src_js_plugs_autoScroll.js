import { throttle } from '../tools/tools';
function AutoScroll (opts) {
    this.options = {
        index: 0, //滚动初始高度
        element: '', //滚动对象
        velocity: 1, //滚动速率
        delay: 2000,// 加载延迟执行函数时间
        requestData: function(e){}, //延迟执行函数主体
        ...opts
    }
    this.init();
}

AutoScroll.prototype.startScroll = function() {
    this.options.index += this.options.velocity;
    this.options.element.scrollTop = this.options.index;
}

AutoScroll.prototype.init = function() {
    this.target = $(this.options.element).find('div.container-list')[0];
    this.scrollFunc = throttle(this.options.requestData.bind(this), this.options.delay);
    this.start(this.scrollFunc);
    
}

AutoScroll.prototype.start = function(func) {
    this.options.element.addEventListener('scroll', func, false);
    this.timer = setInterval(() => {
        this.startScroll();
    }, 50);
}

AutoScroll.prototype.stop = function() {
    this.options.element.removeEventListener('scroll', this.scrollFunc, false);
    clearInterval(this.timer);
}

export default AutoScroll;