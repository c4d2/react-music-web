const ChangeTime = (dt) => {
    const minutes = Math.floor(dt / 60).toString().padStart(2, '0');
    const seconds = parseInt(dt % 60).toString().padStart(2, '0');
    return { minutes, seconds }
}

export default ChangeTime;