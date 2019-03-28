
const option_api = {
    add_point: '/activity/click'
};

const prefix = process.env.NODE_ENV === 'production' ? '' : '<%=prefix%>';

const handlerUlrPreSuffix = apis => {
    let new_apis_object = {};
    for(let key in apis) {
        new_apis_object[key] = `${prefix}/api2/index.php/?s=${apis[key]}`;
    }
    return new_apis_object;
};

const ouput_api = handlerUlrPreSuffix(option_api);

export default ouput_api;