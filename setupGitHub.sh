#!/bin/bash

# 初始化Git仓库
git init

# 添加所有文件到暂存区
git add .

# 提交更改
git commit -m "初始化Niuma项目 - 实时工资可视化工具"

# 请在运行此脚本前替换以下URL为您的GitHub仓库URL
echo "请输入您的GitHub仓库URL（例如：https://github.com/yourusername/niuma.git）："
read repo_url

# 添加远程仓库
git remote add origin $repo_url

# 推送到GitHub
git push -u origin master

echo "完成！项目已成功推送到GitHub仓库。"
