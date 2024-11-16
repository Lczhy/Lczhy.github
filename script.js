// 初始化 AOS
AOS.init({
    duration: 1000,
    once: true
});

// 初始化 Swiper
const swiper = new Swiper('.swiper-container', {
    effect: 'cards',
    grabCursor: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
    }
});

// 音乐控制相关代码
const musicToggle = document.getElementById('musicToggle');
const bgMusics = [
    document.getElementById('bgMusic'),
    document.getElementById('bgMusic2'),
    document.getElementById('bgMusic3')
];
let currentMusicIndex = 0;
let isPlaying = false;

// 设置所有音乐的音量为50%
bgMusics.forEach(music => {
    music.volume = 0.5; // 设置音量为50%
});

// 播放下一首歌
function playNextSong() {
    bgMusics[currentMusicIndex].pause();
    bgMusics[currentMusicIndex].currentTime = 0;
    currentMusicIndex = (currentMusicIndex + 1) % bgMusics.length;
    bgMusics[currentMusicIndex].play();
}

// 尝试自动播放
function tryAutoplay() {
    bgMusics[currentMusicIndex].play().then(() => {
        isPlaying = true;
        musicToggle.style.animationPlayState = 'running';
    }).catch(() => {
        musicToggle.style.animation = 'pulse 2s infinite';
        musicToggle.innerHTML = '🎵 点击播放';
    });
}

// 点击控制按钮
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusics[currentMusicIndex].pause();
        musicToggle.style.animationPlayState = 'paused';
        musicToggle.innerHTML = '🎵';
    } else {
        bgMusics[currentMusicIndex].play();
        musicToggle.style.animationPlayState = 'running';
        musicToggle.innerHTML = '🎵';
    }
    isPlaying = !isPlaying;
});

// 监听歌曲结束事件
bgMusics.forEach(music => {
    music.addEventListener('ended', () => {
        if (isPlaying) {
            playNextSong();
        }
    });
});

// 监听用户交互
document.addEventListener('click', function userInteractionHandler() {
    if (!isPlaying) {
        tryAutoplay();
    }
    document.removeEventListener('click', userInteractionHandler);
});

// 页面加载完成后尝试自动播放
document.addEventListener('DOMContentLoaded', () => {
    tryAutoplay();
    // ... 其他初始化代码 ...
});

// 创建落花效果
function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.style.left = Math.random() * 100 + 'vw';
    flower.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.querySelector('.falling-items').appendChild(flower);
    
    setTimeout(() => {
        flower.remove();
    }, 5000);
}

// 每500毫秒创建一个花瓣
setInterval(createFlower, 500);

// 点击效果
document.addEventListener('click', (e) => {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.style.left = e.clientX + 'px';
    heart.style.top = e.clientY + 'px';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 1000);
});

// 照片相关的代码
const TOTAL_PHOTOS = 20; // 改为20张照片
const SPECIAL_PHOTOS = [17, 18, 19, 20]; // 特殊照片编号

// 修改获取随机照片路径的函数
function getRandomPhotoPath(excludeNumber) {
    let randomNum;
    // 30%的概率显示特殊照片（17-20）
    if (Math.random() < 0.3) {
        randomNum = SPECIAL_PHOTOS[Math.floor(Math.random() * SPECIAL_PHOTOS.length)];
    } else {
        // 70%的概率显示普通照片（1-16）
        do {
            randomNum = Math.floor(Math.random() * 16) + 1;
        } while (randomNum === excludeNumber);
    }
    return `images/photo${randomNum}.jpg`;
}

// 初始化照片
function initializePhotos() {
    const photoItems = document.querySelectorAll('.photo-item');
    
    photoItems.forEach((item, index) => {
        // 设置正面照片
        const frontImg = item.querySelector('.photo-front img');
        frontImg.src = `images/photo${index + 1}.jpg`;
        
        // 预设背面随机照片
        const backImg = item.querySelector('.photo-back img');
        backImg.src = getRandomPhotoPath(index + 1);
        
        // 添加点击事件
        item.addEventListener('click', function() {
            this.classList.toggle('flipped');
            
            // 如果是翻转到背面，延迟一段时间后更换新的随机照片
            if (this.classList.contains('flipped')) {
                setTimeout(() => {
                    const currentFrontNum = parseInt(frontImg.src.match(/photo(\d+)/)[1]);
                    backImg.src = getRandomPhotoPath(currentFrontNum);
                }, 400);
            }
        });
    });
}

// 修改创建烟花函数
function createFirework(x, y) {
    const colors = ['#ff0', '#f0f', '#0ff', '#ff69b4', '#f80', '#0f0', '#fff'];
    const firework = document.createElement('div');
    firework.className = 'firework';
    firework.style.left = x + 'px';
    firework.style.top = y + 'px';
    
    // 增加粒子数量和大小
    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const angle = (i / 60) * Math.PI * 2;
        const velocity = 100 + Math.random() * 100; // 增加扩散范围
        const dx = Math.cos(angle) * velocity;
        const dy = Math.sin(angle) * velocity;
        
        const color = colors[Math.floor(Math.random() * colors.length)];
        particle.style.backgroundColor = color;
        particle.style.boxShadow = `0 0 6px ${color}`; // 添加发光效果
        particle.style.width = 4 + Math.random() * 3 + 'px'; // 随机粒子大小
        particle.style.height = particle.style.width;
        
        particle.style.setProperty('--dx', dx + 'px');
        particle.style.setProperty('--dy', dy + 'px');
        
        firework.appendChild(particle);
    }
    
    document.querySelector('.fireworks-container').appendChild(firework);
    
    setTimeout(() => {
        firework.remove();
    }, 1000);
}

// 修改初始烟花效果
function initialFireworks() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    // 增加初始烟花数量
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const x = Math.random() * width;
            const y = height * 0.2 + Math.random() * (height * 0.6);
            createFirework(x, y);
            
            // 每个位置额外发射2-3个烟花
            const extraFireworks = Math.floor(Math.random() * 2) + 2;
            for(let j = 0; j < extraFireworks; j++) {
                setTimeout(() => {
                    const offsetX = x + (Math.random() - 0.5) * 200;
                    const offsetY = y + (Math.random() - 0.5) * 200;
                    createFirework(offsetX, offsetY);
                }, j * 150);
            }
        }, i * 150);
    }
}

// 添加 randomizePhotos 函数
function randomizePhotos() {
    const photos = document.querySelectorAll('.photo-item');
    photos.forEach(photo => {
        const rotation = Math.random() * 10 - 5; // 随机-5度到5度之间
        photo.style.setProperty('--rotation', `${rotation}deg`);
    });
}

// 修改 DOMContentLoaded 事件处理
document.addEventListener('DOMContentLoaded', () => {
    initializePhotos();
    randomizePhotos();
    
    // 添加初始礼花效果
    initialFireworks();
    
    // 缩短礼花发射间隔从15秒到8秒
    setInterval(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const x = Math.random() * width;
        const y = height * 0.3 + Math.random() * (height * 0.4);
        createFirework(x, y);
        
        // 50%的概率额外发射一个礼花
        if(Math.random() > 0.5) {
            setTimeout(() => {
                const offsetX = x + (Math.random() - 0.5) * 200;
                const offsetY = y + (Math.random() - 0.5) * 200;
                createFirework(offsetX, offsetY);
            }, 300);
        }
    }, 8000);
    
    // 原有的照片角度变化代码保持不变
    setInterval(() => {
        const photos = document.querySelectorAll('.photo-item');
        photos.forEach(photo => {
            if (Math.random() > 0.7 && !photo.classList.contains('flipped')) {
                const rotation = Math.random() * 10 - 5;
                photo.style.setProperty('--rotation', `${rotation}deg`);
            }
        });
    }, 5000);
}); 