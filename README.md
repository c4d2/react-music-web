npm install less less-loader --save-dev

npm run eject

 webpack暴露之后飘红：
 修改package.json中的数据：

 "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ],
    "parserOptions": {
      "babelOptions": {
        "presets": [
          [
            "babel-preset-react-app",
            false
          ],
          "babel-preset-react-app/prod"
        ]
      }
    }
  },


  使用import styled from 'styled-components';
  vscode中安装vscode-styled-components插件补全代码

  后端代码用的网易云音乐api
