
const option_api = {
    chevron_report_activity: 'chevron_report_activity'
};

const PRE = process.env.NODE_ENV === 'production' ? '<%=phpRoute%>' : '<%=prefix%>';

const handlerUlrPreSuffix = apis => {
    let new_apis_object = {};
    for(let key in apis) {
        new_apis_object[key] = `/${PRE}/${apis[key]}.php`
    }
    return new_apis_object;
};

const ouput_api = handlerUlrPreSuffix(option_api);

export default ouput_api;