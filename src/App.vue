<script setup>
import { ref } from "vue";
import iconRobot from "./assets/icon_robot.svg";
import arrow from "./assets/arrow.svg";
import cross from "./assets/cross.svg";
import typingText from "./assets/typingText.svg";
import AnswerBot from "./AnswerBot.js";
let myData = ref([]);
let inputValue = ref("");
let refDivChatWidnow;
let startBot = ref(false);
let typingBot = ref(false);
let buttons = ["Заказать пиццу", "Установить будильник", "Вывести погоду"];
const getNewMessMe = () => {
  myData.value.push({ id: "my", text: inputValue.value });
  inputValue.value = "";
  typingBot.value = false;
  setTimeout(() => (typingBot.value = true), 1500);
  AnswerBot(myData);
};
const nextHigth = () => {
  setTimeout(
    () => (refDivChatWidnow.scrollTop = refDivChatWidnow.scrollHeight),
    100
  );
};
const giveAction = (el) => {
  myData.value.push({ id: "my", text: el });
  /* answers BOT */
  typingBot.value = false;
  setTimeout(() => (typingBot.value = true), 1500);
  AnswerBot(myData);
  nextHigth();
};
const timeoutTextBot = () => {
  myData.value.push({
    id: "bot",
    text: "Привет! Что я могу для Вас сделать?",
  }),
    setTimeout(() => (typingBot.value = true), 1500);
};
</script>
<template>
  <!-- screen -->
  <div class="flex flex-col justify-center items-center h-screen bg-green-300">
    <button
      v-if="!startBot"
      class="bg-yellow-300 rounded-full text-lg p-6"
      @click="(startBot = true), timeoutTextBot()"
    >
      Начать общение с чат ботом
    </button>
    <!-- chatWindow -->
    <Transition>
      <div class="v" v-if="startBot">
        <div
          ref="refDivChatWidnow"
          class="flex flex-col rounded-t-lg bg-white w-[32rem] h-[32rem] overflow-y-auto p-4"
        >
          <!-- person -->
          <div
            v-for="(el, index) in myData"
            class="flex w-auto rounded-t-lg rounded-r-2xl mx-2 mt-2"
            :class="{
              'self-end': el.id == 'my',
              'flex-row-reverse': el.id == 'my',
            }"
          >
            <div class="w-12 mr-3" :class="{ 'ml-3': el.id == 'my' }">
              <img v-if="myData.length == 1" :src="iconRobot" />
              <img v-else-if="null == myData[index - 1]" :src="iconRobot" />
              <img
                v-else-if="index - 1 != -1 && el.id !== myData[index - 1].id"
                :src="iconRobot"
              />
            </div>

            <div
              v-if="el.id == 'my'"
              class="w-42 text-right bg-red-400 break-words p-2 rounded-bl-2xl rounded-t-lg max-w-fit"
            >
              {{ el.text }}
            </div>
            <div
              v-else
              v-if="
                (!typingBot &&
                  myData.findLastIndex((el) => el.id == 'bot') != index) ||
                typingBot
              "
              class="flex flex-col rounded-t-lg rounded-r-2xl"
            >
              <div
                class="bg-yellow-400 w-36break-words p-2 rounded-r-2xl rounded-t-lg"
              >
                {{ el.text }}
              </div>
              <div
                @click="giveAction(elem)"
                v-if="el.text == 'Привет! Что я могу для Вас сделать?'"
                v-for="elem in buttons"
                class="bg-gray-300 mt-2 w-fit p-2 text-sm rounded-lg border-2 cursor-pointer"
              >
                {{ elem }}
              </div>
            </div>
            <div
              class="mt-3"
              v-if="
                !typingBot &&
                myData.findLastIndex((el) => el.id == 'bot') == index
              "
            >
              <img :src="typingText" />
            </div>
          </div>
        </div>
        <hr />
        <div class="flex" v-if="startBot">
          <input
            @keyup.enter="
              if (inputValue != '') {
                getNewMessMe();
                nextHigth();
              }
            "
            placeholder="Введите текст сообщения"
            v-model="inputValue"
            class="bg-white w-[30rem] rounded-bl-lg border-2 text-right p-2 border-none"
            type="text"
          />
          <button
            @click="
              if (inputValue != '') {
                getNewMessMe();
                nextHigth();
              }
            "
            class="bg-white h-10 rounded-br-lg cursor-pointer"
          >
            <img :src="arrow" />
          </button>
        </div>
        <div class="flex justify-center m-3">
          <img
            class="cursor-pointer"
            @click="
              (startBot = false), (myData.length = 0), (typingBot = false)
            "
            :src="cross"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.v-enter-from {
  opacity: 0;
  translate: 0 200px;
}
.v-enter-to {
  opacity: 1;
  translate: 0 -200px;
}
.v-leave-from {
  opacity: 1;
  translate: 0 0;
}
.v-leave-to {
  opacity: 0;
  translate: 200px 200px;
}
.v {
  transition: all 0.5s;
}
</style>
