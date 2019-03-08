const tools = {
	getRequest() {
		  const url = location.search; //获取url中"?"符后的字串 
		  const theRequest = {};
		  if(url.indexOf("?") != -1) {
		    const str = url.substr(1);
		    const strs = str.split("&");
		    for(const i = 0; i < strs.length; i++) {
		      theRequest[strs[i].split("=")[0]] = strs[i].split("=")[1];
		    }
		  }
		  return theRequest;
	}
}

export default tools;