import React from 'react';
import styled from 'styled-components';

export default function BodyHead(props) {
    const { image, name, titledesc, description } = props || '';

    return (
        <Container>
            <div className="head" >
                <div className="head-left">
                    <img
                        src={image}
                        alt={name}
                    />
                </div>
                <div className="head-right">
                    <span className='title'>{name}</span>
                    <p className='title-desc'>{titledesc}</p>
                    <span className='description'>{description}</span>
                </div>
            </div>
        </Container >
    )
}

const Container = styled.div`
    .head{
        padding: 24px;
        display: flex;
        align-items: flex-end;
        height: 25vh;
        width: 100%;
        overflow: hidden;
        gap: 20px;
        .head-left{
            width: 17%;
            min-width: 200px;
            img{
                width: 100%;
                border-radius: 4px;
            }
        }
      .head-right{
          color: white;
          .title{
              display: inline-block;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
              max-width: 50vw;
              font-size: 100px;
              font-weight: bolder;
          }
          .title-desc{
          
          }
          .description{
              display: inline-block;
              height: 60px;
              font-size: 14px;
              opacity: 0.8;
              display: -webkit-box; /* 将文本作为一个盒子来显示 */
              -webkit-box-orient: vertical; /* 垂直排列文本 */
              -webkit-line-clamp: 3; /* 最多显示三行文本 */
              overflow: hidden; /* 隐藏超出容器的文本 */
              text-overflow: ellipsis; /* 在文本末尾添加省略号 */
              white-space: normal; /* 允许文本换行 */
              word-break: break-all; /* 打断所有单词 */
              width: 80%; /* 容器的宽度 */
          }
        }
  }
`;