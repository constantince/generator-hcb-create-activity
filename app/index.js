'use strict';
const Generator = require('yeoman-generator');
const fs = require('fs');
module.exports = class extends Generator {
  async prompting() {
    const prompts = [
      //开发人员名称
      {
        type: 'input',
        name: 'author',
        message: 'Developer name',
        default: 'hcb-staff'
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
      //项目名称
      {
        type: 'input',
        name: 'project',
        message: 'Please input your project name',
        default: 'activity'
      },
      //项目描述
      {
        type: 'input',
        name: 'description',
        message: 'Descriptions',
        default: 'no descriptions'
      },
      //个人邮件地址
      {
        type: 'input',
        name: 'email',
        message: 'Email',
        default: 'alberteinstein007@126.com'
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
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
