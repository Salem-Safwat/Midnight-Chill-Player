var soundContainer = document.querySelector('.sound-container');
var startBtn = document.querySelector('#start');
var prevBtn = document.querySelector('#prev');
var nextBtn = document.querySelector('#next');
var audio = document.querySelector('#audio');
var progress = document.querySelector('.progress');
var progressContainer = document.querySelector('.progress-container');
var title = document.querySelector('#title');
var cover = document.querySelector('#cover');
var sounds = ['Ocean', 'Rain'];
var soundIndex = 0;
loadSound(sounds[soundIndex]);
function loadSound(sound) {
    title.innerText = sound;
    audio.src = 'Sounds/' + sound + '.mp3';
    cover.src = 'Photos/' + sound + '.jpg';
}
function playSound() {
    soundContainer.classList.add('play');
    startBtn.querySelector('i.fas').classList.remove('fa-play');
    startBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play();
}
function pauseSound() {
    soundContainer.classList.remove('play');
    startBtn.querySelector('i.fas').classList.add('fa-play');
    startBtn.querySelector('i.fas').classList.remove('fa-pause');
    audio.pause();
}
function prevSound() {
    soundIndex--;
    if (soundIndex < 0) {
        soundIndex = sounds.length - 1;
    }
    loadSound(sounds[soundIndex]);
    playSound();
}
function nextSound() {
    soundIndex++;
    if(soundIndex > sounds.length - 1) {
        soundIndex = 0;
    }
    loadSound(sounds[soundIndex]);
    playSound();
}
function updateProgress(e) {
    var { duration, currentTime } = e.srcElement; 
    var progressPercent = (currentTime / duration) * 100;
    progress.style.width = progressPercent + '%';
}
function setProgress(e) {
    var width = this.clientWidth;
    var clickX = e.offsetX;
    var duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}
function DurTime(e) {
    var {duration, currentTime} = e.srcElement;
    var sec;
    var sec_d;
    var min = (currentTime == null) ? 0 : Math.floor(currentTime / 60);
    min = min < 10 ? '0' + min : min;
    function get_sec(x) {
        if(Math.floor(x) >= 60){
            for (var i = 1; i <= 60; i++){
                if(Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec = Math.floor(x) - (60 * i);
                    sec = sec < 10 ? '0' + sec : sec;
                }
            }
        } else {
            sec = Math.floor(x);
            sec = sec < 10 ? '0' + sec : sec;
        }
    }
    get_sec(currentTime);
    var min_d = (isNaN(duration) === true) ? '0' : Math.floor(duration / 60);
    min_d = min_d < 10 ? '0' + min_d : min_d;
    function get_sec_d(x) {
        if(Math.floor(x) >= 60) {
            for (var i = 1; i <= 60; i++){
                if(Math.floor(x) >= (60 * i) && Math.floor(x) < (60 * (i + 1))) {
                    sec_d = Math.floor(x) - (60 * i);
                    sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
                }
            }
        } else {
            sec_d = (isNaN(duration) === true) ? '0' : Math.floor(x);
            sec_d = sec_d < 10 ? '0' + sec_d : sec_d;
        }
    }
    get_sec_d(duration);
}
startBtn.addEventListener('click', function() {
    var isPlaying = soundContainer.classList.contains('play');
    if (isPlaying) {
        pauseSound();
    } else {
        playSound();
    }
});
prevBtn.addEventListener('click', prevSound);
nextBtn.addEventListener('click', nextSound);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSound);
audio.addEventListener('timeupdate', DurTime);