const nowDate = document.getElementsByClassName("date");
const nowTime = document.getElementsByClassName("time");

function getClock(){
    const date = new Date();
    const year = String(date.getFullYear());
    const month = String(date.getMonth()+1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getMonth()).padStart(2, "0");

    nowDate.innerText = `${year}년 ${month}월 ${day}일`;
    nowTime.innerText =`${hours}시 ${minutes}분 ${seconds}초`;
}
setInterval(getClock, 1000);
