'use strict';
const Generator = require('yeoman-generator');
const fs = require('fs');
module.exports = class extends Generator {
  async prompting() {
    const prompts = [
       //项目名称
       {
        type: 'input',
        name: 'project',
        message: 'Please input your project name',
        default: 'activity'
      },
      //开发人员名称
      {
        type: 'input',
        name: 'author',
        message: 'Developer name',
        default: 'hcb-staff'
      },
	  //选择要使用的库工具
	  {
		  type: 'checkbox',
		  name: 'libraries',
      message: 'Selecting your library below that you want to including',
      choices:[{
        name: 'zepto.js(dom maniplate library)',
        value: 'https://cdn.bootcss.com/zepto/1.0rc1/zepto.min.js',
        checked: true
      },
      {
        name: 'wxapi.js(wx api)',
        value: 'http://res2.wx.qq.com/open/js/jweixin-1.4.0.js',
        checked: false
      },
      {
        name: 'juicer.js(html engine)',
        value: 'https://cdn.bootcss.com/juicer/0.6.15/juicer-min.js',
        checked: false
      },
      {
        name: 'lodash.js(function library)',
        value: 'https://cdn.bootcss.com/lodash.js/4.17.12-pre/lodash.core.min.js',
        checked: false
      }]
	  },
	  //选择开发模式
      {
        type: 'confirm',
        name: 'model',
        message: 'You are developing in Phone?',
        default: true
      },
      //版本号
      {
        type: 'input',
        name: 'version',
        message: 'Version',
        default: '0.1.0'
      },
      //api前缀名称
      {
        type: 'input',
        name: 'prefix',
        message: 'Prefix',
        default: 'api'
      },
      //测试环境域名
      {
        type: 'input',
        name: 'testDomain',
        message: 'TestDomain',
        default: 'http://apptest.hcbkeji.com'
      },
      //正式环境域名
      {
        type: 'input',
        name: 'proDomain',
        message: 'ProDomain',
        default: 'http://app.hcbkeji.com'
      },
      //中间活动action以及路由
      {
        type: 'input',
        name: 'phpRoute',
        message: 'PhpRoute',
        default: 'php/option/activity'
      },
      {
        type: 'input',
        name: 'project',
        message: 'Please input your project name',
        default: 'activity'
      },
      {
        type: 'input',
        name: 'description',
        message: 'give your project some descriptions',
        default: '...'
      },
      {
        type: 'input',
        name: 'email',
        message: 'your email address',
        default: 'hcb@abc.com'
      },
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    console.log(this.props)
    //拷贝模板
    fs.readdir(this.templatePath(), (err, files) => {
      files.forEach(file => {
        let path = file.replace(/_/g, '\/');
        if(file === '_package') {
          path = 'package.json'
        }  
        this.fs.copyTpl(this.templatePath(file), this.destinationPath(path), { ...this.props });
        
      });
    })
  }

  install() {
    this.installDependencies();
  }

  end() {
    this.log(`Congratulation! Porject <${this.props.project}> has been created`)
  }
};
