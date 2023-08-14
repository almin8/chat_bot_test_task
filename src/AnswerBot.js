export default function AnswerBot(myData) {
  if (myData.value[myData.value.length - 1].text == "Заказать пиццу") {
    myData.value.push({
      id: "bot",
      text: "Хорошо, я закажу пиццу. Что еще могу сделать?",
    });
  } else if (
    myData.value[myData.value.length - 1].text == "Установить будильник"
  ) {
    myData.value.push({
      id: "bot",
      text: "Хорошо, я установлю будильник. Что еще могу сделать?",
    });
  } else if (myData.value[myData.value.length - 1].text == "Вывести погоду") {
    myData.value.push({
      id: "bot",
      text: "Хорошо, я установлю погоду. Что еще могу сделать?",
    });
  } else {
    myData.value.push({
      id: "bot",
      text: "Ивините, у меня сейчас нет ответа на эту команду",
    });
  }
}
