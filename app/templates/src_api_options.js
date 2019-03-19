
const option_api = {
    share: '/notice/home/share',
    draw: '/notice/prize/draw',
    prize: '/notice/my/prize',
    roll: '/notice/prize/roll', 
    addPoint: '/activity/click'//´òµã
};

// console.log(process.env.NODE_ENV);

const handlerUlrPreSuffix = apis => {
    let new_apis_object = {};
    for(let key in apis) {
        new_apis_object[key] = `/<%=prefix%>/index.php/?s=${apis[key]}`;
    }
    return new_apis_object;
};

const ouput_api = handlerUlrPreSuffix(option_api);

export default ouput_api;