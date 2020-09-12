const maxHits = 10;
let hitsGreen = 0;
let hitsRed = 0;
let firstHitTime = 0;

$("#button-start").click(function(){
  firstHitTime = getTimestamp();
  $(".game-field").show();
  $(".startText").show();
});

function round() {
  // FIXME: надо бы убрать "target" прежде чем искать новый
  $(".target").removeClass("target");
  $(".miss").removeClass("miss");
  let divSelector = randomDivId();
  $(divSelector).addClass("target");
  $(divSelector).text(hitsGreen+1);
  // TODO: помечать target текущим номером

  // FIXME: тут надо определять при первом клике firstHitTime

  if (hitsGreen === maxHits) {
    endGame();
  }
}

function endGame() {
  // FIXME: спрятать игровое поле сначала
  $(".startText").hide();
  $(".target").text("");
  $(".target").removeClass("target");
  let totalPlayedMillis = getTimestamp() - firstHitTime;
  let totalPlayedSeconds = Number(totalPlayedMillis / 1000).toPrecision(3);
  $("#total-time-played").text(totalPlayedSeconds);
  $("#total-score").text(hitsGreen + hitsRed);
  $("#win-message").removeClass("d-none");
}
function handleClick(event) {
  // FIXME: убирать текст со старых таргетов. Кажется есть .text?
  if ($(event.target).hasClass("target")) {
    hitsGreen = hitsGreen + 1;
    $(".target").text("");
    round();}
  else {
    $(event.target).addClass("miss");
    hitsRed = hitsRed - 1;
    }
}
  // TODO: как-то отмечать если мы промахнулись? См CSS класс .miss

function init() {
  // TODO: заказчик просил отдельную кнопку, запускающую игру а не просто по загрузке
  round();
  $(".game-field").click(handleClick);
  $("#button-reload").click(function() {
    location.reload();
  });
}

$(document).ready(function(){
  init();
  $(".game-field").hide();
  $(".startText").hide();
});
