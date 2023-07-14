/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';

import styled from 'styled-components';

// materials
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PauseCircleIcon from '@mui/icons-material/PauseCircle';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import { VolumeDownRounded, VolumeUpRounded } from '@mui/icons-material';
import { Stack } from '@mui/material';


import { ReactComponent as OneCircle } from '../assets/onecircle.svg';
import { ReactComponent as ListCircle } from '../assets/listcircle.svg';
import { ReactComponent as Order } from '../assets/order.svg';
import { ReactComponent as Random } from '../assets/random.svg';

import { MdReorder } from "react-icons/md";

import eventBus from '../store/event-bus';
import { useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { reqsongurl } from '../api/song';

export default function Footer() {

  // 列表循环、顺序
  const [setting, setSetting] = useState(1);
  const [duration, setDuration] = useState(0); // seconds
  const [realdt, setRealdt] = useState(0);
  const [position, setPosition] = useState(0);
  const [paused, setPaused] = useState(true);
  // 当前音乐信息
  const [currentsong, setCursong] = useState([]);
  // 当前音乐url
  const [songurl, setSongurl] = useState('');

  // 直接路由
  const navigate = useNavigate();

  // 歌曲控制
  const audioRef = useRef(null);

  const mylist = JSON.parse(localStorage.getItem('mySonglist'));

  // 能否听到音乐
  // 1有版权
  // 2没有版权
  const [check, setCheck] = useState(0);

  // 时间转换
  function formatDuration(value) {
    const minute = Math.floor(value / 60);
    const secondLeft = value - minute * 60;
    return `${minute}:${secondLeft < 10 ? `0${secondLeft}` : secondLeft}`;
  }
  const mainIconColor = 'white';

  // 双击音乐list事件监听
  function handleEvent(eventData) {
    if (currentsong && currentsong.songid === eventData.songid) {
      setPosition(0);
      // 从头播放
      audioRef.current.currentTime = 0;
    }
    else {
      // 设置总时间
      setDuration(parseInt(eventData.dt / 1000));
      // 处理事件信息
      setCursong(eventData);

      // 设置为0
      setPosition(0);
    }
  }

  useEffect(() => {
    // 监听自定义事件
    eventBus.on('playmusic', handleEvent);

    return () => {
      // 在组件卸载时取消监听
      eventBus.off('playmusic', handleEvent);
    };
  }, [handleEvent])

  // 监控currentsong事件
  useEffect(() => {
    const requrl = reqsongurl(currentsong.songid);
    requrl.then((response) => {
      if (response.data.code === 200) {
        const url = response.data.data[0].url;
        if (url === null) {
          message.warning('没有版权！');
          setCheck(2);
        } else {
          // 存储音乐url
          setCheck(1);
          setDuration(parseInt(currentsong.dt / 1000))
        }
        setSongurl(url);
      }
    }).catch(e => {
      console.error(e);
    })

  }, [currentsong]);

  useEffect(() => {
    if (mylist) {
      setDuration(parseInt(mylist[0].dt / 1000))
    }
  }, [])


  useEffect(() => {
    // 监控songurl事件
    if (songurl) {
      // 晚0.1秒发生
      setTimeout(() => {
        audioRef.current.play();
        setPaused(false);
        setRealdt(audioRef.current.duration);
      }, 100);
    }
  }, [songurl])


  // 下首歌曲
  const nextsong = (flag) => {
    // 关闭
    audioRef.current.pause();
    setPaused(true);
    // 如果为单曲循环
    if (setting === 0) {
      setPosition(0);
      audioRef.current.currentTime = 0;
      setPaused(false);
      if (check !== 2) {
        audioRef.current.play();
      }
      // 如果为列表循环
    } else {
      const list = JSON.parse(localStorage.getItem('mySonglist')) || [];
      const len = list.length;
      const length = currentsong.length - 1;
      if (setting === 1 || setting === 2) {
        setCursong(list[(length + flag + len) % len]);
      }
      // 列表随机播放
      if (setting === 3) {
        const random = Math.floor(Math.random() * (len));
        if (random === length) {
          setCursong(list[(random + 1 + len) % len]);
        } else {
          setCursong(list[random]);
        }
      }
    }
  }

  // 更新时间
  const handleTimeUpdate = () => {
    // 在音乐播放
    setPosition(parseInt(audioRef.current.currentTime));
    const t = audioRef.current.currentTime;
    const allt = audioRef.current.duration;
    if (allt <= t) {
      // 关闭
      audioRef.current.pause();
      setPaused(true);
      nextsong(1);
    }
  }

  // 打开我的歌单
  const handdleMySongList = () => {
    navigate('/mysong')
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      <audio
        src={songurl ? songurl : null}
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}>
        您的浏览器不支持audio标签，无法播放音乐。
      </audio>
      <LeftImage>
        <div className='left'>
          <div className='img'>
            <img
              onClick={() => {
                const songid = currentsong ? currentsong.songid : (
                  mylist ? mylist[0].songid : null
                );
                navigate(`/song/${songid}`)
              }}
              src={currentsong ? currentsong.picUrl : (
                mylist ? mylist[0].picUrl : ''
              )}
              alt={
                currentsong ? currentsong.songname : (
                  mylist ? mylist[0].songname : ''
                )}
            />
          </div>
          <div className='text'>
            <span className='songname'
              onClick={() => {
                const songid = currentsong ? currentsong.songid : (
                  mylist ? mylist[0].songid : null
                );
                navigate(`/song/${songid}`)
              }}
            >{currentsong ? currentsong.songname : (
              mylist ? mylist[0].songname : ''
            )}</span>
            <span
              className='artistname'
              onClick={() => {
                const artistid = currentsong ? currentsong.artistid : (mylist ? mylist[0].artistid : '')
                navigate(`/artists/${artistid}`)
              }}
            >{currentsong ? currentsong.artistname : (mylist ? mylist[0].artistname : '')}</span>
          </div>
        </div>
      </LeftImage>
      <Box sx={{ overflow: 'hidden' }}>
        <Widget>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: -3,
            }}
          >
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mt: -1,
            }}
          >
            <IconButton aria-label="previous song"
              onClick={() => {
                if (songurl || check === 2)
                  nextsong(-1);
              }}>
              <SkipPreviousIcon sx={{ fontSize: '2rem' }} htmlColor={mainIconColor} />
            </IconButton>
            <IconButton
              aria-label={paused ? 'play' : 'pause'}
              onClick={() => {
                setPaused(!paused);
                if (songurl) {
                  paused ? audioRef.current.play() : audioRef.current.pause();
                }
                console.log(mylist, currentsong)
                if (mylist && !currentsong.length) {
                  setCursong(mylist[0]);
                }
              }}
            >
              {paused ? (
                <PlayCircleIcon
                  sx={{ fontSize: '2.5rem' }}
                  htmlColor={mainIconColor}
                />
              ) : (
                <PauseCircleIcon sx={{ fontSize: '2.5rem' }} htmlColor={mainIconColor} />
              )}
            </IconButton>
            <IconButton aria-label="next song"
              onClick={() => {
                if (songurl || check === 2)
                  nextsong(1);
              }}>
              <SkipNextIcon sx={{ fontSize: '2rem' }} htmlColor={mainIconColor}
              />
            </IconButton>
          </Box>
          <Box sx={{
            display: 'flex',
            gap: '10px',
            position: 'relative',
            top: '-10px',
            alignItems: 'center'
          }}>
            <TinyText>{formatDuration(position)}</TinyText>
            <Slider
              aria-label="time-indicator"
              size="small"
              value={position}
              min={0}
              step={1}
              max={duration}
              onChange={(_, value) => {
                setPosition(value);
                if (value <= parseInt(realdt)) {
                  audioRef.current.currentTime = value;
                } else {
                  message.warning('没有版权');
                  setPosition(0);
                  audioRef.current.currentTime = 0;
                }
              }}
              sx={{

                color: 'white',
                height: 4,
                '& .MuiSlider-track': {
                  color: ''
                },
                '& .MuiSlider-thumb': {
                  '&.Mui-active': {
                    width: 8,
                    height: 8,
                  },
                },
                '& .MuiSlider-rail': {
                  opacity: 0.28,
                },
              }}
            />
            <TinyText>-{formatDuration(duration - position)}</TinyText>
          </Box>
        </Widget>
      </Box>
      <div style={{ display: 'flex', alignItems: 'center', }}>
        <div style={{ height: '20px', width: '30px', cursor: 'pointer' }}
          onClick={() => {
            setSetting((setting + 1) % 4);
          }}>
          {setting === 0 && <OneCircle style={{ width: '20px', height: '20px' }} />}
          {setting === 1 && <ListCircle style={{ width: '20px', height: '20px' }} />}
          {setting === 2 && <Order style={{ width: '18px', height: '18px' }} />}
          {setting === 3 && <Random style={{ width: '20px', height: '20px' }} />}
        </div>
        <MdReorder
          onClick={handdleMySongList}
          style={{
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer'
          }} />
        <Stack
          spacing={1}
          direction="row"
          sx={{
            px: 1,
            width: '150px',
          }}
          alignItems="center">
          <VolumeDownRounded
            sx={{
              color: 'white',
              fontSize: '20px'
            }}
          />
          <Slider
            aria-label="Volume"
            defaultValue={30}
            onChange={(_, value) => {
              audioRef.current.volume = value / 100;
            }}
            sx={{
              color: '#fff',
              '& .MuiSlider-track': {
                border: 'none',
              },
              '& .MuiSlider-thumb': {
                width: 8,
                height: 8,
                backgroundColor: '#fff',
              },
            }}
          />
          <VolumeUpRounded
            sx={{
              color: 'white',
              fontSize: '20px'
            }} />
        </Stack>
      </div>
    </div>
  )
}


const LeftImage = styled.div`
  display: flex;
  position: relative;
  top: 10px;
  width: 300px;
  .left{
    height: 60px;
    display: flex;
    .img{
      margin-left: 10px;
      height: 60px;
      width: 60px;
      img{
        height: 100%;
        border-radius: 5px;
        cursor: pointer;
      }
    }
    .text{
      padding-left: 10px;
      font-size:12px ;
      display: flex;
      flex-direction: column;
      color: white;
      justify-content: center;
      .songname{
        font-size: 16px;
        font-weight: bold;
        cursor: pointer;
      }
      .songname:hover{
        text-decoration: underline;
      }
      .artistname:hover{
        cursor: pointer;
        text-decoration: underline;
      }
    }
  }
`;


const Widget = styled('div')(() => ({
  width: '700px',
  position: 'relative',
  top: '25px'
}));

const TinyText = styled('div')({
  fontSize: '0.75rem',
  opacity: 0.38,
  width: '30px',
  color: 'white'
});
